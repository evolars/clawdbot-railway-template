import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

test("factory reset only clears state and workspace under the Railway volume", () => {
  const src = fs.readFileSync(new URL("../src/server.js", import.meta.url), "utf8");
  const idx = src.indexOf('app.post("/setup/api/factory-reset"');
  assert.ok(idx >= 0);
  const handler = src.slice(idx, idx + 1_800);

  assert.match(handler, /target !== dataRoot/);
  assert.match(handler, /target\.startsWith\(`\$\{dataRoot\}\$\{path\.sep\}`\)/);
  assert.match(handler, /proc\.once\("exit"/);
  assert.match(handler, /proc\.kill\("SIGKILL"\)/);
  assert.match(handler, /fs\.rmSync\(target, \{ recursive: true, force: true/);
  assert.match(handler, /fs\.mkdirSync\(STATE_DIR/);
  assert.match(handler, /fs\.mkdirSync\(WORKSPACE_DIR/);
  assert.match(handler, /Factory reset did not remove the configuration file/);
});

test("setup status does not initialize OpenClaw before onboarding", () => {
  const src = fs.readFileSync(new URL("../src/server.js", import.meta.url), "utf8");
  const idx = src.indexOf('app.get("/setup/api/status"');
  assert.ok(idx >= 0);
  const handler = src.slice(idx, idx + 900);

  assert.match(handler, /if \(!configured\)/);
  assert.match(handler, /openclawVersion: null/);
});
