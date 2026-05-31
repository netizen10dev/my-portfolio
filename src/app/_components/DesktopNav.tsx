"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useModal } from "@/app/_context/ModalContext";

const navLinks = [
  { label: "About",    href: "/about"    },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "News",     href: "/news"     },
  { label: "Contact",  href: "/contact"  },
];

export default function DesktopNav() {
  const navRef = useRef<HTMLElement>(null);
  const underlinesRef = useRef<(HTMLSpanElement | null)[]>(Array(navLinks.length).fill(null));
  const ctaFillRef = useRef<HTMLSpanElement>(null);
  const ctaTextRef = useRef<HTMLSpanElement>(null);
  const { openModal } = useModal();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const sel = gsap.utils.selector(nav);
    let isDark = false;

    function update() {
      const navBottom = nav!.getBoundingClientRect().bottom;
      const darkEls = document.querySelectorAll("[data-dark-section]");
      let nowDark = false;

      darkEls.forEach((el) => {
        const { top, bottom } = el.getBoundingClientRect();
        if (top < navBottom && bottom > 0) nowDark = true;
      });

      if (nowDark === isDark) return;
      isDark = nowDark;

      if (isDark) {
        gsap.to(sel("[data-nav-text]"), { color: "#fff", duration: 0.3, overwrite: "auto" });
        gsap.to(sel("[data-nav-line]"), { backgroundColor: "#fff", duration: 0.3, overwrite: "auto" });
        gsap.to(sel("[data-nav-cta]"), { borderColor: "#fff", duration: 0.3, overwrite: "auto" });
      } else {
        gsap.to(sel("[data-nav-text]"), { color: "#000", duration: 0.3, overwrite: "auto" });
        gsap.to(sel("[data-nav-line]"), { backgroundColor: "#000", duration: 0.3, overwrite: "auto" });
        gsap.to(sel("[data-nav-cta]"), { borderColor: "transparent", duration: 0.3, overwrite: "auto" });
      }
    }

    window.addEventListener("scroll", update, { passive: true });
    update();

    return () => window.removeEventListener("scroll", update);
  }, []);

  function makeHoverHandlers(i: number) {
    return {
      onMouseEnter() {
        const line = underlinesRef.current[i];
        gsap.killTweensOf(line);
        gsap.fromTo(line, { scaleX: 0, transformOrigin: "left center" }, { scaleX: 1, duration: 0.3, ease: "power2.out" });
      },
      onMouseLeave() {
        const line = underlinesRef.current[i];
        gsap.killTweensOf(line);
        gsap.to(line, { scaleX: 0, transformOrigin: "right center", duration: 0.25, ease: "power2.in" });
      },
    };
  }

  function onCtaEnter() {
    gsap.killTweensOf([ctaFillRef.current, ctaTextRef.current]);
    gsap.fromTo(ctaFillRef.current, { scaleY: 0, transformOrigin: "bottom center" }, { scaleY: 1, duration: 0.3, ease: "power2.out" });
    gsap.to(ctaTextRef.current, { color: "#000", duration: 0.2, ease: "none" });
  }

  function onCtaLeave() {
    gsap.killTweensOf([ctaFillRef.current, ctaTextRef.current]);
    gsap.to(ctaFillRef.current, { scaleY: 0, transformOrigin: "top center", duration: 0.25, ease: "power2.in" });
    gsap.to(ctaTextRef.current, { color: "#fff", duration: 0.2, ease: "none" });
  }

  return (
    <nav ref={navRef} className="fixed left-0 right-0 top-0 z-50 hidden md:block">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-6">
        <Link href="/" data-nav-text className="text-base font-semibold capitalize tracking-[-0.04em] text-black">
          H.Studio
        </Link>

        <ul className="flex items-center gap-14 text-base font-semibold capitalize tracking-[-0.04em]">
          {navLinks.map((link, i) => (
            <li key={link.label}>
              <Link
                href={link.href}
                data-nav-text
                className="relative pb-0.5 text-black"
                {...makeHoverHandlers(i)}
              >
                {link.label}
                <span
                  data-nav-line
                  ref={(el) => { underlinesRef.current[i] = el; }}
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-black"
                />
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          data-nav-cta
          onClick={openModal}
          className="relative overflow-hidden rounded-3xl border border-solid border-transparent bg-black px-4 py-3 text-sm font-medium tracking-[-0.04em]"
          onMouseEnter={onCtaEnter}
          onMouseLeave={onCtaLeave}
        >
          <span ref={ctaFillRef} className="pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-white" aria-hidden />
          <span ref={ctaTextRef} className="relative text-white">Let&rsquo;s talk</span>
        </button>
      </div>
    </nav>
  );
}
