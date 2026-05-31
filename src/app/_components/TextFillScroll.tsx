"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function TextFillScroll({ text }: { text: string }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const filled = wrapper.querySelector<HTMLElement>("[data-filled]");

    const tween = gsap.fromTo(
      filled,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", ease: "none", scrollTrigger: { trigger: wrapper, start: "top 75%", end: "bottom 35%", scrub: 1.5 } }
    );

    return () => tween.scrollTrigger?.kill();
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <p className="font-light italic leading-[1.1] tracking-[-0.05em] text-black/15 text-[clamp(26px,4.2vw,60px)]">{text}</p>
      <p
        data-filled=""
        aria-hidden
        className="pointer-events-none absolute inset-0 font-light italic leading-[1.1] tracking-[-0.05em] text-black text-[clamp(26px,4.2vw,60px)]"
        style={{ clipPath: "inset(0 100% 0 0)" }}
      >
        {text}
      </p>
    </div>
  );
}
