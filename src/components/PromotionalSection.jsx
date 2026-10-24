import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PromotionalSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ১. Entrance: heading → text → button (একটি timeline, একটি trigger)
        const tl = gsap.timeline({
          defaults: { ease: "power3.out" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        });

        tl.from(".promo-heading", { y: 40, opacity: 0, duration: 0.8 })
          .from(".promo-text", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(
            ".promo-btn",
            { y: 20, scale: 0.9, opacity: 0, duration: 0.5 },
            "-=0.3"
          );

        // ২. Parallax: scroll-এর সাথে shape গুলো সামান্য নড়ে (scrub)
        gsap.utils.toArray(".promo-shape").forEach((shape) => {
          const speed = Number(shape.dataset.speed);

          gsap.to(shape, {
            y: speed * 60, // সর্বোচ্চ প্রায় ৬০px, ছোট ও মসৃণ
            ease: "none", // scrub-এর সাথে linear সবচেয়ে স্বাভাবিক
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom", // section স্ক্রিনে ঢুকলে শুরু
              end: "bottom top", // section স্ক্রিন থেকে বেরোলে শেষ
              scrub: true,
            },
          });
        });

        // ৩. Floating: shape গুলো নিজে নিজে খুব ধীরে ভাসে
        gsap.to(".promo-float", {
          rotation: 8,
          duration: 4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: 0.6,
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden bg-linear-to-br from-blue-600 via-indigo-600 to-indigo-800 py-20 sm:py-24 lg:py-32"
    >
      {/* Decorative shapes (স্ক্রিন-রিডার এগুলো এড়িয়ে যাবে) */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          data-speed="-1"
          className="promo-shape absolute -top-16 -left-16 h-56 w-56 rounded-full bg-white/10 sm:h-72 sm:w-72"
        />
        <div
          data-speed="1.2"
          className="promo-shape absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-blue-300/20 sm:h-80 sm:w-80"
        />
        <div
          data-speed="0.8"
          className="promo-shape absolute bottom-10 left-1/4 hidden h-24 w-24 sm:block"
        >
          <div className="promo-float h-full w-full rounded-3xl border border-white/30 bg-white/10" />
        </div>
        <div
          data-speed="-0.6"
          className="promo-shape absolute top-16 right-1/4 hidden h-16 w-16 sm:block"
        >
          <div className="promo-float h-full w-full rounded-2xl bg-indigo-300/30" />
        </div>
      </div>

      {/* Content */}
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="promo-heading text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
          Upgrade Your Digital Experience
        </h2>

        <p className="promo-text mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg">
          Get access to premium tools, regular updates and friendly support.
          Everything you need to work smarter, all in one place.
        </p>

        <a
          href="#contact"
          className="promo-btn mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-indigo-900/20 transition-colors duration-200 hover:bg-indigo-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-700"
        >
          Discover More
        </a>
      </div>
    </section>
  );
}