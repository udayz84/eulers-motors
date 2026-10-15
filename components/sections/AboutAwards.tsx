import Image from "next/image";

/**
 * Awards/Recognition section (Figma desktop: 3536:18588, mobile: 2937:15335).
 * Awards and recognition with year-based cards.
 */
export default function AboutAwards() {
  return (
    <section className="bg-white relative overflow-hidden" aria-label="Awards and Recognition">
      {/* Mobile Layout */}
      <div className="bg-white content-stretch flex flex-col gap-[20px] items-center px-[20px] py-[32px] relative size-full sm:hidden">
        <div className="content-stretch flex flex-col gap-[14px] items-start justify-center relative shrink-0 w-full">
          <div className="content-stretch flex gap-[4px] items-center justify-center relative shrink-0">
            <div className="h-[16px] relative shrink-0 w-[14.794px]">
              <div className="absolute inset-[0_0_0_4.08%]">
                <Image
                  src="/assets/awards/mobile-rect-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="absolute h-[16px] left-0 top-0 w-[116.978px]">
              <div className="absolute inset-[0_1.03%]">
                <Image
                  src="/assets/awards/mobile-rect-2.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[12px] tracking-[0.6px] uppercase whitespace-nowrap">
              Recognition
            </p>
          </div>
          <p className="font-display text-[28px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.56px] w-[min-content]">
            Awards and recognition.
          </p>
          <div className="absolute h-[49.664px] right-[-19.99px] top-[145.71px] w-[54.598px]" style={{ backgroundImage: "linear-gradient(-89.9999956537512deg, rgb(255, 255, 255) 13.618%, rgba(255, 255, 255, 0) 100%)" }} />
        </div>
        <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[373px]">
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2024
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Commercial EV of the year
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2024
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Design award, commercial vehicles
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex flex-col gap-[10px] items-center justify-center overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
                <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-w-px relative">
                  <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                    2023
                  </div>
                  <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                    Startup of the year, mobility
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <Image
                    src="/assets/awards/mobile-icon-2.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="relative shrink-0 w-full">
              <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-end relative size-full">
                <div className="relative shrink-0 size-[68.185px]">
                  <Image
                    src="/assets/awards/mobile-bg.png"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="font-sans font-normal leading-[1.4] min-w-px relative text-[12px] text-[rgba(18,18,18,0.8)]">
                  <p className="leading-[1.4] mb-0">For moving from one product to a network of</p>
                  <p className="leading-[1.4]">dealers and service centres.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2022
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Innovation in battery engineering
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
          <div className="bg-[#f3f4f5] content-stretch flex gap-[10px] items-center justify-end overflow-clip px-[12px] py-[21px] relative rounded-[16px] shrink-0 w-full">
            <div className="flex-[1_0_0] min-w-px relative">
              <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[12px] tracking-[-0.24px] w-full">
                2021
              </div>
              <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[16px] tracking-[-0.32px] w-full">
                Best last mile vehicle
              </div>
            </div>
            <div className="relative shrink-0 size-[24px]">
              <Image
                src="/assets/awards/mobile-icon.svg"
                alt=""
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:block bg-white content-stretch flex flex-col items-start px-[80px] py-[60px] relative size-full">
        <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-[1280px]">
          <div className="flex flex-[1_0_0] flex-row items-center self-stretch">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[20px] h-full items-start min-w-px relative">
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[414.434px]">
                <div className="content-stretch flex gap-[6px] items-center relative shrink-0">
                  <div className="absolute h-[20.355px] left-[3.43px] top-0 w-[148.821px] overflow-hidden">
                    <Image
                      src="/assets/awards/desktop-rect-1.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="h-[20.355px] relative shrink-0 w-[18.821px] overflow-hidden">
                    <Image
                      src="/assets/awards/desktop-rect-2.svg"
                      alt=""
                      fill
                      className="object-cover"
                    />
                  </div>
                  <p className="font-sans font-bold leading-normal relative shrink-0 text-[#0e2f6d] text-[14px] tracking-[0.7px] uppercase whitespace-nowrap">
                    Recognition
                  </p>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0">
                  <p className="font-display text-[42px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.84px] w-[646.448px]">
                    Awards and recognition.
                  </p>
                </div>
              </div>
              <div className="flex-[1_0_0] min-h-px relative rounded-[20.655px] w-full">
                <Image
                  src="/assets/awards/desktop-bg.png"
                  alt=""
                  fill
                  className="object-cover rounded-[20.655px]"
                />
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <div className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-[568px]">
              <div className="bg-[#f3f4f5] content-stretch flex gap-[24px] items-center justify-end overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-full">
                <div className="flex-[1_0_0] min-w-px relative">
                  <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[16px] tracking-[-0.32px] w-full">
                    2024
                  </div>
                  <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[20px] tracking-[-0.4px] w-full">
                    Commercial EV of the year
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <Image
                    src="/assets/awards/desktop-icon.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="bg-[#f3f4f5] content-stretch flex gap-[24px] items-center justify-end overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-full">
                <div className="flex-[1_0_0] min-w-px relative">
                  <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[16px] tracking-[-0.32px] w-full">
                    2024
                  </div>
                  <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[20px] tracking-[-0.4px] w-full">
                    Design award, commercial vehicles
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <Image
                    src="/assets/awards/desktop-icon.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="bg-[#f3f4f5] content-stretch flex flex-col gap-[24px] items-center justify-center overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-full">
                <div className="relative shrink-0 w-full">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center relative size-full">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center min-w-px relative">
                      <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[16px] tracking-[-0.32px] w-full">
                        2023
                      </div>
                      <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[20px] tracking-[-0.4px] w-full">
                        Startup of the year, mobility
                      </div>
                    </div>
                    <div className="relative shrink-0 size-[24px]">
                      <Image
                        src="/assets/awards/desktop-icon-2.svg"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="relative shrink-0 w-full">
                  <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[10px] items-end relative size-full">
                    <div className="relative shrink-0 size-[96.936px]">
                      <Image
                        src="/assets/awards/desktop-bg-2.png"
                        alt=""
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="font-sans font-normal leading-[1.4] min-w-px relative text-[16px] text-[rgba(18,18,18,0.8)]">
                      For moving from one product to a network of dealers and service centres.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#f3f4f5] content-stretch flex gap-[24px] items-center justify-end overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-full">
                <div className="flex-[1_0_0] min-w-px relative">
                  <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[16px] tracking-[-0.32px] w-full">
                    2022
                  </div>
                  <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[20px] tracking-[-0.4px] w-full">
                    Innovation in battery engineering
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <Image
                    src="/assets/awards/desktop-icon.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="bg-[#f3f4f5] content-stretch flex gap-[24px] items-center justify-end overflow-clip p-[20px] relative rounded-[16px] shrink-0 w-full">
                <div className="flex-[1_0_0] min-w-px relative">
                  <div className="font-sans font-extrabold relative shrink-0 text-[#1d6fff] text-[16px] tracking-[-0.32px] w-full">
                    2021
                  </div>
                  <div className="font-sans font-semibold relative shrink-0 text-[#121212] text-[20px] tracking-[-0.4px] w-full">
                    Best last mile vehicle
                  </div>
                </div>
                <div className="relative shrink-0 size-[24px]">
                  <Image
                    src="/assets/awards/desktop-icon.svg"
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="content-stretch flex gap-[12px] items-center relative shrink-0">
            <button className="flex items-center justify-center relative shrink-0 cursor-pointer">
              <div className="relative size-[55px]">
                <Image
                  src="/assets/awards/desktop-arrow-1.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </button>
            <button className="flex items-center justify-center relative shrink-0 cursor-pointer">
              <div className="relative size-[55px]">
                <Image
                  src="/assets/awards/desktop-arrow-2.svg"
                  alt=""
                  fill
                  className="object-cover"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
