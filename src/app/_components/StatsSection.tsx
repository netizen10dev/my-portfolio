"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type StatValues = { yearsExperience?: number; projectsCompleted?: number; clientsServed?: number; awardsWon?: number };

export default function StatsSection({ values }: { values?: StatValues }) {
  const STATS = [
    { value: values?.yearsExperience   ?? 8,   suffix: "+", label: "Years in industry"  },
    { value: values?.projectsCompleted ?? 120, suffix: "+", label: "Projects completed" },
    { value: values?.clientsServed     ?? 45,  suffix: "",  label: "Happy clients"      },
    { value: values?.awardsWon         ?? 12,  suffix: "",  label: "Awards won"         },
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const valueRefs  = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const triggers: ScrollTrigger[] = [];

    STATS.forEach((stat, i) => {
      const el = valueRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      const tween = gsap.to(obj, {
        val: stat.value,
        duration: 2,
        ease: "power2.out",
        onUpdate() { el.textContent = Math.round(obj.val) + stat.suffix; },
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
      });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section ref={sectionRef} data-dark-section className="relative z-10 w-full bg-black px-4 py-16 md:px-8 md:py-[120px]">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-8">
          {STATS.map((stat, i) => (
            <div key={stat.label} className="flex flex-col gap-3">
              <p className="font-light uppercase tracking-[-0.08em] leading-none text-white text-[clamp(52px,6.5vw,96px)]">
                <span ref={(el) => { valueRefs.current[i] = el; }}>0{stat.suffix}</span>
              </p>
              <p className="font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-white/50">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
