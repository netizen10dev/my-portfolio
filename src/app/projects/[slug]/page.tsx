import { sanityFetch } from "@/sanity/lib/live";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import DesktopNav from "../../_components/DesktopNav";
import MobileNav, { NavButton } from "../../_components/MobileNav";
import FooterSocialLinks from "../../_components/FooterSocialLinks";
import ScrollAnimations from "../../_components/ScrollAnimations";

const PROJECT_QUERY = `*[_type == "portfolioProject" && slug.current == $slug][0]{ title, slug, image, description, client, year, url, tags }`;
const ALL_SLUGS_QUERY = `*[_type == "portfolioProject"]{ "slug": slug.current }`;

type SanityImage = { asset?: { _ref?: string; _type?: string } };
type Project = { title?: string; slug?: { current?: string }; image?: SanityImage; description?: string; client?: string; year?: number; url?: string; tags?: string[] };

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_SLUGS_QUERY);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: project } = (await sanityFetch({ query: PROJECT_QUERY, params: { slug } })) as { data: Project | null };

  if (!project?.title) notFound();

  const imageUrl = project.image ? urlFor(project.image).width(1440).height(900).url() : null;

  return (
    <main className="relative w-full [overflow-x:clip] bg-[#bfced1] font-[family-name:var(--font-inter)]">
      <DesktopNav />

      <section data-dark-section className="relative z-10 flex min-h-screen w-full items-end bg-black px-4 pb-16 md:px-8 md:pb-[80px]">
        {imageUrl && (
          <div className="absolute inset-0 overflow-hidden">
            <img src={imageUrl} alt="" className="h-full w-full object-cover object-center opacity-40" />
          </div>
        )}
        <div className="relative z-10 mx-auto w-full max-w-[1440px]">
          <p className="mb-6 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-white/60">[ Portfolio ]</p>
          <h1 className="mb-8 font-light uppercase tracking-[-0.07em] leading-[0.9] text-white text-[clamp(48px,8vw,120px)]">{project.title}</h1>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-3xl border border-white/30 px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-white">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex flex-col">
            {project.client && (<><div data-animate="" className="flex flex-col gap-3 py-10 md:flex-row md:gap-16"><p className="shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:w-[180px]">[ Client ]</p><p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{project.client}</p></div><div className="h-px w-full bg-black/10" /></>)}
            {project.year && (<><div data-animate="" className="flex flex-col gap-3 py-10 md:flex-row md:gap-16"><p className="shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:w-[180px]">[ Year ]</p><p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{project.year}</p></div><div className="h-px w-full bg-black/10" /></>)}
            {project.description && (<><div data-animate="" className="flex flex-col gap-3 py-10 md:flex-row md:gap-16"><p className="shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:w-[180px]">[ About ]</p><p className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] md:max-w-[600px]">{project.description}</p></div><div className="h-px w-full bg-black/10" /></>)}
            {project.url && (<><div data-animate="" className="flex flex-col gap-3 py-10 md:flex-row md:gap-16"><p className="shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:w-[180px]">[ Live Project ]</p><a href={project.url} target="_blank" rel="noopener noreferrer" className="font-[family-name:var(--font-inter)] text-[14px] leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] underline underline-offset-4 transition-opacity hover:opacity-50">{project.url}</a></div><div className="h-px w-full bg-black/10" /></>)}
          </div>
          <div data-animate="" className="mt-16">
            <Link href="/" className="inline-flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-[#1f1f1f] transition-opacity hover:opacity-50">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 12H7M7 12L12 7M7 12L12 17" /></svg>
              All Projects
            </Link>
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
              <p className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-semibold capitalize text-white text-[290px] leading-[0.8] tracking-[-0.06em]">P.Studio</p>
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
              <p className="whitespace-nowrap font-semibold capitalize text-white text-[91px] leading-[0.8] tracking-[-0.06em]">P.Studio</p>
            </div>
          </div>
        </div>
      </footer>
      <MobileNav />
      <ScrollAnimations />
    </main>
  );
}
