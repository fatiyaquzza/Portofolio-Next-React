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
      link: "#",
      developer: "React Native, Expo",
    },
    {
      title: "TrashPorter",
      image: tp,
      link: "#",
      developer: "TailwindCSS, Laravel",
    },
    {
      title: "DermoAlly",
      image: dermoAlly,
      link: "#",
      developer: "Kotlin",
    },
    {
      title: "Informatics Final Assignment Portfolio",
      image: developDev,
      link: "#",
      developer: "Laravel, TailwindCSS",
    },
    {
      title: "Alzheimer's Disease Classification Website",
      image: alz,
      link: "https://alzheimerclassification.streamlit.app/",
      developer: "Python, Streamlit, TensorFlow",
    },
    {
      title: "Forterzzz",
      image: dermoAlly,
      link: "#",
      developer: "ReactJS, TailwindCSS",
    },
    {
      title: "LKBH Sata Al-Faqih Website",
      image: developDev,
      link: "#",
      developer: "Laravel, TailwindCSS",
    },
    {
      title: "Wedding Invitation",
      image: dermoAlly,
      link: "#",
      developer: "Laravel, TailwindCSS",
    },
  ];
  return (
    <div id="Project" className="mx-auto min-h-screen bg-[#131320]">
      <h1
        className="pt-10 pb-8 text-white text-center"
        data-aos="fade-left"
        data-aos-duration={2000}
      >
        Projects Section
      </h1>
      <div className="flex justify-center items-center max-w-screen min-w-screen min-h-screen">
        <div className="min-w-9/12 ">
          <h1
            className=" text-white font-semibold text-5xl text-center"
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
