"use client";

import { ScrollVelocity } from "./components/ScrollVelocity/ScrollVelocity";

export default function Contact() {
  return (
    <section aria-labelledby="contact-heading" className="overflow-hidden bg-surface-section pt-24">
      <h2 id="contact-heading" className="px-5 text-center text-5xl font-semibold text-foreground md:text-8xl" data-aos="fade-down">
        Contact Me
      </h2>
      <div aria-hidden="true" className="mt-16 flex min-h-40 items-center justify-center bg-surface-marquee">
        <ScrollVelocity texts={[{ text: "Scroll Down" }, { text: "Scroll Down" }]} velocity={80} className="text-[#131320]" />
      </div>
    </section>
  );
}
