import Image from "next/image";

const ASSET = "/assets/dealer-contact/";

function ContactCard({ icon, title, detail, mobileOrder }: { icon: string; title: string; detail: string; mobileOrder: string }) {
  return (
    <div className={`flex min-h-[58px] items-center gap-[10px] rounded-[8px] bg-[#f3f4f5] p-2 lg:min-h-[98px] lg:gap-6 lg:rounded-2xl lg:p-5 ${mobileOrder}`}>
      <div className="flex size-[42px] shrink-0 items-center justify-center rounded-[5.88px] bg-[#0c2c66] lg:size-[58px] lg:rounded-[8.12px] lg:bg-white">
        <Image src={`${ASSET}${icon.replace(".svg", "-mobile.svg")}`} alt="" width={16} height={16} aria-hidden="true" className="lg:hidden" />
        <Image src={`${ASSET}${icon}`} alt="" width={24} height={24} aria-hidden="true" className="hidden lg:block" />
      </div>
      <div className="min-w-0 text-[#121212]">
        <p className="font-sans text-sm font-bold leading-[1.15] tracking-[-0.28px] lg:text-base lg:tracking-[-0.32px]">{title}</p>
        <p className="mt-1.5 whitespace-nowrap font-sans text-xs font-medium leading-[1.15] tracking-[-0.24px]">{detail}</p>
      </div>
    </div>
  );
}

function FormField({ label, value, dropdown = false }: { label: string; value: string; dropdown?: boolean }) {
  return (
    <label className="block min-w-0 font-sans text-xs leading-[1.15] text-[#121212]">
      <span className="mb-1 block">{label}</span>
      <span className="flex h-[36px] items-center justify-between rounded-[8px] border border-[#ededed] bg-white px-4 text-xs text-[#9ca3af] backdrop-blur-[8.15px] lg:h-[46px] lg:rounded-[13px]">
        <span className="truncate">{value}</span>
        {dropdown && <Image src={`${ASSET}chevron.svg`} alt="" width={12} height={7} aria-hidden="true" />}
      </span>
    </label>
  );
}

export default function DealerContactSection() {
  return (
    <section className="relative isolate mx-auto flex min-h-[678px] w-full overflow-hidden bg-white px-5 py-6 sm:px-8 lg:min-h-[789.477px] lg:w-[1440px] lg:max-w-full lg:items-center lg:justify-between lg:px-20 lg:pt-16 lg:pb-[42px]">
      <div className="pointer-events-none absolute left-[72px] top-[203.55px] -z-10 hidden h-[441px] w-[631px] max-w-[55vw] lg:block" aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={`${ASSET}background.png`} alt="" width={1476} height={1066} sizes="630px" className="absolute left-[-0.09%] top-[-3.49%] h-[103.49%] max-w-none w-[100.19%]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_65.285%,white_100%),linear-gradient(270deg,transparent_71.138%,white_100%),linear-gradient(0deg,transparent_69.07%,white_100%),linear-gradient(180deg,transparent_51.97%,white_99.827%)]" />
      </div>

      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-0 lg:h-[683.477px] lg:flex-row lg:justify-between lg:gap-12">
        <div className="contents lg:flex lg:w-[613px] lg:shrink-0 lg:flex-col lg:justify-between">
          <div className="order-1 mb-6 flex flex-col gap-[14px] lg:order-none lg:mb-0 lg:gap-4">
            <div className="relative flex h-4 items-center gap-1 pl-1 lg:h-[21px] lg:gap-1.5">
              <Image src={`${ASSET}decor-left-mobile.svg`} alt="" width={117} height={16} aria-hidden="true" className="absolute left-1 top-0 h-4 w-[117px] lg:hidden" />
              <Image src={`${ASSET}decor-right-mobile.svg`} alt="" width={15} height={16} aria-hidden="true" className="relative h-4 w-[15px] lg:hidden" />
              <Image src={`${ASSET}decor-left.svg`} alt="" width={149} height={21} aria-hidden="true" className="absolute left-1 top-0 hidden h-[21px] w-[149px] lg:block" />
              <Image src={`${ASSET}decor-right.svg`} alt="" width={19} height={21} aria-hidden="true" className="relative hidden lg:block" />
              <span className="relative font-sans text-xs font-bold uppercase tracking-[0.6px] text-[#0e2f6d] lg:text-sm lg:tracking-[0.7px]">Next step</span>
            </div>
            <h2 className="w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-[#121212] lg:max-w-[646px] lg:text-[42px] lg:tracking-[-0.84px]"><span className="lg:hidden">Tell us what you need!</span><span className="hidden lg:inline">Not sure which dealer to use?</span></h2>
            <p className="w-full font-sans text-xs leading-normal text-[#121212] lg:max-w-[474px] lg:text-base"><span className="lg:hidden">We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.</span><span className="hidden lg:inline">Tell us where you work and how much you carry. We will put you with the right dealer and call you within one working day.</span></p>
          </div>

          <div className="order-3 mt-0 grid grid-cols-1 gap-2.5 lg:order-none lg:mt-8 lg:grid-cols-2">
            <ContactCard icon="phone.svg" title="1800 000 0000" detail="9 am to 8 pm Monday to Saturday" mobileOrder="order-1" />
            <ContactCard icon="email.svg" title="fleet@eulermotors.com" detail="For fleets over 50 vehicles" mobileOrder="order-2 lg:order-3" />
            <ContactCard icon="location.svg" title="Find your nearest dealer" detail="112 locations, 24 states" mobileOrder="order-3 lg:order-2" />
          </div>
        </div>

        <div className="order-2 mb-2.5 flex h-[294px] w-full flex-col gap-3 rounded-[10px] bg-[#f3f4f5] p-4 lg:order-none lg:mb-0 lg:h-[683.477px] lg:min-h-0 lg:w-[517px] lg:shrink-0 lg:justify-center lg:gap-8 lg:rounded-2xl lg:p-8">
          <div className="flex flex-col gap-1.5 lg:gap-3">
            <h3 className="font-sans text-2xl font-bold leading-[1.15] tracking-[-0.48px] text-[#121212] lg:font-display lg:text-[32px] lg:font-semibold lg:tracking-[-0.64px]">Book a test drive</h3>
            <p className="font-sans text-xs leading-normal text-[#121212] lg:text-base">Two steps. We call you within one working day.</p>
          </div>
          <div className="flex gap-3" role="tablist" aria-label="Enquiry type">
            <button type="button" className="h-[34px] flex-1 rounded-full bg-[#0c2c66] px-2 font-display text-xs font-semibold text-white lg:h-[42px] lg:px-3 lg:text-base">Test drive</button>
            <button type="button" className="h-[34px] flex-1 rounded-full border border-white/50 bg-white/80 px-2 font-display text-xs font-semibold text-[#121212] backdrop-blur-[10px] lg:h-[42px] lg:px-2 lg:text-base">Price Enquiry</button>
            <button type="button" className="h-[34px] flex-1 rounded-full border border-white/50 bg-white/80 px-2 font-display text-xs font-semibold text-[#121212] backdrop-blur-[10px] lg:h-[42px] lg:px-3 lg:text-base">Fleet</button>
          </div>

          <form className="contents">
            <div className="grid grid-cols-2 gap-1.5 lg:gap-3">
              <FormField label="Name *" value="Full name" />
              <FormField label="Mobile number *" value="10 digit" />
            </div>
            <div className="hidden lg:block"><FormField label="Which vehicle *" value="Not sure, please suggest one" dropdown /></div>
            <div className="hidden grid-cols-2 gap-3 lg:grid">
              <FormField label="City *" value="Mumbai" />
              <FormField label="Kilometres per day*" value="150" />
            </div>
            <label className="hidden items-start gap-2.5 font-sans text-sm leading-[1.4] text-[#121212] lg:flex">
              <input type="checkbox" className="mt-0.5 size-5 shrink-0 appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] checked:bg-[#0c2c66]" />
              <span>Euler Motors and its dealers may contact me about this enquiry. <span className="underline">Privacy policy.</span></span>
            </label>
            <div className="flex flex-col items-center gap-3">
              <button type="button" className="flex h-11 w-full items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-5 font-display text-xs font-bold text-white lg:h-[50.477px] lg:w-fit lg:px-6 lg:text-base lg:font-semibold">
                <span className="lg:hidden">Continue</span><span className="hidden lg:inline">Confirm test drive</span>
                <Image src={`${ASSET}arrow-mobile.svg`} alt="" width={19} height={13} aria-hidden="true" className="lg:hidden" />
                <Image src={`${ASSET}arrow.svg`} alt="" width={22} height={14} aria-hidden="true" className="hidden lg:block" />
              </button>
              <p className="w-[271px] text-center font-sans text-xs leading-normal text-[#121212] lg:w-full">We never share your number with anyone else. No spam calls.</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}





