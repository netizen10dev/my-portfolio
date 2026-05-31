import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import DesktopNav from "../_components/DesktopNav";
import MobileNav, { NavButton } from "../_components/MobileNav";
import NewsHero from "../_components/NewsHero";
import FooterSocialLinks from "../_components/FooterSocialLinks";
import ScrollAnimations from "../_components/ScrollAnimations";

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) { _id, title, excerpt, mainImage, tags, publishedAt, "slug": slug.current }`;

type SanityImage = { asset?: { _ref?: string; _type?: string } };
type SanityPost = { _id: string; title?: string; excerpt?: string; mainImage?: SanityImage; tags?: string[]; publishedAt?: string; slug?: string };
type PostItem = { _id: string; title: string; excerpt: string; imageUrl: string; tags: string[]; date: string; slug?: string };

const FB_POSTS: PostItem[] = [
  { _id: "n1", title: "The Brief Is Not the Problem",      date: "May 2026", imageUrl: "/news-1.jpg", tags: ["Process"],  excerpt: "Most creative blocks aren't creative problems. They're clarity problems. Here's how we approach a blank brief." },
  { _id: "n2", title: "What Makes a Brand Actually Work",  date: "Apr 2026", imageUrl: "/news-2.jpg", tags: ["Branding"], excerpt: "A logo isn't a brand. Neither is a colour palette. Here's what actually moves the needle for the clients we work with." },
  { _id: "n3", title: "Building for Longevity, Not Trends", date: "Mar 2026", imageUrl: "/news-3.jpg", tags: ["Design"],   excerpt: "Trend-chasing is a losing game. The work that lasts is rooted in principles, not aesthetics of the moment." },
];

function formatDate(iso?: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export default async function NewsPage() {
  const { data: rawPosts } = (await sanityFetch({ query: POSTS_QUERY })) as { data: SanityPost[] | null };

  const posts: PostItem[] = rawPosts?.length
    ? rawPosts.map((p) => ({ _id: p._id, title: p.title ?? "", excerpt: p.excerpt ?? "", imageUrl: p.mainImage ? urlFor(p.mainImage).width(744).height(500).url() : "", tags: p.tags ?? [], date: formatDate(p.publishedAt), slug: p.slug }))
    : FB_POSTS;

  return (
    <main className="relative w-full [overflow-x:clip] bg-[#bfced1] font-[family-name:var(--font-inter)]">
      <DesktopNav />
      <div className="relative z-10"><NewsHero /></div>

      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <p data-animate="" className="mb-12 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ {posts.length} {posts.length === 1 ? "Article" : "Articles"} ]</p>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {posts.map((post) => (
              <article key={post._id} data-animate="" className="flex flex-col gap-4 group cursor-pointer">
                <div className="overflow-hidden aspect-[3/2]">
                  {post.imageUrl && <img src={post.imageUrl} alt="" className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.04]" />}
                </div>
                <div className="flex items-center gap-3">
                  {post.tags.slice(0, 1).map((tag) => (
                    <span key={tag} className="rounded-3xl border border-black/10 px-2.5 py-1 font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] text-[#1f1f1f]/50">{tag}</span>
                  ))}
                  {post.date && <span className="font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] text-[#1f1f1f]/30">{post.date}</span>}
                </div>
                <h2 className="text-[20px] font-bold uppercase tracking-[-0.04em] leading-[1.1] text-black md:text-[24px]">{post.title}</h2>
                {post.excerpt && <p className="text-[14px] font-normal leading-[1.4] tracking-[-0.02em] text-[#1f1f1f]/60">{post.excerpt}</p>}
                <div className="flex items-center gap-2 text-[13px] font-medium tracking-[-0.02em] text-black">
                  <span>Read more</span>
                  <svg viewBox="0 0 24 24" className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer data-dark-section className="sticky bottom-0 z-0 w-full overflow-hidden bg-black px-4 pt-12 text-white md:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:gap-[120px]">
          <div className="flex flex-col gap-6 md:gap-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="flex w-[298px] flex-col items-start gap-3">
                <p className="text-[24px] font-light italic uppercase tracking-[-0.04em] leading-[1.1] text-white">Have a <span className="font-black not-italic">project</span> in mind?</p>
                <NavButton label="Let's talk" className="border border-solid border-white" />
              </div>
              <FooterSocialLinks />
            </div>
            <div className="h-px w-full bg-white" />
          </div>
          <div className="hidden md:flex md:items-end md:justify-between">
            <div className="relative h-[219px] w-[1093px] overflow-hidden">
              <div className="absolute left-0 top-1/2 flex h-[160px] w-[15px] -translate-y-1/2 items-center justify-center" style={{ top: "calc(50% - 5.5px)" }}>
                <div style={{ transform: "rotate(-90deg)" }}><p className="whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-white">[ Coded By Claude ]</p></div>
              </div>
              <p className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-semibold capitalize text-white text-[290px] leading-[0.8] tracking-[-0.06em]">H.Studio</p>
            </div>
            <div className="flex gap-[34px] pb-8 text-[12px] font-normal uppercase leading-[1.1] tracking-[-0.04em] text-white">
              <a href="#" className="underline">licences</a><a href="#" className="underline">Privacy policy</a>
            </div>
          </div>
          <div className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex gap-[34px] pb-8 text-[12px] font-normal uppercase leading-[1.1] tracking-[-0.04em] text-white">
              <a href="#" className="underline">licences</a><a href="#" className="underline">Privacy policy</a>
            </div>
            <div className="flex w-full flex-col items-start gap-3 overflow-hidden">
              <p className="font-[family-name:var(--font-geist-mono)] text-[10px] font-normal uppercase leading-[1.1] text-white">[ Coded By Claude ]</p>
              <p className="whitespace-nowrap font-semibold capitalize text-white text-[91px] leading-[0.8] tracking-[-0.06em]">H.Studio</p>
            </div>
          </div>
        </div>
      </footer>
      <MobileNav />
      <ScrollAnimations />
    </main>
  );
}
