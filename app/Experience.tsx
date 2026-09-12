"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { collection, onSnapshot, query } from "firebase/firestore";

import { db } from "@/lib/firebase";
import { Experience as ExperienceItem, parseExperience, sortExperiences } from "@/lib/content";

const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.01,
  });
  const dotTop = useTransform(scaleY, [0, 1], ["0%", "100%"]);

  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "experiences"));
    const unsub = onSnapshot(
      q,
      (snap) => {
        const rows = snap.docs
          .map((item) => parseExperience(item.id, item.data()))
          .filter((item): item is ExperienceItem => item !== null);
        setExperiences(sortExperiences(rows));
        setLoadError(false);
        setLoading(false);
      },
      (err) => {
        console.error("Firestore error:", err);
        setLoadError(true);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <section
      id="experience"
      className="relative z-10 w-full overflow-hidden bg-surface-page px-5 py-24 font-sans sm:px-8 md:px-16 md:py-28 lg:px-24 xl:px-32"
    >
      <style jsx global>{`
        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.014)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.014)_1px,transparent_1px)] bg-[size:88px_88px] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-24 h-[34rem] w-[34rem] rounded-full bg-[#4A2BC8]/18 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-14rem] top-[36%] h-[32rem] w-[32rem] rounded-full bg-surface-purple-inset/30 blur-[160px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div
          className="border-b border-contrast/10 pb-10 text-center"
          data-aos="fade-down"
          data-aos-duration="900"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-theme-accent">
            Experience
          </p>
          <h2 className="mx-auto mt-5 max-w-4xl text-balance text-[clamp(2.35rem,5.2vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.06em] text-foreground">
            Chapters of Growth &amp; Creation
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-sm leading-7 text-ink-subtle">
            A focused look at the work, study, and environments that built my
            foundation across product thinking, collaboration, and delivery.
          </p>
        </div>

        <div
          ref={containerRef}
          className="relative mx-auto mt-14 w-full max-w-6xl py-4 sm:mt-16 md:py-8"
        >
          <motion.div
            className="absolute bottom-0 left-4 top-0 w-px bg-contrast/12 sm:left-1/2 sm:-translate-x-1/2"
            aria-hidden="true"
          >
            <motion.span
              className="absolute inset-x-0 top-0 origin-top bg-gradient-to-b from-[#D8D1FF] via-[#8D78FF] to-[#2B0780]"
              style={{ scaleY }}
            />
          </motion.div>
          <motion.div
            className="theme-shadow absolute left-4 z-10 h-3.5 w-3.5 -translate-x-1/2 rounded-full border border-[#D8D1FF]/40 bg-[#8D78FF] shadow-[0_0_18px_rgba(141,120,255,0.85)] sm:left-1/2"
            style={{ top: dotTop }}
            aria-hidden="true"
          />

          {loading ? (
            <div className="relative space-y-8 sm:space-y-12">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8"
                >
                  <div className="relative flex justify-center sm:hidden">
                    <span className="theme-shadow mt-6 h-3.5 w-3.5 rounded-full border border-contrast/15 bg-[#8D78FF]/70 shadow-[0_0_14px_rgba(141,120,255,0.45)]" />
                  </div>
                  <div
                    className={`pt-2 sm:col-span-2 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8 sm:pt-4 ${
                      index % 2 === 0
                        ? ""
                        : "sm:[&>*:first-child]:order-2 sm:[&>*:last-child]:order-1"
                    }`}
                  >
                    <div className="sm:justify-self-end sm:pr-4">
                      <div className="sm:w-[min(100%,29rem)]">
                        <div className="h-3 w-28 rounded-full bg-gradient-to-r from-surface-raised-strong via-surface-purple-strong to-surface-raised-strong bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] sm:ml-auto" />
                        <div className="mt-5 h-7 w-4/5 rounded-xl bg-gradient-to-r from-surface-panel-soft via-surface-purple-raised to-surface-panel-soft bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] sm:ml-auto" />
                        <div className="mt-3 h-4 w-3/5 rounded-lg bg-gradient-to-r from-surface-raised-alt via-surface-purple-hover to-surface-raised-alt bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] sm:ml-auto" />
                      </div>
                    </div>
                    <div className="mt-5 space-y-3 sm:mt-10 sm:justify-self-start sm:pl-4">
                      <div className="sm:w-[min(100%,29rem)]">
                      <div className="h-4 w-full rounded-lg bg-gradient-to-r from-surface-panel-alt via-surface-purple-panel to-surface-panel-alt bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      <div className="h-4 w-11/12 rounded-lg bg-gradient-to-r from-surface-panel-alt via-surface-purple-panel to-surface-panel-alt bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      <div className="h-4 w-9/12 rounded-lg bg-gradient-to-r from-surface-panel-alt via-surface-purple-panel to-surface-panel-alt bg-[length:200%_100%] animate-[shimmer_1.5s_infinite]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : loadError ? (
            <div role="alert" className="border-y border-red-400/20 bg-red-400/[0.04] px-6 py-12 text-center">
              <p className="text-sm text-red-800 dark:text-red-100">Experience data could not be loaded. Please refresh the page.</p>
            </div>
          ) : experiences.length === 0 ? (
            <div className="border-y border-contrast/10 px-6 py-12 text-center">
              <p className="text-sm text-ink-support">Belum ada data experience.</p>
            </div>
          ) : (
            <div className="relative space-y-8 sm:space-y-12">
              {experiences.map((exp, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={exp.id}
                    className="grid grid-cols-[auto_1fr] gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8"
                  >
                    <div className="relative flex justify-center sm:hidden">
                      <span className="theme-shadow mt-6 h-3.5 w-3.5 rounded-full border border-contrast/15 bg-[#8D78FF]/80 shadow-[0_0_14px_rgba(141,120,255,0.45)]" />
                    </div>
                    <article
                      data-aos={isEven ? "fade-right" : "fade-left"}
                      data-aos-duration="900"
                      className={`pt-2 sm:col-span-2 sm:grid sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:gap-8 sm:pt-4 ${
                        isEven
                          ? ""
                          : "sm:[&>*:first-child]:order-2 sm:[&>*:last-child]:order-1"
                      }`}
                    >
                      <div
                        className={
                          isEven
                            ? "sm:justify-self-end sm:pr-4"
                            : "sm:justify-self-start sm:pl-4"
                        }
                      >
                        <div
                          className={`${
                            isEven
                              ? "sm:w-[min(100%,29rem)] sm:text-right"
                              : "sm:w-[min(100%,29rem)] sm:text-left"
                          }`}
                        >
                          <div
                            className={`flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-theme-accent ${
                              isEven ? "sm:justify-end" : ""
                            }`}
                          >
                            <span className="theme-shadow h-1.5 w-1.5 rounded-full bg-[#8D78FF] shadow-[0_0_10px_rgba(141,120,255,0.7)]" />
                            {exp.year}
                          </div>
                          <div className="mt-5">
                            <h3
                              className={`text-balance text-[clamp(1.35rem,1.55vw,1.9rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-ink-heading ${
                                isEven ? "sm:ml-auto sm:max-w-[18ch]" : "max-w-[18ch]"
                              }`}
                            >
                              {exp.title}
                            </h3>
                            <p className="mt-2 text-sm font-medium text-ink-soft">
                              {exp.company}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`mt-5 sm:mt-10 ${
                          isEven
                            ? "sm:justify-self-start sm:pl-4"
                            : "sm:justify-self-end sm:pr-4"
                        }`}
                      >
                        <p
                          className={`text-pretty text-sm leading-7 text-ink-subtle sm:w-[min(100%,29rem)] ${
                            isEven
                              ? "sm:text-left"
                              : "sm:ml-auto sm:text-right"
                          }`}
                        >
                          {exp.description}
                        </p>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;
