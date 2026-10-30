import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PolicyHero from "@/components/sections/PolicyHero";
import MobilePageHero from "@/components/sections/MobilePageHero";
import FloatingWidget from "@/components/FloatingWidget";

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <div className="lg:hidden">
          <MobilePageHero
            label="Refund policy"
            title="Refund Policy"
            titleId="refund-title-mobile"
            description="We protect your data and respect your privacy."
          />
        </div>
        <div className="hidden lg:block">
          <PolicyHero label="Refund policy" title="Refund Policy" variant="refund" />
        </div>
        <div className="relative mx-auto flex w-full flex-col items-center justify-center gap-6 bg-white px-5 py-8 sm:gap-8 sm:px-8 sm:py-10 lg:w-full lg:max-w-none lg:gap-0 lg:px-8 xl:px-0 lg:pb-[62px] lg:pt-[64px]" aria-labelledby="refund-title">
          <div className="flex w-full max-w-[720px] mx-auto flex-col gap-6 p-0 sm:gap-8 lg:max-w-[1040px] lg:gap-[40px] lg:px-0">
            <div className="h-auto min-h-[204px] w-full flex-col self-stretch font-sans text-[12px] font-normal leading-[140%] text-[#121212] sm:h-auto sm:min-h-0 sm:w-full sm:text-[14px] sm:leading-[1.6] lg:h-auto lg:min-h-[275px] lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[140%]">
              <p className="font-normal" style={{ fontWeight: 400 }}>Last updated: <strong className="font-bold" style={{ fontWeight: 700 }}>October 22, 2021</strong></p>
              <p className="mt-4 sm:mt-5 md:mt-6 lg:mt-6 font-normal">
                In event, the Customer is not completely satisfied with a purchase for any reason. Please read our Refund and Cancellation Policy. This Refund and Cancellation Policy has been created to help the Customer to raise a request for refund and cancellation from the Company. All refund and cancellation requests must be sent vide email to customer.support@eulermotors.com or on our Customer Hotline No: 1800 1238 1238 (between 10:00 a.m. to 6:30 p.m., Monday to Saturday) with subject line (&quot;Vehicle Name and number) Cancellation&quot;.
              </p>
            </div>
            
            <div className="flex w-[373px] max-w-[calc(100vw_-_20px)] flex-col gap-4 self-center sm:w-full sm:max-w-full sm:gap-5 md:gap-6 lg:w-full lg:max-w-[1040px] lg:!gap-[40px] lg:self-stretch">
              <PolicyCallout title="The Terms Of The Refund And Cancellation Policy Are As Follows:" className="lg:h-auto lg:min-h-[212px] lg:!p-[32px] lg:!gap-[20px] lg:!flex-col lg:!items-center lg:!self-stretch">
                <ul className="list-none space-y-0 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:leading-[140%] [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-0 [&>li]:before:content-['•'] lg:self-stretch">
                  <li>Order Acceptance</li>
                  <li>Cancellation after the down payment or full payment done in cash (Before invoicing)</li>
                  <li>Cancellation done after Invoicing</li>
                  <li>Cancellation after Registration of the Vehicle</li>
                </ul>
              </PolicyCallout>

              <PolicyCallout title="We Require This Information To Understand Your Needs And Provide You With A Better Service, And In Particular For The Following Reasons:" className="lg:h-auto lg:min-h-[290px] lg:!flex lg:!p-[32px] lg:!flex-col lg:!items-center lg:!gap-[20px] lg:!self-stretch lg:!rounded-[16px] lg:!bg-[#F3F4F5]" contentClassName="lg:!mt-0">
                <ul className="list-none space-y-0 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-0 [&>li]:before:content-['•'] lg:self-stretch">
                  <li>Internal record keeping.</li>
                  <li>We may use the information to improve our products and services.</li>
                  <li>We may periodically send promotional emails/SMS about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                  <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone or mail. We may use the information to customize the website according to your interests.</li>
                </ul>
              </PolicyCallout>
            </div>

            <p className="w-full self-stretch font-sans text-[12px] font-normal leading-[140%] text-[#121212] sm:text-[14px] sm:leading-[1.6] lg:h-auto lg:w-full lg:max-w-[1040px] lg:text-[18px] lg:leading-[140%]">
              We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics helps us understand how our customers use the site. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
            </p>
          </div>
          <FloatingWidget mobileOnly mobileClassName="top-[361px] -translate-y-1/2" />
        </div>
      </main>
      <Footer />
    </>
  );
}

function PolicyCallout({ title, children, className = "", headingClassName = "", contentClassName = "" }: { title: string; children: React.ReactNode; className?: string; headingClassName?: string; contentClassName?: string }) {
  return (
    <>
      <section className="flex w-full flex-col items-center justify-center gap-3 self-stretch rounded-[16px] bg-[#F3F4F5] px-4 py-4 sm:p-6 lg:hidden">
        <h2 className={`self-stretch font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-[#121212] capitalize sm:text-[18px] sm:tracking-[-0.36px] ${headingClassName}`}>
          {title}
        </h2>
        <div className={`self-stretch font-sans text-[12px] font-normal leading-[140%] text-[rgba(18,18,18,0.80)] sm:text-[14px] sm:leading-[1.6] ${contentClassName}`}>
          {children}
        </div>
      </section>
      <section className={`hidden lg:flex lg:h-auto lg:min-h-[212px] lg:w-full lg:max-w-[1040px] lg:flex-col lg:items-center lg:gap-[20px] lg:self-stretch lg:rounded-[16px] lg:bg-[#F3F4F5] lg:p-[32px] ${className}`}>
        <h2 className="font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink sm:text-[18px] md:text-[19px] lg:w-full lg:max-w-[976px] lg:min-h-[28px] lg:self-stretch lg:text-[20px] lg:leading-[140%] lg:tracking-[-0.4px] lg:capitalize" style={{ color: "#121212", fontFamily: "Manrope", fontSize: "20px", fontStyle: "normal", fontWeight: 600, lineHeight: "140%", letterSpacing: "-0.4px", textTransform: "capitalize", alignSelf: "stretch" }}>
          {title}
        </h2>
        <div className={`mt-3 font-sans text-[12px] leading-[1.5] text-[#5c5c5c] sm:mt-4 sm:text-[14px] sm:leading-[1.6] md:text-[16px] lg:!mt-0 lg:w-full lg:max-w-[976px] lg:self-stretch lg:text-[18px] lg:leading-[140%] ${contentClassName}`} style={{ color: "rgba(18, 18, 18, 0.80)", fontFamily: "Manrope", fontSize: "18px", fontStyle: "normal", fontWeight: 400, lineHeight: "140%", alignSelf: "stretch" }}>
          {children}
        </div>
      </section>
    </>
  );
}
