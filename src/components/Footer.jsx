import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Social লিংকের href আপাতত placeholder, পরে আসল URL বসাবেন
const socialLinks = [
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7A11.6 11.6 0 013.4 4.600a4.100 4.100 0 001.300 5.500c-.7 0-1.300-.2-1.900-.5 0 2 1.400 3.700 3.300 4.100-.6.2-1.200.2-1.900.1.500 1.600 2 2.800 3.800 2.900A8.300 8.300 0 012 18.400 11.600 11.600 0 008.300 20.200c7.500 0 11.700-6.300 11.700-11.700v-.5c.8-.6 1.500-1.300 2-2.100z" />
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com",
    icon: (
      <path d="M12 2a10 10 0 00-3.200 19.500c.5.1.7-.2.7-.5v-1.800c-2.800.6-3.400-1.200-3.400-1.200-.5-1.200-1.100-1.500-1.100-1.500-.9-.6.1-.6.1-.6 1 .1 1.500 1 1.500 1 .9 1.500 2.300 1.100 2.900.8.1-.7.4-1.100.6-1.400-2.200-.3-4.600-1.100-4.600-5 0-1.100.4-2 1-2.700-.1-.3-.4-1.300.1-2.700 0 0 .8-.3 2.700 1a9.400 9.400 0 015 0c1.900-1.300 2.700-1 2.700-1 .5 1.400.2 2.400.1 2.700.6.700 1 1.600 1 2.700 0 3.900-2.300 4.700-4.600 5 .4.300.7.900.7 1.800v2.700c0 .3.200.6.700.5A10 10 0 0012 2z" />
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <path d="M4.900 3a2 2 0 100 4 2 2 0 000-4zM3 9v12h4V9H3zm6.500 0v12h4v-6.300c0-1.800 1-2.700 2.300-2.700s2 .9 2 2.700V21h4v-7.200c0-3.300-1.800-4.900-4.200-4.900-1.600 0-2.700.8-3.200 1.600V9h-4.900z" />
    ),
  },
];

export default function Footer() {
  const footerRef = useRef(null);

  // প্রতি বছর নিজে থেকেই ঠিক থাকবে, হাতে বদলাতে হবে না
  const currentYear = new Date().getFullYear();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            once: true,
          },
        });

        tl.from(".footer-col", {
          y: 20,
          opacity: 0,
          duration: 0.6,
          stagger: 0.12,
        }).from(".footer-bottom", { opacity: 0, duration: 0.5 }, "-=0.2");
      });
    },
    { scope: footerRef }
  );

  return (
    <footer ref={footerRef} className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="footer-col sm:col-span-2 lg:col-span-2">
            <a
              href="#home"
              className="inline-flex items-center gap-2 text-xl font-bold tracking-tight text-white"
            >
              <span
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 text-sm text-white"
                aria-hidden="true"
              >
                D
              </span>
              DevStore
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed">
              Modern digital products designed to improve your workflow and
              productivity. Build, ship and grow with tools you can trust.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <nav className="footer-col" aria-label="Footer quick links">
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors duration-200 hover:text-white focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Social */}
          <div className="footer-col">
            <h2 className="text-sm font-semibold tracking-wider text-white uppercase">
              Follow Us
            </h2>
            <ul className="mt-4 flex gap-3">
              {socialLinks.map((social) => (
                <li key={social.name}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`DevStore on ${social.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-gray-400 transition-colors duration-200 hover:bg-indigo-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      {social.icon}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom mt-12 border-t border-gray-800 pt-6 text-center text-sm sm:text-left">
          <p>&copy; {currentYear} DevStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}