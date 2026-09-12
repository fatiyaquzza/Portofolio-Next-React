import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { cert, initializeApp } from "firebase-admin/app";
import { FieldValue, getFirestore } from "firebase-admin/firestore";

const expectedProjectId = "portfolio-ftya";
const shouldApply = process.argv.includes("--apply");

const projects = [
  {
    id: "kTzkGwPbAEipvzyUUeHY",
    title: "Alzheimer’s Disease Classification Website",
    type: "Website",
    role: "Machine Learning Developer",
    tools: "Python, Streamlit, TensorFlow",
    description: "Built an interactive web application that classifies stages of Alzheimer’s disease from MRI images using pretrained EfficientNet-B0 and ResNet50 models. The Streamlit interface makes the image-classification workflow accessible directly from the browser.",
    demoUrl: "https://alzheimerclassification.streamlit.app/",
    repoUrl: "",
    featured: false,
  },
  {
    id: "iH9qDvuYvVN9cNI3y3gY",
    title: "DermoAlly",
    type: "Mobile App",
    role: "Android Developer",
    tools: "Kotlin, Android Studio",
    description: "Developed an Android application designed to assist with early skin disease detection through image classification. Built the mobile experience with Kotlin and Android Studio as part of the Bangkit Academy capstone project.",
    demoUrl: "",
    repoUrl: "https://github.com/Dermoally",
    featured: false,
  },
  {
    id: "DYTYt3jG5wqBTGG5SNmk",
    title: "Forterzzz",
    type: "Website",
    role: "Frontend Developer",
    tools: "React.js, Tailwind CSS",
    description: "Developed an interactive team portfolio website that presents team members and their work through an engaging interface. Built the responsive frontend with React.js and Tailwind CSS for consistent use across screen sizes.",
    demoUrl: "",
    repoUrl: "https://github.com/Forterzzz",
    featured: false,
  },
  {
    id: "Y9z2XVi0DLTsos5AnFQn",
    title: "Informatics Final Assignment Portfolio",
    type: "Website",
    role: "Web Developer",
    tools: "Laravel, Tailwind CSS",
    description: "Developed a web-based portfolio archive for showcasing final assignments created by Informatics students. Projects are organized by specialization so visitors can browse relevant academic work more easily.",
    demoUrl: "",
    repoUrl: "https://github.com/fatiyaquzza/DevelopDev_final_project",
    featured: false,
  },
  {
    id: "slBIlMXabsZjeIpYV0ts",
    title: "LKBH Sata Al-Faqih Website",
    type: "Website",
    role: "Full-stack Developer Intern",
    tools: "React.js, Express.js, MySQL, Tailwind CSS",
    description: "Developed a responsive informational website for a legal aid organization using React.js and Express.js. The platform presents legal services, team profiles, news, articles, and contact information through accessible navigation across devices.",
    demoUrl: "",
    repoUrl: "https://github.com/fatiyaquzza/Sistem_Informasi_dan_Manajemen_KKP",
    featured: false,
  },
  {
    id: "6mpEWLR9xt9QaDKq9fSW",
    title: "QFlora",
    type: "Mobile App",
    role: "Full-stack Developer",
    tools: "React Native, Expo, Firebase, Express.js, React.js",
    description: "Developed a mobile application for exploring Quranic plants, with authenticated favorites and verse audio. The project also includes a React.js admin dashboard and Express.js backend for managing plant taxonomy and related data.",
    demoUrl: "",
    repoUrl: "https://github.com/fatiyaquzza/QFlora",
    featured: true,
  },
  {
    id: "JiX8EXkoeSsFR6Eox8lC",
    title: "TrashPorter",
    type: "Website",
    role: "Web Developer",
    tools: "Laravel, Tailwind CSS",
    description: "Developed a web platform intended to support better waste management in Indonesia through accessible digital services. Built the responsive interface with Laravel and Tailwind CSS as part of a collaborative project.",
    demoUrl: "",
    repoUrl: "https://github.com/TrashPorter/TrashPorter",
    featured: false,
  },
  {
    id: "BmaLU1EwKH66HAoTaNaZ",
    title: "Wedding Invitation",
    type: "Website",
    role: "Web Developer",
    tools: "Laravel, Tailwind CSS",
    description: "Built a responsive wedding invitation website for efficiently sharing event information and updates with guests. Developed the experience with Laravel and Tailwind CSS for comfortable viewing on mobile and desktop devices.",
    demoUrl: "",
    repoUrl: "",
    featured: false,
  },
];

function jsonValue(value) {
  if (value && typeof value.toDate === "function" && Number.isFinite(value.seconds)) {
    return {
      __type: "firestore_timestamp",
      seconds: value.seconds,
      nanoseconds: value.nanoseconds,
      iso: value.toDate().toISOString(),
    };
  }
  if (Array.isArray(value)) return value.map(jsonValue);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, jsonValue(item)]));
  }
  return value;
}

const serviceAccountPath = resolve(
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH || "serviceAccountKey.json"
);
const serviceAccount = JSON.parse(await readFile(serviceAccountPath, "utf8"));
if (serviceAccount.project_id !== expectedProjectId) {
  throw new Error(`Refusing to access unexpected Firebase project: ${serviceAccount.project_id}`);
}

const app = initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore(app);
const references = projects.map((project) => db.collection("projects").doc(project.id));
const snapshots = await db.getAll(...references);
const missing = snapshots.filter((snapshot) => !snapshot.exists).map((snapshot) => snapshot.id);
if (missing.length > 0) throw new Error(`Missing production project documents: ${missing.join(", ")}`);

const comparableTitle = (value) => String(value).replaceAll("’", "'");
const mismatches = snapshots.flatMap((snapshot, index) => {
  const actualTitle = snapshot.get("title");
  return comparableTitle(actualTitle) === comparableTitle(projects[index].title)
    ? []
    : [`${snapshot.id}: expected “${projects[index].title}”, found “${actualTitle}”`];
});
if (mismatches.length > 0) throw new Error(`Document identity check failed:\n${mismatches.join("\n")}`);

if (!shouldApply) {
  console.log(`Dry run passed for ${projects.length} documents in ${expectedProjectId}.`);
  console.log("Run npm run migrate:projects:apply to create a snapshot and apply the migration.");
  process.exit(0);
}

const capturedAt = new Date().toISOString();
const backupDirectory = resolve("test-results", "backups");
const backupPath = resolve(
  backupDirectory,
  `projects-production-before-sync-${capturedAt.replace(/[:.]/g, "-")}.json`
);
await mkdir(backupDirectory, { recursive: true });
await writeFile(
  backupPath,
  JSON.stringify({
    projectId: expectedProjectId,
    collection: "projects",
    capturedAt,
    documents: snapshots.map((snapshot) => ({
      id: snapshot.id,
      data: jsonValue(snapshot.data()),
    })),
  }, null, 2),
  { encoding: "utf8", flag: "wx" }
);

const batch = db.batch();
projects.forEach(({ id, ...metadata }) => {
  const fallbackLink = metadata.demoUrl || metadata.repoUrl;
  batch.update(db.collection("projects").doc(id), {
    ...metadata,
    link: fallbackLink,
    category: FieldValue.delete(),
  });
});
await batch.commit();

console.log(`Snapshot created: ${backupPath}`);
console.log(`Updated ${projects.length} project documents. QFlora is the only featured project.`);
