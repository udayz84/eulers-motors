import Image from "next/image";

const asset = "/assets/charging-station-next-step/";

function ContactCard({
  icon,
  title,
  detail,
}: {
  icon: "phone.svg" | "email.svg";
  title: string;
  detail: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-6 rounded-2xl bg-[#f3f4f5] p-5">
      <span className="flex size-[58px] shrink-0 items-center justify-center rounded-[8.12px] bg-white">
        <Image src={`${asset}${icon}`} alt="" width={24} height={24} aria-hidden="true" />
      </span>
      <div className="flex flex-col gap-[6px] whitespace-nowrap leading-[1.15] text-[#121212]">
        <p className="font-sans text-[16px] font-bold tracking-[-0.32px]">{title}</p>
        <p className="font-sans text-[12px] font-medium tracking-[-0.24px]">{detail}</p>
      </div>
    </div>
  );
}

function InputField({
  label,
  placeholder,
  defaultValue,
  dropdown = false,
}: {
  label: string;
  placeholder?: string;
  defaultValue?: string;
  dropdown?: boolean;
}) {
  return (
    <label className="flex min-w-0 flex-1 flex-col gap-1 font-sans text-[12px] leading-normal text-[#212125]">
      <span>{label}</span>
      <span className="flex h-[46px] items-center justify-between gap-2 rounded-[13px] border border-[#ededed] bg-white px-4 backdrop-blur-[8.15px]">
        {dropdown ? (
          <select
            defaultValue={defaultValue}
            className="h-full min-w-0 flex-1 appearance-none bg-transparent font-sans text-[12px] font-medium text-[#9ca3af] outline-none"
            aria-label={label}
          >
            <option value="Petrol Pump">Petrol Pump</option>
            <option value="Warehouse">Warehouse</option>
            <option value="Land">Land</option>
          </select>
        ) : (
          <input
            aria-label={label}
            placeholder={placeholder}
            defaultValue={defaultValue}
            className="h-full min-w-0 flex-1 bg-transparent font-sans text-[12px] font-medium text-[#121212] outline-none placeholder:text-[#9ca3af]"
          />
        )}
        {dropdown && (
          <Image src={`${asset}chevron.svg`} alt="" width={14} height={6} aria-hidden="true" />
        )}
      </span>
    </label>
  );
}

function NextStepBadge() {
  return (
    <div className="relative flex h-[20.355px] items-center gap-[6px]">
      <Image
        src={`${asset}badge-left.svg`}
        alt=""
        width={149}
        height={21}
        className="absolute left-[3.43px] top-0 h-[20.355px] w-[148.821px]"
      />
      <span className="relative h-[20.355px] w-[18.821px] shrink-0">
        <Image
          src={`${asset}badge-right.svg`}
          alt=""
          width={18.2171}
          height={20.3555}
          className="absolute inset-y-0 left-[3.21%] h-[20.355px] w-[18.217px]"
        />
      </span>
      <span className="relative font-sans text-[14px] font-bold uppercase tracking-[0.7px] text-[#0e2f6d]">
        Next step
      </span>
    </div>
  );
}

export default function ChargingStationNextStep() {
  return (
    <section className="relative isolate mx-auto flex h-[611px] w-full max-w-[1440px] items-end justify-between overflow-hidden bg-white px-20 pt-16 pb-[42px] max-[767px]:h-auto max-[767px]:flex-col max-[767px]:items-stretch max-[767px]:gap-8 max-[767px]:px-6 max-[767px]:py-10">
      <div className="pointer-events-none absolute left-[72px] top-[179.55px] -z-10 hidden h-[441px] w-[631px] lg:block" aria-hidden="true">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={`${asset}background.png`}
            alt=""
            fill
            sizes="631px"
            className="scale-[1.002] object-cover"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent 65.285%, white 100%), linear-gradient(270deg, transparent 71.138%, white 100%), linear-gradient(0deg, transparent 69.07%, white 100%), linear-gradient(180deg, transparent 51.97%, white 99.827%)",
          }}
        />
      </div>

      <div className="relative z-10 flex h-full min-w-0 flex-1 flex-col items-start justify-between max-[767px]:h-auto max-[767px]:w-full max-[767px]:flex-none max-[767px]:gap-8">
        <div className="flex flex-col items-start gap-4 text-[#121212]">
          <NextStepBadge />
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-[42px] font-semibold leading-[1.15] tracking-[-0.84px] max-[767px]:text-[32px] max-[767px]:tracking-[-0.64px]">
              Host a charging point.
            </h2>
            <p className="max-w-[474px] font-sans text-[16px] leading-normal">
              Have land, a warehouse or a petrol pump on a freight route? Host an Euler charging
              point and earn from it.
            </p>
          </div>
        </div>

        <div className="relative flex flex-wrap items-start gap-[10px] max-[767px]:w-full max-[767px]:flex-col">
          <ContactCard icon="phone.svg" title="1800 000 0000" detail="9 am to 8 pm Monday to Saturday" />
          <ContactCard
            icon="email.svg"
            title="partners@eulermotors.com"
            detail="For charging and depot partners"
          />
        </div>
      </div>

      <div className="relative z-10 flex w-[517px] shrink-0 flex-col justify-center gap-8 rounded-2xl bg-[#f3f4f5] p-8 max-[767px]:w-full max-[767px]:gap-6 max-[767px]:p-6">
        <div className="flex flex-col gap-3 text-[#121212]">
          <h3 className="font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] max-[767px]:text-[26px]">
            Book a test drive
          </h3>
          <p className="font-sans text-[16px] leading-normal">
            Two steps. We call you within one working day.
          </p>
        </div>

        <form className="flex flex-col gap-8 max-[767px]:gap-6">
          <div className="flex gap-3 max-[480px]:flex-col">
            <InputField label="Name *" placeholder="Full name" />
            <InputField label="Mobile number *" placeholder="10 digit" />
          </div>
          <div className="flex gap-3 max-[480px]:flex-col">
            <InputField label="City *" placeholder="Mumbai" />
            <InputField label="What you have" defaultValue="Petrol Pump" dropdown />
          </div>
          <label className="flex w-full items-center gap-[10px] font-sans text-[14px] leading-normal text-[#121212]">
            <input
              type="checkbox"
              className="size-5 shrink-0 appearance-none rounded-full border border-[#0c1530] bg-[rgba(12,21,48,0.04)] checked:bg-[#0c2c66]"
            />
            <span>Euler Motors may contact me about this enquiry.</span>
          </label>
          <button
            type="button"
            className="flex h-[50.477px] w-fit items-center justify-center gap-2 rounded-[4px] border-[0.5px] border-white bg-[#121212] px-6 font-display text-[16px] font-semibold leading-none text-white"
          >
            Send enquiry
            <Image src={`${asset}arrow.svg`} alt="" width={22} height={14} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}
