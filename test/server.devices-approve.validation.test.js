import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

function validateRequestId(raw) {
  const requestId = String(raw || "").trim();
  if (!requestId) return { ok: false, error: "Missing device request ID" };
  if (!/^[A-Za-z0-9_-]+$/.test(requestId)) return { ok: false, error: "Invalid device request ID" };
  return { ok: true };
}

test("devices approve requestId validation: missing", () => {
  assert.deepEqual(validateRequestId(""), { ok: false, error: "Missing device request ID" });
  assert.deepEqual(validateRequestId("   "), { ok: false, error: "Missing device request ID" });
});

test("devices approve requestId validation: rejects weird chars", () => {
  assert.equal(validateRequestId("../../etc/passwd").ok, false);
  assert.equal(validateRequestId("abc def").ok, false);
  assert.equal(validateRequestId("abc$def").ok, false);
});

test("devices approve requestId validation: allows typical ids", () => {
  assert.equal(validateRequestId("abc123").ok, true);
  assert.equal(validateRequestId("req_123-ABC").ok, true);
});

test("setup console supports listing and approving node pairing requests", () => {
  const src = fs.readFileSync(new URL("../src/server.js", import.meta.url), "utf8");
  assert.match(src, /"openclaw\.nodes\.pending"/);
  assert.match(src, /"openclaw\.nodes\.approve"/);
  assert.match(src, /clawArgs\(\["nodes", "pending"\]\)/);
  assert.match(src, /clawArgs\(\["nodes", "approve", requestId\]\)/);
});
