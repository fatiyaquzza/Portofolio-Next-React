import { HoverEffect } from "../ui/card-hover-effect";
import { useEffect } from "react";
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
      image: dermoAlly,
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
      image: dermoAlly,
      link: "https://github.com/Forterzzz",
      tools: "Laravel, TailwindCSS",
      type: "Website",
    },
  ];
  return (
    <div id="Project" className="mx-auto min-h-screen bg-[#131320]">
      <h1
        className="pt-12 pb-4 text-gray-200 text-center"
        data-aos="fade-left"
        data-aos-duration={2000}
      >
        Projects Section
      </h1>
      <div className="flex justify-center items-center max-w-screen min-w-screen min-h-screen">
        <div className="min-w-9/12 ">
          <h1
            className=" text-white font-semibold text-6xl text-center"
            data-aos="fade-left"
            data-aos-duration={2000}
          >
            Recent Projects
          </h1>

          <div
            className="mx-auto px-8"
            data-aos="fade-right"
            data-aos-duration="3000"
          >
            <HoverEffect items={projects} />
          </div>
        </div>
      </div>
    </div>
  );
}
