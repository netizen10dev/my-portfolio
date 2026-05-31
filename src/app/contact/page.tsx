import { sanityFetch } from "@/sanity/lib/live";
import DesktopNav from "../_components/DesktopNav";
import MobileNav, { NavButton } from "../_components/MobileNav";
import ContactHero from "../_components/ContactHero";
import MagneticButton from "../_components/MagneticButton";
import FooterSocialLinks from "../_components/FooterSocialLinks";
import ScrollAnimations from "../_components/ScrollAnimations";

const CONTACT_QUERY = `*[_type == "contactPage" && _id == "contactPage"][0]{ heading, subheading, email, phone, location }`;

type SanityContactPage = { heading?: string; subheading?: string; email?: string; phone?: string; location?: string };

export default async function ContactPage() {
  const { data: raw } = (await sanityFetch({ query: CONTACT_QUERY })) as { data: SanityContactPage | null };

  const heading    = raw?.heading    ?? "Ready to start something?";
  const subheading = raw?.subheading ?? "We take on a small number of projects each year to keep our focus sharp and our quality high. If you've got a brief — or just an idea — let's figure out the rest together.";
  const email      = raw?.email      ?? "hello@hstudio.com";
  const phone      = raw?.phone      ?? null;
  const location   = raw?.location   ?? "Chicago, IL";

  return (
    <main className="relative w-full [overflow-x:clip] bg-[#bfced1] font-[family-name:var(--font-inter)]">
      <DesktopNav />
      <div className="relative z-10"><ContactHero /></div>

      <section className="relative z-10 w-full bg-white px-4 py-16 md:px-8 md:py-[120px]">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="flex flex-col gap-16 md:flex-row md:items-start md:justify-between md:gap-20">
            <div data-animate="" className="flex flex-col gap-8 md:max-w-[560px]">
              <p className="font-[family-name:var(--font-geist-mono)] text-sm font-normal uppercase leading-[1.1] text-[#1f1f1f]">[ Contact ]</p>
              <h2 className="text-[clamp(28px,4vw,56px)] font-light uppercase tracking-[-0.06em] leading-[0.9] text-black">{heading}</h2>
              <p className="font-[family-name:var(--font-inter)] text-[15px] font-normal leading-[1.5] tracking-[-0.02em] text-[#1f1f1f]/70 md:max-w-[440px]">{subheading}</p>
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                  <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-[#1f1f1f]/40">Email</p>
                  <a href={`mailto:${email}`} className="text-[15px] font-medium tracking-[-0.02em] text-black underline-offset-4 hover:underline">{email}</a>
                </div>
                {phone && (
                  <div className="flex flex-col gap-1">
                    <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-[#1f1f1f]/40">Phone</p>
                    <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-[15px] font-medium tracking-[-0.02em] text-black underline-offset-4 hover:underline">{phone}</a>
                  </div>
                )}
                {location && (
                  <div className="flex flex-col gap-1">
                    <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-wider text-[#1f1f1f]/40">Location</p>
                    <p className="text-[15px] font-medium tracking-[-0.02em] text-black">{location}</p>
                  </div>
                )}
              </div>
            </div>
            <div data-animate="" className="flex flex-col items-start gap-6 md:items-center md:pt-24">
              <p className="font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-[#1f1f1f]/40">[ Send us a message ]</p>
              <MagneticButton label="Let's talk" />
            </div>
          </div>
          <div className="mt-16 h-px w-full bg-black/10 md:mt-[120px]" />
          <div data-animate="" className="mt-8 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p className="font-[family-name:var(--font-geist-mono)] text-xs uppercase leading-[1.1] tracking-wider text-[#1f1f1f]/40">Current availability</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              <p className="font-[family-name:var(--font-inter)] text-sm font-medium tracking-[-0.02em] text-black">Open to new projects — Q3 2026</p>
            </div>
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
