import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { products } from "../data/products";

gsap.registerPlugin(useGSAP);

// ছবি লোড না হলে placeholder
const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" font-size="18"
        text-anchor="middle" dominant-baseline="middle">Image not available</text>
    </svg>`
  );

// Hero-র ভেতরের ছোট product card
function MiniCard({ product, className = "" }) {
  return (
    <article
      className={`hero-float absolute overflow-hidden rounded-2xl border border-white/60 bg-white shadow-xl shadow-indigo-900/10 ${className}`}
    >
      <div className="aspect-4/3 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={`${product.name} product preview`}
          width="400"
          height="300"
          loading="eager"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-2 p-3">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {product.name}
        </h3>
        <p className="text-sm font-bold text-indigo-600">${product.price}</p>
      </div>
    </article>
  );
}

export default function Hero() {
  const heroRef = useRef(null);

  // প্রথম ৩টি product দেখাবে
  const featured = products.slice(0, 3);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ১. Entrance animation (একবার)
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.from(".hero-badge", { y: 20, opacity: 0, duration: 0.5 })
          .from(".hero-title", { y: 40, opacity: 0, duration: 0.7 }, "-=0.2")
          .from(".hero-text", { y: 20, opacity: 0, duration: 0.6 }, "-=0.4")
          .from(
            ".hero-btn",
            { y: 20, opacity: 0, duration: 0.5, stagger: 0.15 },
            "-=0.3"
          )
          .from(
            ".hero-image",
            { x: 80, scale: 0.92, opacity: 0, duration: 0.9, ease: "power2.out" },
            "-=1.2"
          );

        // ২. Card গুলো ধীরে ধীরে ভাসবে (আলাদা element, তাই entrance-এর সাথে conflict নেই)
        gsap.to(".hero-float", {
          y: -12,
          duration: 2.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.5, from: "start" },
        });
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden bg-linear-to-br from-indigo-100 via-blue-50 to-purple-100"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-300/40 blur-3xl" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-purple-300/40 blur-3xl" />
        <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-28">
        {/* Left: Content */}
        <div className="text-center lg:text-left">
          <span className="hero-badge inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white/70 px-4 py-1.5 text-sm font-medium text-indigo-700 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-indigo-500" aria-hidden="true" />
            Welcome to DevStore
          </span>

          <h1 className="hero-title mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Build Your{" "}
            <span className="bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Digital Experience
            </span>
          </h1>

          <p className="hero-text mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0">
            Discover modern digital products designed to improve your workflow
            and productivity.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#products"
              className="hero-btn w-full rounded-full bg-indigo-600 px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-indigo-600/25 transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Explore Products
            </a>
            <a
              href="#features"
              className="hero-btn w-full rounded-full border border-gray-300 bg-white/80 px-7 py-3 text-center text-sm font-semibold text-gray-700 backdrop-blur transition-colors duration-200 hover:border-indigo-300 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Right: Product card collage */}
        <div className="hero-image relative mx-auto h-80 w-full max-w-md sm:h-96 lg:h-[26rem] lg:max-w-none">
          {/* Main card */}
          <MiniCard
            product={featured[0]}
            className="top-6 right-0 w-3/5 sm:w-1/2"
          />

          {/* Second card (নিচে বাঁয়ে) */}
          <MiniCard
            product={featured[1]}
            className="bottom-0 left-0 w-1/2 sm:w-[45%]"
          />

          {/* Third card (উপরে বাঁয়ে, ছোট) */}
          <MiniCard
            product={featured[2]}
            className="top-0 left-6 hidden w-[38%] sm:block"
          />
        </div>
      </div>
    </section>
  );
}