"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

const experiences = [
  {
    id: 1,
    title: "Bachelor of Informatics",
    company: "Universitas Syiah Kuala",
    year: "2021 - 2025",
    description:
      "Started my academic journey at Universitas Syiah Kuala, majoring in Informatics. This program has provided me with a strong foundation in technology, system development, and digital solutions that address real-world problems.",
  },
  {
    id: 2,
    title: "Administrative & Welfare Division Staff",
    company: "Informatics Student Association, Universitas Syiah Kuala ",
    year: "Feb 2023 - Jan 2025",
    description:
      "Served in two different divisions across two consecutive periods. In 2023, worked in the Administrative Division, where I managed official correspondence, coordinated merchandise, and handled the department's Instagram account. In 2024, moved to the Student Welfare Management Division as secretary, responsible for planning documentation, managing internal communication, and supporting logistical needs for departmental programs.",
  },
  {
    id: 3,
    title: "Lab Assistant - Numerical Computing",
    company: "Universitas Syiah Kuala",
    year: "Aug - Dec 2023",
    description:
      "Facilitated lab sessions for 80 students, managed assignments and evaluations, and provided support for students needing re-learning.",
  },
  {
    id: 4,
    title: "Mobile Development Student",
    company: "Bangkit Academy 2024 by Google, GoTo, Traveloka",
    year: "Feb - Jun 2024",
    description:
      "Completed the Android Learning Path through Kampus Merdeka. Learned via Dicoding modules, collaborated with a team for the final capstone project, and engaged in regular mentoring sessions.",
  },
  {
    id: 5,
    title: "Full Stack Developer Intern",
    company: "LKBH Sata Al Faqih",
    year: "Jul - Aug 2024",
    description:
      "Built an informational website for a legal aid organization using ReactJS and Express.js. Developed responsive pages for services, team, news, and contact info.",
  },
  {
    id: 6,
    title: "Student Exchange - Bioinformatics, Faculty of Computing",
    company: "Universiti Teknologi Malaysia",
    year: "Sep 2024 - Feb 2025",
    description:
      "Participating in International Credit Transfer Program at UTM's Faculty of Computing. Engaged in coursework and group projects with international students.",
  },
];

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

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section
      className="relative z-10 w-full py-32 px-6 md:px-16 lg:px-32 bg-[#0B0F15] "
      id="experience"
    >
      <div
        className="text-center mb-2 md:mb-20"
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <h2 className="text-4xl font-extrabold text-white tracking-tight">
          Chapters of <span className="text-[#6184DC]"> Growth & Creation</span>
        </h2>
        <p className="mt-4 text-gray-400 max-w-xl mx-auto text-sm">
        A clear path of progress through education, collaboration, and practical learning.
        </p>
      </div>

      <div
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8 mt-10"
      >
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

        <div className="relative space-y-24">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative flex items-start justify-between w-full"
            >
              {/* Left Column */}
              <div
                className="w-[45%] order-1"
                data-aos="fade-left"
                data-aos-duration="2000"
              >
                <div
                  className={`flex flex-col ${
                    index % 2 === 0
                      ? "items-end text-right"
                      : "items-start text-left"
                  }`}
                >
                  {index % 2 === 0 ? (
                    <div className="flex flex-col items-end text-right">
                      <h3 className="font-bold text-gray-100 text-[clamp(18px,2vw,24px)] leading-tight">
                        {exp.title}
                      </h3>
                      <div className="text-[clamp(14px,1.6vw,18px)] text-gray-100">
                        {exp.company}
                      </div>
                      <span
                        className="text-[clamp(12px,1.5vw,18px)] text-[#6184DC]"
                        style={{ letterSpacing: "0.4em" }}
                      >
                        {exp.year}
                      </span>
                    </div>
                  ) : (
                    <p className="text-gray-300 md:text-md text-sm leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column */}
              <div
                className="w-[45%] order-2"
                data-aos="fade-right"
                data-aos-duration="2000"
              >
                <div className="flex flex-col items-start text-left">
                  {index % 2 === 0 ? (
                    <p className="text-gray-300 md:text-md text-sm leading-relaxed text-justify">
                      {exp.description}
                    </p>
                  ) : (
                    <div className="flex flex-col items-start text-left">
                      <h3 className="font-bold text-gray-100 text-[clamp(18px,2vw,24px)] leading-tight">
                        {exp.title}
                      </h3>
                      <div className="text-[clamp(14px,1.6vw,18px)] text-gray-100">
                        {exp.company}
                      </div>
                      <span
                        className="text-[clamp(12px,1.5vw,18px)] text-[#6184DC]"
                        style={{ letterSpacing: "0.4em" }}
                      >
                        {exp.year}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
