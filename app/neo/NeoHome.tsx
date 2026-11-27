"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import NeoMainImage from "@/components/sections/NeoMainImage";
import EulerPrimeBanner from "@/components/sections/EulerPrimeBanner";
import NeoRoadStories from "@/components/sections/NeoRoadStories";
import NeoContactSection from "@/components/sections/NeoContactSection";
import { NeoAbout } from "@/components/sections/NeoAbout";
import NeoSavingsCalculator from "@/components/sections/NeoSavingsCalculator";
import InsightsSection from "@/components/sections/NeoInsights";
import NeoMobile from "./NeoMobile";
import { NeoNavbarDesktop as NeoHeaderDesktop } from "@/components/sections/NeoNavbar";
import { NeoFooterDesktop } from "@/components/sections/NeoFooter";
import { NeoEnterpriseDesktop } from "@/components/sections/NeoEnterprise";
import { useDraggableScroll } from "@/lib/hooks/useDraggableScroll";

const vehicleImage = "/assets/neo/figma/neo-image-6.png";
const reviewImages = ["/assets/neo/figma/stories/story-1.png", "/assets/neo/figma/stories/story-2.png", "/assets/neo/figma/stories/story-3.jpeg", "/assets/neo/figma/stories/story-4.png"];

// NEO uses the same Tailwind utility workflow as the rest of the app. Keeping
// recurring utility groups here makes this long-form page easier to scan.
const tw = {
  neo: 'relative overflow-x-clip bg-white text-[#111] [font-family:var(--font-display,"Archia",sans-serif)]',
  button: 'inline-flex h-[46px] min-w-[157px] items-center justify-between gap-3.5 rounded-[3px] bg-[#0bd99a] px-[18px] font-sans text-[11px] font-bold text-[#071610] no-underline transition hover:-translate-y-0.5 hover:bg-[#72f1ca] [&>span]:text-[17px]',
  buttonLight: 'bg-[#effff9]',
  eyebrow: 'flex items-center gap-[9px] font-sans text-[9px] font-bold uppercase tracking-[.19em] text-[#0ab985] [&>i]:h-[7px] [&>i]:w-[7px] [&>i]:rounded-full [&>i]:bg-[#0bd99a] [&>i]:shadow-[0_0_14px_#00ffb6]',
  hero: 'relative isolate h-[min(790px,calc(100vh_-_60px))] min-h-[650px] overflow-hidden bg-[#11191b] text-white',
  heroBackdrop: 'absolute inset-0 -z-[2] bg-cover bg-[center_53%] saturate-[.85]',
  heroCopy: 'absolute left-[9.2%] top-[22%] z-[2] w-[42%] min-[768px]:max-[1100px]:left-[6%] min-[768px]:max-[1100px]:w-[45%]',
  heroTitle: 'my-5 text-[clamp(52px,5.1vw,76px)] font-semibold leading-[.97] tracking-[-.055em] [&>em]:not-italic [&>em]:text-[#96f3d5]',
  heroDescription: 'mb-7 max-w-[380px] font-sans text-[15px] leading-[1.7] text-[#c8d2d0]',
  heroBottom: 'absolute bottom-[22px] left-[5.55%] right-[5.55%] flex justify-between font-sans text-[10px] uppercase tracking-[.08em] text-[#b9c6c1] [&>a]:text-[#d9e6e2] [&>a]:no-underline',
  heroProof: 'absolute right-[8.4%] top-[38%] min-w-[155px] border border-white/15 bg-[#07100f]/80 px-[22px] py-[18px] backdrop-blur-md min-[768px]:max-[1100px]:right-[5%] [&>strong]:block [&>strong]:text-[34px] [&>strong]:tracking-[-.04em] [&>span]:mt-[5px] [&>span]:block [&>span]:font-sans [&>span]:text-[10px] [&>span]:leading-[1.5] [&>span]:text-[#c4d2ce]',
  stats: 'mx-auto grid h-[108px] max-w-[1280px] grid-cols-4 items-center bg-[linear-gradient(100deg,#092b28,#0c1a1d_70%,#07352d)] text-white [&>div]:flex [&>div]:h-[52px] [&>div]:flex-col [&>div]:justify-center [&>div]:border-r [&>div]:border-white/15 [&>div]:pl-[30px] [&>div:last-child]:border-0 [&>div>strong]:text-[28px] [&>div>strong]:leading-none [&>div>strong]:tracking-[-.04em] [&>div>strong]:text-[#d1fff0] [&>div>span]:mt-[7px] [&>div>span]:font-sans [&>div>span]:text-[10px] [&>div>span]:text-[#a9bcb6]',
  family: 'bg-[#f3f5f4] px-[max(calc((100%_-_1280px)/2),6%)] pb-[86px] pt-[100px] min-[768px]:max-[1100px]:px-[4%]',
  familyHead: 'mx-auto mb-8 flex max-w-[1280px] items-end justify-between',
  sectionHead: 'mx-auto mb-8 flex max-w-[1280px] items-end justify-between',
  heading: 'mt-4 text-[44px] font-semibold leading-[1.02] tracking-[-.045em]',
  switcher: 'flex gap-2 rounded bg-[#e5e9e7] p-[5px] [&>button]:cursor-pointer [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-[18px] [&>button]:py-3 [&>button]:font-sans [&>button]:text-[10px] [&>button]:font-semibold [&>button]:text-[#59635f]',
  selected: 'bg-white text-[#101714] shadow-[0_2px_8px_#00000010]',
  familyCard: 'mx-auto grid min-h-[465px] max-w-[1280px] grid-cols-[1.2fr_.8fr] overflow-hidden rounded-lg bg-white min-[768px]:max-[1100px]:[&>div:last-child]:p-[35px]',
  familyPhoto: 'relative min-h-[465px] bg-[radial-gradient(ellipse_at_45%_65%,#c1d8dc,#e8eff0_60%,#d7e3e6)] [&>img]:object-contain [&>img]:object-[center_70%] [&>img]:mix-blend-multiply',
  familyInfo: 'self-center p-[55px_52px_44px] min-[768px]:max-[1100px]:p-[35px] [&>h3]:my-4 [&>h3]:text-[34px] [&>h3]:font-semibold [&>h3]:leading-[1.07] [&>h3]:tracking-[-.04em] [&>p]:max-w-[300px] [&>p]:font-sans [&>p]:text-[13px] [&>p]:leading-[1.6] [&>p]:text-[#6a716f]',
  specs: 'mt-[23px] flex gap-[25px] border-y border-[#e5e8e7] py-6 [&>div]:flex [&>div]:flex-col [&>div]:gap-[6px] [&_b]:text-[17px] [&_span]:font-sans [&_span]:text-[9px] [&_span]:text-[#777]',
  familyActions: 'mt-6 flex items-center gap-[21px]',
  textLink: 'font-sans text-[10px] font-semibold text-[#131916] no-underline',
  about: 'relative flex min-h-[630px] items-center overflow-hidden bg-[linear-gradient(90deg,#fff_0%,#fff_37%,#ffffff00_63%),linear-gradient(0deg,#fff_0%,transparent_26%),#e8eff1] px-[max(calc((100%_-_1280px)/2),6%)] py-[70px]',
  aboutCopy: 'relative z-[1] w-[45%] [&>h2]:my-5 [&>h2]:text-[52px] [&>h2]:font-semibold [&>h2]:leading-[.98] [&>h2]:tracking-[-.05em] [&>p]:mb-[25px] [&>p]:max-w-[410px] [&>p]:font-sans [&>p]:text-[14px] [&>p]:leading-[1.75] [&>p]:text-[#606967]',
  aboutVisual: 'absolute -bottom-[18%] -right-[4%] h-[90%] w-[68%]',
  aboutMain: '!left-[28%] !w-[70%] object-contain object-bottom mix-blend-multiply',
  aboutSecond: '!left-0 !top-[17%] !w-[55%] object-contain object-bottom opacity-[.88] mix-blend-multiply',
  technology: 'bg-white pb-[70px] pt-[42px]',
  sectionDescription: 'mb-[3px] max-w-[360px] font-sans text-[12px] leading-[1.65] text-[#7b8280]',
  techGrid: 'mx-auto grid w-full max-w-[1280px] grid-cols-[1.74fr_1fr] grid-rows-[303px_303px] gap-[18px]',
  tech1: 'col-start-1 row-start-1',
  tech2: 'col-start-2 row-start-1',
  tech3: 'col-start-2 row-start-2',
  tech4: 'col-start-1 row-start-2',
  techCard: 'relative overflow-hidden rounded-[8px] bg-[#111b1e] text-white',
  techArt: 'absolute inset-0 overflow-hidden bg-[#10232b] [&>img]:absolute [&>img]:inset-0 [&>img]:h-full [&>img]:w-full [&>img]:object-cover [&>img]:object-center',
  techOverlay: 'absolute inset-0',
  techClusterImage: '[&>img]:!left-[154px] [&>img]:!top-[98px] [&>img]:!h-[190.782px] [&>img]:!w-[397.826px] [&>img]:!object-cover',
  techRoadImage: '[&>img]:!left-[169px] [&>img]:!top-[86.7px] [&>img]:!h-[288.523px] [&>img]:!w-[396.4px] [&>img]:[transform:scaleX(-1)] [&>img]:!object-fill',
  techText: 'absolute left-0 top-0 z-[1] max-w-[370px] p-[24px] [&>h3]:mt-[10px] [&>h3]:mb-[9px] [&>h3]:max-w-[285px] [&>h3]:text-[22px] [&>h3]:font-semibold [&>h3]:leading-[1.15] [&>h3]:tracking-[-0.44px] [&>p]:m-0 [&>p]:max-w-[260px] [&>p]:font-sans [&>p]:text-[14px] [&>p]:leading-normal [&>p]:text-white [&>span]:font-sans [&>span]:text-[12px] [&>span]:font-bold [&>span]:tracking-[1.2px] [&>span]:opacity-80',
  techChargeText: 'bottom-0 top-auto',
  calculator: 'relative overflow-hidden bg-[#0b1113] px-[6%] py-[88px] text-white before:absolute before:-right-20 before:-top-[370px] before:h-[700px] before:w-[700px] before:rounded-full before:border before:border-[#14b89119] before:shadow-[0_0_0_70px_#13b88e08,0_0_0_140px_#13b88e06] [&_.sectionHead]:relative [&_.sectionHead>p]:text-[#a5b2ae] [&_.sectionHead_.eyebrow]:text-[#21d3a0]',
  calcGrid: 'relative mx-auto mt-[30px] grid max-w-[1280px] grid-cols-[1fr_.85fr] gap-[18px]',
  calcResult: 'rounded-md border border-white/10 bg-[#111b1d] p-[29px_32px] [&>span]:font-sans [&>span]:text-[9px] [&>span]:font-bold [&>span]:tracking-[.15em] [&>span]:text-[#9caeaa] [&>strong]:mt-3 [&>strong]:block [&>strong]:text-[45px] [&>strong]:tracking-[-.05em] [&>strong]:text-[#caffeb] [&>small]:font-sans [&>small]:text-[10px] [&>small]:text-[#9cadab] [&>p]:font-sans [&>p]:text-[10px] [&>p]:leading-[1.5] [&>p]:text-[#91a29d]',
  chart: 'mt-[23px] mb-[15px] flex h-[170px] items-end gap-4 border-b border-white/15 px-3 [&>div]:flex [&>div]:h-full [&>div]:w-[26%] [&>div]:flex-col [&>div]:items-center [&>div]:justify-end [&>div]:gap-[7px] [&_i]:w-full [&_i]:max-w-[90px] [&_i]:rounded-t-[3px] [&_i]:bg-[linear-gradient(0deg,#087d64,#19d1a1)] [&_b]:font-sans [&_b]:text-[9px] [&_b]:text-[#c5d2ce] [&>div:nth-child(1)_i]:bg-[linear-gradient(0deg,#625747,#d6b77f)] [&>div:nth-child(2)_i]:bg-[linear-gradient(0deg,#3b655d,#88bca5]',
  calcControls: 'flex flex-col gap-[25px] rounded-md border border-white/10 bg-[#111b1d] p-[29px_32px] [&>label]:block [&>label]:font-sans [&>label]:text-[11px] [&>label]:text-[#e6efeb] [&>label>b]:float-right [&>label>b]:text-[#8df1cf] [&>label>select]:mt-[11px] [&>label>select]:block [&>label>select]:w-full [&>label>select]:rounded-[3px] [&>label>select]:border [&>label>select]:border-[#43514e] [&>label>select]:bg-[#1c2929] [&>label>select]:p-3 [&>label>select]:font-sans [&>label>select]:text-[11px] [&>label>select]:text-white [&_input[type=range]]:mt-4 [&_input[type=range]]:block [&_input[type=range]]:w-full [&_input[type=range]]:accent-[#14d5a1] [&>small]:font-sans [&>small]:text-[9px] [&>small]:leading-[1.5] [&>small]:text-[#80908b] [&>a]:self-start',
  how: 'bg-[#f6f7f6] px-[6%] pb-[76px] pt-[88px]',
  centerHead: 'mx-auto mb-[34px] text-center [&>.eyebrow]:justify-center [&>h2]:mt-[14px] [&>h2]:text-[42px] [&>h2]:font-semibold [&>h2]:tracking-[-.045em] [&>p]:font-sans [&>p]:text-[12px] [&>p]:text-[#77807c]',
  steps: 'mx-auto grid max-w-[1280px] grid-cols-4 gap-[14px]',
  step: 'overflow-hidden rounded-[5px] border border-[#e5e9e7] bg-white pb-[19px] text-left text-[#121715] transition hover:-translate-y-[3px] hover:border-[#41d9b0] [&>span]:mx-[18px] [&>span]:mb-[9px] [&>span]:mt-[18px] [&>span]:block [&>span]:font-sans [&>span]:text-[9px] [&>span]:font-bold [&>span]:text-[#08a77d] [&>h3]:mx-[18px] [&>h3]:mb-[7px] [&>h3]:text-[17px] [&>h3]:font-semibold [&>p]:mx-[18px] [&>p]:my-0 [&>p]:font-sans [&>p]:text-[10px] [&>p]:leading-[1.55] [&>p]:text-[#78817d]',
  activeStep: 'border-[#41d9b0] -translate-y-[3px]',
  stepImage: 'relative h-[180px] overflow-hidden bg-[linear-gradient(135deg,#cddbd9,#e9efec)] [&>img]:object-cover [&>img]:object-[70%_60%] [&>img]:mix-blend-multiply',
  pager: 'mt-7 flex items-center justify-center gap-2 [&>button]:h-8 [&>button]:w-8 [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:border [&>button]:border-[#cfd6d3] [&>button]:bg-transparent [&>button]:text-[#111] [&>i]:h-[5px] [&>i]:w-[5px] [&>i]:rounded-full [&>i]:bg-[#bbc4c0]',
  pagerOn: '!w-[21px] !rounded-[10px] !bg-[#11bd8d]',
  prime: 'relative flex min-h-[510px] items-center overflow-hidden bg-[#080d0f] px-[9.2%] py-[75px] text-white',
  primeFacts: 'mt-[25px] mb-7 flex gap-[27px] [&>span]:max-w-[125px] [&>span]:font-sans [&>span]:text-[9px] [&>span]:leading-[1.5] [&>span]:text-[#aebbb6] [&_b]:mb-[3px] [&_b]:block [&_b]:text-[13px] [&_b]:text-[#d1ffef]',
  primeVehicle: 'absolute -bottom-[15%] -right-[2%] h-[94%] w-[59%] opacity-[.77] [mask-image:linear-gradient(90deg,transparent,#000_28%)] [&>img]:object-contain [&>img]:object-bottom [&>img]:mix-blend-screen',
  reviews: 'bg-white px-[6%] py-[85px]',
  reviewControls: 'flex gap-[9px] [&>button]:h-8 [&>button]:w-8 [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:border [&>button]:border-[#cfd6d3] [&>button]:bg-transparent',
  reviewGrid: 'mx-auto grid max-w-[1280px] grid-cols-4 gap-[13px]',
  reviewCard: 'overflow-hidden rounded-[5px] border border-[#e6e9e8] bg-white',
  reviewPhoto: 'relative h-[220px] overflow-hidden bg-[#c6d8d7] [&>img]:object-cover [&>img]:object-[70%_center] [&>span]:absolute [&>span]:left-1/2 [&>span]:top-1/2 [&>span]:grid [&>span]:h-[38px] [&>span]:w-[38px] [&>span]:-translate-x-1/2 [&>span]:-translate-y-1/2 [&>span]:place-items-center [&>span]:rounded-full [&>span]:border [&>span]:border-white/50 [&>span]:bg-black/60 [&>span]:text-[13px] [&>span]:text-white',
  reviewQuote: 'p-[18px] [&>b]:block [&>b]:min-h-[59px] [&>b]:text-[14px] [&>b]:leading-[1.35] [&>span]:mt-[15px] [&>span]:block [&>span]:font-sans [&>span]:text-[8px] [&>span]:tracking-[.11em] [&>span]:text-[#87918d]',
  enterprise: 'mx-auto mb-[76px] mt-5 grid max-w-[1280px] grid-cols-2 gap-4',
  dealer: 'bg-cover bg-center',
  insights: 'bg-[#f6f7f6] px-[6%] pb-[74px] pt-[84px]',
  storyGrid: 'mx-auto grid max-w-[1280px] grid-cols-3 gap-[17px]',
  story: 'overflow-hidden rounded-[5px] border border-[#e6e9e7] bg-white pb-5 [&>span]:mx-[19px] [&>span]:mb-2 [&>span]:mt-[19px] [&>span]:block [&>span]:font-sans [&>span]:text-[8px] [&>span]:tracking-[.1em] [&>span]:text-[#89938f] [&>h3]:mx-[19px] [&>h3]:mb-[15px] [&>h3]:text-[19px] [&>h3]:leading-[1.2] [&>a]:mx-[19px] [&>a]:font-sans [&>a]:text-[10px] [&>a]:font-semibold [&>a]:text-[#078d69] [&>a]:no-underline',
  storyImage: 'relative h-[216px] overflow-hidden bg-[#cad9d9] [&>img]:object-cover [&>img]:object-[65%_center]',
  allStories: 'mt-[29px] text-center',
  contact: 'mx-auto grid max-w-[1440px] grid-cols-[1fr_.85fr] gap-[10%] bg-white px-[7%] py-[92px]',
  contactCopy: '[&>h2]:my-[17px] [&>h2]:text-[47px] [&>h2]:font-semibold [&>h2]:leading-[.98] [&>h2]:tracking-[-.05em] [&>p]:font-sans [&>p]:text-[12px] [&>p]:text-[#7a8380]',
  contactOptions: 'mt-[30px] grid gap-3 [&>a]:flex [&>a]:items-center [&>a]:gap-[13px] [&>a]:text-[#101613] [&>a]:no-underline [&>a>b]:grid [&>a>b]:h-[39px] [&>a>b]:w-[39px] [&>a>b]:place-items-center [&>a>b]:rounded-full [&>a>b]:bg-[#e9f8f2] [&>a>b]:text-[#078c68] [&>a>span]:flex [&>a>span]:flex-col [&>a>span]:gap-[3px] [&>a>span]:font-sans [&>a>span]:text-[10px] [&>a>span]:text-[#7e8984] [&_strong]:text-[11px] [&_strong]:text-[#121815]',
  form: 'rounded-md bg-[#f4f6f5] p-[29px] [&>h3]:mb-[5px] [&>h3]:text-[23px] [&>h3]:font-semibold [&>h3]:tracking-[-.03em] [&>p]:mb-5 [&>p]:font-sans [&>p]:text-[10px] [&>p]:text-[#7a8380] [&>small]:block [&>small]:text-center [&>small]:font-sans [&>small]:text-[8px] [&>small]:text-[#84908b]',
  formTabs: 'flex gap-5 border-b border-[#dce2df] [&>button]:cursor-pointer [&>button]:border-0 [&>button]:bg-transparent [&>button]:px-px [&>button]:py-[10px] [&>button]:font-sans [&>button]:text-[10px] [&>button]:text-[#77817d]',
  formTabActive: 'border-b-2 border-[#0aa67b] text-[#0a8061]',
  fields: 'my-4 grid grid-cols-2 gap-[10px] [&>input]:h-10 [&>input]:w-full [&>input]:rounded-[3px] [&>input]:border [&>input]:border-[#d8dedb] [&>input]:bg-white [&>input]:px-[11px] [&>input]:font-sans [&>input]:text-[10px] [&>input]:text-[#29312d] [&>select]:h-10 [&>select]:w-full [&>select]:rounded-[3px] [&>select]:border [&>select]:border-[#d8dedb] [&>select]:bg-white [&>select]:px-[11px] [&>select]:font-sans [&>select]:text-[10px] [&>select]:text-[#29312d] [&>input:last-child]:col-span-2',
  consent: 'flex items-start gap-2 font-sans text-[9px] leading-[1.5] text-[#707a75] [&>input]:accent-[#0ba77c]',
  submit: 'my-4 block h-[43px] w-full cursor-pointer rounded-[3px] border-0 bg-[#0bc797] font-sans text-[10px] font-bold text-[#082018]',
  footer: 'relative overflow-hidden bg-[#060a0c] px-[6%] pt-12 text-white',
  footerTop: 'relative z-[1] mx-auto grid max-w-[1280px] grid-cols-[1.5fr_repeat(4,1fr)] gap-[25px]',
  footerBrand: '[&>p]:font-sans [&>p]:text-[11px] [&>p]:leading-[1.6] [&>p]:text-[#c8d1cd]',
  socials: 'mt-[18px] flex gap-2 [&>a]:grid [&>a]:h-7 [&>a]:w-7 [&>a]:place-items-center [&>a]:rounded-full [&>a]:border [&>a]:border-white/25 [&>a]:font-sans [&>a]:text-[10px] [&>a]:text-[#d6e1dc] [&>a]:no-underline',
  footerCol: 'flex flex-col gap-3 [&>b]:mb-[5px] [&>b]:mt-1 [&>b]:font-sans [&>b]:text-[9px] [&>b]:font-bold [&>b]:tracking-[.13em] [&>b]:text-[#96e8cf] [&>a]:font-sans [&>a]:text-[9px] [&>a]:text-[#b8c3be] [&>a]:no-underline',
  footerVehicles: 'relative -mx-[6%] mt-[5px] h-[245px] opacity-[.36] [mask-image:linear-gradient(0deg,#000_20%,transparent_100%)] [&>img]:object-cover [&>img]:object-[center_65%] [&>img]:mix-blend-screen',
  footerBottom: 'relative z-[2] flex h-12 items-center justify-between border-t border-white/15 font-sans text-[8px] text-[#8e9a95]',
  primeHeading: '[&>h2]:my-[17px] [&>h2]:text-[48px] [&>h2]:font-semibold [&>h2]:leading-[.98] [&>h2]:tracking-[-.05em] [&>p]:max-w-[350px] [&>p]:font-sans [&>p]:text-[12px] [&>p]:leading-[1.6] [&>p]:text-[#bbc5c1]',
  enterpriseCard: 'relative min-h-[247px] overflow-hidden rounded-[5px] bg-[#080d0f] p-[39px_42px] text-white [&>h2]:mt-[15px] [&>h2]:mb-[10px] [&>h2]:text-[31px] [&>h2]:font-semibold [&>h2]:leading-[1.02] [&>h2]:tracking-[-.04em] [&>p]:font-sans [&>p]:text-[10px] [&>p]:text-[#aab6b1] [&>a]:mt-2',
} as const;

const techArtLayouts: Record<string, string> = { app: '', cluster: tw.techClusterImage, road: tw.techRoadImage, charge: '' };

function NButton({ children, href = "#contact", light = false }: { children: React.ReactNode; href?: string; light?: boolean }) {
  return <a className={`${tw.button} ${light ? tw.buttonLight : ""}`} href={href}>{children}<span aria-hidden="true">ÃƒÂ¢Ã‚â€ Ã‚â€”</span></a>;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className={tw.eyebrow}><i />{children}</div>;
}

function Hero() {
  return <section className={tw.hero}>
    <div className={tw.heroBackdrop} style={{ backgroundImage: "linear-gradient(90deg,#071012 1%,#071012bd 31%,#07101212 76%),linear-gradient(0deg,#050b0d 0%,transparent 44%),url('/assets/neo/figma/neo-image-2.png')" }} />
    <div className={tw.heroCopy}><Eyebrow>NEO BY EULER</Eyebrow><h1 className={tw.heroTitle}>More trips.<br /><em>Less kharcha.</em></h1><p className={tw.heroDescription}>200+ km on a single charge. Charge it at home on a normal 16-amp plug.</p><NButton>Explore Vehicles</NButton></div>
    <aside className={tw.heroProof}><strong>10,000+</strong><span>auto drivers helped shape<br />the way we built NEO</span></aside>
    <div className={tw.heroBottom}><span>Designed for your everyday</span><a href="#vehicles">Scroll to explore ÃƒÂ¢Ã‚â€ Ã‚â€œ</a></div>
  </section>;
}

function Stats() {
  const values = [["200+", "Km RealRangeÃƒÂ¢Ã‚â€žÃ‚Â¢"], ["3.5", "Hrs 0 to full charge"], ["5", "Years vehicle warranty"], ["D+3", "Seating"]];
  return <div className={tw.stats}>{values.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>;
}

function VehicleFamily() {
  const [model, setModel] = useState("HiRANGE");
  return <section id="vehicles" className={tw.family}>
    <div className={tw.familyHead}><div><Eyebrow>MEET NEO</Eyebrow><h2 className={tw.heading}>Meet the Neo family.</h2></div><div className={tw.switcher}><button className={model === "HiRANGE" ? tw.selected : ""} onClick={() => setModel("HiRANGE")}>NEO HiRANGE</button><button className={model === "HiCITY" ? tw.selected : ""} onClick={() => setModel("HiCITY")}>NEO HiCITY</button></div></div>
    <div className={tw.familyCard}><div className={tw.familyPhoto}><Image src={model === "HiRANGE" ? vehicleImage : "/assets/neo/neo-card-image.png"} alt={`${model} electric three-wheeler`} fill sizes="55vw" unoptimized className={model === "HiRANGE" ? "!object-center !mix-blend-normal scale-[1.5]" : ""} /></div><div className={tw.familyInfo}><Eyebrow>NEO {model}</Eyebrow><h3>{model === "HiRANGE" ? "Go further. Earn more." : "Made for the city."}</h3><p>A dependable electric ride, built around the way you work.</p><div className={tw.specs}><div><b>{model === "HiRANGE" ? "200+ km" : "170+ km"}</b><span>RealRangeÃƒÂ¢Ã‚â€žÃ‚Â¢</span></div><div><b>3.5 hrs</b><span>Full charge</span></div><div><b>D+3</b><span>Seating</span></div></div><div className={tw.familyActions}><NButton>View details</NButton><a href="#contact" className={tw.textLink}>Compare models&nbsp; ÃƒÂ¢Ã‚â€ Ã‚â€”</a></div></div></div>
  </section>;
}

function TechnologyGlow({ src, className, flipped = false }: { src: string; className: string; flipped?: boolean }) {
  return <div aria-hidden className={`absolute ${className}`}>
    <div className={`absolute inset-[-27.07%_-25.49%] ${flipped ? "scale-y-[-1]" : ""}`}>
      <Image src={src} alt="" fill sizes="720px" className="max-w-none" />
    </div>
  </div>;
}

function Technology() {
  const ellipse33 = "/assets/neo/figma/technology/ellipse-3433.svg";
  const ellipse30 = "/assets/neo/figma/technology/ellipse-3430.svg";
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const getCardTransform = (index: number) => {
    if (isVisible) return "translate3d(0, 0, 0)";
    switch (index) {
      case 0:
        return "translate3d(-260px, -120px, 0)";
      case 1:
        return "translate3d(260px, -120px, 0)";
      case 2:
        return "translate3d(-260px, 120px, 0)";
      case 3:
        return "translate3d(260px, 120px, 0)";
      default:
        return "translate3d(0, 40px, 0)";
    }
  };

  const getTransitionDelay = (index: number) => {
    const delays = [0, 90, 150, 240];
    return `${delays[index] ?? 0}ms`;
  };

  return <section id="technology" ref={sectionRef} onMouseEnter={() => setIsVisible(true)} className="bg-white px-5 py-[42px] min-[1440px]:px-[80px]">
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[32px]">
      <header
        className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-5 lg:flex-row lg:items-end"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 20px, 0)",
          transition: "opacity 700ms ease-out, transform 700ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="flex flex-col items-start gap-[14px]">
          <div className="flex items-center gap-[12px] font-sans text-[16px] font-normal leading-normal text-[#121212]">
            <Image src="/assets/neo/main-image/logo.svg" alt="" width={14} height={14} />
            <span>TECHNOLOGY</span>
          </div>
          <h2 className="m-0 w-full max-w-[552.26px] font-display text-[32px] font-semibold leading-[1.15] tracking-[-0.64px] text-[#121212] lg:text-[42px] lg:tracking-[-0.84px]">
            Your vehicle tells you<br />what&apos;s happening.
          </h2>
        </div>
        <p className="mb-[3px] w-full max-w-[411.799px] font-sans text-[16px] font-normal leading-normal text-[#121212] lg:text-[18px]">
          No manuals, no guessing. Everything you need to know sits on your phone and on your dashboard.
        </p>
      </header>

      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[18px]">
        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-[minmax(0,1.737fr)_minmax(0,1fr)]">
        <article
          className="relative h-[303px] overflow-hidden rounded-[8px]"
          style={{
            transform: getCardTransform(0),
            opacity: isVisible ? 1 : 0,
            transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(0)}, opacity 800ms ease-out ${getTransitionDelay(0)}`,
            willChange: "transform, opacity",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[8px]">
            <Image src="/assets/technology-page/know-your-vehicle/vehicle-shepherd-desktop.png" alt="" width={3061} height={1053} sizes="(min-width: 1440px) 1024px, 80vw" className="absolute max-w-none object-cover" style={{ width: "127.66%", height: "116.09%", left: "-27.67%", top: "-7.73%" }} />
          </div>
          <div className="absolute bottom-[-56px] right-[536.5px] h-[265.945px] w-[300.904px]">
            <div className="absolute inset-[-69.07%_-61.05%]"><Image src={ellipse33} alt="" fill sizes="668px" className="max-w-none" /></div>
          </div>
          <TechnologyGlow src={ellipse30} className="bottom-[37.34px] right-[447.9px] h-[678.493px] w-[720.63px]" />
          <div className="absolute left-[24px] top-[24px] z-[2] flex w-[260px] flex-col items-start gap-[10px] text-white">
            <span className="font-sans text-[12px] font-bold leading-[1.15] tracking-[1.2px] opacity-80">SHEPHERD APP</span>
            <h3 className="m-0 w-[212.338px] font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.44px]">Track your vehicle from your phone</h3>
            <p className="m-0 w-[229.127px] font-sans text-[14px] font-normal leading-normal">Live location, battery, trip history and anti-theft alerts.</p>
          </div>
        </article>

        <article
          className="relative h-[303px] overflow-hidden rounded-[8px] bg-[#121212]"
          style={{
            transform: getCardTransform(1),
            opacity: isVisible ? 1 : 0,
            transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(1)}, opacity 800ms ease-out ${getTransitionDelay(1)}`,
            willChange: "transform, opacity",
          }}
        >
          <div className="absolute bottom-[-136px] right-[-103.5px] h-[391px] w-[410.5px]">
            <div className="absolute inset-[-46.98%_-44.75%]"><Image src="/assets/neo/figma/technology/ellipse-3432.svg" alt="" fill sizes="777px" className="max-w-none" /></div>
          </div>
          <div className="absolute bottom-[-36px] right-[-103.5px] h-[265.945px] w-[300.904px]">
            <div className="absolute inset-[-69.07%_-61.05%]"><Image src={ellipse33} alt="" fill sizes="668px" className="max-w-none" /></div>
          </div>
          <div className="absolute left-[24px] top-[24px] z-[2] flex w-[330px] max-w-[calc(100%_-_48px)] flex-col items-start gap-[10px] text-white">
            <span className="font-sans text-[12px] font-bold leading-[1.15] tracking-[1.2px] opacity-80">XAVIER™ CLUSTER</span>
            <h3 className="m-0 w-full font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.44px]">See speed, charge and distance at a glance</h3>
            <p className="m-0 w-[205.72px] max-w-full font-sans text-[14px] font-normal leading-normal">See speed, charge and distance at a glance</p>
          </div>
          <Image src="/assets/technology-page/know-your-vehicle/vehicle-cluster.png" alt="Xavier vehicle instrument cluster" width={1750} height={899} className="absolute left-[154px] top-[98px] h-[190.782px] w-[397.826px] max-w-none object-cover" />
        </article>
        </div>

        <div className="grid grid-cols-1 gap-[18px] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.737fr)]">
        <article
          className="relative h-[303px] overflow-hidden rounded-[8px] bg-[#121212]"
          style={{
            transform: getCardTransform(2),
            opacity: isVisible ? 1 : 0,
            transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(2)}, opacity 800ms ease-out ${getTransitionDelay(2)}`,
            willChange: "transform, opacity",
          }}
        >
          <div className="absolute bottom-[57.74px] right-[-80.25px] h-[197.262px] w-[223.192px]">
            <div className="absolute inset-[-69.07%_-61.05%] scale-y-[-1]"><Image src="/assets/neo/figma/technology/ellipse-3434.svg" alt="" fill sizes="497px" className="max-w-none" /></div>
          </div>
          <div className="absolute bottom-[-230px] right-[-104.62px] h-[385.908px] w-[409.875px]">
            <div className="absolute inset-[-27.07%_-25.49%] scale-y-[-1]"><Image src="/assets/neo/figma/technology/ellipse-3435.svg" alt="" fill sizes="620px" className="max-w-none" /></div>
          </div>
          <div className="absolute left-[24px] top-[24px] z-[2] flex w-[260px] flex-col items-start gap-[10px] text-white">
            <span className="font-sans text-[12px] font-bold leading-[1.15] tracking-[1.2px] opacity-80">BUILT FOR OUR ROADS</span>
            <h3 className="m-0 w-[239.513px] font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.44px]">0.8mm metal body. 13% thicker.</h3>
            <p className="m-0 w-[191.582px] font-sans text-[14px] font-normal leading-normal">Hill assist for smoother climbs with heavy loads.</p>
          </div>
          <div className="absolute left-[8.23px] top-[73px] h-[288.523px] w-[601.639px] scale-x-[-1]">
            <div className="absolute inset-0 overflow-hidden">
              <Image src="/assets/technology-page/know-your-vehicle/vehicle-body.png" alt="" width={1470} height={1070} sizes="397px" className="absolute max-w-none object-contain" style={{ left: "7.38%", top: "4.75%", width: "65.88%", height: "100%" }} />
            </div>
          </div>
        </article>

        <article
          className="relative h-[303px] overflow-hidden rounded-[8px]"
          style={{
            transform: getCardTransform(3),
            opacity: isVisible ? 1 : 0,
            transition: `transform 900ms cubic-bezier(0.16, 1, 0.3, 1) ${getTransitionDelay(3)}, opacity 800ms ease-out ${getTransitionDelay(3)}`,
            willChange: "transform, opacity",
          }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[8px]">
            <Image src="/assets/technology-page/know-your-vehicle/vehicle-charging-desktop.png" alt="" width={2249} height={1180} sizes="(min-width: 1440px) 801px, 62vw" className="absolute max-w-none object-cover" style={{ width: "99.98%", height: "138.68%", left: "0.02%", top: "-23.57%" }} />
            <div className="absolute inset-0 bg-[#121212]/20" />
          </div>
          <div className="absolute bottom-[-69.25px] right-[586.5px] h-[265.945px] w-[300.904px]">
            <div className="absolute inset-[-69.07%_-61.05%]"><Image src={ellipse33} alt="" fill sizes="668px" className="max-w-none" /></div>
          </div>
          <TechnologyGlow src={ellipse30} className="bottom-[24.1px] right-[497.9px] h-[678.493px] w-[720.63px]" />
          <div className="absolute bottom-[24px] left-[24px] z-[2] flex w-[260px] flex-col items-start gap-[10px] text-white">
            <span className="font-sans text-[12px] font-bold leading-[1.15] tracking-[1.2px] opacity-80">BATTERY &amp; CHARGING</span>
            <h3 className="m-0 w-[180.807px] font-display text-[22px] font-semibold leading-[1.15] tracking-[-0.44px]">Charge with a 16-amp socket.</h3>
            <p className="m-0 w-[195.018px] font-sans text-[14px] font-normal leading-normal">Charge from zero to full in about 3.5 hours.</p>
          </div>
        </article>
        </div>
      </div>
    </div>
  </section>;
}
function Calculator() {
  const [km, setKm] = useState(100);
  const [years, setYears] = useState(5);
  const savings = useMemo(() => Math.round(km * 25.8 * 26 * years * 12), [km, years]);
  return <section className={tw.calculator}><div className={tw.sectionHead}><div><Eyebrow>LETÃƒÂ¢Ã‚â‚¬Ã‚â„¢S DO THE MATHS</Eyebrow><h2 className={tw.heading}>See what you could save.</h2></div><p>Change the numbers to see how much more your business could keep.</p></div><div className={tw.calcGrid}><div className={tw.calcResult}><span>YOUR ESTIMATED SAVINGS</span><strong>ÃƒÂ¢Ã‚â€šÃ‚Â¹{savings.toLocaleString("en-IN")}</strong><small>over {years} years with NEO</small><div className={tw.chart}><div><i style={{ height: "96%" }} /><b>Diesel</b></div><div><i style={{ height: "56%" }} /><b>Petrol</b></div><div><i style={{ height: "22%" }} /><b>NEO EV</b></div></div><p>Lower fuel and maintenance costs mean more money stays with you.</p></div><div className={tw.calcControls}><label>Choose your vehicle<select><option>NEO HiRANGE</option><option>NEO HiCITY</option></select></label><label>How far do you drive each day? <b>{km} km</b><input type="range" min="30" max="250" value={km} onChange={e => setKm(Number(e.target.value))} /></label><label>How long do you plan to keep it? <b>{years} years</b><input type="range" min="1" max="8" value={years} onChange={e => setYears(Number(e.target.value))} /></label><small>Illustrative estimate. Actual savings depend on usage and local costs.</small><NButton href="#contact" light>Talk to our team</NButton></div></div></section>;
}

const steps = ["Choose your Neo", "Charge and go", "Track your day", "Keep earning"];
const stepCopy = [
  "Choose the vehicle for your route: HiRANGE for long days, HiCITY for city trips.",
  "Charge at home or while out. Full in about 3.5 hours.",
  "View your vehicle, trips, and battery on your phone. Stay informed before anyone else.",
  "Worry less about your vehicle. Doorstep servicing takes 30 minutes to 2 hours.",
];
const stepImages = [
  "/assets/neo/how-it-works/step-1.png",
  "/assets/neo/how-it-works/step-2.png",
  "/assets/neo/how-it-works/step-3.png",
  "/assets/neo/how-it-works/step-4.png",
];
function HowItWorks() {
  const [slideProgress, setSlideProgress] = useState(0);
  const activeRef = useRef(0);
  const rail = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const isVisibleRef = useRef(true);
  const isDraggingRef = useRef(false);
  const isInteractingRef = useRef(false);
  const interactionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const pauseAutoScroll = useCallback((duration = 600) => {
    isInteractingRef.current = true;
    if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    interactionTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, duration);
  }, []);

  useDraggableScroll(rail, {
    onDragStart: () => {
      isDraggingRef.current = true;
      pauseAutoScroll(600);
    },
    onDragEnd: () => {
      isDraggingRef.current = false;
      pauseAutoScroll(400);
    },
  });

  const go = useCallback((index: number) => {
    const row = rail.current;
    const card = row?.children[index] as HTMLElement | undefined;
    if (!row || !card) return;
    activeRef.current = index;
    card.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  }, []);

  useEffect(() => {
    rail.current?.scrollTo({ left: 0 });
  }, []);

  // Section visibility tracking via IntersectionObserver
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Continuous slide, same feel as the other carousels: drifts steadily,
  // holds briefly at each end, then slides back. Paused while dragging,
  // after arrow clicks, or when the section is off-screen.
  useEffect(() => {
    const container = rail.current;
    if (!container) return;

    let rafId: number;
    let lastTime: number | null = null;
    let accumulator = 0;
    let holdUntil = 0;
    let direction = 1;
    const speed = 50; // pixels per second

    const step = (now: number) => {
      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        !reducedMotion &&
        isVisibleRef.current &&
        !isDraggingRef.current &&
        !isInteractingRef.current &&
        now >= holdUntil
      ) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 1) {
          accumulator += speed * dt;
          if (accumulator >= 1) {
            const px = Math.floor(accumulator);
            if (container.scrollLeft >= maxScroll - 1) {
              direction = -1;
              holdUntil = now + 1500;
            } else if (container.scrollLeft <= 1) {
              direction = 1;
              holdUntil = now + 1500;
            }
            container.scrollLeft = Math.min(
              maxScroll,
              Math.max(0, container.scrollLeft + direction * px)
            );
            accumulator -= px;
          }
        }
      }

      rafId = requestAnimationFrame(step);
    };

    rafId = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafId);
      if (interactionTimerRef.current) clearTimeout(interactionTimerRef.current);
    };
  }, []);

  // Keep the indicator mirroring the true scroll position
  const updateActive = () => {
    const row = rail.current;
    if (!row) return;
    const max = row.scrollWidth - row.clientWidth;
    setSlideProgress(max > 0 ? Math.min(1, Math.max(0, row.scrollLeft / max)) : 0);
    const style = getComputedStyle(row);
    const sp = parseFloat(style.scrollPaddingLeft);
    const pad = Number.isFinite(sp) && sp > 0 ? sp : parseFloat(style.paddingLeft) || 0;
    const rowLeft = row.getBoundingClientRect().left;
    const cards = Array.from(row.children) as HTMLElement[];
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((card, i) => {
      const dist = Math.abs(card.getBoundingClientRect().left - rowLeft - pad);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    activeRef.current = best;
  };

  const move = (direction: number) => {
    pauseAutoScroll(600);
    go(Math.max(0, Math.min(steps.length - 1, activeRef.current + direction)));
  };
  return <section ref={sectionRef} className="relative overflow-hidden bg-[#f3f4f5] py-[80px]">
    <div className="mb-[50px] flex flex-col items-center gap-[14px] text-center">
      <div className="flex items-center gap-[8px] font-sans text-[16px] font-normal leading-[18px] text-[#111]">
        <Image src="/assets/logo-icon.svg" alt="" width={14} height={14} />
        <span>HOW IT WORKS</span>
      </div>
      <h2 className="m-0 text-[42px] font-semibold leading-[1.15] tracking-[-.02em] text-[#111]">A day with Neo.</h2>
    </div>
    <div ref={rail} onScroll={updateActive} className="how-it-works-rail flex cursor-grab snap-x snap-mandatory gap-[16px] overflow-x-auto px-[max(5.55vw,32px)] lg:!pl-[80px] lg:scroll-pl-[80px] lg:snap-none pb-[32px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {steps.map((step, i) => <article key={step} className="group relative flex aspect-[1.083/1] w-[clamp(320px,29vw,418px)] shrink-0 snap-start lg:h-[386px] lg:w-[418px] flex-col justify-between overflow-hidden rounded-[12px] border-[4px] border-white bg-[#536060] px-[18px] py-[20px] text-white shadow-[0_12px_12px_rgba(33,158,182,0.2)] lg:items-start">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={stepImages[i]} alt="" fill sizes="(min-width: 1440px) 418px, 29vw" className={`max-w-none object-cover ${i === 0 ? "!h-[162.32%] !w-[216.79%] !left-[-3.66%] !top-[-5%]" : i === 1 ? "!h-full !w-[104.32%] !left-[-2.16%] !top-[-10.36%]" : i === 2 ? "!h-full !w-[119.97%] !left-[-17.16%] !top-0" : "!h-full !w-full !left-0 !top-0"}`} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_63.322%,rgba(0,0,0,.8)_73.947%)]" />
          <Image src={i % 2 === 0 ? "/assets/overlay-1.svg" : "/assets/overlay-2.svg"} alt="" width={1007} height={630} className="pointer-events-none absolute -bottom-[176px] -left-[108px] h-[470px] w-[689px] max-w-none rotate-[-21.89deg] opacity-90" />
        </div>
        <div className="relative z-[1] flex h-[28px] items-center gap-[6px]">
          {Array.from({ length: i + 1 }, (_, n) => <i key={n} className="h-[8px] w-[8px] rounded-[2px] bg-white" />)}
        </div>
        <div className="relative z-[1] flex flex-col items-start gap-[10px]">
          <span className="font-sans text-[14px] font-extrabold tracking-[1.4px] text-white/80">0{i + 1}</span>
          <h3 className="m-0 font-display text-[22px] font-semibold leading-[1.2] tracking-[-.44px]">{step}</h3>
          <p className="m-0 max-w-[340px] font-sans text-[14px] font-normal leading-[1.45] text-white">{stepCopy[i]}</p>
        </div>
      </article>)}
    </div>
    <button type="button" onClick={() => move(-1)} aria-label="Previous steps" className="absolute left-[50px] top-[384px] z-[2] hidden h-[55px] w-[55px] rotate-180 md:block"><Image src="/assets/arrow-right.svg" alt="" fill sizes="55px" /></button>
    <button type="button" onClick={() => move(1)} aria-label="Next steps" className="absolute right-[50px] top-[384px] z-[2] hidden h-[55px] w-[55px] md:block"><Image src="/assets/arrow-right.svg" alt="" fill sizes="55px" /></button>
    <div className="mx-auto mt-[16px] flex h-[20px] w-[116.2px] items-center rounded-full bg-[#111] p-[4px]" role="progressbar" aria-label="How it works slide position" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(slideProgress * 100)}>
      <span className="h-[12px] w-[29.9px] rounded-full bg-gradient-to-r from-[#1d9eb6] to-[#a4e4c5] transition-transform duration-150" style={{ transform: `translateX(${slideProgress * 78.3}px)` }} />
    </div>
  </section>;
}
function Prime() {
  return <EulerPrimeBanner />;
}

function Reviews() {
  return <NeoRoadStories mode="desktop" />;
}

function Enterprise() {
  return <NeoEnterpriseDesktop />;
}

function Insights() {
  return <InsightsSection />;
}

function Contact() {
  return <NeoContactSection mode="desktop" />;
}



export default function NeoHomePage() {
  return <><div className="lg:hidden"><NeoMobile /></div><div id="top" className={`${tw.neo} hidden lg:block`}><NeoHeaderDesktop /><main><NeoMainImage /><NeoAbout /><Technology /><NeoSavingsCalculator /><HowItWorks /><Prime /><Reviews /><Enterprise /><Insights /><Contact /></main><NeoFooterDesktop /></div></>;
}

