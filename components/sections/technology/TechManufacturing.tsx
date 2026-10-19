import Eyebrow from "@/components/ui/Eyebrow";

const A = "/assets/technology-page";

/** TECHNOLOGY page — "Manufacturing / Where Every Vehicle Begins" (Figma 2977:7420, 393×620). */
export default function TechManufacturing() {
  return (
    <section className="bg-white" aria-label="Manufacturing">
      <div className="mx-auto hidden h-[800px] w-full max-w-[1440px] px-[80px] py-[60px] lg:block">
        <div className="relative h-[680px] w-full overflow-clip rounded-[20px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20px]">
            <img
              src={`${A}/mfg__imgRectangle1618873365.png`}
              alt=""
              className="absolute inset-0 h-full w-full max-w-none object-cover object-[center_42%]"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black" />
          </div>

          <div className="absolute bottom-10 left-10 flex w-[636px] flex-col items-start gap-4 text-white">
            <Eyebrow label="Manufacturing" dark />
            <h2 className="w-[488px] font-display text-[52px] font-semibold leading-[1.15] tracking-[-1.04px]">
              Where Every Vehicle Begins
            </h2>
            <p className="w-[531px] font-sans text-[16px] font-normal leading-normal">
              Packs, drivetrains and final assembly in one building, so a fault found in the field
              reaches the line that made it.
            </p>
          </div>

          <button
            type="button"
            aria-label="Play manufacturing film"
            className="absolute left-1/2 top-1/2 size-[52px] -translate-x-1/2 -translate-y-1/2"
          >
            <img src={`${A}/mfg__imgContainer.svg`} alt="" className="absolute inset-0 size-full max-w-none" />
          </button>
        </div>
      </div>

      <div className="relative mx-auto h-[620px] w-full max-w-[393px] overflow-clip bg-[#041231] lg:hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#041231]" />
          <div className="absolute inset-0 overflow-hidden">
            <img src={`${A}/mfg__imgEulerUiMobile.png`} alt="" className="absolute left-[-49.26%] top-0 h-full w-[192.4%] max-w-none" />
          </div>
        </div>

        <div className="absolute left-[-66.16px] top-[409.47px] h-[285.986px] w-[534.271px] blur-[102.15px]">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-[rgba(0,0,0,0.6)] backdrop-blur-[16px]" />
        </div>

        <button
          type="button"
          aria-label="Play factory film"
          className="absolute left-1/2 top-1/2 size-[37.174px] -translate-x-1/2 -translate-y-1/2"
        >
          <img src={`${A}/mfg__imgContainer.svg`} alt="" className="absolute inset-0 size-full max-w-none" />
        </button>

        <div className="absolute left-[17.36px] top-[17.8px] flex items-center justify-center gap-2 rounded-[54.247px] bg-white px-[6.51px] py-[2.17px]">
          <span className="text-[12px] font-semibold leading-normal text-black">Factory film</span>
          <span className="size-[3.145px] rounded-full bg-black/50" />
          <span className="text-[12px] font-semibold leading-normal text-black">Placeholder</span>
        </div>

        <div className="absolute bottom-[39px] left-5 flex w-[353px] flex-col items-start gap-3">
          <Eyebrow label="Manufacturing" dark />
          <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-white">
            Where Every Vehicle Begins
          </h2>
          <p className="w-full font-sans text-[12px] font-normal leading-normal text-white">
            Packs, drivetrains and final assembly in one building, so a fault found in the field
            reaches the line that made it.
          </p>
        </div>
      </div>
    </section>
  );
}
