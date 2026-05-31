import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import DesktopNav from "../_components/DesktopNav";
import MobileNav, { NavButton } from "../_components/MobileNav";
import ServicesHero from "../_components/ServicesHero";
import TextFillScroll from "../_components/TextFillScroll";
import StatsSection from "../_components/StatsSection";
import MagneticButton from "../_components/MagneticButton";
import FooterSocialLinks from "../_components/FooterSocialLinks";
import ScrollAnimations from "../_components/ScrollAnimations";

const SERVICES_PAGE_QUERY = `*[_type == "servicesPage" && _id == "servicesPage"][0]{ introQuote, services[]{ title, description, image }, processSteps[]{ title, description }, photographerImage }`;
const ABOUT_QUERY = `*[_type == "about" && _id == "about"][0]{ yearsExperience, projectsCompleted, clientsServed, awardsWon }`;

type SanityImage = { asset?: { _ref?: string; _type?: string } };
type ServiceItem = { _id: string; title: string; description: string; imageUrl: string };
type SanityServicesPage = { introQuote?: string; services?: { title?: string; description?: string; image?: SanityImage }[]; processSteps?: { title?: string; description?: string }[]; photographerImage?: SanityImage };
type SanityAbout = { yearsExperience?: number; projectsCompleted?: number; clientsServed?: number; awardsWon?: number };

const FB_SERVICES: ServiceItem[] = [
  { _id: "s1", title: "Brand Discovery", description: "We dig into your market, competitors, and audience to surface the positioning that makes you genuinely different — not just visually, but strategically.", imageUrl: "/service-brand.jpg" },
  { _id: "s2", title: "Web Design & Dev", description: "Design and engineering treated as a single discipline. We build fast, beautiful digital experiences from wireframe to deployed product.", imageUrl: "/service-web.jpg" },
  { _id: "s3", title: "Marketing", description: "Campaigns built around ideas, not templates. We concept, design, and produce marketing work that earns attention rather than buying it.", imageUrl: "/service-marketing.jpg" },
  { _id: "s4", title: "Photography", description: "Every frame is composed to support your brand's story and emotional tone. Product, portrait, and editorial work that looks intentional because it is.", imageUrl: "/service-photography.jpg" },
];

const PROCESS = [
  { num: "01", title: "Discovery",  description: "We dig into your brand, audience, and goals before touching a single pixel. Understanding the problem is half the solution." },
  { num: "02", title: "Strategy",   description: "A clear creative direction that connects business objectives to design decisions. No guesswork — everything is deliberate." },
  { num: "03", title: "Design",     description: "Iterative, craft-first execution across every touchpoint that matters. We show work early and refine together." },
  { num: "04", title: "Deliver",    description: "Production-ready assets, hand-off documentation, and support through launch. We stay until the work is actually live." },
];

export default async function ServicesPage() {
  const [{ data: rawPage }, { data: rawAbout }] = (await Promise.all([
    sanityFetch({ query: SERVICES_PAGE_QUERY }),
    sanityFetch({ query: ABOUT_QUERY }),
  ])) as [{ data: SanityServicesPage | null }, { data: SanityAbout | null }];

  const introQuote = rawPage?.introQuote ?? "Every brief is a chance to build something that outlasts the project.";
  const photographerUrl = rawPage?.photographerImage ? urlFor(rawPage.photographerImage).width(2400).url() : "/photographer.jpg";
  const processSteps = rawPage?.processSteps?.length
    ? rawPage.processSteps.map((s, i) => ({ num: String(i + 1).padStart(2, "0"), title: s.title ?? "", description: s.description ?? "" }))
    : PROCESS;
  const rawServicesList = rawPage?.services ?? [];
  const services: ServiceItem[] = rawServicesList.length
    ? rawServicesList.map((s, i) => ({ _id: String(i), title: s.title ?? "", description: s.description ?? "", imageUrl: s.image ? urlFor(s.image).width(744).height(744).url() : "" }))
    : FB_SERVICES;

  return (
    <main className="relative w-full [overflow-x:clip] bg-[#bfced1] font-[family-name:var(--font-inter)]">
      <DesktopNav />
      <div className="relative z-10"><ServicesHero /></div>

      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]"><TextFillScroll text={introQuote} /></div>
      </section>

      <section className="relative z-10 w-full bg-white pb-16 md:pb-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <p data-animate="" className="mb-12 px-4 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f] md:px-8">[ What we do ]</p>
          <div className="flex flex-col">
            {services.map((service, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={service._id} data-animate="" className={`flex flex-col border-t border-black/10 md:min-h-[500px] md:flex-row${flip ? " md:flex-row-reverse" : ""}`}>
                  <div className="flex flex-col justify-center gap-6 px-4 py-12 md:w-1/2 md:px-16 md:py-20">
                    <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]/40">[ 0{i + 1} ]</p>
                    <h2 className="font-bold italic uppercase tracking-[-0.04em] leading-[1.0] text-black text-[clamp(32px,4vw,64px)]">{service.title}</h2>
                    <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] md:max-w-[400px]">{service.description}</p>
                  </div>
                  {service.imageUrl && (
                    <div className="h-[280px] overflow-hidden md:h-auto md:w-1/2">
                      <img src={service.imageUrl} alt="" className="h-full w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.04]" />
                    </div>
                  )}
                </div>
              );
            })}
            <div className="border-t border-black/10" />
          </div>
        </div>
      </section>

      <section data-dark-section className="relative z-10 w-full bg-white">
        <div data-animate-blur="" className="aspect-[375/614] w-full overflow-hidden md:aspect-[1226/767]">
          <img src={photographerUrl} alt="" className="h-full w-full object-cover object-center" />
        </div>
      </section>

      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <p data-animate="" className="mb-12 font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ How we work ]</p>
          <div data-animate-stagger="" className="grid grid-cols-1 gap-10 md:grid-cols-4 md:gap-8">
            {processSteps.map((step) => (
              <div key={step.num} className="flex flex-col gap-4">
                <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ {step.num} ]</p>
                <div className="h-px w-full bg-black" />
                <h3 className="font-bold uppercase tracking-[-0.04em] leading-[1.1] text-black text-[20px] md:text-[24px]">{step.title}</h3>
                <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StatsSection values={{ yearsExperience: rawAbout?.yearsExperience, projectsCompleted: rawAbout?.projectsCompleted, clientsServed: rawAbout?.clientsServed, awardsWon: rawAbout?.awardsWon }} />

      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
          <div data-animate="" className="flex flex-col gap-6 md:max-w-[700px]">
            <h2 className="font-light uppercase tracking-[-0.07em] leading-[0.9] text-black text-[clamp(40px,6.5vw,90px)]">Ready to start a project?</h2>
            <p className="font-[family-name:var(--font-inter)] text-[14px] font-normal leading-[1.3] tracking-[-0.04em] text-[#1f1f1f] md:max-w-[400px]">Whether you need a full brand overhaul or a single focused deliverable — bring me the brief and let&rsquo;s figure out the rest.</p>
          </div>
          <div data-animate=""><MagneticButton label="Let's talk" /></div>
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
