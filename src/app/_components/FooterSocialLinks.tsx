"use client";

import { useRef } from "react";
import gsap from "gsap";

function SocialLink({ label }: { label: string }) {
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
    <button
      type="button"
      className="relative w-fit pb-0.5 text-[18px] uppercase tracking-[-0.04em] leading-[1.1] text-white"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {label}
      <span ref={lineRef} className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-white" />
    </button>
  );
}

export default function FooterSocialLinks() {
  return (
    <>
      <div className="flex flex-col gap-[10px] md:w-[298px] md:items-center md:text-center">
        <SocialLink label="Facebook" />
        <SocialLink label="Instagram" />
      </div>
      <div className="-mt-[6px] flex flex-col gap-[10px] md:mt-0 md:w-[298px] md:items-end md:text-right">
        <SocialLink label="x.com" />
        <SocialLink label="Linkedin" />
      </div>
    </>
  );
}
