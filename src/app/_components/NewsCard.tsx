"use client";

import { useRef } from "react";
import gsap from "gsap";

export default function NewsCard({ image, excerpt, topPad = false }: { image: string; excerpt: string; topPad?: boolean }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);

  function onEnter() {
    gsap.killTweensOf([imgRef.current, arrowRef.current]);
    gsap.to(imgRef.current, { scale: 1.06, duration: 0.4, ease: "power2.out" });
    gsap.to(arrowRef.current, { x: 4, y: -4, duration: 0.3, ease: "power2.out" });
  }

  function onLeave() {
    gsap.killTweensOf([imgRef.current, arrowRef.current]);
    gsap.to(imgRef.current, { scale: 1, duration: 0.4, ease: "power2.inOut" });
    gsap.to(arrowRef.current, { x: 0, y: 0, duration: 0.3, ease: "power2.inOut" });
  }

  return (
    <div
      className={`flex w-[300px] shrink-0 flex-col gap-4 md:w-[353px] ${topPad ? "md:pt-[120px]" : ""}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div className="h-[398px] w-full overflow-hidden md:h-[469px]">
        <img ref={imgRef} src={image} alt="" className="h-full w-full object-cover object-center" />
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{excerpt}</p>
      <button type="button" className="inline-flex w-fit items-center gap-2.5 border-b border-black py-1 text-[14px] font-medium tracking-[-0.04em] text-black">
        Read more
        <svg ref={arrowRef} viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7 M9 7H17V15" />
        </svg>
      </button>
    </div>
  );
}
