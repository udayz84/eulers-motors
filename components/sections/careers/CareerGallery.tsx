import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const GALLERY = [
  { src: "/assets/careers/gallery-office.png", alt: "A bright Euler Motors office space" },
  { src: "/assets/careers/gallery-meeting-room.png", alt: "A collaborative meeting space" },
  { src: "/assets/careers/gallery-team.png", alt: "Euler Motors colleagues working together" },
  { src: "/assets/careers/gallery-team-work.png", alt: "A team planning a project together" },
  { src: "/assets/careers/gallery-workspace.png", alt: "Colleagues walking through the office" },
];

export default function CareerGallery() {
  return (
    <section className="flex flex-col items-center gap-[17px] overflow-visible bg-white px-5 py-8 lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-8 xl:px-12 2xl:px-[max(64px,calc((100vw-1440px)/2+64px))] lg:py-[62px]" style={{ touchAction: "pan-y" }} aria-labelledby="career-gallery-heading">
      <div className="flex w-full flex-col items-start gap-3 lg:w-[459px] lg:items-center lg:gap-4 lg:text-center">
        <Eyebrow label="Inside the depots" />
        <h2 id="career-gallery-heading" className="m-0 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[42px] lg:tracking-[-0.84px]">Life at Euler Motors</h2>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-ink lg:w-[518.28px] lg:text-base">
          From the assembly lines in New Delhi to real road testing across state lines — see what
          our day-to-day looks like.
        </p>
      </div>

      <div
        id="career-gallery-row"
        className="no-scrollbar -ml-5 flex h-[380px] w-[calc(100%+40px)] snap-x snap-mandatory scroll-pl-5 gap-[14px] self-start overflow-x-auto pl-5 lg:m-0 lg:h-[489.7px] lg:w-full lg:max-w-[1280px] lg:shrink-0 lg:gap-[17.97px] lg:self-auto lg:overflow-visible lg:p-0 lg:snap-none lg:scroll-pl-0"
        style={{ touchAction: "pan-x pan-y", overscrollBehaviorX: "contain", overscrollBehaviorY: "auto", paddingRight: "20px" }}
        onTouchMove={(e) => {
          const target = e.currentTarget;
          if (Math.abs(e.touches[0].clientX - (target as any)._startX || 0) > Math.abs(e.touches[0].clientY - (target as any)._startY || 0)) {
            e.stopPropagation();
          }
        }}
        onTouchStart={(e) => {
          (e.currentTarget as any)._startX = e.touches[0].clientX;
          (e.currentTarget as any)._startY = e.touches[0].clientY;
        }}
        aria-label="Life at Euler Motors"
      >
        <div className="relative h-full w-[310px] shrink-0 snap-start overflow-hidden rounded-[7px] lg:w-[399.49px] lg:rounded-[8.99px]">
          <Image src={GALLERY[0].src} alt={GALLERY[0].alt} fill sizes="(max-width: 767px) 310px, 400px" />
        </div>
        <div className="flex h-full w-[426px] shrink-0 snap-start flex-col gap-[14px] lg:w-[548.17px] lg:gap-[18.04px]">
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-[7px] lg:flex-[1_1_0] lg:rounded-[8.99px]">
            <Image src={GALLERY[1].src} alt={GALLERY[1].alt} fill sizes="(max-width: 767px) 426px, 549px" />
          </div>
          <div className="relative min-h-0 flex-1 overflow-hidden rounded-[7px] lg:flex-[0_0_265.95px] lg:rounded-[8.99px]">
            <Image src={GALLERY[2].src} alt={GALLERY[2].alt} fill sizes="(max-width: 767px) 426px, 549px" />
          </div>
        </div>
        <div className="flex h-full w-[296px] shrink-0 snap-start flex-col gap-[14px] lg:w-[296.4px] lg:gap-[18.04px]">
          <div className="relative min-h-0 flex-[1.15] overflow-hidden rounded-[7px] lg:flex-[0_0_331px] lg:rounded-[8.99px]">
            <Image src={GALLERY[3].src} alt={GALLERY[3].alt} fill sizes="(max-width: 767px) 296px, 296px" />
          </div>
          <div className="relative min-h-0 flex-[0.85] overflow-hidden rounded-[7px] lg:flex-[1_1_0] lg:rounded-[8.99px]">
            <Image src={GALLERY[4].src} alt={GALLERY[4].alt} fill sizes="(max-width: 767px) 296px, 296px" />
          </div>
        </div>
      </div>

      <PagerBar
        rowId="career-gallery-row"
        className="self-center [&>div]:bg-ink lg:hidden"
        trackStyle={{
          background: "rgba(204, 204, 204, 0.50)",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: "14.4px",
        }}
      />
    </section>
  );
}
