"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const ST = { start: "top 88%", toggleActions: "play none restart reverse" } as const;

export default function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const triggers: ScrollTrigger[] = [];

    const from = { opacity: 0, y: 40 };
    const to = { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" };

    document.querySelectorAll<HTMLElement>("[data-animate]").forEach((el) => {
      gsap.set(el, from);
      const tween = gsap.to(el, { ...to, scrollTrigger: { trigger: el, ...ST } });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    document.querySelectorAll<HTMLElement>("[data-animate-stagger]").forEach((group) => {
      const children = Array.from(group.children);
      gsap.set(children, from);
      const tween = gsap.to(children, { ...to, stagger: 0.12, scrollTrigger: { trigger: group, ...ST } });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    document.querySelectorAll<HTMLElement>("[data-animate-focus]").forEach((el) => {
      gsap.set(el, { opacity: 0, filter: "blur(14px)", scale: 1.04 });
      const tween = gsap.to(el, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: el, ...ST } });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    document.querySelectorAll<HTMLElement>("[data-animate-blur]").forEach((el) => {
      const tween = gsap.fromTo(el,
        { filter: "blur(40px)", opacity: 0.3, scale: 1.08 },
        { filter: "blur(0px)", opacity: 1, scale: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 90%", end: "top 15%", scrub: 1.2 } }
      );
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;

    document.querySelectorAll<HTMLElement>("[data-animate-x-md]").forEach((el) => {
      if (isDesktop) {
        const tween = gsap.fromTo(el, { x: -80, opacity: 0 }, { x: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 88%", end: "top 40%", scrub: 1 } });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      } else {
        gsap.set(el, from);
        const tween = gsap.to(el, { ...to, scrollTrigger: { trigger: el, ...ST } });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
    });

    document.querySelectorAll<HTMLElement>("[data-animate-focus-md]").forEach((el) => {
      if (isDesktop) {
        gsap.set(el, { opacity: 0, filter: "blur(14px)", scale: 1.04 });
        const tween = gsap.to(el, { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.2, ease: "power2.out", scrollTrigger: { trigger: el, ...ST } });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      } else {
        gsap.set(el, from);
        const tween = gsap.to(el, { ...to, scrollTrigger: { trigger: el, ...ST } });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      }
    });

    const fromX = { opacity: 0, x: -60 };
    const toX = { opacity: 1, x: 0, duration: 0.9, ease: "power2.out" };

    document.querySelectorAll<HTMLElement>("[data-animate-stagger-x]").forEach((group) => {
      const children = Array.from(group.children);
      gsap.set(children, fromX);
      const tween = gsap.to(children, { ...toX, stagger: 0.12, scrollTrigger: { trigger: group, ...ST } });
      if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
