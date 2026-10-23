import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PolicyHero from "@/components/sections/PolicyHero";

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main>
        <PolicyHero label="Refund policy" title="Refund Policy" variant="refund" />
        <article className="policy-content mx-auto flex w-[393px] max-w-full flex-col items-center justify-center gap-[24px] px-[32px] pb-[32px] pt-[32px] text-[12px] leading-[1.35] text-ink lg:flex lg:w-[1440px] lg:max-w-full lg:flex-col lg:items-center lg:justify-center lg:gap-[40px] lg:px-[200px] lg:pb-[42px] lg:pt-[64px] lg:text-[18px] lg:leading-[1.4]">
          <div className="max-lg:mx-auto max-lg:h-[204px] max-lg:w-[329px] max-lg:max-w-full lg:h-[175px] lg:w-full">
            <p>Last updated: <strong>October 22, 2021</strong></p>
            <p className="mt-[22px] leading-[1.5] lg:mt-[26px] lg:leading-[1.55]">In event, the Customer is not completely satisfied with a purchase for any reason. Please read our Refund and Cancellation Policy. This Refund and Cancellation Policy has been created to help the Customer to raise a request for refund and cancellation from the Company. All refund and cancellation requests must be sent vide email to customer.support@eulermotors.com or on our Customer Hotline No: 1800 1238 1238 (between 10:00 a.m. to 6:30 p.m., Monday to Saturday) with subject line (&quot;Vehicle Name and number) Cancellation&quot;.</p>
          </div>
          <PolicyCallout wide title="The Terms Of The Refund And Cancellation Policy Are As Follows:" mobileHeightClass="max-lg:h-[173px]"><ul className="list-none space-y-0 pl-0 [&>li]:relative [&>li]:pl-[1em] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:content-['•']"><li>Order Acceptance</li><li>Cancellation after the down payment or full payment done in cash (Before invoicing)</li><li>Cancellation done after Invoicing</li><li>Cancellation after Registration of the Vehicle</li></ul></PolicyCallout>
          <PolicyCallout wide tall title="We Require This Information To Understand Your Needs And Provide You With A Better Service, And In Particular For The Following Reasons:" mobileHeightClass="max-lg:min-h-[317px] max-lg:pb-[24px]"><ul className="list-none space-y-0 pl-0 [&>li]:relative [&>li]:pl-[1em] [&>li]:before:absolute [&>li]:before:left-0 [&>li]:before:top-0 [&>li]:before:content-['•']"><li>Internal record keeping.</li><li>We may use the information to improve our products and services.</li><li>We may periodically send promotional emails/SMS about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li><li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone or mail. We may use the information to customize the website according to your interests.</li></ul></PolicyCallout>
          <p className="mt-[32px] max-lg:mt-0 max-lg:mx-auto max-lg:h-[374px] max-lg:w-[329px] max-lg:max-w-full lg:mx-auto lg:h-[250px] lg:w-[1040px] lg:max-w-full lg:text-[18px]">We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics helps us understand how our customers use the site. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.</p>
        </article>
      </main>
      <Footer />
    </>
  );
}

function PolicyCallout({ title, children, wide = false, tall = false, mobileHeightClass = "" }: { title: string; children: React.ReactNode; wide?: boolean; tall?: boolean; mobileHeightClass?: string }) {
  const isFirst = wide && !tall;
  return <section className={`${wide ? "max-lg:relative max-lg:left-[-18px] max-lg:mx-auto max-lg:w-[373px] max-lg:max-w-[calc(100vw-20px)]" : "-mx-3"} mt-[20px] max-lg:mt-0 rounded-[14px] bg-[#f3f4f5] px-[12px] py-[16px] lg:mx-0 lg:rounded-[16px] ${isFirst ? "lg:flex lg:w-auto lg:max-w-full lg:flex-col lg:items-start lg:gap-[20px] lg:self-stretch lg:p-[32px] lg:h-[212px]" : tall ? "lg:flex lg:w-auto lg:max-w-full lg:flex-col lg:items-start lg:gap-[20px] lg:self-stretch lg:p-[32px] lg:min-h-[290px]" : "lg:px-[32px] lg:py-[30px]"} ${mobileHeightClass}`}><h2 className={`font-bold leading-[1.35] ${wide ? "text-[16px] lg:text-[20px]" : "text-[14px] lg:text-[16px]"}`}>{title}</h2><div className={`mt-[16px] text-[#5c5c5c] ${wide ? "lg:mt-0" : "lg:mt-[18px]"} ${wide ? "text-[12px] lg:text-[18px]" : ""} ${tall ? "leading-[1.5] lg:leading-[1.55]" : wide ? "lg:leading-[24px]" : ""}`}>{children}</div></section>;
}
