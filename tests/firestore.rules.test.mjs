import test, { after, before, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
} from "@firebase/rules-unit-testing";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";

let environment;

before(async () => {
  environment = await initializeTestEnvironment({
    projectId: "fatiya-portfolio-rules-test",
    firestore: { rules: await readFile("firestore.rules", "utf8") },
  });
});

beforeEach(async () => environment.clearFirestore());
after(async () => environment.cleanup());

const validProject = {
  title: "Project",
  image: "https://example.com/project.webp",
  link: "",
  tools: "Next.js",
  type: "Website",
  description: "A complete project description.",
  featured: false,
  createdAt: serverTimestamp(),
};

test("project reads are public while writes require the admin claim", async () => {
  await environment.withSecurityRulesDisabled((context) =>
    setDoc(doc(context.firestore(), "projects", "public"), validProject)
  );

  await assertSucceeds(
    getDoc(doc(environment.unauthenticatedContext().firestore(), "projects", "public"))
  );
  await assertFails(
    setDoc(doc(environment.unauthenticatedContext().firestore(), "projects", "blocked"), validProject)
  );
  await assertFails(
    setDoc(doc(environment.authenticatedContext("member").firestore(), "projects", "blocked"), validProject)
  );
  await assertSucceeds(
    setDoc(
      doc(environment.authenticatedContext("admin", { admin: true }).firestore(), "projects", "allowed"),
      validProject
    )
  );
});

test("rules reject unknown fields, invalid types, and incomplete projects", async () => {
  const db = environment.authenticatedContext("admin", { admin: true }).firestore();
  await assertFails(setDoc(doc(db, "projects", "extra"), { ...validProject, isAdmin: true }));
  await assertFails(setDoc(doc(db, "projects", "category"), { ...validProject, category: "personal" }));
  await assertFails(setDoc(doc(db, "projects", "type"), { ...validProject, type: "Desktop" }));
  await assertFails(setDoc(doc(db, "projects", "description"), { ...validProject, description: "" }));
  await assertFails(setDoc(doc(db, "projects", "image"), { ...validProject, image: "" }));
  await assertFails(setDoc(doc(db, "projects", "url"), { ...validProject, link: "javascript:alert(1)" }));
  await assertSucceeds(setDoc(doc(db, "projects", "no-links"), {
    ...validProject,
    link: "",
    demoUrl: "",
    repoUrl: "",
  }));
  assert.ok(true);
});
