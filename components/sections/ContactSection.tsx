import Image from "next/image";
import Eyebrow from "../ui/Eyebrow";
import Button from "../ui/Button";

const CONTACTS = [
  { icon: "/assets/contact/icon-call.svg", title: "1800 000 0000", sub: "9 am to 8 pm Monday to Saturday" },
  { icon: "/assets/contact/icon-mail.svg", title: "fleet@eulermotors.com", sub: "For fleets over 50 vehicles" },
  { icon: "/assets/contact/icon-pin.svg", title: "Find your nearest dealer", sub: "112 locations, 24 states" },
];

/**
 * "Tell us what you need!" + Book-a-test-drive form
 * (desktop 1:1974 · mobile 1:5028 — the mobile form is the simplified variant).
 */
export default function ContactSection() {
  return (
    <section id="book-test-drive" className="relative overflow-clip bg-white" aria-label="Contact">
      <div className="relative mx-auto flex w-full max-w-[1360px] flex-col gap-6 px-5 pb-6 pt-6 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:px-0 lg:pb-[42px] lg:pt-16">
        {/* left column — heading top · contacts bottom of the 683px column (Figma 1:1975) */}
        <div className="relative flex flex-col gap-6 lg:h-[683.477px] lg:justify-between lg:gap-0">
          {/* photo wash — 630.733×441 at (-8, 139.55),
              four white fades (right/left/top/bottom) per Figma 1:1976.
              Blur removed per review — the truck renders sharp. */}
          <div aria-hidden className="absolute left-[-8px] top-[139.55px] hidden h-[441px] w-[630.733px] lg:block">
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src="/assets/enterprise/truck-photo.png"
                alt=""
                width={631}
                height={441}
                className="absolute max-w-none object-cover"
                style={{ left: "-0.09%", top: "-3.49%", width: "100.19%", height: "103.49%" }}
              />
            </div>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0) 65.285%, rgb(255,255,255) 100%), linear-gradient(-90deg, rgba(255,255,255,0) 71.138%, rgb(255,255,255) 100%), linear-gradient(0deg, rgba(255,255,255,0) 69.07%, rgb(255,255,255) 100%), linear-gradient(179.86deg, rgba(255,255,255,0) 51.97%, rgb(255,255,255) 99.827%)",
              }}
            />
          </div>

          <div className="relative flex flex-col gap-4">
            <Eyebrow label="Next step" />
            <div className="flex flex-col gap-4">
              <h2 className="font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.84px] text-ink lg:text-[42px]">
                Tell us what you need!
              </h2>
              <p className="max-w-[474px] text-[12px] leading-snug text-ink lg:text-[16px] lg:leading-normal">
                We bring the vehicle to your depot with a load on it. Forty minutes. No
                pressure. You keep the cost report.
              </p>
            </div>
          </div>

          {/* mobile (Figma 1:5028/1:5037): the form card sits above the contact rows;
              lg:contents dissolves the group on desktop so the 683px column keeps
              heading · contacts unchanged */}
          <div className="flex flex-col gap-2.5 lg:contents">
            {/* form card — mobile variant (Figma 1:5038) */}
            <div className="flex w-full flex-col gap-3 rounded-[10px] bg-surface p-4 lg:hidden">
              <div className="flex flex-col gap-1.5">
                <h3 className="text-2xl font-bold leading-[1.15] tracking-[-0.48px] text-ink">Book a test drive</h3>
                <p className="text-[12px] text-ink">Two steps. We call you within one working day.</p>
              </div>
              <div className="flex gap-3">
                <span className="flex flex-1 items-center justify-center rounded-[32px] bg-deep-card px-6 py-[10px] font-display text-[12px] font-semibold leading-none text-white">
                  Test drive
                </span>
                <span className="flex flex-1 items-center justify-center rounded-[32px] border border-white/50 bg-white/80 px-6 py-[10px] font-display text-[12px] font-semibold leading-none text-ink backdrop-blur-[10px]">
                  Price Enquiry
                </span>
                <span className="flex flex-1 items-center justify-center rounded-[32px] border border-white/50 bg-white/80 px-6 py-[10px] font-display text-[12px] font-semibold leading-none text-ink backdrop-blur-[10px]">
                  Fleet
                </span>
              </div>
              <div className="flex gap-1.5">
                <Field label="Name *" placeholder="Full name" mobile />
                <Field label="Mobile number *" placeholder="10 digit" mobile />
              </div>
              <Button variant="dark" arrow="white" className="w-full">
                Continue
              </Button>
              <p className="text-center text-[12px] font-medium text-ink">
                We never share your number with anyone else. No spam calls.
              </p>
            </div>

            {/* contact cards — relative keeps them above the absolute photo wash;
                items-start stops the lone right card stretching to the left column's height */}
            <div className="relative flex flex-col gap-2.5 lg:flex-row lg:items-start lg:gap-2.5">
              <div className="flex flex-col gap-2.5 lg:gap-2.5">
                {CONTACTS.slice(0, 2).map((c) => (
                  <ContactCard key={c.title} {...c} />
                ))}
              </div>
              <ContactCard {...CONTACTS[2]} />
            </div>
          </div>
        </div>

        {/* form card — desktop variant (Figma 517px; narrowed to balance smaller viewports) */}
        <div className="hidden w-[480px] shrink-0 flex-col gap-8 rounded-2xl bg-surface p-8 lg:flex">
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-ink">
              Book a test drive
            </h3>
            <p className="text-[16px] text-ink">Two steps. We call you within one working day.</p>
          </div>
          <FormTabs />
          <div className="flex gap-3">
            <Field label="Name *" placeholder="Full name" />
            <Field label="Mobile number *" placeholder="10 digit" />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-[12px] font-medium text-[#212125]">Which vehicle *</span>
            <div className="flex h-[46px] items-center justify-between rounded-[13px] border border-hairline bg-white px-4 py-0.5 backdrop-blur-[8.15px]">
              <span className="text-[12px] font-medium text-placeholder">Not sure, please suggest one</span>
              <Image src="/assets/contact/chevron.svg" alt="" width={14} height={6} aria-hidden className="-scale-y-100 h-1.5 w-3.5" />
            </div>
          </div>
          <div className="flex gap-3">
            <Field label="City *" placeholder="Mumbai" />
            <Field label="Kilometres per day*" placeholder="150" />
          </div>
          <label className="flex items-start gap-2.5">
            <input type="checkbox" className="mt-0.5 size-5 shrink-0 appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)]" />
            <span className="text-[14px] leading-snug text-ink">
              Euler Motors and its dealers may contact me about this enquiry. Privacy policy.
            </span>
          </label>
          <div className="flex flex-col gap-3">
            <Button variant="dark" arrow="white" className="w-full">
              Confirm test drive
            </Button>
            <p className="text-center text-[12px] text-ink">
              We never share your number with anyone else. No spam calls.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

function ContactCard({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    /* Figma fixes all three rows at ~301px wide (1:1988/1:1994/1:2000) */
    <div className="flex w-full items-center gap-2.5 rounded-2xl bg-surface p-5 lg:w-[301px] lg:gap-6">
      <span className="flex size-[42px] shrink-0 items-center justify-center rounded-[5.9px] bg-white lg:size-[58px] lg:rounded-[8.12px]">
        <Image src={icon} alt="" width={24} height={24} aria-hidden className="size-4 lg:size-6" />
      </span>
      <span className="flex flex-col gap-[6px] leading-[1.15]">
        <span className="whitespace-nowrap text-[14px] font-bold tracking-[-0.32px] text-ink lg:text-[16px]">{title}</span>
        <span className="whitespace-nowrap text-[12px] font-medium tracking-[-0.24px] text-ink">{sub}</span>
      </span>
    </div>
  );
}

function FormTabs() {
  return (
    <div className="flex gap-3">
      <span className="flex h-[42px] flex-1 items-center justify-center rounded-full bg-deep-card px-6 font-display text-[16px] font-semibold leading-none text-white">
        Test drive
      </span>
      <span className="flex h-[42px] flex-1 items-center justify-center rounded-full border border-white/50 bg-white/80 px-6 font-display text-[16px] font-semibold leading-none text-ink backdrop-blur-[10px]">
        Price Enquiry
      </span>
      <span className="flex h-[42px] flex-1 items-center justify-center rounded-full border border-white/50 bg-white/80 px-6 font-display text-[16px] font-semibold leading-none text-ink backdrop-blur-[10px]">
        Fleet
      </span>
    </div>
  );
}

function Field({ label, placeholder, mobile = false }: { label: string; placeholder: string; mobile?: boolean }) {
  return (
    <label className="flex flex-1 flex-col gap-1">
      <span className="text-[12px] font-medium text-[#212125]">{label}</span>
      <input
        type="text"
        placeholder={placeholder}
        className={
          mobile
            ? "h-9 w-full rounded-lg border border-hairline bg-white px-4 text-[12px] font-medium text-placeholder backdrop-blur-[8.15px] outline-none"
            : "h-[46px] w-full rounded-[13px] border border-hairline bg-white px-4 text-[12px] font-medium text-placeholder backdrop-blur-[8.15px] outline-none"
        }
      />
    </label>
  );
}
