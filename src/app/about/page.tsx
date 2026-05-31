import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import DesktopNav from "../_components/DesktopNav";
import MobileNav, { NavButton } from "../_components/MobileNav";
import AboutHero from "../_components/AboutHero";
import TextFillScroll from "../_components/TextFillScroll";
import StatsSection from "../_components/StatsSection";
import MagneticButton from "../_components/MagneticButton";
import FooterSocialLinks from "../_components/FooterSocialLinks";
import ScrollAnimations from "../_components/ScrollAnimations";

const ABOUT_QUERY = `*[_type == "about" && _id == "about"][0]{
  portrait, photographerImage, bioBackground, bioApproach, bioVision,
  pullQuote, philosophyDetail1, philosophyDetail2,
  expertise[]{ title, description },
  yearsExperience, projectsCompleted, clientsServed, awardsWon
}`;

type SanityImage = { asset?: { _ref?: string; _type?: string } };
type SanityAbout = {
  portrait?: SanityImage; photographerImage?: SanityImage;
  bioBackground?: string; bioApproach?: string; bioVision?: string;
  pullQuote?: string; philosophyDetail1?: string; philosophyDetail2?: string;
  expertise?: { title?: string; description?: string }[];
  yearsExperience?: number; projectsCompleted?: number; clientsServed?: number; awardsWon?: number;
};

const FB_EXPERTISE = [
  { title: "Brand Identity",     description: "Crafting visual systems that communicate who you are before you say a word — logos, colour, typography, and everything in between." },
  { title: "Web Design & Dev",   description: "Building fast, beautiful digital experiences from concept to code. Design and engineering treated as a single discipline." },
  { title: "Photography",        description: "Capturing moments and products with intention — every frame composed to support your brand's story and emotional tone." },
  { title: "Creative Direction", description: "Overseeing the big picture across campaigns, shoots, and launches so every touchpoint pulls in the same direction." },
];

export default async function AboutPage() {
  const { data: raw } = (await sanityFetch({ query: ABOUT_QUERY })) as { data: SanityAbout | null };

  const bioBackground     = raw?.bioBackground    ?? "Born and raised on the south side of Chicago, I found my way into design through photography — learning early that how something looks is inseparable from how it makes people feel. Over eight years I've worked with brands, agencies, and founders across four continents to shape identities that actually stick.";
  const bioApproach       = raw?.bioApproach      ?? "I treat every project as a system problem. Great visual work isn't decoration — it's structure. I work closely with clients to understand the business, the audience, and the gap between them, then design the bridge. Strategy and craft live in the same room here.";
  const bioVision         = raw?.bioVision        ?? "The work I care about most is the kind that outlasts the brief — brands that grow into institutions, websites that get out of the user's way, photographs that look true twenty years later. That's the bar. Everything I make is aimed at it.";
  const pullQuote         = raw?.pullQuote        ?? "I believe great design is invisible — it feels inevitable, as if it couldn't have been any other way.";
  const philosophyDetail1 = raw?.philosophyDetail1 ?? "Every decision I make is rooted in restraint. Not minimalism for its own sake, but the discipline to remove anything that doesn't earn its place. The result is work that communicates more by saying less.";
  const philosophyDetail2 = raw?.philosophyDetail2 ?? "I've always believed the best creative work happens at the intersection of obsessive attention to detail and genuine curiosity about the people you're designing for.";
  const expertise         = raw?.expertise?.length ? raw.expertise : FB_EXPERTISE;
  const portraitUrl       = raw?.portrait ? urlFor(raw.portrait).width(744).height(744).url() : "/about-portrait.jpg";
  const photographerUrl   = raw?.photographerImage ? urlFor(raw.photographerImage).width(2400).url() : "/photographer.jpg";

  return (
    <main className="relative w-full [overflow-x:clip] bg-[#bfced1] font-[family-name:var(--font-inter)]">
      <DesktopNav />
      <div className="relative z-10"><AboutHero /></div>

      {/* Story */}
      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-20 md:gap-28">
          <TextFillScroll text="I don't just design things — I craft experiences that leave a mark." />
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3 md:flex-row md:gap-16">
              <p className="shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:w-[180px]">[ Background ]</p>
              <p data-animate="" className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] md:max-w-[600px]">{bioBackground}</p>
            </div>
            <div className="h-px w-full bg-black/10" />
            <div className="flex flex-col gap-3 md:flex-row md:gap-16">
              <p className="shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:w-[180px]">[ Approach ]</p>
              <p data-animate="" className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] md:max-w-[600px]">{bioApproach}</p>
            </div>
            <div className="h-px w-full bg-black/10" />
            <div className="flex flex-col gap-3 md:flex-row md:gap-16">
              <p className="shrink-0 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:w-[180px]">[ Vision ]</p>
              <p data-animate="" className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] md:max-w-[600px]">{bioVision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width image */}
      <section data-dark-section className="relative z-10 w-full bg-white">
        <div data-animate-blur="" className="aspect-[375/614] w-full overflow-hidden md:aspect-[1226/767]">
          <img src={photographerUrl} alt="" className="h-full w-full object-cover object-center" />
        </div>
      </section>

      {/* Philosophy */}
      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <p data-animate="" className="mb-12 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ About Harvey ]</p>
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:gap-16">
            <div data-animate="" className="md:w-[55%]">
              <p className="font-[family-name:var(--font-playfair)] text-[clamp(28px,4.5vw,64px)] font-normal italic leading-[1.1] tracking-[-0.04em] text-black">&ldquo;{pullQuote}&rdquo;</p>
            </div>
            <div data-animate="" className="flex flex-1 items-stretch gap-3">
              <div className="flex w-6 flex-col items-start justify-between">
                <span className="block h-4 w-4 border-l border-t border-[#1f1f1f]" />
                <span className="block h-4 w-4 border-b border-l border-[#1f1f1f]" />
              </div>
              <div className="flex flex-1 flex-col justify-center gap-4 py-3">
                <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{philosophyDetail1}</p>
                <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{philosophyDetail2}</p>
              </div>
              <div className="flex w-6 flex-col items-end justify-between">
                <span className="block h-4 w-4 border-r border-t border-[#1f1f1f]" />
                <span className="block h-4 w-4 border-b border-r border-[#1f1f1f]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <StatsSection values={{ yearsExperience: raw?.yearsExperience, projectsCompleted: raw?.projectsCompleted, clientsServed: raw?.clientsServed, awardsWon: raw?.awardsWon }} />

      {/* Expertise */}
      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <p data-animate="" className="mb-12 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ Expertise ]</p>
          <div data-animate-stagger="" className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
            {expertise.map((item, i) => (
              <div key={item.title ?? i} className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ 0{i + 1} ]</p>
                <div className="h-px w-full bg-black" />
                <h3 className="font-bold uppercase tracking-[-0.04em] leading-[1.1] text-black text-[20px] md:text-[24px]">{item.title}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portrait + CTA */}
      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <div data-animate-focus="" className="w-full overflow-hidden md:w-1/2">
            <img src={portraitUrl} alt="" className="h-full w-full object-cover object-center md:max-h-[680px]" />
          </div>
          <div data-animate="" className="flex flex-col items-start gap-8 md:w-1/2">
            <h2 className="font-light uppercase tracking-[-0.07em] leading-[0.9] text-black text-[clamp(40px,6vw,86px)]">Ready to build something meaningful?</h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] md:max-w-[360px]">Whether you&rsquo;re launching something new or levelling up what already exists — let&rsquo;s make it count.</p>
            <MagneticButton label="Let's talk" />
          </div>
        </div>
      </section>

      {/* Footer */}
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
