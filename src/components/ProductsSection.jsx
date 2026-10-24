import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProductsSection({ onAddToCart }) {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ১. Heading animation
        gsap.from(".products-heading", {
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ".products-header",
            start: "top 80%",
            once: true,
          },
        });

        // ২. Cards + image reveal, একটি timeline-এ
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
            once: true,
          },
        });

        tl.from(".product-card", {
          y: 50,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.15,
          clearProps: "transform,opacity",
        }).from(
          ".product-image-wrap",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.7,
            ease: "power2.out",
            stagger: 0.15,
            clearProps: "clipPath",
          },
          "<0.2"
        );
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="products"
      ref={sectionRef}
      className="bg-white py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="products-header mx-auto max-w-2xl text-center">
          <h2 className="products-heading text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore Our Products
          </h2>
          <p className="products-heading mt-4 text-base text-gray-600 sm:text-lg">
            Hand-picked digital tools to help you design, build and ship faster.
          </p>
        </div>

        <div className="products-grid mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              image={product.image}
              description={product.description}
              price={product.price}
              rating={product.rating}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}