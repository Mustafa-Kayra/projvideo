import { Config } from "@remotion/cli/config";
import fs from "fs";

Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setOverwriteOutput(true);
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");

if (fs.existsSync("/opt/google/chrome/chrome")) {
  Config.setBrowserExecutable("/opt/google/chrome/chrome");
}
