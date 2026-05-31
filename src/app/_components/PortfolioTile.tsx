"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const pillClass = "rounded-3xl px-2 py-1 text-[14px] font-medium tracking-[-0.04em] text-[#111] backdrop-blur-[10px]";
const pillStyle = { backgroundColor: "rgba(255, 255, 255, 0.3)" };

export default function PortfolioTile({
  title, image, tags, heightClass, className = "", href,
}: {
  title: string; image: string; tags: string[]; heightClass: string; className?: string; href?: string;
}) {
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

  const Wrapper = href
    ? ({ children }: { children: React.ReactNode }) => (
        <Link href={href} className={`flex flex-col gap-2.5 ${className}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</Link>
      )
    : ({ children }: { children: React.ReactNode }) => (
        <div className={`flex flex-col gap-2.5 ${className}`} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</div>
      );

  return (
    <Wrapper>
      <div className={`relative flex flex-col items-start justify-end overflow-hidden pb-4 pl-4 ${heightClass}`}>
        <img ref={imgRef} src={image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
        {tags.length > 0 && (
          <div className="relative z-10 flex gap-3">
            {tags.map((tag) => <span key={tag} className={pillClass} style={pillStyle}>{tag}</span>)}
          </div>
        )}
      </div>
      <div className="flex items-center justify-between">
        <h3 className="whitespace-nowrap font-black uppercase tracking-[-0.04em] leading-[1.1] text-black text-[24px] md:text-[36px]">{title}</h3>
        <svg ref={arrowRef} viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7 M9 7H17V15" />
        </svg>
      </div>
    </Wrapper>
  );
}
