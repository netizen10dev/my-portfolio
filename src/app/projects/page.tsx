import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import DesktopNav from "../_components/DesktopNav";
import MobileNav, { NavButton } from "../_components/MobileNav";
import ProjectsHero from "../_components/ProjectsHero";
import PortfolioTile from "../_components/PortfolioTile";
import FooterSocialLinks from "../_components/FooterSocialLinks";
import ScrollAnimations from "../_components/ScrollAnimations";

const PROJECTS_QUERY = `*[_type == "portfolioProject"] | order(order asc) { _id, title, image, tags, "slug": slug.current }`;

type SanityImage = { asset?: { _ref?: string; _type?: string } };
type SanityProject = { _id: string; title?: string; image?: SanityImage; tags?: string[]; slug?: string };
type ProjectItem = { _id: string; title: string; imageUrl: string; tags: string[]; slug?: string };

const STATIC_IMAGES = ["/work-surfers.jpg", "/work-cyberpunk.jpg", "/work-agency.jpg", "/work-minimal.jpg"];
const FB_PROJECTS: ProjectItem[] = [
  { _id: "p1", title: "Surfers Paradise",   imageUrl: "/work-surfers.jpg",  tags: ["Social Media", "Photography"] },
  { _id: "p2", title: "Cyberpunk Caffe",    imageUrl: "/work-cyberpunk.jpg", tags: ["Branding", "Photography"] },
  { _id: "p3", title: "Agency 976",         imageUrl: "/work-agency.jpg",   tags: ["Web Design", "Branding"] },
  { _id: "p4", title: "Minimal Playground", imageUrl: "/work-minimal.jpg",  tags: ["Web Design", "Development"] },
];

export default async function ProjectsPage() {
  const { data: rawProjects } = (await sanityFetch({ query: PROJECTS_QUERY })) as { data: SanityProject[] | null };

  const projects: ProjectItem[] = rawProjects?.length
    ? rawProjects.map((p, i) => ({ _id: p._id, title: p.title ?? "", imageUrl: p.image ? urlFor(p.image).width(744).height(744).url() : (STATIC_IMAGES[i % STATIC_IMAGES.length] ?? ""), tags: p.tags ?? [], slug: p.slug }))
    : FB_PROJECTS;

  return (
    <main className="relative w-full [overflow-x:clip] bg-[#bfced1] font-[family-name:var(--font-inter)]">
      <DesktopNav />
      <div className="relative z-10"><ProjectsHero /></div>

      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <p data-animate="" className="mb-12 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ {projects.length} {projects.length === 1 ? "Project" : "Projects"} ]</p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <div key={project._id} data-animate="">
                <PortfolioTile title={project.title} image={project.imageUrl} tags={project.tags} heightClass="h-[390px] md:h-[560px]" href={project.slug ? `/projects/${project.slug}` : undefined} />
              </div>
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
