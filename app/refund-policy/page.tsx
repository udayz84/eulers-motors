import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import PolicyHero from "@/components/sections/PolicyHero";

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="overflow-clip">
        <PolicyHero label="Refund policy" title="Refund Policy" variant="refund" />
        <div className="relative flex w-full flex-col items-center justify-center bg-white pb-12 pt-8 sm:pb-16 sm:pt-10 md:pb-[56px] md:pt-[56px] lg:pb-[42px] lg:pt-[64px]">
          <div className="flex w-full max-w-[1440px] flex-col gap-6 px-4 sm:gap-8 sm:px-8 md:gap-10 md:px-12 lg:gap-[40px] lg:px-16 xl:px-[200px]">
            <div className="w-full flex-col font-sans text-[12px] leading-[1.5] text-ink sm:text-[14px] sm:leading-[1.6] md:text-[16px] md:leading-[1.65] lg:text-[18px] lg:leading-[1.4]">
              <p>Last updated: <strong className="font-bold">October 22, 2021</strong></p>
              <p className="mt-4 sm:mt-5 md:mt-6">
                In event, the Customer is not completely satisfied with a purchase for any reason. Please read our Refund and Cancellation Policy. This Refund and Cancellation Policy has been created to help the Customer to raise a request for refund and cancellation from the Company. All refund and cancellation requests must be sent vide email to customer.support@eulermotors.com or on our Customer Hotline No: 1800 1238 1238 (between 10:00 a.m. to 6:30 p.m., Monday to Saturday) with subject line (&quot;Vehicle Name and number) Cancellation&quot;.
              </p>
            </div>
            
            <div className="flex w-full flex-col gap-4 sm:gap-5 md:gap-6 lg:gap-[40px]">
              <PolicyCallout title="The terms of the Refund and Cancellation Policy are as follows:">
                <ul className="list-none space-y-1.5 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-0 [&>li]:before:content-['•']">
                  <li>Order Acceptance</li>
                  <li>Cancellation after the down payment or full payment done in cash (Before invoicing)</li>
                  <li>Cancellation done after Invoicing</li>
                  <li>Cancellation after Registration of the Vehicle</li>
                </ul>
              </PolicyCallout>

              <PolicyCallout title="We require this information to understand your needs and provide you with a better service, and in particular for the following reasons:">
                <ul className="list-none space-y-1.5 pl-0 [&>li]:relative [&>li]:pl-5 [&>li]:before:absolute [&>li]:before:left-1 [&>li]:before:top-0 [&>li]:before:content-['•']">
                  <li>Internal record keeping.</li>
                  <li>We may use the information to improve our products and services.</li>
                  <li>We may periodically send promotional emails/SMS about new products, special offers or other information which we think you may find interesting using the email address which you have provided.</li>
                  <li>From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone or mail. We may use the information to customize the website according to your interests.</li>
                </ul>
              </PolicyCallout>
            </div>

            <p className="w-full font-sans text-[12px] leading-[1.5] text-ink sm:text-[14px] sm:leading-[1.6] md:text-[16px] md:leading-[1.65] lg:text-[18px] lg:leading-[1.4]">
              We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics helps us understand how our customers use the site. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function PolicyCallout({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="w-full rounded-[16px] bg-[#f3f4f5] p-4 sm:p-6 md:p-7 lg:p-8">
      <h2 className="font-sans text-[16px] font-semibold leading-[1.4] tracking-[-0.32px] text-ink sm:text-[18px] md:text-[19px] lg:text-[20px] sm:tracking-[-0.4px]">
        {title}
      </h2>
      <div className="mt-3 font-sans text-[12px] leading-[1.5] text-ink/80 sm:mt-4 sm:text-[14px] sm:leading-[1.6] md:text-[16px] lg:text-[18px] lg:leading-[1.4]">
        {children}
      </div>
    </section>
  );
}
