"use client";

import { useRef, useState } from "react";
import gsap from "gsap";

type PostItem = { _id: string; imageUrl: string; excerpt: string };

function NewsCard({ image, excerpt }: { image: string; excerpt: string }) {
  return (
    <div className="flex w-[300px] shrink-0 flex-col gap-4">
      <div className="h-[398px] w-full overflow-hidden">
        <img src={image} alt="" className="h-full w-full object-cover object-center" />
      </div>
      <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
        {excerpt}
      </p>
      <button type="button" className="inline-flex w-fit items-center gap-2.5 border-b border-black py-1 text-[14px] font-medium tracking-[-0.04em] text-black">
        Read more
        <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 17L17 7 M9 7H17V15" />
        </svg>
      </button>
    </div>
  );
}

export default function MobileNewsSlider({ posts }: { posts: PostItem[] }) {
  const [current, setCurrent] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const post = posts[current];

  function onPress() {
    gsap.killTweensOf(cardRef.current);
    gsap.to(cardRef.current, { y: -12, scale: 1.03, duration: 0.2, ease: "power2.out" });
  }

  function onRelease() {
    gsap.killTweensOf(cardRef.current);
    gsap.to(cardRef.current, { y: 0, scale: 1, duration: 0.4, ease: "elastic.out(1, 0.5)" });
  }

  if (!post) return null;

  return (
    <div className="mt-8 flex flex-col items-center gap-6 md:hidden">
      <div
        ref={cardRef}
        onPointerDown={onPress}
        onPointerUp={onRelease}
        onPointerLeave={onRelease}
        onClick={() => setCurrent((prev) => (prev + 1) % posts.length)}
        className="cursor-pointer"
      >
        <NewsCard image={post.imageUrl} excerpt={post.excerpt} />
      </div>

      <div className="flex items-center gap-3">
        {posts.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show news ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-2 w-2 rounded-full transition-all duration-200 ${i === current ? "bg-black" : "bg-black/25"}`}
          />
        ))}
      </div>
    </div>
  );
}
