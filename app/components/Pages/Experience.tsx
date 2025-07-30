"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const experiences = [
  {
    id: 1,
    title: "Bachelor of Informatics",
    company: "Universitas Syiah Kuala",
    year: "2021 - 2025",
    description:
      "Started my academic journey at Universitas Pamulang, majoring in Information Systems. This program has provided me with a strong foundation in technology, system development, and digital solutions that address real-world problems.",
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
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div id="experience">
      <p
        className=" pt-12 text-gray-200 text-center text-lg sm:text-xl"
        data-aos="fade-left"
        data-aos-duration={2000}
      >
        Projects Section
      </p>
      <h1
        className=" text-white font-semibold text-3xl sm:text-4xl md:text-5xl text-center pt-4"
        data-aos="fade-down"
        data-aos-duration={2000}
      >
        Experiences
      </h1>
      <div
        ref={containerRef}
        className="relative w-full max-w-6xl mx-auto py-8 sm:py-16 px-4 sm:px-6 lg:px-8 mt-10"
      >
        {/* Purple line - new gradient */}
        <motion.div
          className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#20064A] via-[#2B0780] to-[#6311E1] transform -translate-x-1/2"
          style={{ scaleY: scaleY, transformOrigin: "top" }}
        />

        {/* Animated purple dot */}
        <motion.div
          className="absolute left-1/2 w-4 h-4 rounded-full bg-[#6311E1] shadow-[0_0_15px_5px_rgba(99,17,225,0.5)] transform -translate-x-1/2"
          style={{ top: dotTop }}
        />

        <div className="relative space-y-16 sm:space-y-24">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className="relative flex flex-col sm:flex-row items-center sm:items-start justify-between w-full"
            >
              {/* Left side content */}
              <div className="w-full sm:w-[45%] order-1 sm:order-1" data-aos="fade-left">
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "items-center sm:items-end text-center sm:text-right" : "items-center sm:items-start text-center sm:text-left"}`}
                >
                  {index % 2 === 0 ? (
                    // First entry: grouped title, company, year, logo on left
                    <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                      <h3 className="font-bold text-gray-100 mb-0 text-lg sm:text-xl">
                        {exp.title}
                      </h3>

                      <div className="text-gray-100 mb-0 text-base sm:text-xl">
                        {exp.company}
                      </div>

                      <span
                        className="text-[#6184DC] mt-1 text-sm sm:text-lg"
                        style={{ letterSpacing: "0.2em" }}
                      >
                        {exp.year}
                      </span>
                    </div>
                  ) : (
                    // Second entry: description on left
                    <p className="text-gray-300 text-sm leading-relaxed text-justify px-4 sm:px-0">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Separator for small screens */}
              <div className="sm:hidden w-1 h-8 bg-gray-700 my-4" />

              {/* Right side content */}
              <div className="w-full sm:w-[45%] order-2 sm:order-2" data-aos="fade-right">
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "items-center sm:items-start text-center sm:text-left" : "items-center sm:items-end text-center sm:text-right"}`}
                >
                  {index % 2 === 0 ? (
                    // First entry: description on right
                    <p className="text-gray-300 text-sm leading-relaxed text-justify px-4 sm:px-0">
                      {exp.description}
                    </p>
                  ) : (
                    // Second entry: grouped title, company, year, logo on right
                    <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
                      <h3 className="font-bold text-gray-100 mb-0 text-lg sm:text-xl">
                        {exp.title}
                      </h3>

                      <div className="text-gray-100 mb-0 text-base sm:text-xl">
                        {exp.company}
                      </div>

                      <span
                        className="text-[#6184DC] mt-1 text-sm sm:text-lg"
                        style={{ letterSpacing: "0.2em" }}
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
    </div>
  );
};

export default Experience;
