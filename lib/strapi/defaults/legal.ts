import type {
  StrapiPrivacyPolicyPageData,
  StrapiRefundPolicyPageData,
  StrapiTermsConditionsPageData,
} from "@/types/strapi";

export const defaultPrivacyPolicyPageData: StrapiPrivacyPolicyPageData = {
  hero: {
    label: "Privacy policy",
    title: "Privacy Policy",
    description: "We protect your data and respect your privacy.",
  },
  intro: {
    lastUpdated: "October 22, 2021",
    paragraphs: [
      "This is our policy which outlines how Euler Motors Private Limited protects any information that you give us when you visit the website. Euler Motors Private Limited is committed to ensuring that your privacy is protected.",
      "Should we ask you to provide certain information by which you can be identified when using the website, then you can be assured that it will only be used in accordance with this privacy statement.",
      "Euler Motors Private Limited may change this policy from time to time by updating this page. You should check this page from time to time to ensure that you are happy with any changes. This policy is effective from October 22, 2021.",
    ].join("\n\n"),
  },
  sections: [
    {
      title: "We may collect the following information:",
      body: "We may collect information such as your name, contact details, vehicle preferences, service requests, and any other information you choose to share with us while using our website or contacting our team.",
    },
    {
      title: "Why we collect this information:",
      body: "Information record keeping\nTo improve our products and services. To send promotional emails/SMS about new products, special offers or other information which we think you may find interesting. To contact you for market research purposes by email, phone or mail. To customize the website according to your preferences and interests",
    },
    {
      title: "Security",
      body: "We take reasonable steps to keep your information safe from unauthorized access, misuse, or disclosure. Access to information is limited to people who need it to provide our services and support your relationship with Euler Motors.",
    },
    {
      title: "Cookies",
      body: "We use cookies to help the website work properly, remember your preferences, and understand how visitors use our pages. You can manage or disable cookies through your browser settings, although some website features may not work as expected.",
    },
  ],
  seo: {
    metaTitle: "Privacy Policy | Euler Motors",
    metaDescription: "We protect your data and respect your privacy.",
  },
};

export const defaultRefundPolicyPageData: StrapiRefundPolicyPageData = {
  hero: {
    label: "Refund policy",
    title: "Refund Policy",
    description: "We protect your data and respect your privacy.",
  },
  intro: {
    lastUpdated: "October 22, 2021",
    paragraphs:
      "In event, the Customer is not completely satisfied with a purchase for any reason. Please read our Refund and Cancellation Policy. This Refund and Cancellation Policy has been created to help the Customer to raise a request for refund and cancellation from the Company. All refund and cancellation requests must be sent vide email to customer.support@eulermotors.com or on our Customer Hotline No: 1800 1238 1238 (between 10:00 a.m. to 6:30 p.m., Monday to Saturday) with subject line (\u201cVehicle Name and number) Cancellation\u201d.",
  },
  callouts: [
    {
      title: "The Terms Of The Refund And Cancellation Policy Are As Follows:",
      items: [
        { text: "Order Acceptance" },
        { text: "Cancellation after the down payment or full payment done in cash (Before invoicing)" },
        { text: "Cancellation done after Invoicing" },
        { text: "Cancellation after Registration of the Vehicle" },
      ],
    },
    {
      title:
        "We Require This Information To Understand Your Needs And Provide You With A Better Service, And In Particular For The Following Reasons:",
      items: [
        { text: "Internal record keeping." },
        { text: "We may use the information to improve our products and services." },
        {
          text:
            "We may periodically send promotional emails/SMS about new products, special offers or other information which we think you may find interesting using the email address which you have provided.",
        },
        {
          text:
            "From time to time, we may also use your information to contact you for market research purposes. We may contact you by email, phone or mail. We may use the information to customize the website according to your interests.",
        },
      ],
    },
  ],
  closingText:
    "We are committed to ensuring that your information is secure. In order to prevent unauthorized access or disclosure, we have put in place suitable physical, electronic and managerial procedures to safeguard and secure the information we collect online. We use traffic log cookies to identify which pages are being used. This helps us analyze data about webpage traffic and improve our website in order to tailor it to customer needs. We only use this information for statistical analysis purposes and then the data is removed from the system. We use cookies from third-party partners such as Google Analytics for marketing and analytical purposes. Google Analytics helps us understand how our customers use the site. Overall, cookies help us provide you with a better website, by enabling us to monitor which pages you find useful and which you do not. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser setting to decline cookies if you prefer. This may prevent you from taking full advantage of the website.",
  seo: {
    metaTitle: "Refund Policy | Euler Motors",
    metaDescription: "We protect your data and respect your privacy.",
  },
};

export const defaultTermsConditionsPageData: StrapiTermsConditionsPageData = {
  hero: {
    label: "Terms & Conditions",
    title: "Terms of Use",
    description: "Please read these terms carefully before using our services.",
  },
  intro: {
    lastUpdated: "October 22, 2021",
    paragraphs: [
      'These Terms and Conditions (\u201cTerms\u201d) of online booking are executed between the User (as defined hereinafter) and Euler Motors Private Limited, a company having its registered office address at B-99, Panchsheel Vihar, New Delhi 110017 (hereinafter referred to as \u201cEuler Motors\u201d, \u201cwe\u201d or \u201cus\u201d or \u201cour\u201d) and its affiliates and subsidiaries and applies to the booking of Vehicles (as defined hereinafter) listed on the \u2018Book Online\u2019 section.',
      'By accessing or using our Platform and/or booking Vehicles through the Platform, you understand and agree to be bound by these Terms. The Terms, Privacy Policy, Purchase Terms (as defined hereinafter) shall be collectively referred to as \u201cEuler Motors Policies\u201d, including any modifications or amendments made thereto by Euler Motors from time to time, at its sole discretion.',
    ].join("\n\n"),
  },
  sections: [
    { title: "Overview", body: "These terms explain how users can access the Euler Motors platform and use its online booking services." },
    { title: "Eligibility", body: "You must be legally able to enter into an agreement and provide accurate information when using the platform." },
    { title: "Acceptance Of Terms", body: "By accessing the platform or using its services, you confirm that you have read, understood, and accepted these terms." },
    { title: "Changes", body: "Euler Motors may update these terms from time to time. The latest version will be published on this page." },
    { title: "Payment Services Offered", body: "Payment options may be provided through approved payment partners and are subject to the payment instructions shown during the booking process." },
    { title: "Third Party Sites", body: "Links to third-party websites may be provided for convenience. Those websites operate under their own terms and privacy policies." },
    { title: "Seller Terms For Repclub", body: "Sellers using Repclub services are expected to follow the applicable seller requirements and the instructions provided on the platform." },
    { title: "Applicable Law", body: "Your use of the services and these terms is subject to the laws that apply to the relevant transaction and location." },
    { title: "Dispute Resolution", body: "If a question or dispute arises, please contact Euler Motors first so the matter can be reviewed and resolved directly where possible." },
    { title: "Amendment To Transfer", body: "Any transfer of rights or responsibilities under these terms must follow the conditions communicated by Euler Motors." },
    { title: "Cancellation Of Services", body: "Cancellation requests are handled according to the booking, purchase, and cancellation instructions that apply to the service." },
    { title: "Disclaimer", body: "Information on the platform is provided for general guidance and may change as products, services, or availability change." },
    { title: "Policy Changes", body: "Updates to related policies may be posted on the website and will apply from the effective date stated in the updated policy." },
    { title: "Fraud Prevention", body: "Euler Motors may review activity and take reasonable steps to protect users, payments, and the platform from suspected fraud." },
    { title: "Dealing In Compliance Agency", body: "Users and partners are expected to cooperate with reasonable compliance checks and applicable agency requirements." },
    { title: "Indemnity", body: "You may be responsible for losses caused by misuse of the platform or by a failure to follow these terms." },
    { title: "Limitation Of Liability", body: "Any limits on liability apply only to the extent permitted by applicable law." },
    { title: "Governing Law", body: "These terms are interpreted under the governing law stated for the relevant service." },
    { title: "General Provisions", body: "The remaining provisions continue to apply even if one provision is found to be unenforceable." },
    { title: "Contact Information", body: "Questions about these terms can be sent to Euler Motors customer support using the contact details published on the website." },
    { title: "Legal Notices", body: "Formal notices should be sent using the communication method and address specified by Euler Motors." },
    { title: "Miscellaneous", body: "Other administrative matters are handled consistently with these terms and the related Euler Motors policies." },
  ],
  seo: {
    metaTitle: "Terms & Conditions | Euler Motors",
    metaDescription: "Please read these terms carefully before using our services.",
  },
};
