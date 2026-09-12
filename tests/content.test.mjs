import test from "node:test";
import assert from "node:assert/strict";
import {
  isSafeHttpUrl,
  parseExperience,
  parseProject,
  projectLinks,
  sortExperiences,
} from "../lib/content.ts";

const timestamp = (value) => ({ toMillis: () => value });

test("project parser keeps legacy links and defaults featured to false", () => {
  const project = parseProject("legacy", {
    title: " Legacy project ",
    tools: "Next.js",
    type: "Website",
    link: "https://github.com/example/project",
  });

  assert.equal(project?.title, "Legacy project");
  assert.equal(project?.featured, false);
  assert.deepEqual(projectLinks(project), {
    demoUrl: undefined,
    repoUrl: "https://github.com/example/project",
  });
});

test("project parser accepts only public project types", () => {
  assert.equal(parseProject("bad-type", {
    title: "Project",
    tools: "React",
    type: "Desktop",
  }), null);
  assert.equal(parseProject("mobile", {
    title: "Mobile project",
    tools: "Kotlin",
    type: "Mobile App",
    featured: true,
  })?.featured, true);
});

test("unsafe and placeholder URLs never become public links", () => {
  assert.equal(isSafeHttpUrl("#"), false);
  assert.equal(isSafeHttpUrl("javascript:alert(1)"), false);
  assert.equal(isSafeHttpUrl("https://example.com/demo"), true);

  const project = parseProject("safe", {
    title: "Project",
    tools: "React",
    type: "Website",
    link: "#",
    demoUrl: "javascript:alert(1)",
  });
  assert.deepEqual(projectLinks(project), { demoUrl: undefined, repoUrl: undefined });
});

test("experience ordering is deterministic for manual, timestamp, and legacy rows", () => {
  const rows = [
    { id: "legacy-b", title: "B", company: "C", year: "2023", description: "D" },
    { id: "second", title: "B", company: "C", year: "2024", description: "D", order: 2 },
    { id: "newer", title: "B", company: "C", year: "2025", description: "D", createdAt: timestamp(20) },
    { id: "first", title: "B", company: "C", year: "2024", description: "D", order: 1 },
    { id: "older", title: "B", company: "C", year: "2022", description: "D", createdAt: timestamp(10) },
    { id: "legacy-a", title: "B", company: "C", year: "2021", description: "D" },
  ];

  assert.deepEqual(sortExperiences(rows).map((item) => item.id), [
    "first",
    "second",
    "newer",
    "older",
    "legacy-a",
    "legacy-b",
  ]);
});

test("invalid Firestore documents are rejected", () => {
  assert.equal(parseExperience("bad", { title: "Only title" }), null);
  assert.equal(parseProject("bad", { title: "Only title" }), null);
});
