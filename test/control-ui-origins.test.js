import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("setup authorizes the Railway public domain for the Control UI", () => {
  const src = fs.readFileSync(new URL("../src/server.js", import.meta.url), "utf8");
  assert.match(src, /function controlUiAllowedOrigins\(\)/);
  assert.match(src, /function persistControlUiAllowedOrigins\(\)/);
  assert.match(src, /persistControlUiAllowedOrigins\(\)/);
  assert.match(src, /gateway\.controlUi\.allowedOrigins = origins/);
  assert.match(src, /gateway\.remote\.url = origins\[0\]/);
  assert.match(src, /entries\["device-pair"\]/);
  assert.match(src, /RAILWAY_PUBLIC_DOMAIN/);
});
