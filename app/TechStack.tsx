"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiCloudinary,
  SiCss3,
  SiDocker,
  SiExpress,
  SiFirebase,
  SiFigma,
  SiFramer,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNetlify,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiRedux,
  SiSupabase,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
  SiVite,
} from "react-icons/si";
import type { IconType } from "react-icons";

type StackItem = {
  name: string;
  Icon: IconType;
  color: string;
  featured?: boolean;
};

type StackGroup = {
  title: string;
  note: string;
  placement: string;
  items: StackItem[];
};

const stackHighlights = [
  { value: "28", label: "Tools" },
  { value: "3", label: "Focus lanes" },
  { value: "GSAP", label: "Motion layer" },
];

const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    note: "UI Layer",
    placement: "lg:right-0 lg:top-0 lg:w-[42rem]",
    items: [
      { name: "HTML5", Icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", Icon: SiCss3, color: "#1572B6" },
      {
        name: "JavaScript",
        Icon: SiJavascript,
        color: "#F7DF1E",
        featured: true,
      },
      { name: "React", Icon: SiReact, color: "#61DAFB", featured: true },
      { name: "Next.js", Icon: SiNextdotjs, color: "#F8FAFC", featured: true },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        featured: true,
      },
      { name: "Tailwind CSS", Icon: SiTailwindcss, color: "#38BDF8" },
      { name: "Redux", Icon: SiRedux, color: "#764ABC" },
      { name: "Vite", Icon: SiVite, color: "#B469FF" },
    ],
  },
  {
    title: "Backend & Data",
    note: "Core Logic",
    placement: "lg:bottom-4 lg:left-0 lg:w-[40rem]",
    items: [
      { name: "Node.js", Icon: SiNodedotjs, color: "#5FA04E", featured: true },
      { name: "Express.js", Icon: SiExpress, color: "#F8FAFC" },
      { name: "Firebase", Icon: SiFirebase, color: "#FFCA28", featured: true },
      { name: "Supabase", Icon: SiSupabase, color: "#3ECF8E", featured: true },
      { name: "Prisma", Icon: SiPrisma, color: "#F8FAFC" },
      { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
      { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
      { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
      { name: "Cloudinary", Icon: SiCloudinary, color: "#3448C5" },
      { name: "Postman", Icon: SiPostman, color: "#FF6C37" },
    ],
  },
  {
    title: "Motion & Deploy",
    note: "Ship Flow",
    placement: "lg:bottom-0 lg:right-4 lg:w-[36rem]",
    items: [
      {
        name: "Framer Motion",
        Icon: SiFramer,
        color: "#8AA2FF",
        featured: true,
      },
      { name: "GSAP", Icon: SiGreensock, color: "#88CE02", featured: true },
      { name: "Three.js", Icon: SiThreedotjs, color: "#F8FAFC", featured: true },
      { name: "Git", Icon: SiGit, color: "#F05032" },
      { name: "GitHub", Icon: SiGithub, color: "#F8FAFC" },
      { name: "Vercel", Icon: SiVercel, color: "#F8FAFC" },
      { name: "Netlify", Icon: SiNetlify, color: "#00C7B7" },
      { name: "Docker", Icon: SiDocker, color: "#2496ED" },
      { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const clusterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chipRefs = useRef<(HTMLDivElement | null)[]>([]);

  clusterRefs.current = [];
  chipRefs.current = [];

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const overview = overviewRef.current;
    const clusters = clusterRefs.current.filter(
      (cluster): cluster is HTMLDivElement => cluster !== null
    );
    const chips = chipRefs.current.filter(
      (chip): chip is HTMLDivElement => chip !== null
    );

    if (!section || !intro || !overview || clusters.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([intro, overview, ...clusters, ...chips], {
          clearProps: "all",
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      gsap.set(intro, { opacity: 0, y: 24 });
      gsap.set(overview, { opacity: 0, x: -24, y: 24 });
      gsap.set(clusters, { opacity: 0, y: 46, scale: 0.98 });
      gsap.set(chips, { opacity: 0, y: 16 });

      const reveal = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      reveal
        .to(intro, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        })
        .to(
          overview,
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .to(
          clusters,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.16,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          chips,
          {
            opacity: 1,
            y: 0,
            duration: 0.48,
            stagger: 0.018,
            ease: "power2.out",
          },
          "-=0.45"
        );

      clusters.forEach((cluster, index) => {
        gsap.to(cluster, {
          y: index % 2 === 0 ? -8 : 8,
          duration: 8 + index * 1.4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });

      chips.forEach((chip, index) => {
        gsap.to(chip, {
          y: index % 2 === 0 ? -4 : 4,
          x: index % 3 === 0 ? 3 : -2,
          duration: 4.5 + (index % 6) * 0.32,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0E0E18] px-5 py-24 font-sans sm:px-8 md:px-16 md:py-28 lg:px-24 xl:px-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_48%_44%,rgba(141,120,255,0.16),transparent_46%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_26%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#131320] to-transparent"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div
          ref={introRef}
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8D78FF]">
              Skills
            </p>
            <h2 className="mt-4 text-[clamp(2.5rem,5vw,5rem)] font-semibold leading-[1.02] text-white">
              Tools I use
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[#9B96AA] md:text-right md:text-[15px]">
            A focused stack for building interactive, reliable, and polished
            web experiences.
          </p>
        </div>

        <div className="relative mt-16 min-h-[50rem] lg:mt-20 lg:min-h-[34rem]">
          <div
            ref={overviewRef}
            className="relative z-10 max-w-[28rem] rounded-[2rem] bg-white/[0.04] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_24px_70px_rgba(7,5,20,0.22)] backdrop-blur-xl lg:absolute lg:left-0 lg:top-1"
          >
            <p className="text-sm font-medium text-[#D8D1FF]">
              Stack overview
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {stackHighlights.map((item) => (
                <div
                  key={item.label}
                  className="min-w-24 rounded-[1.35rem] bg-[#141323]/80 px-4 py-3"
                >
                  <p className="text-2xl font-semibold leading-none text-white">
                    {item.value}
                  </p>
                  <p className="mt-2 text-xs font-medium text-[#928BA7]">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-9 lg:mt-0">
            {stackGroups.map((group, groupIndex) => (
              <div
                key={group.title}
                ref={(node) => {
                  clusterRefs.current[groupIndex] = node;
                }}
                className={`relative z-20 lg:absolute ${group.placement}`}
              >
                <div className="mb-4 flex items-baseline gap-3">
                  <h3 className="text-[1.45rem] font-semibold leading-none text-white">
                    {group.title}
                  </h3>
                  <p className="text-sm font-medium text-[#8D78FF]">
                    {group.note}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {group.items.map(
                    ({ name, Icon, color, featured }, itemIndex) => (
                      <div
                        key={`${group.title}-${name}`}
                        ref={(node) => {
                          chipRefs.current[groupIndex * 24 + itemIndex] = node;
                        }}
                        className={`group inline-flex items-center gap-2.5 rounded-full px-3.5 py-2.5 shadow-[0_18px_46px_rgba(7,5,20,0.24)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-[#7257FF]/20 ${
                          featured ? "bg-[#19142B]/88" : "bg-white/[0.05]"
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center rounded-full ${
                            featured
                              ? "h-10 w-10 bg-[#8D78FF]/12"
                              : "h-9 w-9 bg-white/[0.055]"
                          }`}
                        >
                          <Icon
                            className={
                              featured ? "h-[18px] w-[18px]" : "h-4 w-4"
                            }
                            style={{ color }}
                            aria-hidden
                          />
                        </span>
                        <span className="text-sm font-medium text-white md:text-[15px]">
                          {name}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
