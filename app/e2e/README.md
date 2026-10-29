# Regresyon testleri

`app/` içinde:

```bash
npm ci
npm test
npx playwright install chromium
npm run test:e2e
```

Playwright, test sunucusunu 4179 portunda başlatır. Testler; üç sekme arasında rekor birleştirmeyi, eski sekmenin düşük skorunu ve yardım/ayrılma penceresi açıkken 15 saniyelik soru süresinin dolmasını kapsar. Animasyonlar ve zamanlayıcılar gerçek tarayıcıda çalışır.

İndirilen Chromium yerine kurulu Chrome kullanılacaksa:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE=/usr/bin/google-chrome npm run test:e2e
```
