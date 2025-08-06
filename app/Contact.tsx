import { ScrollVelocity } from "./components/ScrollVelocity/ScrollVelocity";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return (
    <div
      id="contact"
      className="mx-auto md:h-screen min-h-1 bg-[#131320] md:pb-0 pb-10"
    >
      <div className="flex justify-center items-end max-w-screen min-w-screen max-h-1/2 md:min-h-1/2 min-h-1">
        <h1
          className="text-white font-semibold md:text-8xl text-5xl text-center"
          data-aos="fade-down"
        >
          Contact Me
        </h1>
      </div>

      <div className="flex justify-center items-center max-w-screen min-w-screen max-h-1/2 md:min-h-1/2 min-h-40 bg-[#2B3045] md:pb-0">
        <ScrollVelocity
          texts={[{ text: "Scroll Down" }, { text: "Scroll Down" }]}
          velocity={80}
          className="text-[#131320]"
        />
      </div>
    </div>
  );
}
