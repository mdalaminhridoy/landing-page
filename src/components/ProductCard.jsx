import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">
      <rect width="100%" height="100%" fill="#e5e7eb"/>
      <text x="50%" y="50%" fill="#9ca3af" font-family="sans-serif" font-size="18"
        text-anchor="middle" dominant-baseline="middle">Image not available</text>
    </svg>`
  );

function Stars({ rating }) {
  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`Rated ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${
            i < Math.round(rating) ? "text-amber-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
      <span className="ml-1 text-sm font-medium text-gray-600">{rating}</span>
    </div>
  );
}

export default function ProductCard({
  name,
  image,
  description,
  price,
  rating,
  onAddToCart,
}) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const animateHover = contextSafe((isHovering) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.to(cardRef.current, {
      y: isHovering ? -6 : 0,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });

    gsap.to(imageRef.current, {
      scale: isHovering ? 1.08 : 1,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => animateHover(true)}
      onMouseLeave={() => animateHover(false)}
      className="product-card flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-indigo-200 hover:shadow-xl"
    >
      <div className="product-image-wrap aspect-4/3 overflow-hidden bg-gray-100">
        <img
          ref={imageRef}
          src={image}
          alt={`${name} product preview`}
          width="400"
          height="300"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <p className="text-lg font-bold text-indigo-600">${price}</p>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          {description}
        </p>

        <div className="mt-4">
          <Stars rating={rating} />
        </div>

        <button
          type="button"
          aria-label={`Add ${name} to cart`}
          onClick={onAddToCart}
          className="mt-auto w-full rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}