"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useModal } from "@/app/_context/ModalContext";

const navLinks = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News",     href: "/news"     },
  { label: "Contact",  href: "/contact"  },
];

export function NavLink({ label }: { label: string }) {
  const lineRef = useRef<HTMLSpanElement>(null);

  function onEnter() {
    gsap.killTweensOf(lineRef.current);
    gsap.fromTo(lineRef.current, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.3, ease: "power2.out" });
  }

  function onLeave() {
    gsap.killTweensOf(lineRef.current);
    gsap.to(lineRef.current, { scaleX: 0, transformOrigin: "right center", duration: 0.25, ease: "power2.in" });
  }

  return (
    <button type="button" className="relative pb-0.5" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {label}
      <span ref={lineRef} className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black" />
    </button>
  );
}

export function NavButton({ label, className = "" }: { label: string; className?: string }) {
  const fillRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const { openModal } = useModal();

  function onEnter() {
    gsap.killTweensOf([fillRef.current, textRef.current]);
    gsap.fromTo(fillRef.current, { scaleY: 0, transformOrigin: "bottom center" }, { scaleY: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(textRef.current, { color: "#000", duration: 0.2, ease: "none" });
  }

  function onLeave() {
    gsap.killTweensOf([fillRef.current, textRef.current]);
    gsap.to(fillRef.current, { scaleY: 0, transformOrigin: "top center", duration: 0.25, ease: "power2.in" });
    gsap.to(textRef.current, { color: "#fff", duration: 0.2, ease: "none" });
  }

  return (
    <button
      type="button"
      onClick={openModal}
      className={`relative overflow-hidden rounded-3xl bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em] ${className}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span ref={fillRef} className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white" aria-hidden />
      <span ref={textRef} className="relative text-white">{label}</span>
    </button>
  );
}

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { openModal } = useModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimating = useRef(false);
  const underlineRefs = useRef<(HTMLSpanElement | null)[]>(Array(navLinks.length).fill(null));
  const ctaFillRef = useRef<HTMLSpanElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const items = listRef.current?.querySelectorAll("li");
    const cta = ctaRef.current;
    if (!overlay || !items || !cta) return;

    gsap.set(overlay, { autoAlpha: 0, y: "-100%" });
    gsap.set(items, { y: 40, autoAlpha: 0 });
    gsap.set(cta, { y: 20, autoAlpha: 0 });
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    const items = listRef.current?.querySelectorAll("li");
    const cta = ctaRef.current;
    if (!overlay || !items || !cta) return;

    if (tlRef.current) tlRef.current.kill();

    const tl = gsap.timeline({
      onStart: () => { isAnimating.current = true; },
      onComplete: () => { isAnimating.current = false; },
    });
    tlRef.current = tl;

    if (menuOpen) {
      tl.to(overlay, { autoAlpha: 1, y: "0%", duration: 0.45, ease: "power3.out" })
        .to(items, { y: 0, autoAlpha: 1, duration: 0.35, ease: "power2.out", stagger: 0.07 }, "-=0.2")
        .to(cta, { y: 0, autoAlpha: 1, duration: 0.3, ease: "power2.out" }, "-=0.15");
    } else {
      tl.to([...items, cta], { y: 20, autoAlpha: 0, duration: 0.2, ease: "power2.in", stagger: 0.04 })
        .to(overlay, { autoAlpha: 0, y: "-100%", duration: 0.35, ease: "power3.in" }, "-=0.1");
    }
  }, [menuOpen]);

  function onCtaEnter() {
    gsap.killTweensOf([ctaFillRef.current, ctaTextRef.current]);
    gsap.fromTo(ctaFillRef.current, { scaleY: 0, transformOrigin: "bottom center" }, { scaleY: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaTextRef.current, { color: "#000", duration: 0.2, ease: "none" });
  }

  function onCtaLeave() {
    gsap.killTweensOf([ctaFillRef.current, ctaTextRef.current]);
    gsap.to(ctaFillRef.current, { scaleY: 0, transformOrigin: "top center", duration: 0.25, ease: "power2.in" });
    gsap.to(ctaTextRef.current, { color: "#fff", duration: 0.2, ease: "none" });
  }

  function makeLinkHover(i: number) {
    return {
      onMouseEnter() {
        const line = underlineRefs.current[i];
        gsap.killTweensOf(line);
        gsap.fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.3, ease: "power2.out" });
      },
      onMouseLeave() {
        const line = underlineRefs.current[i];
        gsap.killTweensOf(line);
        gsap.to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.25, ease: "power2.in" });
      },
    };
  }

  return (
    <>
      <button
        type="button"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        className="fixed right-4 top-6 z-50 flex h-6 w-6 flex-col items-center justify-center gap-1.5 md:hidden"
      >
        <span className={`block h-0.5 w-5 bg-black transition-transform duration-300 ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
        <span className={`block h-0.5 w-5 bg-black transition-opacity duration-300 ${menuOpen ? "opacity-0" : ""}`} />
        <span className={`block h-0.5 w-5 bg-black transition-transform duration-300 ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
      </button>

      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 flex flex-col items-center bg-[#bfced1] px-4 pt-24 md:hidden"
        style={{ visibility: "hidden" }}
      >
        <ul ref={listRef} className="flex flex-col items-center gap-8 text-3xl font-semibold capitalize tracking-[-0.04em] text-black">
          {navLinks.map((link, i) => (
            <li key={link.label}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="relative pb-0.5"
                {...makeLinkHover(i)}
              >
                <span className="inline-block">{link.label}</span>
                <span
                  ref={(el) => { underlineRefs.current[i] = el; }}
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black"
                />
              </Link>
            </li>
          ))}
        </ul>
        <button
          ref={ctaRef}
          type="button"
          onClick={() => { setMenuOpen(false); openModal(); }}
          className="relative mt-12 overflow-hidden rounded-3xl bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em]"
          onMouseEnter={onCtaEnter}
          onMouseLeave={onCtaLeave}
        >
          <span ref={ctaFillRef} className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white" aria-hidden />
          <span ref={ctaTextRef} className="relative text-white">Let&rsquo;s talk</span>
        </button>
      </div>
    </>
  );
}
