import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import MobileNav, { NavButton } from "./_components/MobileNav";
import DesktopNav from "./_components/DesktopNav";
import HeroSection from "./_components/HeroSection";
import MobileTestimonialSlider from "./_components/MobileTestimonialSlider";
import MobileNewsSlider from "./_components/MobileNewsSlider";
import ServiceRow from "./_components/ServiceRow";
import PortfolioTile from "./_components/PortfolioTile";
import TestimonialsDesktop from "./_components/TestimonialsDesktop";
import NewsCard from "./_components/NewsCard";
import FooterSocialLinks from "./_components/FooterSocialLinks";
import ScrollAnimations from "./_components/ScrollAnimations";

const HOMEPAGE_QUERY   = `*[_type == "homepage" && _id == "homepage"][0]{ aboutParagraph, portrait, photographerImage }`;
const SERVICES_QUERY   = `*[_type == "servicesPage" && _id == "servicesPage"][0]{ services[]{ title, description, image } }`;
const PROJECTS_QUERY   = `*[_type == "portfolioProject"] | order(order asc)[0...4] { _id, title, image, tags, "slug": slug.current }`;
const TESTIMONIALS_QUERY = `*[_type == "testimonial"] | order(order asc)[0...4] { _id, author, quote, logo }`;
const POSTS_QUERY      = `*[_type == "post"] | order(publishedAt desc)[0...3] { _id, title, excerpt, mainImage }`;

type ServiceItem = { _id: string; title: string; description: string; imageUrl: string };
type ProjectItem = { _id: string; title: string; imageUrl: string; tags: string[]; slug?: string };
type TestimonialItem = { _id: string; author: string; quote: string; logoUrl: string; logoClass: string };
type PostItem = { _id: string; imageUrl: string; excerpt: string };
type SanityImage = { asset?: { _ref?: string; _type?: string } };
type SanityHomepage = { aboutParagraph?: string; portrait?: SanityImage; photographerImage?: SanityImage };
type SanityServicesPage = { services?: { title?: string; description?: string; image?: SanityImage }[] };
type SanityProject = { _id: string; title?: string; image?: SanityImage; tags?: string[]; slug?: string };
type SanityTestimonial = { _id: string; author?: string; quote?: string; logo?: SanityImage };
type SanityPost = { _id: string; mainImage?: SanityImage; excerpt?: string };

const FB_SERVICES: ServiceItem[] = [
  { _id: "s1", title: "Brand Discovery", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "/service-brand.jpg" },
  { _id: "s2", title: "Web design & Dev", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "/service-web.jpg" },
  { _id: "s3", title: "Marketing", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "/service-marketing.jpg" },
  { _id: "s4", title: "Photography", description: "Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.", imageUrl: "/service-photography.jpg" },
];

const FB_PROJECTS: ProjectItem[] = [
  { _id: "p1", title: "Surfers paradise", imageUrl: "/work-surfers.jpg", tags: ["Social Media", "Photography"] },
  { _id: "p2", title: "Cyberpunk caffe", imageUrl: "/work-cyberpunk.jpg", tags: ["Social Media", "Photography"] },
  { _id: "p3", title: "Agency 976", imageUrl: "/work-agency.jpg", tags: ["Social Media", "Photography"] },
  { _id: "p4", title: "Minimal Playground", imageUrl: "/work-minimal.jpg", tags: ["Social Media", "Photography"] },
];

const FB_TESTIMONIALS: TestimonialItem[] = [
  { _id: "t1", author: "Marko Stojković", quote: "A brilliant creative partner who transformed our vision into a unique, high-impact brand identity.", logoUrl: "/logo-marko.svg", logoClass: "h-[19px]" },
  { _id: "t2", author: "Sofia Martínez", quote: "An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.", logoUrl: "/logo-sofia.svg", logoClass: "h-9" },
  { _id: "t3", author: "Lukas Weber", quote: "Professional, precise, and incredibly fast at handling complex product visualizations and templates.", logoUrl: "/logo-lukas.svg", logoClass: "h-[19px]" },
  { _id: "t4", author: "Sarah Jenkins", quote: "A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms.", logoUrl: "/logo-sarah.svg", logoClass: "h-[31px]" },
];

const FB_POSTS: PostItem[] = [
  { _id: "n1", imageUrl: "/news-1.jpg", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n2", imageUrl: "/news-2.jpg", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
  { _id: "n3", imageUrl: "/news-3.jpg", excerpt: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
];

function PortfolioCTA() {
  return (
    <div className="flex w-full items-stretch justify-center gap-3 md:max-w-[465px]">
      <div className="flex w-6 flex-col items-start justify-between py-1">
        <span className="block h-4 w-4 border-l border-t border-[#1f1f1f]" />
        <span className="block h-4 w-4 border-b border-l border-[#1f1f1f]" />
      </div>
      <div className="flex flex-1 flex-col items-start gap-2.5 py-3">
        <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal italic leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">
          Discover how my creativity transforms ideas into impactful digital experiences &mdash; schedule a call with me to get started.
        </p>
        <NavButton label="Let's talk" />
      </div>
      <div className="flex w-6 flex-col items-end justify-between py-1">
        <span className="block h-4 w-4 border-r border-t border-[#1f1f1f]" />
        <span className="block h-4 w-4 border-b border-r border-[#1f1f1f]" />
      </div>
    </div>
  );
}

export default async function Home() {
  const [{ data: rawHomepage }, { data: rawServicesPage }, { data: rawProjects }, { data: rawTestimonials }, { data: rawPosts }] = (await Promise.all([
    sanityFetch({ query: HOMEPAGE_QUERY }),
    sanityFetch({ query: SERVICES_QUERY }),
    sanityFetch({ query: PROJECTS_QUERY }),
    sanityFetch({ query: TESTIMONIALS_QUERY }),
    sanityFetch({ query: POSTS_QUERY }),
  ])) as [
    { data: SanityHomepage | null },
    { data: SanityServicesPage | null },
    { data: SanityProject[] },
    { data: SanityTestimonial[] },
    { data: SanityPost[] },
  ];

  const homeAboutParagraph = rawHomepage?.aboutParagraph ?? "Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here. Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.";
  const portraitUrl        = rawHomepage?.portrait         ? urlFor(rawHomepage.portrait).width(872).height(1228).url()   : "/about-portrait.jpg";
  const photographerUrl    = rawHomepage?.photographerImage ? urlFor(rawHomepage.photographerImage).width(2400).url()     : "/photographer.jpg";

  const rawServicesList = rawServicesPage?.services ?? [];
  const services: ServiceItem[] = rawServicesList.length
    ? rawServicesList.map((s, i) => ({ _id: String(i), title: s.title ?? "", description: s.description ?? "", imageUrl: s.image ? urlFor(s.image).width(302).height(302).url() : "" }))
    : FB_SERVICES;

  const STATIC_PROJECT_IMAGES = ["/work-surfers.jpg", "/work-cyberpunk.jpg", "/work-agency.jpg", "/work-minimal.jpg"];
  const projects: ProjectItem[] = rawProjects?.length
    ? rawProjects.map((p, i) => ({ _id: p._id, title: p.title ?? "", imageUrl: p.image ? urlFor(p.image).width(744).height(744).url() : (STATIC_PROJECT_IMAGES[i] ?? ""), tags: p.tags ?? [], slug: p.slug }))
    : FB_PROJECTS;

  const testimonials: TestimonialItem[] = rawTestimonials?.length
    ? rawTestimonials.map((t) => ({ _id: t._id, author: t.author ?? "", quote: t.quote ?? "", logoUrl: t.logo ? urlFor(t.logo).height(72).url() : "", logoClass: "h-8" }))
    : FB_TESTIMONIALS;

  const posts: PostItem[] = rawPosts?.length
    ? rawPosts.map((p) => ({ _id: p._id, imageUrl: p.mainImage ? urlFor(p.mainImage).width(353).height(469).url() : "", excerpt: p.excerpt ?? "" }))
    : FB_POSTS;

  return (
    <main className="relative w-full [overflow-x:clip] bg-[#bfced1] font-[family-name:var(--font-inter)]">
      <DesktopNav />
      <div className="relative z-10"><HeroSection /></div>

      {/* Bio */}
      <section className="relative z-10 w-full bg-white px-4 py-12 md:px-8 md:py-[120px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-6">
          <div data-animate="" className="flex w-full flex-col items-end gap-3">
            <p className="w-full pr-[10px] text-right font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-[#1f1f1f] md:pr-0">[ 8+ years in industry ]</p>
            <div className="h-px w-full bg-black" />
          </div>
          <div data-animate-stagger-x="" className="mt-[20px] flex w-full flex-col items-center gap-3 font-light uppercase tracking-[-0.08em] leading-[0.84] text-[32px] text-black md:mt-0 md:items-start md:gap-2 md:text-[clamp(48px,6.667vw,96px)]">
            <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal normal-case tracking-normal leading-[1.1] text-[#1f1f1f] md:hidden">001</p>
            <div className="flex items-start gap-3 whitespace-nowrap">
              <span>A creative director&nbsp;&nbsp; /</span>
              <span className="hidden font-[family-name:var(--font-geist-mono)] text-sm font-normal normal-case tracking-normal leading-[1.1] text-[#1f1f1f] md:inline">001</span>
            </div>
            <div className="whitespace-nowrap md:pl-[14.86vw]">Photographer</div>
            <div className="whitespace-nowrap md:pl-[42.36vw]">Born <span className="font-[family-name:var(--font-playfair)] font-normal italic">&amp;</span> raised</div>
            <div className="whitespace-nowrap">on the south side</div>
            <div className="flex items-start gap-6 whitespace-nowrap md:gap-12 md:pl-[42.08vw]">
              <span>of chicago.</span>
              <span className="hidden self-start font-[family-name:var(--font-geist-mono)] text-sm font-normal normal-case tracking-normal leading-[1.1] text-[#1f1f1f] md:-ml-[110px] md:mt-[30px] md:inline">[ creative freelancer ]</span>
            </div>
            <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal normal-case tracking-normal leading-[1.1] text-[#1f1f1f] md:hidden">[ creative freelancer ]</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="relative z-10 w-full bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-8">
            <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:hidden">002</p>
            <p data-animate="" className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:whitespace-nowrap">[ About ]</p>
            <div className="flex flex-col gap-5 md:w-[983px] md:flex-row md:items-end md:gap-8">
              <div data-animate-x-md="" className="flex flex-1 items-stretch gap-3">
                <div className="flex w-6 flex-col items-start justify-between">
                  <span className="block h-4 w-4 border-l border-t border-[#1f1f1f]" />
                  <span className="block h-4 w-4 border-b border-l border-[#1f1f1f]" />
                </div>
                <div className="flex flex-1 items-center py-3">
                  <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{homeAboutParagraph}</p>
                </div>
                <div className="flex w-6 flex-col items-end justify-between">
                  <span className="block h-4 w-4 border-r border-t border-[#1f1f1f]" />
                  <span className="block h-4 w-4 border-b border-r border-[#1f1f1f]" />
                </div>
              </div>
              <div className="flex flex-col items-start gap-6 md:flex-row">
                <p className="hidden font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:block">002</p>
                <div data-animate-focus-md="" className="aspect-[422/594] w-full overflow-hidden md:h-[614px] md:w-[436px] md:aspect-auto">
                  <img src={portraitUrl} alt="" className="h-full w-full object-cover object-center" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width photo */}
      <section data-dark-section className="relative z-10 w-full bg-white">
        <div data-animate-blur="" className="aspect-[375/614] w-full overflow-hidden md:aspect-[1226/767]">
          <img src={photographerUrl} alt="" className="h-full w-full object-cover object-center" />
        </div>
      </section>

      {/* Services */}
      <section data-dark-section className="relative z-10 w-full bg-black px-4 py-12 text-white md:px-8 md:py-[80px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:gap-12">
          <p data-animate="" className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-white">[ services ]</p>
          <div data-animate="" className="flex w-full items-center justify-between whitespace-nowrap font-light uppercase tracking-[-0.08em] leading-none text-[32px] md:text-[clamp(48px,6.667vw,96px)]">
            <span>[{services.length}]</span><span>Deliverables</span>
          </div>
          <div data-animate-stagger="" className="flex flex-col gap-12">
            {services.map((item, i) => <ServiceRow key={item._id} index={i} title={item.title} description={item.description} imageUrl={item.imageUrl} />)}
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="relative z-10 w-full bg-white px-4 py-12 md:px-8 md:py-[80px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:gap-[61px]">
          <div data-animate="" className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:hidden">[ portfolio ]</p>
            <div className="flex w-full items-start justify-between whitespace-nowrap uppercase md:w-auto md:justify-start md:gap-2.5">
              <h2 className="font-light tracking-[-0.08em] leading-[0.86] text-black text-[32px] md:text-[clamp(48px,6.667vw,96px)]">
                <span className="block">Selected</span><span className="block">Work</span>
              </h2>
              <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal leading-[1.1] text-[#1f1f1f]">004</p>
            </div>
            <div className="hidden h-[110px] items-center justify-center md:flex">
              <p className="whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>[ portfolio ]</p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:items-end">
            <div data-animate="" className="flex flex-col gap-6">
              {projects[0] && <PortfolioTile title={projects[0].title} image={projects[0].imageUrl} tags={projects[0].tags} heightClass="h-[390px] md:h-[744px]" className="md:mb-[50px]" href={projects[0].slug ? `/projects/${projects[0].slug}` : undefined} />}
              {projects[1] && <PortfolioTile title={projects[1].title} image={projects[1].imageUrl} tags={projects[1].tags} heightClass="h-[390px] md:h-[699px]" href={projects[1].slug ? `/projects/${projects[1].slug}` : undefined} />}
              <div className="hidden md:mt-[50px] md:block"><PortfolioCTA /></div>
            </div>
            <div data-animate="" className="flex flex-col gap-6 md:pt-[240px]">
              {projects[2] && <PortfolioTile title={projects[2].title} image={projects[2].imageUrl} tags={projects[2].tags} heightClass="h-[390px] md:h-[699px]" className="md:mb-[50px]" href={projects[2].slug ? `/projects/${projects[2].slug}` : undefined} />}
              {projects[3] && <PortfolioTile title={projects[3].title} image={projects[3].imageUrl} tags={projects[3].tags} heightClass="h-[390px] md:h-[744px]" href={projects[3].slug ? `/projects/${projects[3].slug}` : undefined} />}
            </div>
          </div>
          <div className="md:hidden"><PortfolioCTA /></div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative z-10 w-full overflow-hidden bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="relative mx-auto w-full max-w-[1440px]">
          <h2 data-animate="" className="text-center font-bold capitalize tracking-[-0.07em] text-black text-[64px] leading-[0.9] md:hidden">Testimonials</h2>
          <MobileTestimonialSlider testimonials={testimonials} />
          <TestimonialsDesktop testimonials={testimonials} />
        </div>
      </section>

      {/* News */}
      <section className="relative z-10 w-full bg-[#f3f3f3] px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <h2 data-animate="" className="pr-[150px] font-light uppercase tracking-[-0.08em] leading-[0.86] text-black text-[32px] md:hidden md:pr-0">Keep up with my latest news &amp; achievements</h2>
          <div className="mt-8 flex flex-col md:mt-0 md:flex-row md:items-end md:gap-8">
            <div className="hidden h-[706px] w-[110px] shrink-0 items-center justify-center md:flex">
              <div data-animate-stagger="" className="flex flex-col whitespace-nowrap font-light uppercase tracking-[-0.08em] leading-[0.86] text-black text-[64px]" style={{ transform: "rotate(-90deg)" }}>
                <p className="leading-[0.86]">Keep up with my latest</p>
                <p className="leading-[0.86]">news &amp; achievements</p>
              </div>
            </div>
            <div data-animate="" className="hidden gap-4 md:ml-[270px] md:flex md:w-[1020px] md:items-start md:gap-[31px]">
              {posts.flatMap((post, i) => [
                i > 0 && <div key={`divider-${post._id}`} className="hidden w-px self-stretch bg-black/30 md:block" />,
                <NewsCard key={post._id} image={post.imageUrl} excerpt={post.excerpt} topPad={i === 1} />,
              ])}
            </div>
          </div>
          <MobileNewsSlider posts={posts} />
        </div>
      </section>

      {/* Footer */}
      <footer data-dark-section className="sticky bottom-0 z-0 w-full overflow-hidden bg-black px-4 pt-12 text-white md:px-8">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:gap-[120px]">
          <div className="flex flex-col gap-6 md:gap-12">
            <div data-animate="" className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
              <div className="flex w-[298px] flex-col items-start gap-3">
                <p className="text-[24px] font-light italic uppercase tracking-[-0.04em] leading-[1.1] text-white">Have a <span className="font-black not-italic">project</span> in mind?</p>
                <NavButton label="Let's talk" className="border border-solid border-white" />
              </div>
              <FooterSocialLinks />
            </div>
            <div className="h-px w-full bg-white" />
          </div>
          <div data-animate="" className="hidden md:flex md:items-end md:justify-between">
            <div className="relative h-[219px] w-[1093px] overflow-hidden">
              <div className="absolute left-0 top-1/2 flex h-[160px] w-[15px] -translate-y-1/2 items-center justify-center" style={{ top: "calc(50% - 5.5px)" }}>
                <div style={{ transform: "rotate(-90deg)" }}><p className="whitespace-nowrap font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-white">[ Coded By Claude ]</p></div>
              </div>
              <p className="absolute left-0 top-1/2 -translate-y-1/2 whitespace-nowrap font-semibold capitalize text-white text-[290px] leading-[0.8] tracking-[-0.06em]">P.Studio</p>
            </div>
            <div className="flex gap-[34px] pb-8 text-[12px] font-normal uppercase leading-[1.1] tracking-[-0.04em] text-white">
              <a href="#" className="underline">licences</a>
              <a href="#" className="underline">Privacy policy</a>
            </div>
          </div>
          <div data-animate="" className="flex flex-col items-center gap-4 md:hidden">
            <div className="flex gap-[34px] pb-8 text-[12px] font-normal uppercase leading-[1.1] tracking-[-0.04em] text-white">
              <a href="#" className="underline">licences</a>
              <a href="#" className="underline">Privacy policy</a>
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
