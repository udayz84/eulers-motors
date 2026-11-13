import Image from "next/image";
import type { StrapiAboutLeadershipSection, StrapiLeadershipMember } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";
import { DEFAULT_LEADERSHIP_MEMBERS } from "@/lib/strapi/defaults/about";

const MOBILE_PHOTO_STYLES = [
  { height: "125.84%", left: "-8.15%", top: 0, width: "116.3%" },
  { height: "144.42%", left: "-7.98%", top: "3.51%", width: "110.03%" },
  { height: "165.77%", left: "-22.13%", top: "-10.38%", width: "138.33%" },
  { height: "194.8%", left: "-9.6%", top: "-4.16%", width: "127.22%" },
  { height: "182.27%", left: "-14.86%", top: "-4.68%", width: "119.03%" },
];

const DESKTOP_CROP_STYLES = [
  "32.443px 0px / 78.637% 111.46% no-repeat",
  "32.443px -15px / 78.637% 123.44% no-repeat",
  "32.443px 0px / 78.637% 135.194% no-repeat",
  "32.443px 0px / 78.637% 135.194% no-repeat",
  "32.443px 0px / 78.637% 135.194% no-repeat",
  "32.443px 0px / 78.637% 111.46% no-repeat",
  "32.443px -15px / 78.637% 123.44% no-repeat",
];

export interface LeadershipProps {
  sectionData?: StrapiAboutLeadershipSection;
  members?: StrapiLeadershipMember[];
}

/**
 * Leadership section (Figma desktop: 3535:18350, mobile: 2929:15053).
 * Leadership team cards section.
 */
export default function Leadership({ sectionData, members }: LeadershipProps = {}) {
  const eyebrow = sectionData?.eyebrow || "OUR LEADERSHIP";
  const title = sectionData?.title || "The People Building What's Next";
  const list = members && members.length > 0 ? members : DEFAULT_LEADERSHIP_MEMBERS;

  return (
    <section className="bg-[#f3f4f5] relative overflow-hidden" aria-label="Leadership">
      {/* Mobile Layout */}
      <div className="mx-auto flex w-full max-w-[680px] flex-col items-center gap-[24px] sm:gap-[32px] px-5 sm:px-8 py-[24px] sm:py-[40px] lg:hidden">
        {/* Header */}
        <div className="flex flex-col gap-[14px] items-start w-full">
          <div className="flex gap-[4px] items-center relative shrink-0 w-full">
            <div className="absolute h-[16px] left-[3.15px] top-0 w-[116.978px] overflow-hidden">
              <Image
                src="/assets/about-euler/leader-rect-1.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="h-[16px] relative shrink-0 w-[14.794px] overflow-hidden">
              <Image
                src="/assets/about-euler/leader-rect-2.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
              {eyebrow}
            </p>
          </div>
          <p className="font-display text-[28px] sm:text-[36px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.56px] w-full">
            {title}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-3 gap-[8px] sm:gap-[16px] w-full">
          {list.map((member, idx) => {
            const fallback = DEFAULT_LEADERSHIP_MEMBERS[idx % DEFAULT_LEADERSHIP_MEMBERS.length];
            const mobileImg = mediaUrl(
              member.mobilePhoto || member.desktopPhoto,
              typeof fallback.mobilePhoto === "string"
                ? fallback.mobilePhoto
                : "/assets/about-euler/leader-1-new.png"
            );
            const isCutoutAsset = mobileImg.includes("leader-");
            const cropStyle = MOBILE_PHOTO_STYLES[idx % MOBILE_PHOTO_STYLES.length];

            return (
              <div
                key={member.slug || `${member.name}-${idx}`}
                className="bg-white flex min-w-0 flex-col gap-[6px] sm:gap-[10px] items-center pb-[4px] sm:pb-[8px] relative rounded-[12px]"
              >
                <div className="h-[128px] sm:h-[180px] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                    <div
                      className="absolute inset-0 rounded-[8px]"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)",
                      }}
                    />
                    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                      {isCutoutAsset ? (
                        <div className="absolute" style={cropStyle}>
                          <Image src={mobileImg} alt="" fill />
                        </div>
                      ) : (
                        <Image src={mobileImg} alt={member.name} fill className="object-cover object-top" />
                      )}
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[12px] sm:text-[14px] text-center tracking-[0.6px] uppercase w-full">
                  {member.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="mx-auto hidden w-full max-w-[1440px] flex-col items-start gap-[55px] px-[80px] py-[60px] lg:flex">
        {/* Header */}
        <div className="flex items-end justify-between w-full">
          <div className="flex flex-[1_0_0] items-end justify-center min-w-px">
            <div className="flex flex-col gap-[16px] items-center justify-center">
              <div className="flex gap-[6px] items-center relative shrink-0">
                <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                  <Image
                    src="/assets/about-euler/leader-desktop-rect-1.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                  <Image
                    src="/assets/about-euler/leader-desktop-rect-2.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
                  {eyebrow}
                </p>
              </div>
              <p className="font-display text-[52px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] text-center tracking-[-1.04px] whitespace-nowrap">
                {title}
              </p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-wrap items-stretch justify-center gap-[20px] w-[1280px]">
          {list.map((member, idx) => {
            const fallback = DEFAULT_LEADERSHIP_MEMBERS[idx % DEFAULT_LEADERSHIP_MEMBERS.length];
            const desktopImg = mediaUrl(
              member.desktopPhoto || member.mobilePhoto,
              typeof fallback.desktopPhoto === "string"
                ? fallback.desktopPhoto
                : "/assets/about-euler/leader-desktop-1.png"
            );
            const isCutoutAsset = desktopImg.includes("leader-");
            const cropPosition = isCutoutAsset
              ? DESKTOP_CROP_STYLES[idx % DESKTOP_CROP_STYLES.length]
              : "center top / cover no-repeat";

            return (
              <div
                key={member.slug || `${member.name}-${idx}`}
                className="bg-white flex flex-col gap-[16.271px] justify-between items-center pb-[10.847px] relative rounded-[14px] shrink-0 w-[303.729px]"
              >
                <div
                  className="h-[265px] self-stretch rounded-[12px]"
                  style={{
                    background: `url('${desktopImg}') ${cropPosition}, radial-gradient(117.41% 117.41% at 50% 135.3%, #9BBFFD 0%, #D9E1EB 100%) lightgray`,
                  }}
                />
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[28px] text-center tracking-[1.4px] uppercase w-full">
                  {member.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
