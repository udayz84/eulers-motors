import type { Schema, Struct } from '@strapi/strapi';

export interface AboutBeliefCard extends Struct.ComponentSchema {
  collectionName: 'components_about_belief_cards';
  info: {
    description: 'Belief section card with title and vehicle image';
    displayName: 'Belief Card';
    icon: 'heart';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutBeliefSection extends Struct.ComponentSchema {
  collectionName: 'components_about_belief_sections';
  info: {
    description: 'Our Belief section with heading, description, and four cards';
    displayName: 'Belief Section';
    icon: 'heart';
  };
  attributes: {
    cards: Schema.Attribute.Component<'about.belief-card', true>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"At Euler Motors, we believe a commercial vehicle should do more than move goods. It should help businesses grow, reduce running costs and make every working day more productive. That's why every vehicle, every technology and every decision starts with the people who use it every day.">;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Customers'>;
    mobileEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our Belief'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Building More Than Electric Vehicles'>;
  };
}

export interface AboutEsgCard extends Struct.ComponentSchema {
  collectionName: 'components_about_esg_cards';
  info: {
    description: 'Numbered ESG impact highlight card';
    displayName: 'ESG Impact Card';
    icon: 'earth';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutEsgSection extends Struct.ComponentSchema {
  collectionName: 'components_about_esg_sections';
  info: {
    description: 'ESG in Action section with tabbed impact breakdown';
    displayName: 'ESG Section';
    icon: 'earth';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"See how we're creating a positive impact through sustainability, people and responsible business practices.">;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Esg in Action'>;
    tabs: Schema.Attribute.Component<'about.esg-tab', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Building a Better Tomorrow'>;
  };
}

export interface AboutEsgTab extends Struct.ComponentSchema {
  collectionName: 'components_about_esg_tabs';
  info: {
    description: 'ESG focus area tab content with image, metrics, and impact cards';
    displayName: 'ESG Tab';
    icon: 'bulletList';
  };
  attributes: {
    cards: Schema.Attribute.Component<'about.esg-card', true>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
    summary: Schema.Attribute.Text & Schema.Attribute.Required;
    tabTitle: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutEulerCard extends Struct.ComponentSchema {
  collectionName: 'components_about_euler_cards';
  info: {
    description: 'Mission and values card in About Euler carousel';
    displayName: 'Euler Card';
    icon: 'apps';
  };
  attributes: {
    badge: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    desktopImage: Schema.Attribute.Media<'images'>;
    mobileImage: Schema.Attribute.Media<'images'>;
    stat: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface AboutEulerSection extends Struct.ComponentSchema {
  collectionName: 'components_about_euler_sections';
  info: {
    description: 'Horizontal mission and values card carousel';
    displayName: 'About Euler Section';
    icon: 'layers';
  };
  attributes: {
    cards: Schema.Attribute.Component<'about.euler-card', true>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'About Euler'>;
  };
}

export interface AboutFactorySection extends Struct.ComponentSchema {
  collectionName: 'components_about_factory_sections';
  info: {
    description: 'Inside Our Factory showcase section';
    displayName: 'Factory Section';
    icon: 'cog';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'See how every Euler vehicle is built and tested.'>;
    desktopImage: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'How we build'>;
    mobileImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Inside Our Factory'>;
    videoUrl: Schema.Attribute.String;
  };
}

export interface AboutHero extends Struct.ComponentSchema {
  collectionName: 'components_about_heroes';
  info: {
    description: 'About page hero banner with eyebrow, heading, description, and responsive background images';
    displayName: 'About Hero';
    icon: 'landscape';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.'>;
    desktopImage: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'About Euler Motors'>;
    mobileImage: Schema.Attribute.Media<'images'>;
    mobileOverlayImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Driving India's Electric Future">;
  };
}

export interface AboutHiringSection extends Struct.ComponentSchema {
  collectionName: 'components_about_hiring_sections';
  info: {
    description: 'Join the journey hiring callout banner';
    displayName: 'Hiring Section';
    icon: 'briefcase';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Either way, the same question applies. Does the work help somebody earn more than they did yesterday?'>;
    desktopImage: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Join the journey'>;
    mobileImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We are hiring, and we are selling.'>;
  };
}

export interface AboutLeadershipSection extends Struct.ComponentSchema {
  collectionName: 'components_about_leadership_sections';
  info: {
    description: 'Leadership section header (team members come from Leadership Member collection)';
    displayName: 'Leadership Section';
    icon: 'user';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR LEADERSHIP'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"The People Building What's Next">;
  };
}

export interface AboutRecognitionSection extends Struct.ComponentSchema {
  collectionName: 'components_about_recognition_sections';
  info: {
    description: 'Awards and recognition section header and feature image (awards come from Award collection)';
    displayName: 'Recognition Section';
    icon: 'star';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Recognition'>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Awards and recognition.'>;
  };
}

export interface AboutReportsSection extends Struct.ComponentSchema {
  collectionName: 'components_about_reports_sections';
  info: {
    description: 'ESG Reports & Policies section header and photo (reports come from ESG Report collection)';
    displayName: 'Reports Section';
    icon: 'filePdf';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Reports and disclosures'>;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ESG Reports & Policies'>;
    viewAllCta: Schema.Attribute.Component<'shared.cta-button', false>;
  };
}

export interface AboutTimelineSection extends Struct.ComponentSchema {
  collectionName: 'components_about_timeline_sections';
  info: {
    description: 'Milestones timeline section header (items come from Timeline Milestone collection)';
    displayName: 'Timeline Section';
    icon: 'clock';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Euler Motors is an Indian electric vehicle company focused on building reliable commercial vehicles for businesses that move India every day.'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Timeline'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Milestones That Shaped Euler'>;
  };
}

export interface CareersBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_careers_benefit_items';
  info: {
    description: 'Value proposition card for careers';
    displayName: 'Benefit Item';
    icon: 'heart';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersBenefitsSection extends Struct.ComponentSchema {
  collectionName: 'components_careers_benefits_sections';
  info: {
    description: 'Why work with us impact section';
    displayName: 'Benefits Section';
    icon: 'heart';
  };
  attributes: {
    benefits: Schema.Attribute.Component<'careers.benefit-item', true>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'At Euler Motors, we build commercial vehicles that drive micro-economies forward. Our team integrates engineering, software, and real operations to deliver reliability where it matters most.'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Why work with us'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Engineering Impact, Every Day'>;
  };
}

export interface CareersCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_careers_cta_buttons';
  info: {
    description: 'Call-to-action button without variant';
    displayName: 'CTA Button';
    icon: 'cursor';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#open-positions'>;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Find Jobs'>;
  };
}

export interface CareersGallerySection extends Struct.ComponentSchema {
  collectionName: 'components_careers_gallery_sections';
  info: {
    description: 'Life at Euler Motors photo gallery';
    displayName: 'Gallery Section';
    icon: 'picture';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Inside the depots'>;
    images: Schema.Attribute.Media<'images', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'From the assembly lines in New Delhi to real road testing across state lines \u2014 see what our day-to-day looks like.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Life at Euler Motors'>;
  };
}

export interface CareersHero extends Struct.ComponentSchema {
  collectionName: 'components_careers_heroes';
  info: {
    description: 'Careers page hero banner and mission statement';
    displayName: 'Career Hero';
    icon: 'user';
  };
  attributes: {
    cta: Schema.Attribute.Component<'careers.cta-button', false>;
    desktopImage: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Grow with us'>;
    mobileImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Be part of a collaborative, focused team solving real infrastructure and engineering challenges to clean commercial transport across India.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Shape the Future of Electric Mobility'>;
  };
}

export interface CareersPositionsSection extends Struct.ComponentSchema {
  collectionName: 'components_careers_positions_sections';
  info: {
    description: 'Careers page open positions section headings';
    displayName: 'Positions Section';
    icon: 'briefcase';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Open positions'>;
    positions: Schema.Attribute.Relation<
      'oneToMany',
      'api::career-position.career-position'
    >;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Take the next step with a role where your ideas and work can make a real impact.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Build Your Career with Us'>;
  };
}

export interface CareersSupportItem extends Struct.ComponentSchema {
  collectionName: 'components_careers_support_items';
  info: {
    description: 'Perks and employee benefits item';
    displayName: 'Support Item';
    icon: 'handHeart';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersSupportSection extends Struct.ComponentSchema {
  collectionName: 'components_careers_support_sections';
  info: {
    description: 'Employee support and workplace perks section';
    displayName: 'Support Section';
    icon: 'handHeart';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Our offering'>;
    items: Schema.Attribute.Component<'careers.support-item', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We focus on complete physical, mental, and professional growth support. No standard corporate fluff, just helpful baseline perks.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Support That Matters'>;
  };
}

export interface CareersTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_careers_testimonial_items';
  info: {
    description: 'Employee testimonial and experience quote';
    displayName: 'Testimonial Item';
    icon: 'quote';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    role: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CareersTestimonialsSection extends Struct.ComponentSchema {
  collectionName: 'components_careers_testimonials_sections';
  info: {
    description: 'Employee quotes and testimonials carousel section';
    displayName: 'Testimonials Section';
    icon: 'quote';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Employee voices'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Read unfiltered feedback and experiences shared by members of the Euler Motors tech, manufacturing, and support divisions.'>;
    testimonials: Schema.Attribute.Component<'careers.testimonial-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What Our People Say'>;
  };
}

export interface DealerChargingContactSection extends Struct.ComponentSchema {
  collectionName: 'components_dealer_charging_contact_sections';
  info: {
    description: 'Host a charging point enquiry and contact cards';
    displayName: 'Charging Contact Section';
    icon: 'lightningBolt';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    cards: Schema.Attribute.Component<'dealer.contact-card', true>;
    cityLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'City'>;
    cityPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mumbai'>;
    cityRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Send enquiry'>;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Have land, a warehouse or a petrol pump on a freight route? Host an Euler charging point and earn from it.'>;
    disclaimer: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We never share your number with anyone else. No spam calls.'>;
    dropdownLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What you have'>;
    dropdownOptions: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Petrol Pump, Warehouse, Land'>;
    dropdownRequired: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'NEXT STEP'>;
    form: Schema.Attribute.Component<'dealer.charging-form', false>;
    formHeading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book a test drive'>;
    formSubheading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Two steps. We call you within one working day.'>;
    mobileDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Have land, a warehouse or a petrol pump on a freight route? Host an Euler charging point and earn from it.'>;
    mobileLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mobile number'>;
    mobilePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'10 digit'>;
    mobileRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    mobileTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Host a charging point.'>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Name'>;
    namePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full name'>;
    nameRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    privacyNotice: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Euler Motors may contact me about this enquiry.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Host a charging point.'>;
  };
}

export interface DealerChargingForm extends Struct.ComponentSchema {
  collectionName: 'components_dealer_charging_forms';
  info: {
    description: 'Host a charging point enquiry form card';
    displayName: 'Charging Form';
    icon: 'mail';
  };
  attributes: {
    cityLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'City'>;
    cityPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mumbai'>;
    cityRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    ctaLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Send enquiry'>;
    disclaimer: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We never share your number with anyone else. No spam calls.'>;
    dropdownLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What you have'>;
    dropdownOptions: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Petrol Pump, Warehouse, Land'>;
    dropdownRequired: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Book a test drive'>;
    mobileLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mobile number'>;
    mobilePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'10 digit'>;
    mobileRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Name'>;
    namePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full name'>;
    nameRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    privacyNotice: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Euler Motors may contact me about this enquiry.'>;
    subheading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Two steps. We call you within one working day.'>;
  };
}

export interface DealerContactCard extends Struct.ComponentSchema {
  collectionName: 'components_dealer_contact_cards';
  info: {
    description: 'Quick support or contact method card';
    displayName: 'Contact Card';
    icon: 'phone';
  };
  attributes: {
    detail: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.String & Schema.Attribute.DefaultTo<'phone'>;
    iconMedia: Schema.Attribute.Media<'images'>;
    mobileIconMedia: Schema.Attribute.Media<'images'>;
    mobileOrder: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DealerContactSection extends Struct.ComponentSchema {
  collectionName: 'components_dealer_contact_sections';
  info: {
    description: 'Dealer enquiry, book test drive form and contact cards with internally grouped tabs';
    displayName: 'Dealer Contact Section';
    icon: 'mail';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    cards: Schema.Attribute.Component<'dealer.contact-card', true>;
    desktopDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Tell us where you work and how much you carry. We will put you with the right dealer and call you within one working day.'>;
    desktopTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Not sure which dealer to use?'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'NEXT STEP'>;
    form: Schema.Attribute.Component<'home.contact-form', false>;
    mobileDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We bring the vehicle to your depot with a load on it. Forty minutes. No pressure. You keep the cost report.'>;
    mobileTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Tell us what you need!'>;
  };
}

export interface DealerFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_dealer_faq_sections';
  info: {
    description: 'Dealer & charging station FAQ section';
    displayName: 'Dealer FAQ Section';
    icon: 'question';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQ'>;
    image: Schema.Attribute.Media<'images'>;
    items: Schema.Attribute.Component<'technology.faq-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Frequently Asked Questions'>;
  };
}

export interface DealerHero extends Struct.ComponentSchema {
  collectionName: 'components_dealer_heroes';
  info: {
    description: 'Dealer locator hero with support badge, tabs, search, and map';
    displayName: 'Dealer Locator Hero';
    icon: 'pinMap';
  };
  attributes: {
    chargingResultsLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Charging Points'>;
    chargingSearchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Search charging points by area'>;
    chargingStations: Schema.Attribute.Relation<
      'oneToMany',
      'api::charging-station.charging-station'
    >;
    chargingTabLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Charging Stations'>;
    chargingTabSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'1,412 points across India, with live status on each one.'>;
    chargingTabTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Find a charging point.'>;
    cities: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Hyderabad, Delhi NCR, Bengaluru, Mumbai, Ahmedabad, Kolkata'>;
    dealerResultsLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Dealers Found'>;
    dealers: Schema.Attribute.Relation<'oneToMany', 'api::dealer.dealer'>;
    dealerSearchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Search dealers by area'>;
    dealerTabLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Dealer Locator'>;
    dealerTabSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Every dealer brings the vehicle to you for a test drive.'>;
    dealerTabTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Find your nearest dealer.'>;
    defaultCity: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Mumbai'>;
    directionsButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Get Directions'>;
    distanceUnit: Schema.Attribute.String & Schema.Attribute.DefaultTo<'km'>;
    emptyStateText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'No matching locations found.'>;
    locationButtonLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Use my current location'>;
    mapImage: Schema.Attribute.Media<'images'>;
    serviceCenters: Schema.Attribute.Relation<
      'oneToMany',
      'api::service-center.service-center'
    >;
    serviceResultsLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Service Centers Found'>;
    serviceSearchPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Search service centers by area'>;
    serviceTabLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Service Centers'>;
    serviceTabSubtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Authorized Euler service centers with genuine parts and certified experts.'>;
    serviceTabTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Find a service center.'>;
    supportBadge: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Support'>;
  };
}

export interface HomeCompareSection extends Struct.ComponentSchema {
  collectionName: 'components_home_compare_sections';
  info: {
    description: 'Comparison section showing with vs without Euler benefits and 30-sec test quiz';
    displayName: 'Compare Section';
    icon: 'layer';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHAT CHANGES'>;
    quizCta: Schema.Attribute.Component<'shared.cta-button', false>;
    quizSubtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Sirf 5 questions, 30 seconds. No phone number needed.'>;
    quizTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Which vehicle fits your work?'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What changes when you switch?'>;
    withEulerPoints: Schema.Attribute.JSON;
    withoutEulerPoints: Schema.Attribute.JSON;
  };
}

export interface HomeContactForm extends Struct.ComponentSchema {
  collectionName: 'components_home_contact_forms';
  info: {
    description: 'Configurable contact form card with internally grouped tabs';
    displayName: 'Contact Form';
    icon: 'mail';
  };
  attributes: {
    disclaimer: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'We never share your number with anyone else. No spam calls.'>;
    heading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What are you looking for?'>;
    privacyNotice: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Euler Motors and its dealers may contact me about this enquiry. Privacy policy.'>;
    subheading: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Two steps. We call you within one working day.'>;
    tabs: Schema.Attribute.Component<'shared.form-tab', true>;
    thankYouMessage: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Thank you! We will call you within one working day.'>;
    vehicleOptions: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Storm EV LongRange 200, Storm EV T1500, HiLoad EV, Turbo EV 1000, Neo HiRange, Neo HiCity'>;
  };
}

export interface HomeContactSection extends Struct.ComponentSchema {
  collectionName: 'components_home_contact_sections';
  info: {
    description: 'Contact and callback prompts';
    displayName: 'Contact Section';
    icon: 'phone';
  };
  attributes: {
    description: Schema.Attribute.Text;
    email: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'NEXT STEP'>;
    form: Schema.Attribute.Component<'home.contact-form', false>;
    phone: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ready to make the switch?'>;
  };
}

export interface HomeEnterpriseDealer extends Struct.ComponentSchema {
  collectionName: 'components_home_enterprise_dealers';
  info: {
    description: 'Enterprise fleet inquiries and dealership application split cards';
    displayName: 'Enterprise & Dealer Section';
    icon: 'briefcase';
  };
  attributes: {
    dealerDesc: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Your area, with clear numbers.\nWe manage showroom setup and training.'>;
    dealerEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'38 cities open'>;
    dealerPrimaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    dealerSecondaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    dealerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Want to become a dealer?'>;
    enterpriseBullets: Schema.Attribute.Text;
    enterpriseCta: Schema.Attribute.Component<'shared.cta-button', false>;
    enterpriseDesc: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'We check your routes on your own data first. Then connect with you.'>;
    enterpriseEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Enterprise'>;
    enterpriseTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Need 50+ trucks?'>;
  };
}

export interface HomeHero extends Struct.ComponentSchema {
  collectionName: 'components_home_heroes';
  info: {
    description: 'Hero section container';
    displayName: 'Hero Section';
    icon: 'crown';
  };
  attributes: {
    slides: Schema.Attribute.Component<'home.hero-slide', true>;
  };
}

export interface HomeHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_slides';
  info: {
    description: 'Carousel slide in the hero section';
    displayName: 'Hero Slide';
    icon: 'slideshow';
  };
  attributes: {
    desktopImage: Schema.Attribute.Media<'images'>;
    headline: Schema.Attribute.String & Schema.Attribute.Required;
    mobileImage: Schema.Attribute.Media<'images'>;
    primaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    subheading: Schema.Attribute.String;
    tag: Schema.Attribute.String;
  };
}

export interface HomeInsightsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_insights_sections';
  info: {
    description: 'Learn more about EVs - educational articles';
    displayName: 'Insights Section';
    icon: 'book';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'insights'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Learn more about EVs'>;
    viewAllCta: Schema.Attribute.Component<'shared.cta-button', false>;
  };
}

export interface HomePrimeBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_prime_banners';
  info: {
    description: 'Euler Prime loyalty and benefits banner';
    displayName: 'Prime Banner';
    icon: 'star';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Euler Prime'>;
  };
}

export interface HomeProductShowcase extends Struct.ComponentSchema {
  collectionName: 'components_home_product_showcases';
  info: {
    description: 'Featured vehicles and interactive switcher';
    displayName: 'Product Showcase';
    icon: 'car';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Vehicles'>;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Powering every commercial delivery'>;
  };
}

export interface HomePromoCard extends Struct.ComponentSchema {
  collectionName: 'components_home_promo_cards';
  info: {
    description: 'Featured promotional section';
    displayName: 'Promo Card';
    icon: 'layer';
  };
  attributes: {
    align: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'left'>;
    body: Schema.Attribute.Text & Schema.Attribute.Required;
    ctaHref: Schema.Attribute.String;
    ctaLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    wash: Schema.Attribute.Enumeration<['blue', 'white', 'mobile-blue']> &
      Schema.Attribute.DefaultTo<'blue'>;
  };
}

export interface HomeReviewsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_reviews_sections';
  info: {
    description: 'Customer stories and reviews marquee';
    displayName: 'Reviews Section';
    icon: 'thumbUp';
  };
  attributes: {
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Watch real customers share their experience with Euler Motors.'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Customers'>;
    reviews: Schema.Attribute.Relation<'oneToMany', 'api::review.review'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Customer reviews'>;
  };
}

export interface HomeSocialPost extends Struct.ComponentSchema {
  collectionName: 'components_home_social_posts';
  info: {
    description: 'Individual community social post video card';
    displayName: 'Social Post';
    icon: 'play';
  };
  attributes: {
    authorHandle: Schema.Attribute.String & Schema.Attribute.Required;
    duration: Schema.Attribute.String;
    isOfficial: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    likes: Schema.Attribute.String;
    mediaImage: Schema.Attribute.Media<'images'>;
    timeAgo: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface HomeSocialWall extends Struct.ComponentSchema {
  collectionName: 'components_home_social_walls';
  info: {
    description: 'Social media community showcase wall';
    displayName: 'Social Wall';
    icon: 'earth';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OUR SOCIAL COMMUNITY'>;
    posts: Schema.Attribute.Component<'home.social-post', true>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'See how drivers and fleet owners are transforming their business with Euler across India.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Follow the movement'>;
  };
}

export interface HomeStatsBanner extends Struct.ComponentSchema {
  collectionName: 'components_home_stats_banners';
  info: {
    description: 'Stats and KPI metric counters';
    displayName: 'Stats Banner';
    icon: 'bulletList';
  };
  attributes: {
    heading: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
  };
}

export interface HomeTechnology extends Struct.ComponentSchema {
  collectionName: 'components_home_technologies';
  info: {
    description: 'Technology section headings, copy, CTA and feature cards';
    displayName: 'Technology Section';
    icon: 'cog';
  };
  attributes: {
    cards: Schema.Attribute.Component<'home.technology-card', true>;
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'MADE FOR THE MILES'>;
    subheading: Schema.Attribute.String;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Built for Indian roads.'>;
  };
}

export interface HomeTechnologyCard extends Struct.ComponentSchema {
  collectionName: 'components_home_technology_cards';
  info: {
    description: 'Interactive feature card in technology section';
    displayName: 'Technology Card';
    icon: 'layer';
  };
  attributes: {
    description: Schema.Attribute.Text;
    tag: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductHero extends Struct.ComponentSchema {
  collectionName: 'components_product_heroes';
  info: {
    description: 'Product detail page hero section with specs, price, and variant selector';
    displayName: 'Product Hero';
    icon: 'crown';
  };
  attributes: {
    brochureFile: Schema.Attribute.Media<'files' | 'images'>;
    eyebrow: Schema.Attribute.String;
    gallery: Schema.Attribute.Media<'images', true>;
    mainImage: Schema.Attribute.Media<'images'>;
    priceNote: Schema.Attribute.String;
    primaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    secondaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    startingPrice: Schema.Attribute.String;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
    tagline: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variants: Schema.Attribute.Component<'product.variant-option', true>;
  };
}

export interface ProductLoanCalculator extends Struct.ComponentSchema {
  collectionName: 'components_product_loan_calculators';
  info: {
    description: 'Interactive EMI and loan financing calculator section';
    displayName: 'Product Loan Calculator';
    icon: 'priceTag';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    defaultDownPayment: Schema.Attribute.Decimal;
    defaultInterestRate: Schema.Attribute.Decimal &
      Schema.Attribute.DefaultTo<9.5>;
    defaultPrice: Schema.Attribute.Decimal;
    defaultTenureMonths: Schema.Attribute.Integer &
      Schema.Attribute.DefaultTo<48>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FINANCE'>;
    partners: Schema.Attribute.Media<'images', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Calculate your loan EMI'>;
  };
}

export interface ProductOtherVehicles extends Struct.ComponentSchema {
  collectionName: 'components_product_other_vehicles';
  info: {
    description: 'Recommended alternative vehicles in the fleet';
    displayName: 'Other Vehicles Section';
    icon: 'car';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'OTHER VEHICLES'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Explore other vehicles in our fleet'>;
    vehicles: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
  };
}

export interface ProductOverview extends Struct.ComponentSchema {
  collectionName: 'components_product_overviews';
  info: {
    description: 'What this vehicle is good at - 5-card Bento grid';
    displayName: 'Product Overview Section';
    icon: 'layout';
  };
  attributes: {
    cards: Schema.Attribute.Component<'product.overview-card', true>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'OVERVIEW'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What this vehicle is good at.'>;
  };
}

export interface ProductOverviewCard extends Struct.ComponentSchema {
  collectionName: 'components_product_overview_cards';
  info: {
    description: 'Bento grid card in the product overview section';
    displayName: 'Overview Card';
    icon: 'apps';
  };
  attributes: {
    badge: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    tags: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductSpecCategory extends Struct.ComponentSchema {
  collectionName: 'components_product_spec_categories';
  info: {
    description: 'Tab category of specifications with image and rows';
    displayName: 'Spec Category';
    icon: 'folder';
  };
  attributes: {
    categoryName: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    imageAlt: Schema.Attribute.String;
    rows: Schema.Attribute.Component<'product.spec-row', true>;
  };
}

export interface ProductSpecRow extends Struct.ComponentSchema {
  collectionName: 'components_product_spec_rows';
  info: {
    description: 'Single key-value specification row';
    displayName: 'Spec Row';
    icon: 'bulletList';
  };
  attributes: {
    icon: Schema.Attribute.String;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductSpecs extends Struct.ComponentSchema {
  collectionName: 'components_product_specs';
  info: {
    description: 'Interactive specifications section with category tabs';
    displayName: 'Product Specs Section';
    icon: 'cog';
  };
  attributes: {
    categories: Schema.Attribute.Component<'product.spec-category', true>;
    description: Schema.Attribute.Text;
    downloadCta: Schema.Attribute.Component<'shared.cta-button', false>;
    downloadFile: Schema.Attribute.Media<'files' | 'images'>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'SPECIFICATIONS'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Technical Specifications'>;
  };
}

export interface ProductVariantDetail extends Struct.ComponentSchema {
  collectionName: 'components_product_variant_details';
  info: {
    description: 'Variant comparison row item with full pricing and specs';
    displayName: 'Variant Detail';
    icon: 'layer';
  };
  attributes: {
    bodyType: Schema.Attribute.String;
    cargoSpace: Schema.Attribute.String;
    fullCharge: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    payload: Schema.Attribute.String;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    priceNumeric: Schema.Attribute.Decimal;
    range: Schema.Attribute.String;
    runningCost: Schema.Attribute.String;
  };
}

export interface ProductVariantOption extends Struct.ComponentSchema {
  collectionName: 'components_product_variant_options';
  info: {
    description: 'Product model variant option for selector dropdown';
    displayName: 'Variant Option';
    icon: 'car';
  };
  attributes: {
    fullName: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    price: Schema.Attribute.String;
    range: Schema.Attribute.String;
  };
}

export interface ProductVariantsCompare extends Struct.ComponentSchema {
  collectionName: 'components_product_variants_compares';
  info: {
    description: 'Variant comparison table comparing trim levels and deck types';
    displayName: 'Variants Comparison Section';
    icon: 'dashboard';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'VARIANTS'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Compare variants'>;
    truckImage: Schema.Attribute.Media<'images'>;
    variants: Schema.Attribute.Component<'product.variant-detail', true>;
  };
}

export interface SharedCtaButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_cta_buttons';
  info: {
    description: 'Call-to-action button';
    displayName: 'CTA Button';
    icon: 'cursor';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'outline', 'ghost']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedFormTab extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_tabs';
  info: {
    description: 'Per-tab form field labels, placeholders, required flags, and CTA';
    displayName: 'Form Tab';
    icon: 'bulletList';
  };
  attributes: {
    cityLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'City'>;
    cityPlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mumbai'>;
    cityRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    ctaLabel: Schema.Attribute.String;
    customFieldLabel: Schema.Attribute.String;
    customFieldPlaceholder: Schema.Attribute.String;
    customFieldRequired: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    nameLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Name'>;
    namePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Full name'>;
    nameRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    phoneLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Mobile number'>;
    phonePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'10 digit'>;
    phoneRequired: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    tabTitle: Schema.Attribute.String;
    vehicleLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Which vehicle'>;
    vehiclePlaceholder: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Not sure, please suggest one'>;
    vehicleRequired: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
  };
}

export interface SharedPartnerLogo extends Struct.ComponentSchema {
  collectionName: 'components_shared_partner_logos';
  info: {
    description: 'Partner or investor logo item';
    displayName: 'Partner Logo';
    icon: 'picture';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedPartnersSection extends Struct.ComponentSchema {
  collectionName: 'components_shared_partners_sections';
  info: {
    description: 'Partners and investors logo carousel section';
    displayName: 'Partners and Investors Section';
    icon: 'briefcase';
  };
  attributes: {
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Partners and investors'>;
    partners: Schema.Attribute.Component<'shared.partner-logo', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Trusted network partners'>;
  };
}

export interface SharedSavingsCalculator extends Struct.ComponentSchema {
  collectionName: 'components_shared_savings_calculators';
  info: {
    description: 'Interactive operational cost and savings comparison calculator';
    displayName: 'Savings Calculator';
    icon: 'calculator';
  };
  attributes: {
    chartImage: Schema.Attribute.Media<'images'>;
    chartImageAlt: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Bar chart comparing monthly profit with petrol, diesel, CNG and Euler EV'>;
    defaultDailyKm: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<80>;
    defaultYears: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<3>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Savings calculator'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Calculate your savings'>;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: 'Page SEO metadata';
    displayName: 'SEO';
    icon: 'search';
  };
  attributes: {
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    preventIndexing: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Metric or statistic counter';
    displayName: 'Stat Item';
    icon: 'chartBubble';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    unit: Schema.Attribute.String;
    unitMobile: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
    valueMobile: Schema.Attribute.String;
  };
}

export interface TechnologyChargingRule extends Struct.ComponentSchema {
  collectionName: 'components_technology_charging_rules';
  info: {
    description: "Single Do or Don't item for charging guide";
    displayName: 'Charging Guideline Item';
    icon: 'check';
  };
  attributes: {
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TechnologyChargingSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_charging_sections';
  info: {
    description: "Charging guidance with Home/Public toggle, action tiles, Do's and Don'ts";
    displayName: 'Charging Section';
    icon: 'bolt';
  };
  attributes: {
    actionTiles: Schema.Attribute.Component<'technology.charging-tile', true>;
    donts: Schema.Attribute.Component<'technology.charging-rule', true>;
    dontsTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<"Don'ts">;
    dos: Schema.Attribute.Component<'technology.charging-rule', true>;
    dosTitle: Schema.Attribute.String & Schema.Attribute.DefaultTo<"Do's">;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Charging'>;
    homeImage: Schema.Attribute.Media<'images'>;
    homeTabLabel: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Home'>;
    publicImage: Schema.Attribute.Media<'images'>;
    publicTabLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Public'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Where Will I Charge?'>;
  };
}

export interface TechnologyChargingTile extends Struct.ComponentSchema {
  collectionName: 'components_technology_charging_tiles';
  info: {
    description: 'Quick action link tile in Charging showcase card';
    displayName: 'Charging Action Tile';
    icon: 'cursor';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'/products'>;
    iconType: Schema.Attribute.Enumeration<['app', 'station']> &
      Schema.Attribute.DefaultTo<'app'>;
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechnologyFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_technology_faq_items';
  info: {
    description: 'Technology question and answer item';
    displayName: 'FAQ Item';
    icon: 'question';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    category: Schema.Attribute.String & Schema.Attribute.DefaultTo<'General'>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechnologyFaqSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_faq_sections';
  info: {
    description: 'Categorized technology FAQ accordion section';
    displayName: 'FAQ Section';
    icon: 'question';
  };
  attributes: {
    allCategoryLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'All'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'FAQ'>;
    image: Schema.Attribute.Media<'images'>;
    items: Schema.Attribute.Component<'technology.faq-item', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Frequently asked questions'>;
  };
}

export interface TechnologyHero extends Struct.ComponentSchema {
  collectionName: 'components_technology_heroes';
  info: {
    description: 'Technology page hero, uptime banner, and philosophy cards';
    displayName: 'Technology Hero';
    icon: 'rocket';
  };
  attributes: {
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    desktopImage: Schema.Attribute.Media<'images'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Technology'>;
    mobileImage: Schema.Attribute.Media<'images'>;
    philosophyCards: Schema.Attribute.Component<
      'technology.philosophy-card',
      true
    >;
    philosophyDescription: Schema.Attribute.Text;
    philosophyEyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Philosophy'>;
    philosophyTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Technology That Helps You Earn More'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
    uptimeDescription: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Fleet uptime last year, across 15,000 vehicles'>;
    uptimeUnit: Schema.Attribute.String & Schema.Attribute.DefaultTo<'%'>;
    uptimeValue: Schema.Attribute.String & Schema.Attribute.DefaultTo<'96.4'>;
  };
}

export interface TechnologyIndianRoads extends Struct.ComponentSchema {
  collectionName: 'components_technology_indian_roads';
  info: {
    description: 'Engineering for Indian road conditions';
    displayName: 'Indian Roads Section';
    icon: 'earth';
  };
  attributes: {
    cards: Schema.Attribute.Component<'technology.road-condition-card', true>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Built for here'>;
    problemLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'The problem'>;
    solutionLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'What Euler does'>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Built for Indian roads.'>;
  };
}

export interface TechnologyKnowVehicle extends Struct.ComponentSchema {
  collectionName: 'components_technology_know_vehicles';
  info: {
    description: 'Interactive diagram and technical breakdown of key vehicle parts';
    displayName: 'Know Vehicle Section';
    icon: 'cog';
  };
  attributes: {
    businessMeaningLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHAT IT MEANS FOR YOUR BUSINESS'>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'The parts'>;
    parts: Schema.Attribute.Component<'technology.vehicle-part', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Know Your Vehicle Better'>;
    vehicleImage: Schema.Attribute.Media<'images'>;
    whatIsItLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHAT IS IT'>;
    whyMatterLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'WHY DOES IT MATTER'>;
  };
}

export interface TechnologyLoadCard extends Struct.ComponentSchema {
  collectionName: 'components_technology_load_cards';
  info: {
    description: 'Engineering test card inside Load section';
    displayName: 'Load Card';
    icon: 'layers';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Load'>;
    image: Schema.Attribute.Media<'images'>;
    statLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'payload, rated'>;
    statUnit: Schema.Attribute.String & Schema.Attribute.DefaultTo<'kg'>;
    statValue: Schema.Attribute.String & Schema.Attribute.DefaultTo<'1,500'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechnologyLoadSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_load_sections';
  info: {
    description: 'Rated with weight payload section';
    displayName: 'Load Section';
    icon: 'layer';
  };
  attributes: {
    cards: Schema.Attribute.Component<'technology.load-card', true>;
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Load'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Every range and performance number we publish is measured with rated payload on board \u2014 not on an empty flat track.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Rated with weight on it.'>;
  };
}

export interface TechnologyManufacturing extends Struct.ComponentSchema {
  collectionName: 'components_technology_manufacturings';
  info: {
    description: 'In-house manufacturing facility section';
    displayName: 'Manufacturing Section';
    icon: 'store';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Manufacturing'>;
    mainImage: Schema.Attribute.Media<'images'>;
    mobileImage: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Where Every Vehicle Begins'>;
    videoBadgeLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Factory film'>;
    videoBadgeTag: Schema.Attribute.String;
    videoUrl: Schema.Attribute.String;
  };
}

export interface TechnologyPhilosophyCard extends Struct.ComponentSchema {
  collectionName: 'components_technology_philosophy_cards';
  info: {
    description: 'Engineering philosophy card inside Technology Hero';
    displayName: 'Philosophy Card';
    icon: 'bulletList';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechnologyProofSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_proof_sections';
  info: {
    description: 'Proof statistics demonstrating commercial EV uptime and scale';
    displayName: 'Proof Section';
    icon: 'check';
  };
  attributes: {
    eyebrow: Schema.Attribute.String & Schema.Attribute.DefaultTo<'Proof'>;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Why businesses trust Euler.'>;
  };
}

export interface TechnologyRoadConditionCard extends Struct.ComponentSchema {
  collectionName: 'components_technology_road_condition_cards';
  info: {
    description: 'Specific road challenge and Euler solution';
    displayName: 'Road Condition Card';
    icon: 'globe';
  };
  attributes: {
    condition: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    problem: Schema.Attribute.Text & Schema.Attribute.Required;
    solution: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface TechnologyShepherdFeature extends Struct.ComponentSchema {
  collectionName: 'components_technology_shepherd_features';
  info: {
    description: 'Individual telemetry/fleet management feature card in Shepherd section';
    displayName: 'Shepherd Feature';
    icon: 'apps';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface TechnologyShepherdSection extends Struct.ComponentSchema {
  collectionName: 'components_technology_shepherd_sections';
  info: {
    description: 'Shepherd IoT fleet management dashboard showcase';
    displayName: 'Shepherd Section';
    icon: 'mobile';
  };
  attributes: {
    appImage: Schema.Attribute.Media<'images'>;
    cta: Schema.Attribute.Component<'shared.cta-button', false>;
    eyebrow: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Shepherd app'>;
    features: Schema.Attribute.Component<'technology.shepherd-feature', true>;
    secondaryCta: Schema.Attribute.Component<'shared.cta-button', false>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Manage Everything in One Place'>;
  };
}

export interface TechnologyVehiclePart extends Struct.ComponentSchema {
  collectionName: 'components_technology_vehicle_parts';
  info: {
    description: 'Component part technical deep-dive';
    displayName: 'Vehicle Part';
    icon: 'cog';
  };
  attributes: {
    businessMeaning: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.Media<'images'>;
    partName: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    whatIsIt: Schema.Attribute.Text & Schema.Attribute.Required;
    whyDoesItMatter: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'about.belief-card': AboutBeliefCard;
      'about.belief-section': AboutBeliefSection;
      'about.esg-card': AboutEsgCard;
      'about.esg-section': AboutEsgSection;
      'about.esg-tab': AboutEsgTab;
      'about.euler-card': AboutEulerCard;
      'about.euler-section': AboutEulerSection;
      'about.factory-section': AboutFactorySection;
      'about.hero': AboutHero;
      'about.hiring-section': AboutHiringSection;
      'about.leadership-section': AboutLeadershipSection;
      'about.recognition-section': AboutRecognitionSection;
      'about.reports-section': AboutReportsSection;
      'about.timeline-section': AboutTimelineSection;
      'careers.benefit-item': CareersBenefitItem;
      'careers.benefits-section': CareersBenefitsSection;
      'careers.cta-button': CareersCtaButton;
      'careers.gallery-section': CareersGallerySection;
      'careers.hero': CareersHero;
      'careers.positions-section': CareersPositionsSection;
      'careers.support-item': CareersSupportItem;
      'careers.support-section': CareersSupportSection;
      'careers.testimonial-item': CareersTestimonialItem;
      'careers.testimonials-section': CareersTestimonialsSection;
      'dealer.charging-contact-section': DealerChargingContactSection;
      'dealer.charging-form': DealerChargingForm;
      'dealer.contact-card': DealerContactCard;
      'dealer.contact-section': DealerContactSection;
      'dealer.faq-section': DealerFaqSection;
      'dealer.hero': DealerHero;
      'home.compare-section': HomeCompareSection;
      'home.contact-form': HomeContactForm;
      'home.contact-section': HomeContactSection;
      'home.enterprise-dealer': HomeEnterpriseDealer;
      'home.hero': HomeHero;
      'home.hero-slide': HomeHeroSlide;
      'home.insights-section': HomeInsightsSection;
      'home.prime-banner': HomePrimeBanner;
      'home.product-showcase': HomeProductShowcase;
      'home.promo-card': HomePromoCard;
      'home.reviews-section': HomeReviewsSection;
      'home.social-post': HomeSocialPost;
      'home.social-wall': HomeSocialWall;
      'home.stats-banner': HomeStatsBanner;
      'home.technology': HomeTechnology;
      'home.technology-card': HomeTechnologyCard;
      'product.hero': ProductHero;
      'product.loan-calculator': ProductLoanCalculator;
      'product.other-vehicles': ProductOtherVehicles;
      'product.overview': ProductOverview;
      'product.overview-card': ProductOverviewCard;
      'product.spec-category': ProductSpecCategory;
      'product.spec-row': ProductSpecRow;
      'product.specs': ProductSpecs;
      'product.variant-detail': ProductVariantDetail;
      'product.variant-option': ProductVariantOption;
      'product.variants-compare': ProductVariantsCompare;
      'shared.cta-button': SharedCtaButton;
      'shared.form-tab': SharedFormTab;
      'shared.partner-logo': SharedPartnerLogo;
      'shared.partners-section': SharedPartnersSection;
      'shared.savings-calculator': SharedSavingsCalculator;
      'shared.seo': SharedSeo;
      'shared.stat-item': SharedStatItem;
      'technology.charging-rule': TechnologyChargingRule;
      'technology.charging-section': TechnologyChargingSection;
      'technology.charging-tile': TechnologyChargingTile;
      'technology.faq-item': TechnologyFaqItem;
      'technology.faq-section': TechnologyFaqSection;
      'technology.hero': TechnologyHero;
      'technology.indian-roads': TechnologyIndianRoads;
      'technology.know-vehicle': TechnologyKnowVehicle;
      'technology.load-card': TechnologyLoadCard;
      'technology.load-section': TechnologyLoadSection;
      'technology.manufacturing': TechnologyManufacturing;
      'technology.philosophy-card': TechnologyPhilosophyCard;
      'technology.proof-section': TechnologyProofSection;
      'technology.road-condition-card': TechnologyRoadConditionCard;
      'technology.shepherd-feature': TechnologyShepherdFeature;
      'technology.shepherd-section': TechnologyShepherdSection;
      'technology.vehicle-part': TechnologyVehiclePart;
    }
  }
}
