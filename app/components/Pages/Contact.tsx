import { ScrollVelocity } from "../ScrollVelocity/ScrollVelocity";
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
    <div id="contact" className="mx-auto h-screen bg-[#131320]">
      <div className="flex justify-center items-end max-w-screen min-w-screen max-h-1/2 min-h-1/2">
        <h1 className="text-white font-semibold text-8xl text-center">
          Contact Me
        </h1>
      </div>

      <div className="flex justify-center items-center max-w-screen min-w-screen max-h-1/2 min-h-1/2 bg-[#2B3045]">
        <ScrollVelocity
          texts={[
            { text: "Email", href: "https://github.com" },
            { text: "Linkedin", href: "https://yourportfolio.com" },
          ]}
          velocity={80}
          className="text-[#131320]"
        />
      </div>
    </div>
  );
}
