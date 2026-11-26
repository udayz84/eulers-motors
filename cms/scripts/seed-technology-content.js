/**
 * Seed technology-page textual content from the client doc
 * (tab t.eb6vt898w722, "Technology page" handoff).
 *
 * Rules:
 *  - update ONLY the text the doc specifies; every other field keeps its
 *    current value (fields the doc omits are passed through unchanged)
 *  - where the doc shows two variants of a line, the LAST one wins
 *  - writes touch only the technology-page document
 *
 * Run:  node scripts/seed-technology-content.js
 */
const { createStrapi } = require('@strapi/strapi');

async function main() {
  process.env.SKIP_SEED = 'true';
  const app = await createStrapi({ distDir: './dist' }).load();

  try {
    const tech = await app.documents('api::technology-page.technology-page').findFirst({
      status: 'draft',
      populate: {
        hero: { populate: { cta: true, philosophyCards: true } },
        loadSection: { populate: { cards: true } },
        indianRoads: { populate: { cards: true } },
        knowVehicle: { populate: { parts: true } },
        chargingSection: { populate: { dos: true, donts: true } },
        shepherdSection: { populate: { cta: true, secondaryCta: true, features: true } },
      },
    });
    if (!tech) throw new Error('technology-page document not found');

    /* ------------------------------------------------------------- HERO */
    // Doc hero block (last variant): headline + supporting line + patents
    // highlight + CTA. philosophy title already matches the doc — kept.
    const hero = {
      ...tech.hero,
      title: 'Innovation built into every drive.',
      subtitle: 'Powering every move with Intelligent Engineering.',
      uptimeValue: '50+',
      uptimeUnit: 'Patents Filed',
      uptimeDescription: 'Engineering innovation developed for India’s electric mobility needs.',
      cta: { ...tech.hero.cta, label: 'Book a Test Drive' },
      philosophyDescription: 'Every technology we build is designed to make your business more efficient, productive and profitable.',
      philosophyCards: [
        { title: 'Optimised Load Capacity', description: 'Smart chassis design, battery integration and tyre engineering help optimise vehicle space and load handling.' },
        { title: 'Reliable Performance', description: 'Technology designed to support consistent performance through demanding daily operations.' },
        { title: 'Smarter Driving', description: 'Driver assistance, visibility and connected features designed to support safer, more informed driving.' },
      ],
    };

    /* ------------------------------------------------- LOAD (01–09 items) */
    // The doc replaces the two load cards with nine numbered technology items.
    // Stats are not part of the new items, so they are cleared.
    const loadSection = {
      ...tech.loadSection,
      cards: [
        { eyebrow: '01 | CHASSIS DESIGN', title: 'Strength at the Core.', description: 'A chassis engineered for structural strength, stability and optimised vehicle packaging.' },
        { eyebrow: '02 | LIQUID COOLING', title: 'Temperature. Under Control.', description: 'Liquid cooling helps manage battery temperature during charging and discharging, supporting battery performance and longevity.' },
        { eyebrow: '03 | ADAS', title: 'Added Awareness on Every Drive.', description: 'Driver assistance technologies designed to support driving awareness and safety, depending on the system.' },
        { eyebrow: '04 | SHEPHERD APP', title: 'See More. Save More.', description: 'The Shepherd App puts your entire fleet on one screen. Monitor battery levels, live vehicle locations and service reminders to plan smarter and manage your operations.' },
        { eyebrow: '05 | CHIMERA', title: 'Connected Through Chimera.', description: 'The Chimera infotainment system brings together its integrated in-cabin features through a digital interface.' },
        { eyebrow: '06 | NIGHT VISION', title: 'See Beyond the Darkness.', description: 'Night vision technology helps improve visibility in low-light conditions and identify obstacles and objects at night, depending on the system.' },
        { eyebrow: '07 | INCREASED TYRE SIZE', title: 'Designed to Handle the Load.', description: 'Larger tyre dimensions designed to support load handling and road stability across demanding operating conditions.' },
        { eyebrow: '08 | BATTERY INTEGRATION', title: 'Integrated by Design.', description: 'The battery is integrated within the chassis structure, helping optimise vehicle packaging and supporting better weight distribution.' },
        { eyebrow: '09 | PAYLOAD PERFORMANCE', title: 'Made for Demanding Loads.', description: 'Engineering focused on increasing load-carrying capacity to meet the demands of commercial operations.' },
      ],
    };

    /* ----------------------------------------------------- INDIAN ROADS */
    // Subtitle + six condition cards (card 6 uses the doc's last variant).
    const indianRoads = {
      ...tech.indianRoads,
      subtitle: 'From dusty roads to heavy loads, engineered for everyday business.',
      cards: [
        { condition: 'Dust', problem: 'Dust can affect sensitive electrical components.', solution: 'IP67-rated battery protection against dust and water.' },
        { condition: 'Rain', problem: 'Waterlogged roads challenge everyday deliveries.', solution: 'Water-wading capability of up to 420 mm on Storm EV LongRange 200.' },
        { condition: 'Heavy loads', problem: 'Heavy cargo demands dependable load capacity.', solution: 'Storm EV LongRange 200 and T1500 offer a 1,500 kg payload capacity.' },
        { condition: 'Steep inclines', problem: 'Steep gradients challenge loaded vehicles.', solution: 'Euler EVs offer gradeability of up to 30%, depending on the model and variant.' },
        { condition: 'Long routes', problem: 'Limited range can interrupt daily deliveries.', solution: 'Storm EV LongRange 200 delivers a real-world range of 200+ km.' },
        { condition: 'Daily charging', problem: 'Long charging times can reduce productive hours.', solution: 'Storm EV LongRange 200 adds 100 km of range in 15 minutes.' },
      ],
    };

    /* ------------------------------------------------------ KNOW VEHICLE */
    // Subtitle revised; seven tabs per the doc (last variant of duplicated
    // lines wins). ADAS "Website highlights" line has no CMS field — skipped.
    const knowVehicle = {
      ...tech.knowVehicle,
      subtitle: 'Understand what each component does and how it supports your everyday operations.',
      parts: [
        { partName: 'Motor', title: 'Power that moves every load.', whatIsIt: 'The motor converts electrical energy into mechanical power to drive your vehicle.', whyDoesItMatter: 'High torque helps deliver pulling power, even with a load onboard.', businessMeaning: 'Reliable power delivery for demanding routes and everyday operations.' },
        { partName: 'Battery', title: 'Power for longer routes.', whatIsIt: 'A lithium-ion battery that stores and supplies energy to your vehicle.', whyDoesItMatter: 'Battery capacity and performance influence your vehicle’s driving range.', businessMeaning: 'Plan deliveries with a range suited to your daily operations.' },
        { partName: 'Charging', title: 'Get charged. Get moving.', whatIsIt: 'A charging system that replenishes your vehicle’s battery.', whyDoesItMatter: 'Charging compatibility and time help determine your vehicle’s operating schedule.', businessMeaning: 'Choose charging options that fit your routes and working hours.' },
        { partName: 'Infotainment system', title: 'Guidance and entertainment on every route.', whatIsIt: 'A 10.2-inch Chimera screen with navigation, diagnostics and entertainment.', whyDoesItMatter: 'Access navigation, live diagnostics and connected features while driving.', businessMeaning: 'Stay informed on the route and connected on the go.' },
        { partName: 'Night vision', title: 'See more, even after sunset.', whatIsIt: 'A night vision system with HD imaging and automatic adjustment.', whyDoesItMatter: 'Helps drivers see and respond better in low-light conditions.', businessMeaning: 'Support visibility during night-time operations.' },
        { partName: 'ADAS', title: 'Added awareness on every drive.', whatIsIt: 'An advanced driver assistance system with five safety features.', whyDoesItMatter: 'Real-time alerts and hazard detection help drivers stay alert.', businessMeaning: 'Added assistance across busy roads and tight routes.' },
        { partName: 'Shepherd App', title: 'Your entire fleet, one screen.', whatIsIt: 'A fleet management platform that connects you with your vehicles.', whyDoesItMatter: 'Monitor battery levels, live location and service reminders.', businessMeaning: 'Plan smarter and manage fleet operations with better visibility.' },
      ],
    };

    /* ---------------------------------------------------------- CHARGING */
    const chargingSection = {
      ...tech.chargingSection,
      dos: [
        { text: 'Locate nearby charging stations through the Shepherd App.' },
        { text: 'Check connector compatibility before starting a charge.' },
        { text: 'Check station availability and plan your route accordingly.' },
      ],
      donts: [
        { text: 'Don’t use incompatible charging connectors.' },
        { text: 'Don’t leave your vehicle connected after charging is complete.' },
        { text: 'Don’t begin a long journey without planning charging stops.' },
      ],
    };

    /* ---------------------------------------------------------- SHEPHERD */
    const shepherdSection = {
      ...tech.shepherdSection,
      title: 'Manage Your Entire Fleet in One Place.',
      subtitle: 'Track vehicles, monitor battery levels, manage trips and stay updated on charging and service, all from one dashboard.',
      cta: { ...tech.shepherdSection.cta, label: 'Download the App' },
      secondaryCta: { ...tech.shepherdSection.secondaryCta, label: 'See How It Works' },
      features: [
        { title: 'Live Tracking', description: 'Know where every vehicle is, updated every ten seconds.' },
        { title: 'Trip History', description: 'Review every trip, stop and time on site, per driver.' },
        { title: 'Charging Status', description: 'Check what’s charging, how far along, and when it’s done.' },
        { title: 'Vehicle Health', description: 'Stay informed with vehicle performance and maintenance alerts.' },
        { title: 'Performance Reports', description: 'Access reports on vehicle usage and performance.' },
        { title: 'Driver Analytics', description: 'Get insights into driver activity and fleet operations.' },
        { title: 'Digilock', description: 'Secure your vehicle with digital locking and access control.' },
        { title: 'Service Alerts', description: 'Receive timely updates on vehicle servicing and maintenance requirements.' },
        { title: 'Euler Prime', description: 'Access doorstep service and expert support to keep your vehicle running.' },
      ],
    };

    /* ------------------------------------------------------------- WRITE */
    await app.documents('api::technology-page.technology-page').update({
      documentId: tech.documentId,
      data: { hero, loadSection, indianRoads, knowVehicle, chargingSection, shepherdSection },
      status: 'published',
    });
    console.log('🎉 technology-page updated & published');
  } finally {
    await app.destroy();
  }
}

main().catch((e) => {
  console.error('SEED FAILED:', e);
  process.exit(1);
});
