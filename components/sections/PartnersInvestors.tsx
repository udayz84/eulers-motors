const partners = [
  { src: "/assets/partners-investors/qrg.png", alt: "QRG", width: 79.834, desktopWidth: 223.602 },
  { src: "/assets/partners-investors/moglix.png", alt: "Moglix", width: 64.224, desktopWidth: 179.88 },
  { src: "/assets/partners-investors/jetty.png", alt: "JETTY Ventures", width: 58.531, desktopWidth: 163.934 },
  { src: "/assets/partners-investors/blume.png", alt: "BLUME", width: 58.531, desktopWidth: 163.934 },
  { src: "/assets/partners-investors/gic.png", alt: "GIC", width: 58.531, desktopWidth: 163.934 },
];

function PartnerLogos({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[62px] pr-[62px]" aria-hidden={duplicate}>
      {partners.map((partner) => (
        <img
          key={`${duplicate ? "loop-" : ""}${partner.alt}`}
          src={partner.src}
          alt={duplicate ? "" : partner.alt}
          width={partner.desktopWidth}
          height={100}
          className="h-[100px] shrink-0 object-contain"
          style={{ width: `${partner.desktopWidth}px` }}
        />
      ))}
    </div>
  );
}

interface PartnersInvestorsProps {
  title?: string;
}

export default function PartnersInvestors({
  title = "Trusted by investors.",
}: PartnersInvestorsProps) {
  return (
    <section
      aria-labelledby="partners-investors-title"
      className="relative h-[300px] overflow-hidden text-white px-5 py-[42px] sm:px-8 lg:h-[370px] lg:p-0"
      style={{
        background:
          "linear-gradient(180deg, #041231 0%, #041231 45%, rgba(4, 18, 49, 0) 100%), linear-gradient(0deg, rgba(29, 111, 255, 0.55) -20%, rgba(14, 47, 109, 0) 55%), linear-gradient(0deg, rgba(0, 0, 0, 0.40) 0%, rgba(0, 0, 0, 0.40) 100%), linear-gradient(272deg, #0E2F6D -63.51%, #1D6FFF 87.23%)",
      }}
    >
      {/* Decorative orbit ring + blue glow from Figma, layered above the background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-423.63px] top-[-484.38px] size-[1335.635px]">
          <div className="absolute inset-[-1.73%]">
            <img src="/assets/partners-investors/orbit.svg" alt="" className="block size-full max-w-none" />
          </div>
        </div>
        <div className="absolute left-1/2 top-[255px] h-[482.379px] w-[2475.52px] -translate-x-1/2 opacity-75">
          <div className="absolute inset-y-[-43.95%] inset-x-[-8.56%]">
            <img src="/assets/partners-investors/blue-glow.svg" alt="" className="block size-full max-w-none" />
          </div>
        </div>
      </div>

      {/* Edge gradient masks to fade logos cleanly into the #041231 background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-[130px] bottom-0 z-10 w-[80px] lg:inset-y-0 lg:w-[260px]"
        style={{
          background: "linear-gradient(90deg, #041231 0%, rgba(4, 18, 49, 0) 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-[130px] bottom-0 z-10 w-[80px] lg:inset-y-0 lg:w-[260px]"
        style={{
          background: "linear-gradient(270deg, #041231 0%, rgba(4, 18, 49, 0) 100%)",
        }}
      />

      {/* Desktop Layout */}
      <header className="absolute left-1/2 top-[60px] hidden w-max -translate-x-1/2 flex-col items-center gap-4 lg:flex">
        <div className="relative flex h-[20.355px] items-center gap-[6px] whitespace-nowrap">
          <img
            src="/assets/partners-investors/underline.svg"
            alt=""
            className="absolute left-[3px] top-0 h-[20.355px] w-[148.8px]"
          />
          <img
            src="/assets/partners-investors/badge-mark.svg"
            alt=""
            className="relative h-[20.355px] w-[18.8px] shrink-0"
          />
          <p className="relative font-sans text-[14px] font-bold uppercase tracking-[0.7px]">
            Partners and investors
          </p>
        </div>
        <h2
          id="partners-investors-title"
          className="whitespace-nowrap font-display text-[42px] font-semibold not-italic leading-normal tracking-[-0.84px] text-white"
        >
          {title}
        </h2>
      </header>

      <div
        aria-label="Our partners and investors"
        className="partners-logo-loop absolute left-[-548px] top-[217px] hidden w-max lg:flex"
      >
        <PartnerLogos />
        <PartnerLogos duplicate />
        <PartnerLogos duplicate />
      </div>

      {/* Mobile Layout - Figma Design */}
      <div className="lg:hidden absolute flex flex-col gap-[14px] items-start left-5 sm:left-8 top-[42.33px] w-[calc(100%-40px)] sm:w-[calc(100%-64px)] max-w-[500px]">
        <div className="flex gap-[4px] items-center relative shrink-0 w-full">
          <div className="absolute h-[16px] left-[3.43px] top-[0.33px] w-[116.978px] overflow-hidden">
            <img
              src="/assets/partners-investors/underline.svg"
              alt=""
              className="block max-w-none size-full"
            />
          </div>
          <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
            <img
              src="/assets/partners-investors/badge-mark.svg"
              alt=""
              className="block max-w-none size-full"
            />
          </div>
          <p className="font-sans font-bold leading-normal relative shrink-0 text-[12px] text-white tracking-[0.6px] uppercase whitespace-nowrap">
            Partners and investors
          </p>
        </div>
        <p className="font-display text-[28px] sm:text-[34px] font-semibold leading-[1.15] not-italic relative shrink-0 text-white tracking-[-0.56px] whitespace-nowrap">
          {title}
        </p>
      </div>

      <div className="lg:hidden absolute content-stretch flex gap-[24px] items-center left-[-276px] top-[138.15px] animate-logo-scroll-right w-max">
        {partners.map((partner) => (
          <img
            key={partner.alt}
            src={partner.src}
            alt={partner.alt}
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
        {partners.map((partner) => (
          <img
            key={`${partner.alt}-duplicate`}
            src={partner.src}
            alt=""
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
        {partners.map((partner) => (
          <img
            key={`${partner.alt}-triplicate`}
            src={partner.src}
            alt=""
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
        {partners.map((partner) => (
          <img
            key={`${partner.alt}-quad`}
            src={partner.src}
            alt=""
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
      </div>

      <div className="lg:hidden absolute content-stretch flex gap-[24px] items-center left-[-116px] top-[198.15px] animate-logo-scroll-left w-max">
        {partners.map((partner) => (
          <img
            key={`${partner.alt}-row2`}
            src={partner.src}
            alt=""
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
        {partners.map((partner) => (
          <img
            key={`${partner.alt}-row2-duplicate`}
            src={partner.src}
            alt=""
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
        {partners.map((partner) => (
          <img
            key={`${partner.alt}-row2-triplicate`}
            src={partner.src}
            alt=""
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
        {partners.map((partner) => (
          <img
            key={`${partner.alt}-row2-quad`}
            src={partner.src}
            alt=""
            width={partner.width}
            height={35.704}
            className="h-[35.704px] relative shrink-0 object-contain"
            style={{ width: `${partner.width}px` }}
          />
        ))}
      </div>
    </section>
  );
}
