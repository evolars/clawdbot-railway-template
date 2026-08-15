import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("setup console exposes the official WhatsApp install and QR login flow", () => {
  const src = fs.readFileSync(new URL("../src/server.js", import.meta.url), "utf8");
  assert.match(src, /clawhub:@openclaw\/whatsapp/);
  assert.match(src, /channels", "login", "--channel", "whatsapp/);
  assert.match(src, /openclaw\.whatsapp\.login\.status/);
});
