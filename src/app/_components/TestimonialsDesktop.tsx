"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type TestimonialItem = { _id: string; author: string; quote: string; logoUrl: string; logoClass: string };

const POSITIONS = [
  { left: "0px",   top: "22px",  rotate: "-6.85deg", zIndex: 0  },
  { left: "574px", top: "152px", rotate: "2.9deg",   zIndex: -1 },
  { left: "203px", top: "433px", rotate: "2.23deg",  zIndex: 0  },
  { left: "885px", top: "426px", rotate: "-4.15deg", zIndex: 0  },
];

const PARALLAX_Y = [-220, -360, -160, -290];

function TestimonialCard({ logo, logoClass = "h-5", quote, author }: { logo: string; logoClass?: string; quote: string; author: string }) {
  return (
    <div className="flex w-[260px] shrink-0 flex-col items-start gap-4 rounded-[6px] border border-solid border-black/5 bg-[#f5f4f0] p-6 shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18),0_4px_12px_-2px_rgba(0,0,0,0.08)] md:w-[353px]">
      <img src={logo} alt="" className={`${logoClass} w-auto object-contain opacity-40`} />
      <p className="font-[family-name:var(--font-inter)] text-[18px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{quote}</p>
      <p className="font-[family-name:var(--font-inter)] text-[16px] font-black uppercase leading-[1.1] tracking-[-0.04em] text-black">{author}</p>
    </div>
  );
}

export default function TestimonialsDesktop({ testimonials }: { testimonials: TestimonialItem[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const triggers: ScrollTrigger[] = [];

    cardRefs.current.forEach((card, i) => {
      if (!card) return;

      gsap.set(card, { opacity: 0 });
      const entrance = gsap.to(card, {
        opacity: 1, duration: 0.7, delay: i * 0.12, ease: "power2.out",
        scrollTrigger: { trigger: section, start: "top 88%", toggleActions: "play none restart reverse" },
      });
      if (entrance.scrollTrigger) triggers.push(entrance.scrollTrigger);

      const parallax = gsap.to(card, {
        y: PARALLAX_Y[i] ?? -50, ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: 0.4 },
      });
      if (parallax.scrollTrigger) triggers.push(parallax.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div className="hidden md:block">
      <div ref={sectionRef} className="relative isolate mx-auto w-[1238px] max-w-full">
        <h2
          className="pointer-events-none absolute left-0 right-0 z-0 text-center font-medium capitalize tracking-[-0.07em] text-black md:text-[clamp(80px,13.75vw,198px)] md:leading-[1.1]"
          style={{ top: "375px", transform: "translateY(-50%)" }}
        >
          Testimonials
        </h2>

        {testimonials.map((t, i) => {
          const pos = POSITIONS[i];
          if (!pos) return null;
          return (
            <div
              key={t._id}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute"
              style={{ left: pos.left, top: pos.top, transform: `rotate(${pos.rotate})`, zIndex: pos.zIndex }}
            >
              <TestimonialCard logo={t.logoUrl} logoClass={t.logoClass} quote={t.quote} author={t.author} />
            </div>
          );
        })}

        <div className="h-[900px]" aria-hidden />
      </div>
    </div>
  );
}
