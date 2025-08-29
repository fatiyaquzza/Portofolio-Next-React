"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  year: string;
  description: string;
  order?: number; 
};

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });

  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.01 });
  const dotTop = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  useEffect(() => {
    // TANPA orderBy
    const q = query(collection(db, "experiences"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ExperienceItem, "id">) }));
        setExperiences(rows);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setLoading(false);
      }
    );
    return () => unsub();
  }, []);

  return (
    <section className="relative z-10 w-full py-32 px-6 md:px-16 lg:px-32 bg-[#0B0F15]" id="experience">
      {/* shimmer keyframes (biar komponen ini self-contained) */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

      <div className="text-center mb-2 md:mb-20" data-aos="fade-down" data-aos-duration="2000">
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Chapters of <span className="text-[#6184DC]"> Growth & Creation</span>
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
          A clear path of progress through education, collaboration, and practical learning.
        </p>
      </div>

      <div ref={containerRef} className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-10">
        {/* Vertical line */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#20064A] via-[#2B0780] to-[#6311E1] transform -translate-x-1/2"
          style={{ scaleY: scaleY, transformOrigin: "top" }}
        />
        {/* Animated dot */}
        <motion.div
          className="absolute left-1/2 w-4 h-4 rounded-full bg-[#6311E1] shadow-[0_0_15px_5px_rgba(99,17,225,0.5)] transform -translate-x-1/2"
          style={{ top: dotTop }}
        />

        {/* ====== SKELETON ====== */}
        {loading ? (
          <div className="relative space-y-24">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="relative flex items-start justify-between w-full">
                {/* Left skeleton */}
                <div className="w-[45%] order-1">
                  <div className={`flex flex-col ${index % 2 === 0 ? "items-end text-right" : "items-start text-left"}`}>
                    {index % 2 === 0 ? (
                      <div className="flex flex-col items-end text-right">
                        <div className="h-5 w-56 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-4 w-44 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-3 w-36 rounded bg-gradient-to-r from-[#1c2a45] via-[#253355] to-[#1c2a45] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      </div>
                    ) : (
                      <div>
                        <div className="h-4 w-full max-w-[28rem] rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-4 w-11/12 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-4 w-10/12 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Right skeleton */}
                <div className="w-[45%] order-2">
                  <div className="flex flex-col items-start text-left">
                    {index % 2 === 0 ? (
                      <div className="w-full">
                        <div className="h-4 w-full max-w-[28rem] rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-4 w-11/12 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-4 w-10/12 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      </div>
                    ) : (
                      <div className="flex flex-col items-start text-left">
                        <div className="h-5 w-56 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-4 w-44 rounded bg-gradient-to-r from-[#141c2b] via-[#1b2538] to-[#141c2b] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                        <div className="mt-3 h-3 w-36 rounded bg-gradient-to-r from-[#1c2a45] via-[#253355] to-[#1c2a45] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : experiences.length === 0 ? (
          <p className="text-center text-gray-400">Belum ada data experience.</p>
        ) : (
          <div className="relative space-y-24">
            {experiences.map((exp, index) => (
              <div key={exp.id} className="relative flex items-start justify-between w-full">
                {/* Left */}
                <div className="w-[45%] order-1" data-aos="fade-left" data-aos-duration="2000">
                  <div className={`flex flex-col ${index % 2 === 0 ? "items-end text-right" : "items-start text-left"}`}>
                    {index % 2 === 0 ? (
                      <div className="flex flex-col items-end text-right">
                        <h3 className="font-bold text-gray-100 text-[clamp(18px,2vw,24px)] leading-tight">{exp.title}</h3>
                        <div className="text-[clamp(14px,1.6vw,18px)] text-gray-100">{exp.company}</div>
                        <span className="text-[clamp(12px,1.5vw,18px)] text-[#6184DC]" style={{ letterSpacing: "0.4em" }}>
                          {exp.year}
                        </span>
                      </div>
                    ) : (
                      <p className="text-gray-300 md:text-md text-sm leading-relaxed text-justify">{exp.description}</p>
                    )}
                  </div>
                </div>

                {/* Right */}
                <div className="w-[45%] order-2" data-aos="fade-right" data-aos-duration="2000">
                  <div className="flex flex-col items-start text-left">
                    {index % 2 === 0 ? (
                      <p className="text-gray-300 md:text-md text-sm leading-relaxed text-justify">{exp.description}</p>
                    ) : (
                      <div className="flex flex-col items-start text-left">
                        <h3 className="font-bold text-gray-100 text-[clamp(18px,2vw,24px)] leading-tight">{exp.title}</h3>
                        <div className="text-[clamp(14px,1.6vw,18px)] text-gray-100">{exp.company}</div>
                        <span className="text-[clamp(12px,1.5vw,18px)] text-[#6184DC]" style={{ letterSpacing: "0.4em" }}>
                          {exp.year}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;
