import test from "node:test";
import assert from "node:assert/strict";
import { escapeHtml, parseContactMessage } from "../lib/contact.ts";

const valid = {
  from_name: " Fatiya ",
  from_email: "hello@example.com",
  subject: " Hello ",
  message: " A useful message ",
  website: "",
};

test("contact validation trims valid string input", () => {
  assert.deepEqual(parseContactMessage(valid), {
    fromName: "Fatiya",
    fromEmail: "hello@example.com",
    subject: "Hello",
    message: "A useful message",
  });
});

test("contact validation rejects bots, malformed types, email, and long input", () => {
  assert.equal(parseContactMessage({ ...valid, website: "bot.example" }), null);
  assert.equal(parseContactMessage({ ...valid, from_name: 42 }), null);
  assert.equal(parseContactMessage({ ...valid, from_email: "invalid" }), null);
  assert.equal(parseContactMessage({ ...valid, subject: "Hello\r\nBcc: victim@example.com" }), null);
  assert.equal(parseContactMessage({ ...valid, message: "x".repeat(5001) }), null);
});

test("HTML escaping covers user-controlled markup", () => {
  assert.equal(escapeHtml(`<script data-x="1">'&</script>`), "&lt;script data-x=&quot;1&quot;&gt;&#039;&amp;&lt;/script&gt;");
});
