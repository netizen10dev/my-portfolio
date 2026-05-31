"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useModal } from "@/app/_context/ModalContext";

export default function MagneticButton({ label }: { label: string }) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const { openModal } = useModal();

  function onMove(e: React.MouseEvent<HTMLButtonElement>) {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.38, y: y * 0.38, duration: 0.3, ease: "power2.out" });
  }

  function onLeave() {
    gsap.to(btnRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={openModal}
      className="inline-flex items-center justify-center rounded-full bg-black px-10 py-5 text-base font-medium tracking-[-0.04em] text-white"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {label}
    </button>
  );
}
