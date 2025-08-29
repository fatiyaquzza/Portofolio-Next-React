// lib/firestoreCrud.ts
import { db } from "./firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

/* =========================
   EXPERIENCES
   ========================= */

export type Experience = {
  id?: string;
  title: string;
  company: string;
  year: string;
  description: string;
  createdAt?: any; // Firestore Timestamp
};

const experiencesCol = collection(db, "experiences");

export async function getExperiences(): Promise<Experience[]> {
  // tanpa orderBy agar dokumen lama (tanpa createdAt) tetap kebaca
  const snap = await getDocs(experiencesCol);
  const rows = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<Experience, "id">),
  }));
  // sort client-side by createdAt desc (fallback 0)
  return rows.sort((a, b) => {
    const ta = a.createdAt?.toMillis?.() ?? 0;
    const tb = b.createdAt?.toMillis?.() ?? 0;
    return tb - ta;
  });
}

export async function addExperience(
  data: Omit<Experience, "id" | "createdAt">
) {
  return addDoc(experiencesCol, { ...data, createdAt: serverTimestamp() });
}

export async function updateExperience(
  id: string,
  data: Partial<Omit<Experience, "id" | "createdAt">>
) {
  return updateDoc(doc(db, "experiences", id), data);
}

export async function deleteExperience(id: string) {
  return deleteDoc(doc(db, "experiences", id));
}

/* =========================
   PROJECTS
   ========================= */

export type ProjectDoc = {
  id?: string;
  title: string;
  image: string; // URL Cloudinary
  link: string;
  tools: string; // bisa comma-separated
  type: string;  // e.g. "Website", "Mobile App"
  createdAt?: any; // Firestore Timestamp
};

const projectsCol = collection(db, "projects");

export async function getProjects(): Promise<ProjectDoc[]> {
  // tanpa orderBy agar dokumen lama (tanpa createdAt) tetap kebaca
  const snap = await getDocs(projectsCol);
  const rows = snap.docs.map((d) => ({
    id: d.id,
    ...(d.data() as Omit<ProjectDoc, "id">),
  }));
  // sort client-side by createdAt desc
  return rows.sort((a, b) => {
    const ta = a.createdAt?.toMillis?.() ?? 0;
    const tb = b.createdAt?.toMillis?.() ?? 0;
    return tb - ta;
  });
}

export async function addProject(
  data: Omit<ProjectDoc, "id" | "createdAt">
) {
  return addDoc(projectsCol, { ...data, createdAt: serverTimestamp() });
}

export async function updateProject(
  id: string,
  data: Partial<Omit<ProjectDoc, "id" | "createdAt">>
) {
  return updateDoc(doc(db, "projects", id), data);
}

export async function deleteProject(id: string) {
  return deleteDoc(doc(db, "projects", id));
}
