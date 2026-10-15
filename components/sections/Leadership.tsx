import Image from "next/image";

/**
 * Leadership section (Figma desktop: 3535:18350, mobile: 2929:15053).
 * Leadership team cards section.
 */
export default function Leadership() {
  return (
    <section className="bg-[#f3f4f5] relative overflow-hidden" aria-label="Leadership">
      {/* Mobile Layout */}
      <div className="mx-auto flex w-full max-w-[393px] flex-col items-center gap-[24px] px-5 py-[24px] sm:hidden">
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
                OUR LEADERSHIP
              </p>
            </div>
            <p className="font-display text-[28px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] tracking-[-0.56px] w-full">
              The People Building What's Next
            </p>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col gap-[8px] items-start w-full">
            <div className="flex gap-[8px] items-center w-full">
              <div className="bg-white flex flex-col gap-[6px] items-center pb-[4px] relative rounded-[12px] shrink-0 w-[112px]">
                <div className="h-[128px] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                    <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                      <Image
                        src="/assets/about-euler/leader-1.png"
                        alt=""
                        fill
                        className="h-[125.84%] left-[-8.15%] top-0 w-[116.3%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[12px] text-center tracking-[0.6px] uppercase w-full">
                  Tarun
                </p>
              </div>
              <div className="bg-white flex flex-col gap-[6px] items-center pb-[4px] relative rounded-[12px] shrink-0 w-[112px]">
                <div className="h-[128px] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                    <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                      <Image
                        src="/assets/about-euler/leader-2.png"
                        alt=""
                        fill
                        className="h-[144.42%] left-[-7.98%] top-[3.51%] w-[110.03%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[12px] text-center tracking-[0.6px] uppercase w-full">
                  Swapnil
                </p>
              </div>
              <div className="bg-white flex flex-col gap-[6px] items-center pb-[4px] relative rounded-[12px] shrink-0 w-[112px]">
                <div className="h-[128px] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                    <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                      <Image
                        src="/assets/about-euler/leader-3.png"
                        alt=""
                        fill
                        className="h-[165.77%] left-[-22.13%] top-[-10.38%] w-[138.33%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[12px] text-center tracking-[0.6px] uppercase w-full">
                  Ravneet
                </p>
              </div>
            </div>
            <div className="flex gap-[8px] items-center w-full">
              <div className="bg-white flex flex-col gap-[6px] items-center pb-[4px] relative rounded-[12px] shrink-0 w-[112px]">
                <div className="h-[128px] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                    <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                      <Image
                        src="/assets/about-euler/leader-4.png"
                        alt=""
                        fill
                        className="h-[194.8%] left-[-9.6%] top-[-7.28%] w-[127.22%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[12px] text-center tracking-[0.6px] uppercase w-full">
                  Sohil
                </p>
              </div>
              <div className="bg-white flex flex-col gap-[6px] items-center pb-[4px] relative rounded-[12px] shrink-0 w-[112px]">
                <div className="h-[128px] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                    <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                      <Image
                        src="/assets/about-euler/leader-5.png"
                        alt=""
                        fill
                        className="h-[182.27%] left-[-14.86%] top-[-4.68%] w-[119.03%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[12px] text-center tracking-[0.6px] uppercase w-full">
                  Harendra
                </p>
              </div>
              <button className="bg-white flex flex-col gap-[6px] items-center pb-[4px] relative rounded-[12px] shrink-0 w-[112px] cursor-pointer">
                <div className="h-[128px] relative rounded-[8px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                    <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                      <Image
                        src="/assets/about-euler/leader-1.png"
                        alt=""
                        fill
                        className="h-[125.84%] left-[-8.15%] top-0 w-[116.3%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[12px] text-center tracking-[0.6px] uppercase w-full">
                  Sanjeev K.
                </p>
              </button>
            </div>
            <div className="flex items-center w-full">
              <div className="flex items-center justify-center relative shrink-0">
                <div className="-scale-y-100 flex-none rotate-180">
                  <div className="bg-white flex flex-col gap-[6px] items-center pb-[4px] relative rounded-[12px] w-[112px]">
                    <div className="h-[128px] relative rounded-[8px] shrink-0 w-full">
                      <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[8px]">
                        <div className="absolute inset-0 rounded-[8px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
                          <Image
                            src="/assets/about-euler/leader-3.png"
                            alt=""
                            fill
                            className="h-[165.77%] left-[-22.13%] top-[-10.38%] w-[138.33%]"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center relative shrink-0 w-full">
                      <div className="-scale-y-100 flex-none rotate-180 w-full">
                        <p className="font-sans font-bold leading-normal relative text-[#121212] text-[12px] text-center tracking-[0.6px] uppercase w-full">Milind</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* Desktop Layout */}
      <div className="mx-auto hidden w-full max-w-[1440px] flex-col items-start gap-[55px] px-[80px] py-[60px] sm:flex">
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
                    OUR LEADERSHIP
                  </p>
                </div>
                <p className="font-display text-[52px] font-semibold leading-[1.15] not-italic relative shrink-0 text-[#121212] text-center tracking-[-1.04px] whitespace-nowrap">
                  The People Building What's Next
                </p>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-col gap-[20px] items-center w-[1280px]">
            <div className="flex gap-[20px] items-center justify-center w-full">
              <div className="bg-white flex flex-col gap-[16.271px] items-center pb-[10.847px] relative rounded-[14px] shrink-0 w-[303.729px]">
                <div className="h-[265px] relative rounded-[12px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px]">
                    <div className="absolute inset-0 rounded-[12px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                      <Image
                        src="/assets/about-euler/leader-desktop-1.png"
                        alt=""
                        fill
                        className="h-[121.22%] left-[4.09%] top-[-4.96%] w-[85.53%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[28px] text-center tracking-[1.4px] uppercase w-full">
                  Tarun
                </p>
              </div>
              <div className="bg-white flex flex-col gap-[16.271px] items-center pb-[10.847px] relative rounded-[14px] shrink-0 w-[303.729px]">
                <div className="h-[265px] relative rounded-[12px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px]">
                    <div className="absolute inset-0 rounded-[12px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                      <Image
                        src="/assets/about-euler/leader-desktop-2.png"
                        alt=""
                        fill
                        className="h-[156.97%] left-0 top-[-14.06%] w-full"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[28px] text-center tracking-[1.4px] uppercase w-full">
                  Ravneet
                </p>
              </div>
              <div className="bg-white flex flex-col gap-[16.271px] items-center pb-[10.847px] relative rounded-[14px] shrink-0 w-[303.729px]">
                <div className="h-[265px] relative rounded-[12px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px]">
                    <div className="absolute inset-0 rounded-[12px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                      <Image
                        src="/assets/about-euler/leader-desktop-3.png"
                        alt=""
                        fill
                        className="h-[135.19%] left-[10.68%] top-0 w-[78.64%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[28px] text-center tracking-[1.4px] uppercase w-full">
                  Swapnil
                </p>
              </div>
              <div className="bg-white flex flex-col gap-[16.271px] items-center pb-[10.847px] relative rounded-[14px] shrink-0 w-[303.729px]">
                <div className="h-[265px] relative rounded-[12px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px]">
                    <div className="absolute inset-0 rounded-[12px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                      <Image
                        src="/assets/about-euler/leader-desktop-4.png"
                        alt=""
                        fill
                        className="h-[171.89%] left-[7.15%] top-[-7.47%] w-[85.7%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[28px] text-center tracking-[1.4px] uppercase w-full">
                  Sohil
                </p>
              </div>
            </div>
            <div className="flex gap-[20px] items-center">
              <div className="bg-white flex flex-col gap-[16.271px] items-center pb-[10.847px] relative rounded-[14px] shrink-0 w-[303.729px]">
                <div className="h-[265px] relative rounded-[12px] shrink-0 w-full">
                  <div aria-hidden className="absolute inset-0 pointer-events-none rounded-[12px]">
                    <div className="absolute inset-0 rounded-[12px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(155,191,253,1) 0%, rgba(217,225,235,1) 100%)" }} />
                    <div className="absolute inset-0 overflow-hidden rounded-[12px]">
                      <Image
                        src="/assets/about-euler/leader-5.png"
                        alt=""
                        fill
                        className="h-[164.06%] left-[0.68%] top-[-11.56%] w-[98.64%]"
                      />
                    </div>
                  </div>
                </div>
                <p className="font-sans font-bold leading-normal relative shrink-0 text-[#121212] text-[28px] text-center tracking-[1.4px] uppercase w-full">
                  Saurabh
                </p>
              </div>
            </div>
          </div>
      </div>
    </section>
  );
}
