"use client";
import { useEffect, useRef, useState } from "react";
import { addProject, deleteProject, getProjects, ProjectDoc, updateProject } from "@/lib/firestoreCrud";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiUploadCloud } from "react-icons/fi";

export default function ProjectsCRUD() {
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [form, setForm] = useState({ title: "", link: "", tools: "", type: "", image: "" });
  const [editing, setEditing] = useState<string | null>(null);
  const [showDelete, setShowDelete] = useState<{id:string; title:string} | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    getProjects().then(setProjects).finally(()=>setLoading(false));
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(()=>setToast(null), 1800);
    return ()=>clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!file) { setPreview(null); return; }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.tools || !form.type || !form.link) return setToast("Please fill all fields!");

    let imageUrl = form.image || "";
    if (file) imageUrl = await uploadToCloudinary(file);
    const payload = { ...form, image: imageUrl };

    if (editing) {
      await updateProject(editing, payload);
      setToast("Project updated!");
    } else {
      await addProject(payload);
      setToast("Project added!");
    }
    setEditing(null);
    setForm({ title: "", link: "", tools: "", type: "", image: "" });
    setFile(null); setPreview(null); if (fileRef.current) fileRef.current.value = "";
    setProjects(await getProjects());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEdit = (p: ProjectDoc) => {
    setForm({ title: p.title, link: p.link, tools: p.tools, type: p.type, image: p.image || "" });
    setEditing(p.id!);
    setPreview(p.image || null);
    setFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0b0f15] text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 py-8">
        <div className="flex items-start sm:items-center justify-between mb-8 gap-4">
          <h1 className="text:xl md:text-3xl font-bold tracking-tight">Manage Projects</h1>
          <button onClick={()=>router.push("/dashboard")} className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg">
            <FiArrowLeft /> <span>Back</span>
          </button>
        </div>

        {toast && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-lg shadow-lg bg-[#232537] text-[#61dca3] font-bold border border-[#61dca3] animate-fade-in text-lg">
            {toast}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 bg-[#17191f] rounded-2xl p-7 shadow-2xl mb-10 border border-white/10">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <input placeholder="Title" value={form.title}
              onChange={(e)=>setForm(f=>({...f, title:e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none" required />
            <input placeholder="Link (repo/website)" value={form.link}
              onChange={(e)=>setForm(f=>({...f, link:e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none" required />
            <input placeholder="Tools (comma separated)" value={form.tools}
              onChange={(e)=>setForm(f=>({...f, tools:e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none" required />
            <input placeholder="Type (e.g., Website, Mobile App)" value={form.type}
              onChange={(e)=>setForm(f=>({...f, type:e.target.value}))}
              className="w-full px-4 py-3 rounded-xl bg-[#232537] text-white focus:ring-2 focus:ring-[#61dca3] border border-transparent outline-none" required />
          </div>

          <div className="lg:col-span-1 flex flex-col items-center justify-start gap-4">
            <label htmlFor="image" className="w-full h-full min-h-[150px] flex flex-col items-center justify-center gap-3 px-4 py-6 bg-[#22242b] border-2 border-dashed border-[#61dca3]/40 rounded-2xl cursor-pointer hover:bg-[#232537] transition">
              {preview || form.image ? (
                <img src={preview || form.image} alt="Preview" className="w-32 h-32 object-cover rounded-xl shadow-lg border-2 border-[#61dca3]/50 bg-white" />
              ) : (
                <div className="text-center">
                  <FiUploadCloud className="mx-auto text-3xl text-gray-500 mb-2" />
                  <span className="text-[#61dca3] font-bold">+ Upload Image</span>
                </div>
              )}
              <input id="image" ref={fileRef} type="file" accept="image/*" className="hidden"
                onChange={(e)=>setFile(e.target.files?.[0] ?? null)} />
              {(file || preview) && (
                <button type="button" className="text-xs text-red-400 hover:text-red-600 underline mt-2"
                  onClick={(e)=>{ e.preventDefault(); setFile(null); setPreview(null); setForm(f=>({...f, image:""})); if(fileRef.current) fileRef.current.value=""; }}>
                  Remove
                </button>
              )}
            </label>

            <button type="submit" className="bg-[#61dca3] w-full text-[#0b0f15] py-3 rounded-xl font-bold shadow-lg mt-2 hover:scale-105 transition">
              {editing ? "Update Project" : "Add Project"}
            </button>
            {editing && (
              <button type="button" className="text-xs text-gray-400 hover:underline mt-1"
                onClick={()=>{ setEditing(null); setForm({ title:"", link:"", tools:"", type:"", image:"" }); setFile(null); setPreview(null); if(fileRef.current) fileRef.current.value=""; }}>
                Cancel Edit
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="overflow-x-auto rounded-2xl bg-[#181a21] p-4 shadow-lg border border-white/10">
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Type</th>
                <th className="p-3">Tools</th>
                <th className="p-3">Link</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(3)].map((_,i)=>(
                  <tr key={i} className="border-b border-[#232537]/40">
                    <td className="p-3"><div className="h-14 w-20 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" /></td>
                    <td className="p-3"><div className="h-4 w-40 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" /></td>
                    <td className="p-3"><div className="h-4 w-24 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" /></td>
                    <td className="p-3"><div className="h-4 w-48 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" /></td>
                    <td className="p-3"><div className="h-4 w-56 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" /></td>
                    <td className="p-3"><div className="h-8 w-24 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" /></td>
                  </tr>
                ))
              ) : projects.length ? (
                projects.map(p=>(
                  <tr key={p.id} className="border-b border-[#232537]/40 hover:bg-[#232537]/30 transition">
                    <td className="p-3">
                      <img src={p.image} alt={p.title} className="w-20 h-14 object-cover rounded border border-[#61dca3]/40 bg-white" />
                    </td>
                    <td className="p-3 font-bold">{p.title}</td>
                    <td className="p-3">{p.type}</td>
                    <td className="p-3">{p.tools}</td>
                    <td className="p-3">
                      <a href={p.link} target="_blank" className="text-[#61dca3] hover:underline break-all">{p.link}</a>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-4">
                        <button className="text-blue-400 hover:underline font-semibold" onClick={()=>handleEdit(p)}>Edit</button>
                        <button className="text-red-400 hover:underline font-semibold" onClick={()=>setShowDelete({id:p.id!, title:p.title})}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={6} className="text-center py-12 text-gray-500">No project data yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* modal delete */}
        <style jsx global>{`
          @keyframes shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
          @keyframes fade-in { from{opacity:0;transform:scale(.95)} to{opacity:1;transform:scale(1)} }
          .animate-fade-in{ animation: fade-in .3s ease-out; }
        `}</style>

        {showDelete && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-[#181a21] rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-gray-700">
              <div className="text-5xl mb-4 text-red-500">⚠️</div>
              <h2 className="font-bold text-xl mb-2">Delete Project?</h2>
              <p className="mb-6 text-gray-400">Are you sure you want to delete <span className="font-semibold text-white">{showDelete.title}</span>?</p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-2 rounded-lg bg-[#61dca3] text-[#0b0f15] font-bold hover:bg-[#3fc78d] transition"
                  onClick={async ()=>{ await deleteProject(showDelete.id); setProjects(await getProjects()); setShowDelete(null); setToast("Project deleted!"); }}>
                  Yes, Delete
                </button>
                <button className="px-6 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition" onClick={()=>setShowDelete(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
