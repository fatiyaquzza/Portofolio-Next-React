"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiCss3,
  SiExpress,
  SiFirebase,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPrisma,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import type { IconType } from "react-icons";

type StackItem = {
  name: string;
  Icon: IconType;
  color: string;
  tone: string;
};

type StackGroup = {
  title: string;
  path: string;
  command: string;
  items: StackItem[];
};

const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    path: "~/skills/frontend",
    command: "ls -la ui-layer",
    items: [
      {
        name: "HTML",
        Icon: SiHtml5,
        color: "#E34F26",
        tone: "text-[#FF8A5B]",
      },
      {
        name: "CSS",
        Icon: SiCss3,
        color: "#1572B6",
        tone: "text-[#78A8FF]",
      },
      {
        name: "JavaScript",
        Icon: SiJavascript,
        color: "#F7DF1E",
        tone: "text-[#FFE66D]",
      },
      {
        name: "React",
        Icon: SiReact,
        color: "#61DAFB",
        tone: "text-[#74E0FF]",
      },
      {
        name: "Next.js",
        Icon: SiNextdotjs,
        color: "#F8FAFC",
        tone: "text-[#F8FAFC]",
      },
      {
        name: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        tone: "text-[#77B7FF]",
      },
      {
        name: "Tailwind CSS",
        Icon: SiTailwindcss,
        color: "#38BDF8",
        tone: "text-[#64D8FF]",
      },
      {
        name: "React Bits",
        Icon: SiReact,
        color: "#8D78FF",
        tone: "text-[#B9AEFF]",
      },
    ],
  },
  {
    title: "Backend & Data",
    path: "~/skills/backend-data",
    command: "tree api-and-storage",
    items: [
      {
        name: "Node.js",
        Icon: SiNodedotjs,
        color: "#5FA04E",
        tone: "text-[#8FE17F]",
      },
      {
        name: "Express.js",
        Icon: SiExpress,
        color: "#F8FAFC",
        tone: "text-[#E8E2FF]",
      },
      {
        name: "Firebase",
        Icon: SiFirebase,
        color: "#FFCA28",
        tone: "text-[#FFD56A]",
      },
      {
        name: "Supabase",
        Icon: SiSupabase,
        color: "#3ECF8E",
        tone: "text-[#70EABD]",
      },
      {
        name: "Prisma",
        Icon: SiPrisma,
        color: "#F8FAFC",
        tone: "text-[#CFC8FF]",
      },
      {
        name: "MongoDB",
        Icon: SiMongodb,
        color: "#47A248",
        tone: "text-[#72D879]",
      },
      {
        name: "MySQL",
        Icon: SiMysql,
        color: "#4479A1",
        tone: "text-[#80B9E6]",
      },
      {
        name: "Postman",
        Icon: SiPostman,
        color: "#FF6C37",
        tone: "text-[#FF9B76]",
      },
    ],
  },
];

gsap.registerPlugin(ScrollTrigger);

export default function TechStack() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const introRef = useRef<HTMLDivElement | null>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelHeaderRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cursorRefs = useRef<(HTMLSpanElement | null)[]>([]);

  blockRefs.current = [];
  panelHeaderRefs.current = [];
  lineRefs.current = [];
  cursorRefs.current = [];

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    const blocks = blockRefs.current.filter(
      (block): block is HTMLDivElement => block !== null
    );
    const panelHeaders = panelHeaderRefs.current.filter(
      (panelHeader): panelHeader is HTMLDivElement => panelHeader !== null
    );
    const lines = lineRefs.current.filter(
      (line): line is HTMLButtonElement => line !== null
    );
    const cursors = cursorRefs.current.filter(
      (cursor): cursor is HTMLSpanElement => cursor !== null
    );

    if (!section || !intro || blocks.length === 0) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (prefersReducedMotion) {
        gsap.set([intro, ...panelHeaders, ...lines], {
          clearProps: "all",
          autoAlpha: 1,
          y: 0,
        });
        gsap.set(cursors, { display: "none" });
        return;
      }

      gsap.set(intro, { opacity: 0, y: 24 });
      gsap.set(panelHeaders, { opacity: 0, y: 8 });
      gsap.set(lines, { autoAlpha: 0, y: 12 });
      gsap.set(cursors, { autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      }).to(intro, {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
        });

      blocks.forEach((block, groupIndex) => {
        const panelHeader = panelHeaderRefs.current[groupIndex];
        const cursor = cursorRefs.current[groupIndex];
        const blockLines = stackGroups[groupIndex].items
          .map((_, itemIndex) => lineRefs.current[groupIndex * 16 + itemIndex])
          .filter((line): line is HTMLButtonElement => line !== null);

        if (!panelHeader || blockLines.length === 0) {
          return;
        }

        const reveal = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: "top 78%",
            once: true,
          },
        });

        reveal
          .to(panelHeader, {
            opacity: 1,
            y: 0,
            duration: 0.28,
            ease: "power2.out",
          })
          .to(blockLines, {
            autoAlpha: 1,
            y: 0,
            duration: 0.18,
            stagger: 0.075,
            ease: "none",
            onComplete: () => {
              gsap.set(blockLines, { clearProps: "opacity,visibility,transform" });
            },
          });

        if (cursor) {
          reveal.set(cursor, { autoAlpha: 1 });
        }
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

        <div className="mt-12 space-y-10 lg:mt-16">
          {stackGroups.map((group, groupIndex) => (
            <div
              key={group.title}
              ref={(node) => {
                blockRefs.current[groupIndex] = node;
              }}
              className="relative z-20"
            >
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h3 className="text-[1.65rem] font-semibold leading-none text-white sm:text-[2rem]">
                  {group.title}
                </h3>
                <p className="font-mono text-xs text-[#8D78FF] sm:text-sm">
                  {group.command}
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#8D78FF]/18 bg-[#090912]/70 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_24px_80px_rgba(7,5,20,0.28)] backdrop-blur-xl">
                <div
                  ref={(node) => {
                    panelHeaderRefs.current[groupIndex] = node;
                  }}
                  className="flex items-center justify-between gap-4 border-b border-white/[0.07] bg-[#141323]/70 px-4 py-3 sm:px-5"
                >
                  <p className="font-mono text-xs text-[#C8BEFF] sm:text-sm">
                    {group.path}
                  </p>
                  <span className="font-mono text-[11px] text-[#6F6883]">
                    {group.items.length} entries
                  </span>
                </div>

                <div className="flex flex-wrap content-start gap-x-4 gap-y-2 px-4 py-5 font-mono sm:gap-x-6 sm:px-5 sm:py-6">
                  {group.items.map(({ name, Icon, color, tone }, itemIndex) => (
                    <button
                      type="button"
                      key={`${group.title}-${name}`}
                      ref={(node) => {
                        lineRefs.current[groupIndex * 16 + itemIndex] = node;
                      }}
                      className="group inline-flex min-h-9 items-center gap-2 rounded-md px-2 py-1.5 text-left transition duration-200 hover:bg-[#8D78FF]/10 hover:shadow-[0_0_24px_rgba(141,120,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8D78FF]"
                    >
                      <span className="text-xs text-[#6F6883] transition group-hover:text-[#A698FF]">
                        &gt;
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <Icon
                          className="h-4 w-4 shrink-0"
                          style={{ color }}
                          aria-hidden
                        />
                        <span className={`text-sm leading-none ${tone}`}>
                          {name}
                        </span>
                      </span>
                    </button>
                  ))}
                  <span
                    ref={(node) => {
                      cursorRefs.current[groupIndex] = node;
                    }}
                    className="terminal-cursor-blink ml-1 mt-2 inline-block h-5 w-px bg-[#8D78FF] motion-reduce:hidden"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
