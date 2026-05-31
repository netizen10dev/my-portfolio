"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ContactHero() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = wrapperRef.current;
    if (!root) return;

    const splitL = root.querySelector<HTMLElement>("[data-ct-split-l]");
    const splitR = root.querySelector<HTMLElement>("[data-ct-split-r]");
    const lines  = root.querySelectorAll<HTMLElement>("[data-ct-line]");
    const label  = root.querySelector<HTMLElement>("[data-ct-label]");
    const bg     = root.querySelector<HTMLElement>("[data-ct-bg]");

    gsap.set([label, ...Array.from(lines)], { opacity: 0, y: 70 });
    gsap.to([label, ...Array.from(lines)], {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
      stagger: 0.14,
      delay: 0.2,
    });

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      tl.to(bg,     { scale: 1.18, ease: "none" }, 0)
        .to(splitL, { x: "-45vw",  ease: "none" }, 0)
        .to(splitR, { x: "45vw",   ease: "none" }, 0);
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: 1.5 },
      });
      tl.to(bg,     { scale: 1.18, ease: "none" }, 0)
        .to(splitL, { x: "-32vw",  ease: "none" }, 0)
        .to(splitR, { x: "32vw",   ease: "none" }, 0);
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={wrapperRef} className="relative min-h-screen w-full overflow-hidden bg-white">
      <div data-ct-bg="" className="pointer-events-none absolute inset-0 origin-center bg-[#f0f0f0]" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center md:px-8">
        <p
          data-ct-label=""
          className="mb-4 font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-black/50"
        >
          [ Work with us ]
        </p>
        <h1 className="font-medium capitalize tracking-[-0.07em] leading-[0.88] text-black text-[clamp(56px,10vw,148px)]">
          <span data-ct-line="" data-ct-split-l="" className="block">Let&rsquo;s build</span>
          <span data-ct-line="" className="block">something</span>
          <span data-ct-line="" data-ct-split-r="" className="block">together.</span>
        </h1>
      </div>
    </div>
  );
}
