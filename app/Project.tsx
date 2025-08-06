import { HoverEffect } from "./components/ui/card-hover-effect";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Project() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  const qflora = "/assets/images/qflora.png";
  const developDev = "/assets/images/developDev.png";
  const tp = "/assets/images/tp.png";
  const dermoAlly = "/assets/images/dermoAlly.png";
  const alz = "/assets/images/alz.png";
  const forterz = "/assets/images/forterz.png";
  const wedding = "/assets/images/wedding.png";

  const projects = [
    {
      title: "QFlora",
      image: qflora,
      link: "https://github.com/fatiyaquzza/QFlora",
      tools: "React Native, Expo",
      type: "Mobile App",
    },
    {
      title: "TrashPorter",
      image: tp,
      link: "https://github.com/TrashPorter/TrashPorter",
      tools: "TailwindCSS, Laravel",
      type: "Website",
    },
    {
      title: "DermoAlly",
      image: dermoAlly,
      link: "https://github.com/Dermoally",
      tools: "Kotlin",
      type: "Mobile App",
    },
    {
      title: "Informatics Final Assignment Portfolio",
      image: developDev,
      link: "https://github.com/fatiyaquzza/DevelopDev_final_project",
      tools: "Laravel, TailwindCSS",
      type: "Website",
    },
    {
      title: "Alzheimer's Disease Classification Website",
      image: alz,
      link: "https://alzheimerclassification.streamlit.app/",
      tools: "Python, Streamlit, TensorFlow",
      type: "Website",
    },
    {
      title: "Forterzzz",
      image: forterz,
      link: "https://github.com/Forterzzz",
      tools: "ReactJS, TailwindCSS",
      type: "Website",
    },
    {
      title: "LKBH Sata Al-Faqih Website",
      image: developDev,
      link: "https://github.com/fatiyaquzza/Sistem_Informasi_dan_Manajemen_KKP",
      tools: "Laravel, TailwindCSS",
      type: "Website",
    },
    {
      title: "Wedding Invitation",
      image: wedding,
      link: "https://github.com/Forterzzz",
      tools: "Laravel, TailwindCSS",
      type: "Website",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(3);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });

    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = isSmallScreen
    ? projects.slice(indexOfFirstProject, indexOfLastProject)
    : projects;

  const totalPages = Math.ceil(projects.length / projectsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div
      id="Project"
      className="mx-auto min-h-screen bg-[#131320] px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
    >
      <h1
        className="pt-12 pb-4 text-gray-200 text-center text-lg sm:text-xl"
        data-aos="fade-left"
        data-aos-duration={2000}
      >
        Projects Section
      </h1>
      <div className="flex justify-center items-center w-full min-h-screen">
        <div className="w-full max-w-7xl">
          <h1
            className="text-white font-semibold text-3xl sm:text-4xl md:text-5xl text-center"
            data-aos="fade-left"
            data-aos-duration={2000}
          >
            Recent Projects
          </h1>

          <div
            className="mx-auto px-0 sm:px-8 mt-8"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <HoverEffect items={currentProjects} />
          </div>

          {isSmallScreen && (
            <div className="flex justify-center items-center pb-10  space-x-2">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-[#2B0780] text-white rounded-md disabled:opacity-40"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === i + 1
                      ? "bg-[#6311E1] text-white"
                      : "bg-[#2B0780] text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-[#2B0780] text-white rounded-md disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
