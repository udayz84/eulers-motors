import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";

const SUPPORT_ITEMS = [
  {
    title: "Medical Cover",
    description: "Cover for you, spouse, children, and parents.",
    left: "-62.93%",
    top: "-8.32%",
  },
  {
    title: "Learning Budget",
    description: "Paid courses, workshops, and global certs.",
    left: "-190.28%",
    top: "-8.32%",
  },
  {
    title: "Flexible Leave",
    description: "Take the time you need comfortably.",
    left: "-335.71%",
    top: "-8.32%",
  },
  {
    title: "Counseling",
    description: "Confidential mental health support, free of cost.",
    left: "-466.27%",
    top: "-8.32%",
  },
  {
    title: "Equity Options",
    description: "Own a stake in the mobility revolution.",
    left: "-57.4%",
    top: "-101.96%",
  },
  {
    title: "Modern Workspace",
    description: "Spacious hubs in Delhi & Bangalore.",
    left: "-177.8%",
    top: "-96.38%",
  },
  {
    title: "Parental Support",
    description: "Helpful paid parent leave systems.",
    left: "-332.54%",
    top: "-103.95%",
  },
  {
    title: "Recognition",
    description: "Quarterly peer-voted awards & spot bonuses.",
    left: "-466.18%",
    top: "-104.68%",
  },
];

type SupportItem = (typeof SUPPORT_ITEMS)[number];

function SupportCard({ item, isDuplicate = false }: { item: SupportItem; isDuplicate?: boolean }) {
  return (
    <article
      aria-hidden={isDuplicate || undefined}
      className={`${isDuplicate ? "hidden lg:flex" : "flex"} w-full min-w-0 items-center gap-5 rounded-xl border-[0.5px] border-white/20 bg-white/[0.08] p-5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),inset_0_-1px_1px_rgba(255,255,255,0.08)] backdrop-blur-md lg:min-h-[228px] lg:w-[412px] lg:min-w-[412px] lg:flex-col lg:items-start lg:justify-center lg:gap-8 lg:p-8`}
    >
      <div className="relative h-[62px] w-[64.33px] shrink-0 overflow-hidden lg:h-[72px] lg:w-[74.71px]">
        <Image
          src="/assets/careers/support-illustrations.png"
          alt=""
          width={630}
          height={218}
          style={{
            position: "absolute",
            width: "629.2%",
            height: "217.63%",
            left: item.left,
            top: item.top,
            maxWidth: "none",
          }}
        />
      </div>
      <div>
        <h3 className="mb-2 font-sans text-base font-bold leading-normal text-white lg:mb-2 lg:font-display lg:text-[26px] lg:font-semibold lg:tracking-[-0.78px]">{item.title}</h3>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-white lg:text-base">{item.description}</p>
      </div>
    </article>
  );
}

export default function CareerSupport() {
  return (
    <section className="relative flex min-h-[790px] flex-col items-start justify-center gap-[24.189px] overflow-hidden bg-[linear-gradient(0deg,rgba(0,0,0,0.40)_0%,rgba(0,0,0,0.40)_100%),linear-gradient(272deg,#0E2F6D_-63.51%,#1D6FFF_87.23%)] bg-[#E9EDF3] pb-[31.185px] pl-[19.316px] pr-5 pt-[31.625px] text-white lg:h-[610.36px] lg:min-h-0 lg:items-center lg:justify-start lg:gap-[42px] lg:px-20 lg:py-[62px]" aria-labelledby="career-support-heading">
      <div className="flex w-full max-w-[353px] flex-col items-center justify-center gap-[14px] text-center lg:max-w-none lg:justify-start lg:gap-4">
        <Eyebrow label="Our offering" dark icons="white" />
        <h2 id="career-support-heading" className="m-0 font-display text-[28px] font-semibold leading-normal tracking-[-0.56px] text-white lg:text-[42px] lg:tracking-[-0.84px]">Support That Matters</h2>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-[#ccc] lg:max-w-[493.14px] lg:text-base lg:text-white">
          We focus on complete physical, mental, and professional growth support. No standard
          corporate fluff, just helpful baseline perks.
        </p>
      </div>

      <div
        className="flex w-full max-w-[353px] flex-col items-start gap-2.5 lg:-ml-20 lg:w-max lg:max-w-none lg:flex-row lg:items-stretch lg:self-start lg:gap-3 lg:p-0 motion-safe:lg:animate-[marquee_40s_linear_infinite] lg:[--marquee-gap:12px]"
        aria-label="Employee benefits"
      >
        {SUPPORT_ITEMS.map((item) => (
          <SupportCard item={item} key={item.title} />
        ))}
        {SUPPORT_ITEMS.map((item) => (
          <SupportCard item={item} isDuplicate key={`duplicate-${item.title}`} />
        ))}
      </div>

      <div className="hidden h-[14px] w-[116px] shrink-0 overflow-hidden rounded-[14.4px] bg-[#ccc]/50 p-1 lg:block lg:h-5 lg:bg-[#ccc]/20" aria-hidden="true">
        <span className="block h-full w-[30px] rounded-[23px] bg-white" />
      </div>
    </section>
  );
}
