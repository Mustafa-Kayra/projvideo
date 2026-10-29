import { test, expect, type Page } from "@playwright/test";
import { questions } from "../src/data/questions";

const key = "golbilgi.records.v1";

async function startGame(page: Page, category = "Karışık") {
  await page.bringToFront();
  await page.getByRole("button", { name: "Hemen oyna", exact: true }).click();
  await page.getByRole("button", { name: category, exact: true }).click();
  await page
    .getByRole("button", { name: "Başlama vuruşu", exact: true })
    .click();
  await page.locator(".answer-button:not([disabled])").first().waitFor();
}

async function finishGame(page: Page, correct: boolean, category = "Karışık") {
  await startGame(page, category);
  for (let i = 0; i < 10; i++) {
    const options = page.locator(".answer-button:not([disabled])");
    await options.first().waitFor();
    const text = await page.locator("#question-title").textContent();
    const question = questions.find((question) => question.question === text)!;
    const labels = await options
      .locator(":scope > span:nth-child(2)")
      .allTextContents();
    const index = labels.indexOf(question.options[question.answerIndex]);
    await options.nth(correct ? index : (index + 1) % 4).click();
    await page
      .getByRole("button", {
        name: i === 9 ? "Sonucu gör" : "Sıradaki soru",
        exact: true,
      })
      .click();
  }
  await page.locator(".result-card").waitFor();
}

test("eski sekme düşük skorla yeni rekoru ezmez ve diğer sekmeler canlı eşitlenir", async ({
  context,
}) => {
  const highTab = await context.newPage();
  const staleTab = await context.newPage();
  const liveTab = await context.newPage();
  await staleTab.addInitScript(() =>
    window.addEventListener(
      "storage",
      (event) => event.stopImmediatePropagation(),
      true,
    ),
  );
  await Promise.all([highTab.goto("/"), staleTab.goto("/"), liveTab.goto("/")]);
  await expect
    .poll(() => highTab.evaluate((key) => localStorage.getItem(key), key))
    .toBeNull();
  await finishGame(highTab, true);
  const high = await highTab.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    key,
  );
  expect(high[0].score).toBeGreaterThan(0);
  await expect(
    liveTab.getByText(`${high[0].score.toLocaleString("tr-TR")} puan`, {
      exact: true,
    }),
  ).toBeVisible();
  await finishGame(staleTab, false);
  await expect
    .poll(() =>
      staleTab.evaluate((key) => JSON.parse(localStorage.getItem(key)!), key),
    )
    .toEqual(high);
  await finishGame(liveTab, false, "Kulüpler");
  await expect
    .poll(() =>
      highTab.evaluate(
        (key) => JSON.parse(localStorage.getItem(key)!).length,
        key,
      ),
    )
    .toBe(2);
  await expect(
    highTab.getByRole("button", { name: "Rekorlarım 2", exact: true }),
  ).toBeVisible();
  const merged = await highTab.evaluate(
    (key) => JSON.parse(localStorage.getItem(key)!),
    key,
  );
  expect(
    merged.find((record: { category: string }) => record.category === "mixed"),
  ).toEqual(high[0]);
});

for (const trigger of ["Nasıl oynanır?", "Maçtan ayrıl"]) {
  test(`${trigger}: süre dolsa da modal dışına odak kaçmaz`, async ({
    page,
  }) => {
    await page.goto("/");
    await startGame(page);
    const opener = page.getByRole("button", { name: trigger, exact: true });
    await opener.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(page.locator(".main-wrap")).toHaveAttribute("inert", "");
    await expect(page.locator(".sidebar")).toHaveAttribute("inert", "");
    await page.locator(".answer-feedback").waitFor({ timeout: 20_000 });
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
    await page
      .locator("#question-title")
      .evaluate((element: HTMLElement) => element.focus());
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
    await page.evaluate(() => (document.activeElement as HTMLElement).blur());
    await page.keyboard.press("Tab");
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
    await page.keyboard.press("Shift+Tab");
    await expect
      .poll(() =>
        dialog.evaluate((element) => element.contains(document.activeElement)),
      )
      .toBe(true);
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
    await expect(opener).toBeFocused();
    await expect(page.locator(".main-wrap")).not.toHaveAttribute("inert", "");
  });
}
