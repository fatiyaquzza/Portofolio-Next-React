// lib/firestoreCrud.ts
import { db } from "./firebase";
import {
  Experience,
  parseExperience,
  parseProject,
  ProjectDoc,
  sortExperiences,
  sortProjects,
} from "./content";
import {
  addDoc,
  collection,
  deleteDoc,
  deleteField,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  updateDoc,
  writeBatch,
} from "firebase/firestore";

export type { Experience, ProjectDoc } from "./content";

const experiencesCol = collection(db, "experiences");

export async function getExperiences(): Promise<Experience[]> {
  // tanpa orderBy agar dokumen lama (tanpa createdAt) tetap kebaca
  const snap = await getDocs(experiencesCol);
  const rows = snap.docs
    .map((item) => parseExperience(item.id, item.data()))
    .filter((item): item is Experience => item !== null);
  return sortExperiences(rows);
}

export async function addExperience(
  data: Omit<Experience, "id" | "createdAt">
) {
  return addDoc(experiencesCol, { ...data, createdAt: serverTimestamp() });
}

export async function updateExperience(
  id: string,
  data: Partial<Omit<Experience, "id" | "createdAt" | "order">> & {
    order?: number | null;
  }
) {
  return updateDoc(doc(db, "experiences", id), {
    ...data,
    ...(data.order === null ? { order: deleteField() } : {}),
  });
}

export async function deleteExperience(id: string) {
  return deleteDoc(doc(db, "experiences", id));
}

const projectsCol = collection(db, "projects");

export async function getProjects(): Promise<ProjectDoc[]> {
  // tanpa orderBy agar dokumen lama (tanpa createdAt) tetap kebaca
  const snap = await getDocs(projectsCol);
  const rows = snap.docs
    .map((item) => parseProject(item.id, item.data()))
    .filter((item): item is ProjectDoc => item !== null);
  return sortProjects(rows);
}

export async function getProject(id: string): Promise<ProjectDoc | null> {
  const snap = await getDoc(doc(db, "projects", id));
  return snap.exists() ? parseProject(snap.id, snap.data()) : null;
}

export async function addProject(
  data: Omit<ProjectDoc, "id" | "createdAt">
) {
  const projectRef = doc(projectsCol);
  const batch = writeBatch(db);
  await disableOtherFeaturedProjects(batch, data.featured, projectRef.id);
  batch.set(projectRef, { ...data, createdAt: serverTimestamp() });
  await batch.commit();
  return projectRef;
}

export async function updateProject(
  id: string,
  data: Partial<Omit<ProjectDoc, "id" | "createdAt">>
) {
  const projectRef = doc(db, "projects", id);
  const batch = writeBatch(db);
  await disableOtherFeaturedProjects(batch, data.featured === true, id);
  batch.update(projectRef, { ...data, category: deleteField() });
  return batch.commit();
}

async function disableOtherFeaturedProjects(
  batch: ReturnType<typeof writeBatch>,
  makeFeatured: boolean,
  selectedId: string
) {
  if (!makeFeatured) return;
  const snapshot = await getDocs(projectsCol);
  snapshot.docs.forEach((item) => {
    if (item.id !== selectedId && item.data().featured === true) {
      batch.update(item.ref, { featured: false });
    }
  });
}

export async function deleteProject(id: string) {
  return deleteDoc(doc(db, "projects", id));
}
