import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";
import type { StrapiCareerGallerySection } from "@/types/strapi";
import { mediaUrl } from "@/lib/strapi/client";

type CareerGalleryProps = {
  data?: StrapiCareerGallerySection;
};

export default function CareerGallery({ data }: CareerGalleryProps) {
  const eyebrow = data?.eyebrow || "";
  const title = data?.title || "";
  const subtitle = data?.subtitle || "";

  const images = (data?.images || []).map((cmsImage, idx) => ({
    src: mediaUrl(cmsImage.url),
    alt: cmsImage.alternativeText || `Euler Motors gallery image ${idx + 1}`,
  }));

  return (
    <section
      className="flex flex-col items-center gap-[17px] overflow-visible bg-white px-5 py-8 lg:flex-col lg:items-center lg:justify-center lg:gap-[42px] lg:px-[max(40px,calc((100vw-1440px)/2+80px))] xl:px-[max(80px,calc((100vw-1440px)/2+80px))] lg:py-[62px]"
      style={{ touchAction: "pan-y" }}
      aria-labelledby="career-gallery-heading"
    >
      <div className="flex w-full flex-col items-start gap-3 lg:w-[459px] lg:items-center lg:gap-4 lg:text-center">
        <Eyebrow label={eyebrow} />
        <h2
          id="career-gallery-heading"
          className="m-0 font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[42px] lg:tracking-[-0.84px]"
        >
          {title}
        </h2>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-ink lg:w-[518.28px] lg:text-base">
          {subtitle}
        </p>
      </div>

      <div
        id="career-gallery-row"
        className="no-scrollbar -ml-5 flex h-[380px] w-[calc(100%+40px)] snap-x snap-mandatory scroll-pl-5 gap-[14px] self-start overflow-x-auto pl-5 pr-5 lg:m-0 lg:grid lg:h-auto lg:w-full lg:max-w-[1280px] lg:aspect-[1280/489.7] lg:grid-cols-[399.49fr_548.17fr_296.4fr] lg:gap-[18px] lg:self-auto lg:overflow-visible lg:p-0 lg:snap-none lg:scroll-pl-0"
        style={{
          touchAction: "pan-x pan-y",
          overscrollBehaviorX: "contain",
          overscrollBehaviorY: "auto",
        }}
        onTouchMove={(e) => {
          const target = e.currentTarget;
          if (
            Math.abs(e.touches[0].clientX - ((target as any)._startX || 0)) >
            Math.abs(e.touches[0].clientY - ((target as any)._startY || 0))
          ) {
            e.stopPropagation();
          }
        }}
        onTouchStart={(e) => {
          (e.currentTarget as any)._startX = e.touches[0].clientX;
          (e.currentTarget as any)._startY = e.touches[0].clientY;
        }}
        aria-label="Life at Euler Motors"
      >
        {images[0]?.src && (
          <div className="relative h-full w-[310px] shrink-0 snap-start overflow-hidden rounded-[7px] lg:h-full lg:w-full lg:rounded-[8.99px]">
            <Image
              src={images[0].src}
              alt={images[0].alt}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 310px, 400px"
            />
          </div>
        )}
        {(images[1]?.src || images[2]?.src) && (
          <div className="flex h-full w-[426px] shrink-0 snap-start flex-col gap-[14px] lg:grid lg:h-full lg:w-full lg:grid-rows-[205.71fr_265.95fr] lg:gap-[18px]">
            {images[1]?.src && (
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-[7px] lg:h-full lg:w-full lg:rounded-[8.99px]">
                <Image
                  src={images[1].src}
                  alt={images[1].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 426px, 549px"
                />
              </div>
            )}
            {images[2]?.src && (
              <div className="relative min-h-0 flex-1 overflow-hidden rounded-[7px] lg:h-full lg:w-full lg:rounded-[8.99px]">
                <Image
                  src={images[2].src}
                  alt={images[2].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 426px, 549px"
                />
              </div>
            )}
          </div>
        )}
        {(images[3]?.src || images[4]?.src) && (
          <div className="flex h-full w-[296px] shrink-0 snap-start flex-col gap-[14px] lg:grid lg:h-full lg:w-full lg:grid-rows-[331fr_140.66fr] lg:gap-[18px]">
            {images[3]?.src && (
              <div className="relative min-h-0 flex-[1.15] overflow-hidden rounded-[7px] lg:h-full lg:w-full lg:rounded-[8.99px]">
                <Image
                  src={images[3].src}
                  alt={images[3].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 296px, 400px"
                />
              </div>
            )}
            {images[4]?.src && (
              <div className="relative min-h-0 flex-[0.85] overflow-hidden rounded-[7px] lg:h-full lg:w-full lg:rounded-[8.99px]">
                <Image
                  src={images[4].src}
                  alt={images[4].alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 767px) 296px, 296px"
                />
              </div>
            )}
          </div>
        )}
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
