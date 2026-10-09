const partners = [
  { src: "/assets/partners-investors/qrg.png", alt: "QRG", width: 223.602 },
  { src: "/assets/partners-investors/moglix.png", alt: "Moglix", width: 179.88 },
  { src: "/assets/partners-investors/jetty.png", alt: "JETTY Ventures", width: 163.934 },
  { src: "/assets/partners-investors/blume.png", alt: "BLUME", width: 163.934 },
  { src: "/assets/partners-investors/gic.png", alt: "GIC", width: 163.934 },
];

function PartnerLogos({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-[62px] pr-[62px]" aria-hidden={duplicate}>
      {partners.map((partner) => (
        <img
          key={`${duplicate ? "loop-" : ""}${partner.alt}`}
          src={partner.src}
          alt={duplicate ? "" : partner.alt}
          width={partner.width}
          height={100}
          className="h-[100px] shrink-0 object-contain"
          style={{ width: `${partner.width}px` }}
        />
      ))}
    </div>
  );
}

export default function PartnersInvestors() {
  return (
    <section
      aria-labelledby="partners-investors-title"
      className="relative h-[329px] overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(0deg, #041231 0%, #041231 100%), url('/assets/partners-investors/background.png') center / cover no-repeat, linear-gradient(258deg, #0E2F6D -138.16%, #1D6FFF 87.02%), #FFF",
      }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-423.63px] top-[-484.38px] size-[1335.635px]">
          <div className="absolute inset-[-1.73%]">
            <img src="/assets/partners-investors/orbit.svg" alt="" className="block size-full max-w-none" />
          </div>
        </div>
        <div className="absolute left-1/2 top-[255px] h-[482.379px] w-[2475.52px] -translate-x-1/2">
          <div className="absolute inset-y-[-43.95%] inset-x-[-8.56%]">
            <img src="/assets/partners-investors/blue-glow.svg" alt="" className="block size-full max-w-none" />
          </div>
        </div>
      </div>

      <header className="absolute left-1/2 top-[50px] flex w-max -translate-x-1/2 flex-col items-center gap-4">
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
          className="whitespace-nowrap font-display text-[42px] font-semibold leading-[normal] tracking-[-0.84px] max-[600px]:text-[28px]"
        >
          Trusted network partners
        </h2>
      </header>

      <div
        aria-label="Our partners and investors"
        className="partners-logo-loop absolute left-[-548px] top-[178px] flex w-max"
      >
        <PartnerLogos />
        <PartnerLogos duplicate />
        <PartnerLogos duplicate />
      </div>
    </section>
  );
}
