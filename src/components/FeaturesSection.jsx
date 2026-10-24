import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import FeatureCard from "./FeatureCard";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const features = [
  {
    id: 1,
    title: "Fast Performance",
    description:
      "Lightweight, optimized products that load quickly and keep your workflow running without delays.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Modern Design",
    description:
      "Clean, thoughtful interfaces that look great on every device and are a pleasure to use every day.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M12 3a9 9 0 100 18c1.1 0 2-.9 2-2 0-.6-.2-1-.6-1.4-.3-.4-.5-.8-.5-1.3 0-1 .8-1.8 1.8-1.8H17a4 4 0 004-4c0-4.4-4-7.5-9-7.5z" />
        <circle cx="7.5" cy="11" r="1" />
        <circle cx="10.5" cy="7" r="1" />
        <circle cx="15" cy="7.5" r="1" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Easy to Use",
    description:
      "Simple setup and intuitive controls, so you can get started in minutes without a learning curve.",
    icon: (
      <svg
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        <path d="M5 12l5 5L20 7" />
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ১. Heading animation
        gsap.from(".features-heading", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features-header",
            start: "top 80%",
            once: true,
          },
        });

        // ২. Cards animation
        gsap.from(".feature-card", {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            once: true,
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="features"
      ref={sectionRef}
      className="bg-gray-100 py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="features-header mx-auto max-w-2xl text-center">
          <h2 className="features-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why Choose DevStore?
          </h2>
          <p className="features-heading mt-4 text-base text-gray-600 sm:text-lg">
            Everything you need for a better digital experience.
          </p>
        </div>

        {/* Cards grid */}
        <div className="features-grid mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}