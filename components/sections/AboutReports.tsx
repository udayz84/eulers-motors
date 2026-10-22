import Image from "next/image";
import Link from "next/link";
import Eyebrow from "../ui/Eyebrow";

/* Desktop swaps the file mark on row 3 (ESG Report); mobile uses the one
   28×32 mark for every row (Figma 3538:20429… · 2937:15656…). */
const REPORTS = [
  { name: "Annual report.pdf", size: "2.4", icon: "a" },
  { name: "Sustainability profile.pdf", size: "2.4", icon: "a" },
  { name: "ESG Report.pdf", size: "5.4", icon: "b" },
  { name: "CSR Report.pdf", size: "8.4", icon: "a" },
];

/**
 * ESG Reports & Policies (desktop Figma 3537:20215 · mobile 2937:15450).
 * Desktop: centered header, photo left and the #fafafa report list right;
 * mobile: the list full-width with a "View All" pill below.
 */
export default function AboutReports() {
  return (
    <section className="bg-white py-8 lg:py-[60px]" aria-label="ESG reports and policies">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-5 sm:gap-8 px-5 sm:px-8 lg:gap-[55px] lg:px-20">
        {/* Header — left on mobile · centered on desktop */}
        <div className="relative flex w-full flex-col items-start gap-[14px] lg:items-center lg:gap-4">
          <Eyebrow label="Reports and disclosures" />
          <h2 className="font-display text-[28px] sm:text-[36px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:whitespace-nowrap lg:text-[52px] lg:tracking-[-1.04px]">
            ESG Reports &amp; Policies
          </h2>
          {/* Soft white fade over the header's right edge (2937:15457) */}
          <div
            aria-hidden
            className="pointer-events-none absolute right-[-19.99px] top-[145.71px] h-[49.664px] w-[54.598px] lg:hidden"
            style={{
              backgroundImage:
                "linear-gradient(-89.9999956537512deg, rgb(255, 255, 255) 13.618%, rgba(255, 255, 255, 0) 100%)",
            }}
          />
        </div>

        {/* Photo + report list (desktop: photo left, list right — Figma 3537:20280) */}
        <div className="flex w-full flex-col gap-5 lg:flex-row lg:items-center lg:gap-8">
          <div className="relative hidden min-h-px flex-1 self-stretch overflow-hidden rounded-[12px] lg:block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/about-euler/reports-photo.png"
              alt=""
              className="absolute left-[-37.34%] top-[-25.16%] h-[125.16%] w-[138.58%] max-w-none object-cover"
            />
          </div>

          <div className="w-full max-w-[680px] overflow-clip rounded-[12px] border border-[#bfbfbf] bg-[#fafafa] lg:max-w-none lg:h-[535.369px] lg:w-[569.233px] lg:border-[1.613px]">
            {REPORTS.map((report) => (
              <div
                key={report.name}
                className="flex h-[83px] sm:h-[96px] items-center justify-between border-b border-[rgba(38,51,73,0.2)] bg-[#fafafa] p-4 sm:p-5 lg:h-[133.842px] lg:border-b-[1.613px] lg:p-[25.801px]"
              >
                <div className="flex items-center gap-4 lg:gap-[25.801px]">
                  <Image
                    src="/assets/about-euler/report-file-m.svg"
                    alt=""
                    width={28}
                    height={32}
                    className="h-8 w-7 shrink-0 lg:hidden"
                  />
                  <Image
                    src={
                      report.icon === "b"
                        ? "/assets/about-euler/report-file-b.svg"
                        : "/assets/about-euler/report-file-a.svg"
                    }
                    alt=""
                    width={45}
                    height={52}
                    className="hidden h-[51.602px] w-[45.152px] shrink-0 lg:block"
                  />
                  <div className="flex flex-col gap-1 lg:gap-[6.45px]">
                    <p className="whitespace-nowrap text-[16px] sm:text-[18px] font-semibold tracking-[-0.32px] text-ink lg:text-[26px] lg:tracking-[-0.52px]">
                      {report.name}
                    </p>
                    <p className="whitespace-pre text-[12px] sm:text-[14px] font-normal text-[rgba(18,18,18,0.8)] lg:text-[18px]">
                      {`File size: ${report.size}  MB`}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-[7px] lg:gap-[11.288px]">
                  <Link
                    href="/products"
                    aria-label={`Download ${report.name}`}
                    className="flex size-8 sm:size-9 items-center justify-center rounded-[4px] bg-ink lg:size-[50px] lg:rounded-[6px] hover:bg-black transition-colors"
                  >
                    <span className="relative block size-4 overflow-clip lg:size-[25.801px]">
                      <span className="absolute inset-[18.75%_16.67%]">
                        <Image
                          src="/assets/about-euler/reports-download-m.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="absolute inset-[-7.5%_-7.04%] size-full !max-w-none lg:hidden"
                        />
                        <Image
                          src="/assets/about-euler/reports-download.svg"
                          alt=""
                          width={26}
                          height={26}
                          className="absolute inset-[-7.5%_-7.03%] hidden size-full !max-w-none lg:block"
                        />
                      </span>
                    </span>
                  </Link>
                  <Link
                    href="/products"
                    aria-label={`View ${report.name}`}
                    className="flex size-8 sm:size-9 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-surface lg:size-[50px] lg:rounded-[6px] lg:border-[1.613px] hover:bg-white transition-colors"
                  >
                    <span className="relative block size-4 overflow-clip lg:size-[25.801px]">
                      <span className="absolute inset-[12.5%_8.33%]">
                        <Image
                          src="/assets/about-euler/reports-eye-m.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="absolute inset-[-8.03%_-5.62%_-8.04%_-5.63%] size-full !max-w-none lg:hidden"
                        />
                        <Image
                          src="/assets/about-euler/reports-eye.svg"
                          alt=""
                          width={26}
                          height={26}
                          className="absolute inset-[-8.04%_-5.63%_-8.04%_-5.62%] hidden size-full !max-w-none lg:block"
                        />
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All — mobile only */}
        <Link
          href="/products"
          className="flex h-8 sm:h-9 shrink-0 items-center justify-center rounded-[4px] border border-[rgba(18,18,18,0.5)] bg-surface px-5 sm:px-7 lg:hidden hover:bg-white transition-colors"
        >
          <span className="font-display text-[12px] sm:text-[14px] font-bold leading-none text-ink">
            View All
          </span>
        </Link>
      </div>
    </section>
  );
}
