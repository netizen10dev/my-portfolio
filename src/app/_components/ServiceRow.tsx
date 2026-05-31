"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function ServiceRow({ index, title, description, imageUrl }: { index: number; title: string; description: string; imageUrl: string }) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function onEnter() {
    gsap.killTweensOf([titleRef.current, imgRef.current]);
    gsap.to(titleRef.current, { x: 12, duration: 0.3, ease: "power2.out" });
    gsap.to(imgRef.current, { scale: 1.08, duration: 0.35, ease: "power2.out" });
  }

  function onLeave() {
    gsap.killTweensOf([titleRef.current, imgRef.current]);
    gsap.to(titleRef.current, { x: 0, duration: 0.25, ease: "power2.in" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.3, ease: "power2.in" });
  }

  return (
    <div className="flex flex-col gap-3" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-white">[ {index + 1} ]</p>
      <div className="h-px w-full bg-white" />
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <h3 ref={titleRef} className="whitespace-nowrap font-bold italic uppercase tracking-[-0.04em] leading-[1.1] text-[36px]">{title}</h3>
        <div className="flex flex-row items-start gap-4 md:gap-6">
          <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-white md:w-[393px]">{description}</p>
          <div className="h-[100px] w-[100px] shrink-0 overflow-hidden md:h-[151px] md:w-[151px]">
            <img ref={imgRef} src={imageUrl} alt="" className="h-full w-full object-cover object-center" />
          </div>
        </div>
      </div>
    </div>
  );
}
