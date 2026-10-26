"use client";

import Image from "next/image";
import Eyebrow from "@/components/ui/Eyebrow";
import PagerBar from "@/components/ui/PagerBar";

const TESTIMONIALS = [
  {
    quote:
      "Joined to work on advanced electric powertrains. Stayed because of the collaborative culture and freedom to innovate. The team here genuinely values engineering excellence and new ideas.",
    name: "Rahul Deshmukh",
    role: "Senior Engineer, Euler Motors",
    image: "/assets/careers/testimonial-rahul.png",
  },
  {
    quote:
      "Joined to build cutting-edge battery packs. Stayed because of the high trust and low bureaucracy. The ownership given to engineers here is rare in the EV sector.",
    name: "Jahan Melad",
    role: "Project Manager, Euler Motors",
    image: "/assets/careers/testimonial-jahan.png",
  },
  {
    quote:
      "Came here to solve real-world mobility challenges. Stayed because of the supportive leadership and meaningful work. Every project gives us the opportunity to build technology that makes a difference.",
    name: "Priya Sharma",
    role: "Manufacturing Lead, Euler Motors",
    image: "/assets/careers/testimonial-priya.png",
  },
];

type Testimonial = (typeof TESTIMONIALS)[number];

function TestimonialCard({
  testimonial,
  isDuplicate = false,
}: {
  testimonial: Testimonial;
  isDuplicate?: boolean;
}) {
  return (
    <article
      aria-hidden={isDuplicate || undefined}
      data-testimonial={isDuplicate ? undefined : true}
      className={`${isDuplicate ? "hidden lg:flex" : "flex"} h-auto min-h-[338px] w-[353px] min-w-[353px] shrink-0 snap-center flex-col items-start justify-between gap-5 overflow-hidden rounded-[12px] bg-[#f3f4f5] p-5 lg:h-[443px] lg:min-h-[443px] lg:w-[620px] lg:min-w-[620px] lg:items-stretch lg:gap-8 lg:p-8`}
    >
      <div className="flex items-center justify-between self-stretch">
        <svg
          aria-hidden="true"
          viewBox="0 0 23.092 18.4"
          className="h-[18.4px] w-[23.092px] shrink-0 fill-brand lg:h-[25.76px] lg:w-[32.33px]"
        >
          <path d="M0 18.4V10.6C0 4.8 3.6 0 9.2 0V5.6C6.7 5.6 5.3 7.3 5.2 9.4H9.2V18.4H0ZM13.892 18.4V10.6C13.892 4.8 17.492 0 23.092 0V5.6C20.592 5.6 19.192 7.3 19.092 9.4H23.092V18.4H13.892Z" />
        </svg>
        <span className="flex items-center self-stretch gap-1 rounded-[400px] border border-[rgba(29,111,255,0.02)] bg-white px-2.5 py-1.5 font-sans text-[13px] font-semibold text-ink/60 shadow-[0_0_12px_0_rgba(0,0,0,0.05)] lg:h-8 lg:gap-[5px] lg:self-auto lg:rounded-[560px] lg:border-brand/[0.05] lg:py-0 lg:shadow-[0_0_8px_rgb(0_0_0_/_5%)] lg:text-base">
          <svg aria-hidden="true" viewBox="0 0 16 16" className="size-[14px] fill-[#7e7e7e]">
            <path d="m8 1 1.8 4.2 4.6.4-3.5 3 1.1 4.5L8 10.7 4 13.1l1.1-4.5-3.5-3 4.6-.4L8 1Z" />
          </svg>
          4.5
        </span>
      </div>
      <p className="m-0 self-stretch font-sans text-[18px] font-bold leading-[1.4] tracking-[-0.24px] text-ink lg:text-[26px] lg:tracking-[-0.52px]">&quot;{testimonial.quote}&quot;</p>
      <div className="h-px w-[86px] bg-ink/20 lg:h-0.5 lg:w-[121px]" />
      <div className="flex items-center gap-2.5 self-stretch">
        <Image src={testimonial.image} alt="" width={62} height={62} className="size-[42px] shrink-0 rounded-full object-cover lg:size-[62px]" />
        <div className="flex min-w-0 flex-1 flex-col">
          <h3 className="mb-1 mt-0 self-stretch font-sans text-base font-bold leading-none tracking-[-0.32px] text-ink [transform:rotate(-0.772deg)] lg:text-2xl lg:leading-[1.2] lg:tracking-normal lg:[transform:none]">{testimonial.name}</h3>
          <p className="m-0 font-sans text-xs font-normal leading-none tracking-[-0.24px] text-ink/80 lg:text-sm lg:leading-[1.2] lg:tracking-normal">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}

export default function CareerTestimonials() {
  return (
    <section className="relative flex w-full flex-col items-center gap-6 overflow-clip bg-white py-8 lg:min-h-0 lg:gap-[42px] lg:py-[62px]" aria-labelledby="career-testimonials-heading">
      <div className="flex w-[calc(100%-40px)] max-w-[518px] flex-col items-center gap-3 text-center lg:gap-4">
        <Eyebrow label="Employee voices" />
        <h2 id="career-testimonials-heading" className="m-0 w-full font-display text-[28px] font-semibold leading-[1.15] tracking-[-0.56px] text-ink lg:text-[42px] lg:tracking-[-0.84px]">What Our People Say</h2>
        <p className="m-0 font-sans text-xs font-normal leading-normal text-ink lg:w-[518.28px] lg:text-base">
          Read unfiltered feedback and experiences shared by members of the Euler Motors tech,
          manufacturing, and support divisions.
        </p>
      </div>

      <div
        id="career-testimonials-row"
        className="no-scrollbar flex w-full snap-x snap-mandatory items-center gap-2.5 overflow-x-auto overflow-y-hidden px-[max(20px,calc((100vw-353px)/2))] touch-pan-x overscroll-y-contain lg:w-max lg:items-stretch lg:gap-2.5 lg:px-0 lg:overflow-x-visible lg:overflow-y-hidden motion-safe:lg:animate-[marquee_40s_linear_infinite] lg:[--marquee-gap:10px]"
        aria-label="Employee testimonials"
      >
        {Array.from({ length: 4 }).map((_, setIndex) =>
          TESTIMONIALS.map((testimonial) => (
            <TestimonialCard
              key={`${setIndex}-${testimonial.name}`}
              testimonial={testimonial}
              isDuplicate={setIndex > 0}
            />
          )),
        )}
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute bottom-[62.17px] left-0 z-10 hidden h-[551px] w-[287.979px] [transform:scaleX(-1)] bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] lg:block" />
      <div aria-hidden="true" className="pointer-events-none absolute right-[-0.001px] bottom-[62.17px] z-10 hidden h-[551px] w-[268.629px] bg-[linear-gradient(270deg,#FFF_0%,rgba(255,255,255,0)_100%)] lg:block" />

      <PagerBar
        rowId="career-testimonials-row"
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
