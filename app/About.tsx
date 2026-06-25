import {
  IconArrowsJoin,
  IconBulb,
  IconLayersLinked,
  IconMapPin,
  IconRefresh,
  IconSchool,
} from "@tabler/icons-react";

const facts = [
  {
    value: "3.88",
    label: "Academic foundation",
    note: "GPA out of 4.00 in Informatics",
  },
  {
    value: "8+",
    label: "Hands-on experience",
    note: "Web and mobile projects delivered",
  },
  {
    value: "2",
    label: "International exposure",
    note: "Studied in Indonesia and Malaysia",
  },
];

const workTraits = [
  {
    title: "End-to-end ownership",
    description: "From first idea to a working product",
    Icon: IconLayersLinked,
  },
  {
    title: "Practical problem solving",
    description: "Clear solutions for real user needs",
    Icon: IconBulb,
  },
  {
    title: "Independent and collaborative",
    description: "Comfortable owning work and building with a team",
    Icon: IconArrowsJoin,
  },
  {
    title: "Continuous learner",
    description: "Curious, adaptable, and always improving",
    Icon: IconRefresh,
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#131320] px-5 py-24 font-sans sm:px-8 md:px-16 md:py-32 lg:px-24 xl:px-32"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.018)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-40 top-16 h-[34rem] w-[34rem] rounded-full bg-[#7257FF]/20 blur-[135px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-56 top-[32%] h-[32rem] w-[32rem] rounded-full bg-[#2B0780]/25 blur-[150px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-[52%] top-20 h-64 w-64 rounded-full bg-[#D8D1FF]/[0.045] blur-[100px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-[1400px]">
        <div
          data-aos="fade-down"
          data-aos-duration="700"
          className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8D78FF]">
            About me
          </p>
          <div className="flex items-center gap-2 text-[11px] text-[#A09BAD] sm:text-xs">
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] backdrop-blur-md">
              <IconMapPin size={13} stroke={1.7} aria-hidden="true" />
            </span>
            Banda Aceh, Indonesia
          </div>
        </div>

        <div className="mt-12 grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div
            data-aos="fade-right"
            data-aos-duration="850"
            className="relative lg:col-span-7"
          >
            <div
              className="pointer-events-none absolute -left-8 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[#8D78FF]/10 blur-[75px]"
              aria-hidden="true"
            />
            <h2 className="relative max-w-4xl text-balance text-[clamp(2.8rem,5.8vw,5.8rem)] font-bold leading-[1.02] tracking-[-0.055em] text-white">
              I build with{" "}
              <span className="bg-gradient-to-r from-[#7257FF] via-[#9B89FF] to-[#D8D1FF] bg-clip-text text-transparent">
                curiosity
              </span>
              , clarity, and care.
            </h2>
            <div className="mt-8 flex items-center gap-3">
              <span className="h-px w-16 bg-gradient-to-r from-[#8D78FF] to-transparent" />
              <p className="text-xs font-medium tracking-[0.08em] text-[#8F8AA8]">
                From idea to dependable product
              </p>
            </div>
          </div>

          <div
            data-aos="fade-left"
            data-aos-duration="850"
            data-aos-delay="100"
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.045] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_24px_80px_rgba(19,8,55,0.18)] backdrop-blur-xl sm:p-8 lg:col-span-5"
          >
            <div
              className="pointer-events-none absolute -right-14 -top-20 h-48 w-48 rounded-full bg-[#7257FF]/20 blur-[70px]"
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-pretty text-lg font-semibold leading-8 text-[#F0EEF6] md:text-xl">
                I&apos;m Fatiya, an Informatics graduate who turns ideas into
                dependable web and mobile products.
              </p>
              <p className="mt-5 text-pretty text-sm leading-7 text-[#A9A4B7]">
                My experience spans independent full-stack projects,
                collaborative development, an exchange semester at Universiti
                Teknologi Malaysia, and Android development through Bangkit
                Academy.
              </p>
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-duration="750"
          className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl lg:mt-20"
        >
          <div className="flex flex-col border-b border-white/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8D78FF]">
                How I work
              </p>
              <p className="mt-2 text-sm text-[#8F8AA0]">
                The qualities I bring into every project.
              </p>
            </div>
            <span className="mt-4 h-px w-16 bg-gradient-to-r from-[#8D78FF] to-transparent sm:mt-0" />
          </div>

          <div className="grid sm:grid-cols-2 xl:grid-cols-4">
            {workTraits.map(({ title, description, Icon }, index) => (
              <div
                key={title}
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay={index * 80}
                className="relative border-b border-white/10 px-5 py-6 last:border-b-0 sm:px-7 sm:[&:nth-child(3)]:border-b-0 xl:border-b-0 xl:border-r xl:last:border-r-0"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-[#7257FF]/10 text-[#A999FF]">
                    <Icon size={18} stroke={1.6} aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold leading-5 text-[#F0EEF6]">
                      {title}
                    </p>
                    <p className="mt-2 text-xs leading-5 text-[#858091]">
                      {description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <div
            data-aos="fade-up"
            data-aos-duration="700"
            className="mb-6 flex items-center gap-4"
          >
            <IconSchool
              size={18}
              stroke={1.6}
              className="text-[#8D78FF]"
              aria-hidden="true"
            />
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#A9A4B7]">
              At a glance
            </p>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <dl className="grid border-y border-white/10 sm:grid-cols-3">
            {facts.map((fact, index) => (
            <div
              key={fact.label}
              data-aos="fade-up"
              data-aos-duration="750"
              data-aos-delay={index * 100}
              className="relative border-b border-white/10 py-7 last:border-b-0 sm:border-b-0 sm:border-r sm:px-7 sm:last:border-r-0 sm:first:pl-0 lg:py-9"
            >
              <dt className="text-sm font-semibold text-[#D8D5E1]">
                {fact.label}
              </dt>
              <dd className="mt-5">
                <span className="block text-4xl font-semibold tracking-[-0.045em] text-white md:text-5xl">
                  {fact.value}
                </span>
                <span className="mt-2 block max-w-[15rem] text-xs leading-5 text-[#858091]">
                  {fact.note}
                </span>
              </dd>
            </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
