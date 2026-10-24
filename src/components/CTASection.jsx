import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        tl.from(".cta-heading", { y: 30, opacity: 0, duration: 0.7 })
          .from(".cta-text", { opacity: 0, duration: 0.6 }, "-=0.4")
          .from(
            ".cta-btn",
            { scale: 0.9, opacity: 0, duration: 0.5 },
            "-=0.3"
          );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-5xl rounded-3xl bg-linear-to-r from-blue-600 to-indigo-700 px-6 py-14 text-center shadow-xl shadow-indigo-600/20 sm:px-12 sm:py-16 lg:py-20">
        <h2 className="cta-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Ready to Get Started?
        </h2>

        <p className="cta-text mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">
          Discover products that help you work smarter and achieve more.
        </p>

        <a
          href="#products"
          className="cta-btn mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-blue-600 shadow-lg shadow-indigo-900/20 transition-colors duration-200 hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700"
        >
          Explore Products
        </a>
      </div>
    </section>
  );
}