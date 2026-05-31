"use client";

import { useEffect, useRef, useActionState } from "react";
import { useModal } from "@/app/_context/ModalContext";
import { submitContact } from "@/app/actions/contact";
import gsap from "gsap";

const initialState = { success: false, error: null as string | null };

export default function ContactModal() {
  const { open, closeModal } = useModal();
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef   = useRef<HTMLDivElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);

  const [state, action, pending] = useActionState(submitContact, initialState);

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel   = panelRef.current;
    if (!overlay || !panel) return;

    if (open) {
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(panel,   { autoAlpha: 0, scale: 0.95, y: 24 });
      gsap.to(overlay,  { autoAlpha: 1, duration: 0.3, ease: "power2.out" });
      gsap.to(panel,    { autoAlpha: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out" });
    } else {
      gsap.to(panel,   { autoAlpha: 0, scale: 0.95, y: 12, duration: 0.25, ease: "power2.in" });
      gsap.to(overlay, {
        autoAlpha: 0,
        duration: 0.3,
        delay: 0.1,
        onComplete: () => { document.body.style.overflow = ""; },
      });
    }
  }, [open]);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === overlayRef.current) closeModal();
  }

  return (
    <div
      ref={overlayRef}
      style={{ visibility: "hidden" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-[560px] rounded-2xl bg-white p-8 md:p-12"
        style={{ visibility: "inherit" }}
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-5 top-5 text-black/30 transition-colors hover:text-black"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        {state.success ? (
          <div className="flex flex-col items-center gap-6 py-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-[28px] font-bold uppercase tracking-[-0.04em] leading-[1] text-black">
                Message sent.
              </h2>
              <p className="mt-2 font-[family-name:var(--font-inter)] text-sm text-[#1f1f1f]/50">
                We&rsquo;ll be in touch soon.
              </p>
            </div>
            <button
              type="button"
              onClick={closeModal}
              className="font-[family-name:var(--font-inter)] text-sm underline text-[#1f1f1f]/60 hover:text-black transition-colors"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <p className="mb-2 font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] tracking-wider text-[#1f1f1f]/40">
              [ Get in touch ]
            </p>
            <h2 className="mb-8 text-[clamp(28px,4vw,44px)] font-medium uppercase tracking-[-0.06em] leading-[0.9] text-black">
              Let&rsquo;s <span className="font-black">talk.</span>
            </h2>

            <form ref={formRef} action={action} className="flex flex-col gap-6">
              <label className="flex flex-col gap-1.5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-[#1f1f1f]/40">Name</span>
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="border-b border-black/15 pb-2.5 text-sm tracking-[-0.02em] outline-none transition-colors placeholder:text-[#1f1f1f]/30 focus:border-black bg-transparent"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-[#1f1f1f]/40">Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="border-b border-black/15 pb-2.5 text-sm tracking-[-0.02em] outline-none transition-colors placeholder:text-[#1f1f1f]/30 focus:border-black bg-transparent"
                />
              </label>

              <label className="flex flex-col gap-1.5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-[#1f1f1f]/40">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your project…"
                  className="resize-none border-b border-black/15 pb-2.5 text-sm tracking-[-0.02em] outline-none transition-colors placeholder:text-[#1f1f1f]/30 focus:border-black bg-transparent"
                />
              </label>

              {state.error && (
                <p className="text-sm text-red-500">{state.error}</p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="mt-1 w-full rounded-full bg-black py-4 text-sm font-medium tracking-[-0.04em] text-white transition-opacity disabled:opacity-50"
              >
                {pending ? "Sending…" : "Send message"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
