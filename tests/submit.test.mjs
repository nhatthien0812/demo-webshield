import assert from "node:assert/strict";
import test from "node:test";

test("the demo endpoint accepts valid forms and rejects invalid data", async () => {
  const origin = process.env.DEMO_ORIGIN ?? "http://localhost:3000";
  const cases = [
    [JSON.stringify({ email: "demo@example.com" }), 200],
    [JSON.stringify({ email: " demo.news+test@example.co.uk " }), 200],
    [JSON.stringify({ name: "Nguyễn An", email: "demo@example.com" }), 200],
    [JSON.stringify({}), 400],
    [JSON.stringify({ name: " ", email: "demo@example.com" }), 400],
    [JSON.stringify({ name: "Nguyễn An", email: "demo" }), 400],
    [JSON.stringify({ email: 123 }), 400],
    [JSON.stringify({ email: "demo@example" }), 400],
    [JSON.stringify({ email: "demo..news@example.com" }), 400],
    [JSON.stringify({ email: "demo@example-.com" }), 400],
    [JSON.stringify({ email: "demo@" + "x".repeat(64) + ".com" }), 400],
    [JSON.stringify({ email: "x".repeat(65) + "@example.com" }), 400],
    ["{", 400],
  ];
  for (const [body, status] of cases) {
    const response = await fetch(new URL("/api/submit", origin), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    assert.equal(response.status, status);
    assert.equal((await response.json()).ok, status === 200);
  }

  const nativeForm = await fetch(new URL("/api/submit", origin), {
    method: "POST",
    body: new URLSearchParams({ email: "demo@example.com" }),
  });
  assert.equal(nativeForm.status, 200);
  assert.deepEqual(await nativeForm.json(), { ok: true });
});
