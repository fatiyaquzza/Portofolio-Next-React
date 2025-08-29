export async function uploadToCloudinary(file: File): Promise<string> {
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!;
    const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!;
    if (!cloudName || !preset) throw new Error("Cloudinary env missing");
  
    // Validasi sederhana
    if (file.size > 5 * 1024 * 1024) throw new Error("File terlalu besar (>5MB)");
    if (!file.type.startsWith("image/")) throw new Error("File harus gambar");
  
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
  
    const res = await fetch(url, { method: "POST", body: formData });
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error?.message || "Upload gagal");
    return data.secure_url as string;
  }
  