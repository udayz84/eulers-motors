import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/sections/Footer";
import InsightShareButtons from "@/components/sections/InsightShareButtons";
import Navbar from "@/components/Navbar";
import { ARTICLE_SUMMARIES, CHARGING_GUIDE_SLUG } from "../article-data";

type PageProps = { params: Promise<{ slug: string }> };

const getArticle = (slug: string) =>
  ARTICLE_SUMMARIES.find((article) => article.slug === slug);

export function generateStaticParams() {
  return ARTICLE_SUMMARIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  return article
    ? { title: `${article.title} | Euler Motors`, description: article.excerpt }
    : { title: "Article not found | Euler Motors" };
}

function ArticleHero({
  article,
}: {
  article: (typeof ARTICLE_SUMMARIES)[number];
}) {
  return (
    <section className="relative h-[594px] w-full overflow-hidden lg:h-[650px]">
      <Image
        src={article.image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/80"
      />
      <div className="absolute inset-x-5 top-[85px] flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap text-[14px] font-bold text-white lg:left-20 lg:right-auto lg:top-[90px] lg:text-[16px]">
        <Link href="/" className="shrink-0 hover:underline">Home</Link>
        <span aria-hidden className="px-1">›</span>
        <Link href="/insights" className="shrink-0 hover:underline">Blog</Link>
        <span aria-hidden className="px-1">›</span>
        <span className="overflow-hidden text-ellipsis text-[#ccc]">{article.title}</span>
      </div>
      <div className="absolute bottom-7 left-5 flex w-[calc(100%-40px)] max-w-[559px] flex-col items-start gap-3 lg:bottom-[62px] lg:left-20 lg:gap-5">
        <div className="relative flex items-center gap-1">
          <div className="absolute left-[3px] top-0 h-4 w-[117px] lg:h-5 lg:w-[149px]">
            <Image src="/assets/insights/eyebrow-1.svg" alt="" fill className="object-cover" />
          </div>
          <div className="relative h-4 w-[15px] lg:h-5 lg:w-[19px]">
            <Image src="/assets/insights/eyebrow-2.svg" alt="" fill className="object-cover" />
          </div>
          <span className="relative whitespace-nowrap text-[12px] font-bold uppercase tracking-[0.6px] text-white lg:text-[14px] lg:tracking-[0.7px]">
            {article.category}
          </span>
        </div>
        <h1 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] text-white lg:text-[32px] lg:tracking-[-0.64px]">
          {article.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2 text-[12px] font-semibold text-white/60 lg:gap-4 lg:text-[16px]">
          <span className="flex items-center gap-1">
            <span className="flex size-5 items-center justify-center rounded-full bg-white/20 text-[9px] font-bold text-white lg:size-8 lg:text-[12px]" aria-hidden>AS</span>
            Aditi Singh
          </span>
          <span aria-hidden className="size-[3px] rounded-full bg-white/60 lg:size-1.5" />
          <span>{article.date}</span>
          <span aria-hidden className="size-[3px] rounded-full bg-white/60 lg:size-1.5" />
          <span>{article.readTime}</span>
        </div>
      </div>
    </section>
  );
}

function ArticleSearchAndShare() {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
      <form action="/insights" className="flex h-[42px] w-full items-center gap-2 rounded-full border border-black/[0.06] bg-[#f3f4f5] px-3 lg:h-[46px] lg:flex-1 lg:gap-3 lg:px-4">
        <Image src="/assets/insights/search-icon.svg" alt="" width={20} height={20} className="size-[14px] lg:size-5" />
        <input
          name="q"
          type="search"
          placeholder="Search articles"
          aria-label="Search articles"
          className="min-w-0 flex-1 bg-transparent text-[14px] font-semibold text-ink outline-none placeholder:text-ink/80 lg:text-[16px]"
        />
      </form>
      <div className="flex items-center gap-2 lg:gap-3">
        <span className="whitespace-nowrap font-display text-[14px] tracking-[-0.28px] text-ink">Share this article</span>
        <InsightShareButtons />
      </div>
    </div>
  );
}

function ArticleEndActions() {
  return (
    <div className="flex flex-col gap-5 border-t border-black/10 pt-5 lg:flex-row lg:items-center lg:justify-between lg:pt-6">
      <div className="flex flex-wrap items-center gap-3">
        <span className="whitespace-nowrap font-display text-[14px] tracking-[-0.28px] text-ink">Share this article</span>
        <InsightShareButtons />
      </div>
      <div className="flex flex-wrap gap-2">
        <Link href="/#savings-calculator" className="rounded bg-ink px-4 py-3 font-display text-[12px] font-semibold text-white">Savings Calculator</Link>
        <Link href="/products" className="rounded border border-black/30 px-4 py-3 font-display text-[12px] font-semibold text-ink">Download Brochure</Link>
        <a href="tel:180012381238" className="rounded border border-black/30 px-4 py-3 font-display text-[12px] font-semibold text-ink">1800-1238-1238</a>
      </div>
    </div>
  );
}

function ArticlePhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-[160px] overflow-hidden rounded-lg lg:h-[260px]">
      <Image src={src} alt={alt} fill sizes="(max-width: 1023px) 353px, 504px" className="object-cover" />
    </div>
  );
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="rounded-[10px] bg-[#f3f4f5] px-4 py-4 text-[12px] font-medium leading-[1.4] text-ink lg:rounded-2xl lg:px-8 lg:py-8 lg:text-[18px]">
      {children}
    </blockquote>
  );
}

function ArticleHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="font-display text-[14px] font-semibold leading-[1.4] tracking-[-0.28px] text-ink lg:text-[24px] lg:tracking-[-0.48px]">{children}</h2>;
}

function ArticleText({ children }: { children: React.ReactNode }) {
  return <p className="text-[12px] leading-[1.4] text-ink lg:text-[18px]">{children}</p>;
}

function BookingForm() {
  return (
    <form className="flex w-full flex-col gap-4 rounded-[10px] bg-[#f3f4f5] p-4 lg:w-[517px] lg:shrink-0 lg:gap-6 lg:rounded-2xl lg:p-8">
      <div className="flex flex-col gap-1.5">
        <h2 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] text-ink lg:text-[32px] lg:tracking-[-0.64px]">Book a test drive</h2>
        <p className="text-[12px] text-ink lg:text-[16px]">Two steps. We call you within one working day.</p>
      </div>
      <div className="flex gap-1 rounded-full bg-white/80 p-1 text-center text-[11px] font-semibold lg:text-[13px]">
        <span className="flex-1 rounded-full bg-[#0c2c66] px-2 py-2 text-white">Test drive</span>
        <span className="flex-1 px-2 py-2 text-ink">Price Enquiry</span>
        <span className="flex-1 px-2 py-2 text-ink">Fleet</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {[["Name *", "Full name"], ["Mobile number *", "10 digit"], ["Which vehicle *", "Not sure, please suggest one"], ["City *", "Mumbai"], ["Kilometres per day*", "150"]].map(([label, placeholder]) => (
          <label key={label} className="flex min-w-0 flex-col gap-1 text-[11px] font-medium text-[#212125] last:col-span-2">
            {label}
            <input placeholder={placeholder} className="h-10 min-w-0 rounded-lg border border-[#ededed] bg-white px-3 text-[11px] outline-none" />
          </label>
        ))}
      </div>
      <p className="text-[10px] leading-snug text-ink">Euler Motors and its dealers may contact me about this enquiry. Privacy policy.</p>
      <button type="button" className="h-11 rounded bg-ink px-5 text-left font-display text-[14px] font-semibold text-white">Confirm test drive</button>
      <p className="text-center text-[11px] font-medium text-ink">We never share your number with anyone else. No spam calls.</p>
    </form>
  );
}

function ChargingGuideBody() {
  return (
    <div className="flex w-full flex-col gap-6 lg:gap-8">
      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
        <ArticlePhoto src="/assets/insights/article-1.jpg" alt="Euler electric truck on the road" />
        <ArticleText>
          For fleet operators moving to electric commercial vehicles, charging is the single most important operational decision after the vehicle itself. Where you charge, how you charge, and when you charge shapes everything from daily route planning to total cost of ownership.<br /><br />
          This guide compares the two main approaches depot (home-base) charging and public charging and explains how most fleet operators combine both to keep vehicles running without downtime.
        </ArticleText>
      </div>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-8">
        <ArticlePhoto src="/assets/insights/article-3.png" alt="Public electric vehicle charging stations" />
        <div className="flex flex-col gap-2.5 lg:gap-3">
          <ArticleHeading>Understanding depot charging</ArticleHeading>
          <ArticleText>Depot charging means plugging in at your own premises — a warehouse, distribution centre, or fleet yard. The vehicle charges overnight or between shifts, using either a standard 15A wall socket or a dedicated AC charger.</ArticleText>
        </div>
      </div>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>How depot charging works</ArticleHeading>
        <ArticleText>Most commercial EVs, including the Euler HiLoad, ship with an onboard charger that accepts standard AC input. You plug in when the vehicle returns from its last delivery, and it charges through the night. By morning the battery is full.</ArticleText>
        <ul className="list-disc space-y-1 pl-5 text-[12px] leading-[1.4] text-ink lg:space-y-2 lg:pl-7 lg:text-[18px]">
          <li>A standard 15A socket charges an Euler HiLoad from 0–100% in roughly 5 hours</li>
          <li>A dedicated 3.3 kW AC charger can reduce this to about 4 hours</li>
          <li>No special electrical infrastructure is needed beyond a dedicated circuit and an earthed socket</li>
          <li>Charging costs follow your commercial electricity tariff, which in most Indian states is ₹6–₹9 per kWh</li>
        </ul>
      </section>

      <Quote>For a typical last-mile delivery route of 60–80 km per day, overnight depot charging covers the full range with energy to spare. Most fleet operators never need to charge during working hours.</Quote>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>Advantages of depot charging</ArticleHeading>
        <ul className="space-y-2 text-[12px] leading-[1.4] text-ink lg:space-y-3 lg:text-[18px]">
          <li><strong>Lowest cost per kilometre -</strong> Commercial electricity is cheaper than public charging tariffs, which include service fees and demand charges.</li>
          <li><strong>Predictable scheduling -</strong> Vehicles charge during downtime, so charging never competes with delivery runs.</li>
          <li><strong>No waiting -</strong> There is no queue. Each vehicle has its own socket or charger bay.</li>
          <li><strong>Battery-friendly -</strong> Slow overnight charging puts less thermal stress on the battery than fast DC charging, preserving long-term capacity.</li>
        </ul>
      </section>

      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:gap-8">
        <div className="flex flex-1 flex-col gap-2.5 lg:gap-3">
          <ArticleHeading>Understanding public charging</ArticleHeading>
          <ArticleText>Public charging stations are third-party installations at fuel stations, highway rest stops, malls, and commercial zones. They typically offer DC fast charging at 30 kW to 60 kW, bringing a depleted battery to 80% in 30–50 minutes.</ArticleText>
        </div>
        <BookingForm />
      </div>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>When public charging makes sense</ArticleHeading>
        <ArticleText>Public charging is not a replacement for depot charging — it is a supplement. Fleet operators use it in specific situations:</ArticleText>
        <ul className="list-disc space-y-1 pl-5 text-[12px] leading-[1.4] text-ink lg:space-y-2 lg:pl-7 lg:text-[18px]">
          <li>Vehicles on longer intercity routes that exceed single-charge range</li>
          <li>Mid-day top-ups during high-utilisation shifts</li>
          <li>Emergency charging when a vehicle returns with lower charge than expected</li>
          <li>Vehicles that park at customer sites overnight and cannot return to the depot</li>
        </ul>
      </section>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>Challenges of relying on public charging</ArticleHeading>
        <ArticleText>Public infrastructure in India is growing quickly but is not yet uniformly distributed. Fleet operators who depend entirely on public charging face several friction points:</ArticleText>
        <ul className="list-disc space-y-1 pl-5 text-[12px] leading-[1.4] text-ink lg:space-y-2 lg:pl-7 lg:text-[18px]">
          <li>Higher per-kWh cost (typically ₹12–₹18 versus ₹6–₹9 at a depot)</li>
          <li>Potential wait times at busy stations, especially during peak hours</li>
          <li>Charger compatibility — not all public stations support all connector types</li>
          <li>Uptime variability — some stations go offline for maintenance with limited notice</li>
        </ul>
      </section>

      <Quote>“Most of our operators charge at their depot 90% of the time. Public charging is the safety net, not the primary plan.”</Quote>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>Combining both: the hybrid approach</ArticleHeading>
        <ArticleText>The most efficient fleets use a hybrid model. Depot charging handles the daily energy needs, while public charging covers edge cases — long routes, double shifts, or unexpected detours.</ArticleText>
      </section>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>Setting up your depot</ArticleHeading>
        <ArticleText>A depot charging setup for a small fleet of 5–10 vehicles requires:</ArticleText>
        <ul className="space-y-2 text-[12px] leading-[1.4] text-ink lg:space-y-3 lg:text-[18px]">
          <li><strong>Dedicated electrical capacity -</strong> Industrial-grade sockets with MCB protection, installed where vehicles park.</li>
          <li><strong>Earthed, weather-protected sockets -</strong> Vehicles charge during downtime, so charging never competes with delivery runs.</li>
          <li><strong>Cable management -</strong> Keep charging cables off the ground and away from vehicle movement paths.</li>
          <li><strong>A charging schedule -</strong> Stagger start times if your sanctioned load is tight — not every vehicle needs to start charging at the same moment.</li>
        </ul>
      </section>

      <Quote>Euler&apos;s Shepherd app shows real-time battery level for every vehicle in your fleet. Operators can monitor charging status remotely and plan the next day&apos;s routes based on available range.</Quote>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>Mapping public chargers on your routes</ArticleHeading>
        <ArticleText>Before committing to routes that depend on mid-way public charging, verify three things: charger location, connector compatibility, and station uptime history. Euler&apos;s connected platform shows nearby charging stations and can alert drivers when battery level drops below a threshold.</ArticleText>
      </section>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>Cost comparison</ArticleHeading>
        <ArticleText>The table below compares charging costs for a typical Euler HiLoad covering 80 km per day. Actual figures will vary by state electricity tariff and public station pricing.</ArticleText>
        <div className="overflow-x-auto rounded-[10px] bg-[#f3f4f5] p-3 lg:rounded-2xl lg:p-6">
          <table className="w-full min-w-[320px] border-collapse text-left text-[11px] leading-[1.4] text-ink lg:text-[16px]">
            <thead><tr className="border-b border-black/10"><th className="pb-3 pr-3 font-semibold">Charging type</th><th className="pb-3 pr-3 font-semibold">Cost per charge</th><th className="pb-3 font-semibold">Cost per km</th></tr></thead>
            <tbody>
              <tr className="border-b border-black/10"><th className="py-3 pr-3 font-medium">Depot charging</th><td className="py-3 pr-3">~₹50–₹70</td><td className="py-3">₹0.63–₹0.88</td></tr>
              <tr className="border-b border-black/10"><th className="py-3 pr-3 font-medium">Public DC fast charging</th><td className="py-3 pr-3">~₹100–₹145</td><td className="py-3">₹1.25–₹1.81</td></tr>
              <tr><th className="pt-3 pr-3 font-medium">Diesel equivalent</th><td className="pt-3 pr-3">~₹280–₹350</td><td className="pt-3">₹3.50–₹4.38</td></tr>
            </tbody>
          </table>
        </div>
        <ArticleText>Even at public charging rates, electric is significantly cheaper than diesel. But depot charging roughly halves the energy cost again, which compounds across a fleet and over years.</ArticleText>
      </section>

      <section className="flex flex-col gap-2.5 lg:gap-3">
        <ArticleHeading>Practical tips for fleet operators</ArticleHeading>
        <ArticleText><strong>Start with depot charging -</strong> Install it before your first vehicle arrives. Most operators find this covers 90%+ of their energy needs.</ArticleText>
      </section>
    </div>
  );
}

function RelatedArticles() {
  const related = ARTICLE_SUMMARIES.filter((article) =>
    ["connected-vehicles-business", "electric-fleet-costs", "ev-subsidy"].includes(article.slug),
  );
  return (
    <section className="bg-[#f3f4f5] px-5 py-10 lg:px-[80px] lg:py-16">
      <div className="mx-auto max-w-[1280px]">
        <div className="mb-6 flex items-end justify-between lg:mb-8">
          <div>
            <p className="mb-2 text-[12px] font-bold uppercase tracking-[0.6px] text-[#0e2f6d]">Keep reading</p>
            <h2 className="font-display text-[24px] font-semibold tracking-[-0.48px] text-ink lg:text-[36px]">Related articles</h2>
          </div>
          <Link href="/insights" className="hidden text-[14px] font-semibold text-[#0e2f6d] hover:underline lg:block">All articles</Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
          {related.map((article) => (
            <Link key={article.slug} href={`/insights/${article.slug}`} className="flex gap-4 rounded-xl bg-white p-3 transition-shadow hover:shadow-lg lg:flex-col lg:p-5">
              <div className="relative h-[104px] w-[112px] shrink-0 overflow-hidden rounded-lg lg:h-[190px] lg:w-full">
                <Image src={article.image} alt="" fill sizes="(max-width: 1023px) 112px, 360px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-[0.7px] text-[#5c6675]">{article.category}</p>
                <h3 className="line-clamp-2 font-display text-[15px] font-semibold leading-[1.25] text-ink lg:text-[20px]">{article.title}</h3>
                <p className="hidden text-[13px] leading-[1.4] text-ink/80 lg:line-clamp-2 lg:block">{article.excerpt}</p>
                <span className="mt-auto text-[11px] font-semibold text-ink/60">{article.date} · {article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FleetBanner() {
  return (
    <section className="bg-white px-5 py-8 lg:px-[80px] lg:py-12">
      <div className="relative mx-auto flex min-h-[220px] max-w-[1280px] items-center overflow-hidden rounded-xl bg-[#c8d8f4] px-6 py-8 lg:min-h-[270px] lg:px-14">
        <Image src="/assets/enterprise/dealer-photo.png" alt="Euler Motors service centre" fill sizes="(max-width: 1023px) 100vw, 1280px" className="object-cover object-right" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-[#d7e5ff] via-[#c7d9f5]/90 to-transparent" />
        <div className="relative max-w-[520px]">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.7px] text-[#0e2f6d]">38 cities open</p>
          <h2 className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.48px] text-ink lg:text-[36px]">See how Euler fits your fleet</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/dealer-locator" className="rounded bg-[#121212] px-4 py-3 font-display text-[12px] font-semibold text-white">Find a dealer</Link>
            <Link href="/products" className="rounded border border-[#121212]/50 bg-white/70 px-4 py-3 font-display text-[12px] font-semibold text-ink">Explore vehicles</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const hasFullArticle = slug === CHARGING_GUIDE_SLUG;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <ArticleHero article={article} />
      <article className="bg-white px-5 pb-10 pt-8 lg:px-0 lg:pb-[42px] lg:pt-16">
        <div className="mx-auto flex w-full max-w-[1040px] flex-col gap-6 lg:gap-10">
          <ArticleSearchAndShare />
          {hasFullArticle ? (
            <ChargingGuideBody />
          ) : (
            <div className="flex flex-col gap-4 text-[14px] leading-[1.5] text-ink lg:text-[18px]">
              <h2 className="font-display text-[20px] font-semibold lg:text-[24px]">{article.title}</h2>
              <p>{article.excerpt}</p>
            </div>
          )}
          <ArticleEndActions />
        </div>
      </article>
      <RelatedArticles />
      <FleetBanner />
      <Footer />
    </main>
  );
}
