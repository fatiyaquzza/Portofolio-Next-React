import {
  SiCloudinary,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiGit,
  SiGreensock,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import type { IconType } from "react-icons";

type StackItem = {
  name: string;
  note: string;
  Icon: IconType;
  color: string;
};

const stackGroups: { title: string; items: StackItem[] }[] = [
  {
    title: "Frontend",
    items: [
      { name: "React", note: "Component UI", Icon: SiReact, color: "#61DAFB" },
      { name: "Next.js", note: "App Router", Icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "TypeScript", note: "Typed code", Icon: SiTypescript, color: "#3178C6" },
      { name: "Tailwind CSS", note: "Responsive styling", Icon: SiTailwindcss, color: "#38BDF8" },
    ],
  },
  {
    title: "Backend & Data",
    items: [
      { name: "Node.js", note: "Server runtime", Icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express.js", note: "API services", Icon: SiExpress, color: "#FFFFFF" },
      { name: "Firebase", note: "Auth and Firestore", Icon: SiFirebase, color: "#FFCA28" },
      { name: "Cloudinary", note: "Image upload", Icon: SiCloudinary, color: "#3448C5" },
    ],
  },
  {
    title: "Motion & Delivery",
    items: [
      { name: "Framer Motion", note: "UI motion", Icon: SiFramer, color: "#BB7BFF" },
      { name: "GSAP", note: "Scroll animation", Icon: SiGreensock, color: "#88CE02" },
      { name: "Three.js", note: "3D interfaces", Icon: SiThreedotjs, color: "#FFFFFF" },
      { name: "Git", note: "Version control", Icon: SiGit, color: "#F05032" },
      { name: "Vercel", note: "Deployment", Icon: SiVercel, color: "#FFFFFF" },
    ],
  },
];

export default function TechStack() {
  return (
    <section id="skills" className="bg-[#0B0F15] px-6 py-24 md:px-16 lg:px-32">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#6184DC]">Tech Stack</p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white md:text-5xl">
            Tools I use to ship fullstack products.
          </h2>
          <p className="mt-5 max-w-2xl text-pretty text-sm leading-7 text-gray-300 md:text-base">
            A practical stack for responsive interfaces, authenticated dashboards,
            Firestore data flows, API services, media upload, and motion-rich portfolio
            experiences.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {stackGroups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-white/10 bg-[#131320] p-5">
              <h3 className="text-lg font-semibold text-white">{group.title}</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {group.items.map(({ name, note, Icon, color }) => (
                  <div
                    key={name}
                    className="flex min-w-[160px] flex-1 items-center gap-3 rounded-xl bg-white/[0.04] px-4 py-3 ring-1 ring-white/10"
                  >
                    <Icon className="h-6 w-6 shrink-0" style={{ color }} aria-hidden />
                    <div>
                      <p className="text-sm font-semibold text-white">{name}</p>
                      <p className="text-xs text-gray-400">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
