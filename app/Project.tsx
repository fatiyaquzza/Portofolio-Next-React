"use client";
import { useEffect, useState } from "react";
import { HoverEffect } from "./components/ui/card-hover-effect";
import AOS from "aos";
import "aos/dist/aos.css";
import { getProjects, ProjectDoc } from "../lib/firestoreCrud";

export default function Project() {
  const [projects, setProjects] = useState<ProjectDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(3);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    getProjects().then(setProjects).finally(()=>setLoading(false));
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pagination (hanya di layar kecil)
  const indexOfLast = currentPage * projectsPerPage;
  const indexOfFirst = indexOfLast - projectsPerPage;
  const currentItems = isSmallScreen
    ? projects.slice(indexOfFirst, indexOfLast)
    : projects;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (n: number) => setCurrentPage(n);
  const nextPage = () => currentPage < totalPages && setCurrentPage(c => c + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(c => c - 1);

  return (
    <div id="Project" className="mx-auto min-h-screen bg-[#131320] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      {/* shimmer keyframes */}
      <style jsx global>{`
        @keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }
      `}</style>

      <h1 className="pt-12 pb-4 text-gray-200 text-center text-lg sm:text-xl" data-aos="fade-left" data-aos-duration={2000}>
        Projects Section
      </h1>

      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="w-full max-w-7xl">
          <h1 className="text-white font-semibold text-3xl sm:text-4xl md:text-5xl text-center" data-aos="fade-left" data-aos-duration={2000}>
            Recent Projects
          </h1>

          <div className="mx-auto px-0 sm:px-8 mt-8" data-aos="fade-right" data-aos-duration="3000">
            {loading ? (
              // Skeleton grid 3 kartu
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(3)].map((_,i)=>(
                  <div key={i} className="rounded-2xl p-4 bg-[#191a28] border border-white/10">
                    <div className="h-40 rounded-xl bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                    <div className="mt-4 h-5 w-40 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                    <div className="mt-3 h-4 w-56 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                  </div>
                ))}
              </div>
            ) : (
              <HoverEffect items={currentItems} />
            )}
          </div>

          {isSmallScreen && !loading && (
            <div className="flex justify-center items-center pb-10 space-x-2">
              <button onClick={prevPage} disabled={currentPage === 1}
                className="px-4 py-2 bg-[#2B0780] text-white rounded-md disabled:opacity-40">Previous</button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button key={i+1} onClick={() => paginate(i+1)}
                  className={`px-4 py-2 rounded-md ${currentPage===i+1 ? "bg-[#6311E1] text-white" : "bg-[#2B0780] text-white"}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={nextPage} disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#2B0780] text-white rounded-md disabled:opacity-50">Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
