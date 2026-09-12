import test from "node:test";
import assert from "node:assert/strict";
import { sendContactMail } from "../lib/contactEmail.ts";

test("contact email uses the SMTP account as sender and escapes HTML", async () => {
  let delivered;
  const fakeTransport = {
    async sendMail(options) {
      delivered = options;
      return { accepted: [options.to] };
    },
  };

  await sendContactMail(
    fakeTransport,
    {
      fromName: "<Admin>",
      fromEmail: "visitor@example.com",
      subject: "Hello <team>",
      message: "First line\n<script>alert(1)</script>",
    },
    "smtp@example.com",
    "owner@example.com"
  );

  assert.equal(delivered.from, "Fatiya Portfolio <smtp@example.com>");
  assert.equal(delivered.replyTo, "visitor@example.com");
  assert.equal(delivered.to, "owner@example.com");
  assert.match(delivered.html, /&lt;script&gt;alert\(1\)&lt;\/script&gt;/);
  assert.doesNotMatch(delivered.html, /<script>/);
});
