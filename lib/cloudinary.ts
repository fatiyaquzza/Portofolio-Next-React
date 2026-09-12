import { auth } from "./firebase";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function uploadToCloudinary(file: File): Promise<string> {
  if (file.size > 5 * 1024 * 1024) throw new Error("File terlalu besar (maksimal 5 MB)");
  if (!allowedTypes.has(file.type)) throw new Error("Gunakan gambar JPG, PNG, atau WebP");

  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("Sesi admin telah berakhir. Silakan login kembali.");

  const signatureResponse = await fetch("/api/admin/cloudinary-signature", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  const signatureData = await signatureResponse.json();
  if (!signatureResponse.ok) {
    throw new Error(signatureData.message || "Tidak dapat menyiapkan upload");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", signatureData.uploadPreset);
  formData.append("api_key", signatureData.apiKey);
  formData.append("timestamp", String(signatureData.timestamp));
  formData.append("signature", signatureData.signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
    { method: "POST", body: formData }
  );
  const data = await response.json();
  if (!response.ok || typeof data.secure_url !== "string") {
    throw new Error(data?.error?.message || "Upload gambar gagal");
  }
  return data.secure_url;
}
