import HeroParallax from "./HeroParallax";
import { NavButton } from "./MobileNav";

export default function HeroSection() {
  return (
    <HeroParallax>
      <section className="relative min-h-screen w-full overflow-hidden bg-[#bfced1]">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <img
            data-hero-bg=""
            src="/harvey-hero.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-[200px] md:h-[310px] backdrop-blur-[16px] md:backdrop-blur-[20px]"
          style={{
            maskImage: "linear-gradient(to bottom, transparent, black)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black)",
          }}
        />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1440px] flex-col px-4 md:px-8">
          <div className="flex flex-1 flex-col justify-end pb-[4px] md:pb-[154px]">
            <div className="flex w-full flex-col items-center">
              <p
                data-hero-hello=""
                className="-translate-x-[25px] self-center font-[family-name:var(--font-geist-mono)] text-sm uppercase leading-[1.1] text-white/70 md:translate-x-0 md:self-start md:pl-[48px]"
              >
                [ Hello i&rsquo;m ]
              </p>
              <h1
                className="w-full text-center font-medium capitalize tracking-[-0.07em] text-[96px] leading-[0.8] md:whitespace-nowrap md:text-[clamp(72px,13.75vw,198px)] md:leading-[1.1]"
                style={{
                  color: "rgba(255, 255, 255, 0.6)",
                  mixBlendMode: "overlay",
                  textShadow: "0 0 1.5px rgba(255,255,255,0.35)",
                  filter: "blur(0.4px)",
                }}
              >
                <span data-hero-harvey="" className="block md:inline-block">Harvey&nbsp;&nbsp;</span>
                <span data-hero-specter="" className="block -translate-x-[25px] md:inline-block md:translate-x-0">Specter</span>
              </h1>
            </div>

            <div className="relative mt-4 flex w-full -translate-x-[40px] justify-start md:translate-x-0 md:justify-end">
              <div className="relative flex w-[452px] flex-col items-start gap-4 pl-[100px] md:w-[294px] md:pl-0">
                <p className="pr-[60px] text-sm font-bold italic uppercase leading-[1.1] tracking-[-0.04em] text-[#1f1f1f] md:pr-0">
                  H.Studio is a{" "}
                  <span className="font-normal italic">full-service</span>{" "}
                  creative studio creating beautiful digital experiences and
                  products. We are an{" "}
                  <span className="font-normal italic">award winning</span>{" "}
                  desing and art group specializing in branding, web design and
                  engineering.
                </p>
                <NavButton label="Let's talk" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </HeroParallax>
  );
}
