"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroParallax({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const root = wrapperRef.current;
      if (!root) return;

      const bg      = root.querySelector<HTMLElement>("[data-hero-bg]");
      const hello   = root.querySelector<HTMLElement>("[data-hero-hello]");
      const harvey  = root.querySelector<HTMLElement>("[data-hero-harvey]");
      const specter = root.querySelector<HTMLElement>("[data-hero-specter]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.5 },
      });

      tl.to(bg,      { scale: 1.18, ease: "none" }, 0)
        .to(hello,   { x: "-45vw",  ease: "none" }, 0)
        .to(harvey,  { x: "-45vw",  ease: "none" }, 0)
        .to(specter, { x: "45vw",   ease: "none" }, 0);
    });

    mm.add("(max-width: 767px)", () => {
      const root = wrapperRef.current;
      if (!root) return;

      const bg      = root.querySelector<HTMLElement>("[data-hero-bg]");
      const hello   = root.querySelector<HTMLElement>("[data-hero-hello]");
      const harvey  = root.querySelector<HTMLElement>("[data-hero-harvey]");
      const specter = root.querySelector<HTMLElement>("[data-hero-specter]");

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.5 },
      });

      tl.to(bg,      { scale: 1.18, ease: "none" }, 0)
        .to(hello,   { x: "-32vw",  ease: "none" }, 0)
        .to(harvey,  { x: "-32vw",  ease: "none" }, 0)
        .to(specter, { x: "32vw",   ease: "none" }, 0);
    });

    return () => mm.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
