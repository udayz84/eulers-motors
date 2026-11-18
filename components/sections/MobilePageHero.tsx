import Image from "next/image";

export default function MobilePageHero({
  label,
  title,
  titleId,
  description,
  image,
}: {
  label: string;
  title: React.ReactNode;
  titleId?: string;
  description: React.ReactNode;
  image?: string;
}) {
  // When a hero image is uploaded the copy switches to the "photo" treatment:
  // left-aligned, pushed slightly down, black text over a white bottom
  // gradient. Without an image the original blue-gradient look is kept.
  const photo = Boolean(image);

  return (
    <section
      aria-label={`${label} Banner`}
      className={`relative flex h-[320px] w-full overflow-x-clip overflow-y-visible bg-[#1d6fff] px-5 sm:px-8 pt-[119.99px] pb-[59.01px] sm:h-[370px] sm:pt-[128px] sm:pb-16 ${
        photo ? "justify-start items-center text-left" : "justify-center items-center text-center text-white"
      }`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg,transparent 0,transparent 67px,rgba(0,0,0,.12) 68px),repeating-linear-gradient(0deg,transparent_0,transparent 67px,rgba(0,0,0,.12) 68px),linear-gradient(272deg,#0e2f6d -63.51%,#1d6fff 87.23%)",
      }}
    >
      {image && (
        <div
          aria-hidden
          className="absolute inset-0 z-0 bg-cover"
          style={{ backgroundImage: `url('${image}')`, backgroundPosition: "center 70%" }}
        />
      )}
      {photo && (
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 z-0 h-[70%] bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.45)_50%,rgba(255,255,255,0.85)_100%)]"
        />
      )}
      <div
        className={`relative z-10 flex flex-col gap-3 ${
          photo ? "w-full items-start mt-12" : "items-center"
        }`}
      >
        <div
          className={`relative flex items-center gap-1 text-[12px] font-bold uppercase leading-normal tracking-[0.6px] sm:text-[13px] ${
            photo ? "text-[#0e2f6d]" : ""
          }`}
        >
          <Image
            src={photo ? "/assets/products/badge-line.svg" : "/assets/products/badge-line-white.svg"}
            alt=""
            width={117}
            height={16}
            aria-hidden
            className="absolute left-[3.43px] top-0 h-4 w-[117px]"
          />
          <Image
            src={photo ? "/assets/products/badge-cap.svg" : "/assets/products/badge-cap-white.svg"}
            alt=""
            width={14.794}
            height={16}
            aria-hidden
            className="relative h-4 w-[14.794px]"
          />
          {label}
        </div>
        <h1
          id={titleId}
          className={`font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] sm:text-[40px] sm:tracking-[-0.8px] ${
            photo ? "text-[#121212]" : "text-white"
          }`}
        >
          {title}
        </h1>
        <p
          className={`max-w-[311px] font-sans text-[12px] font-normal leading-normal sm:max-w-[420px] sm:text-[14px] ${
            photo ? "text-[#121212]" : "text-white"
          }`}
        >
          {description}
        </p>
      </div>
    </section>
  );
}
