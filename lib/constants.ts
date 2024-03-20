export const AI_COLOR = "bg-blue-300";
export const HUMAN_COLOR = "bg-green-300";
export const AGENT_COLOR = "bg-purple-300";
export const CLIENT_COLOR = "bg-orange-300";

export const ADMIN_EMAIL = ["cheekyprogrammer@gmail.com"];

export const SOCIAL_MEDIA_LINKS = [
  "https://www.facebook.com/profile.php?id=61556711907906",
];

export const BUTTON_VARIANTS = {
  rest: {
    opacity: 0,
  },
  hover: {
    color: "white",
    scale: 1.02,
  },
};

export const ICON_VARIANTS = {
  rest: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 2,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 2,
    opacity: 1,
    color: "white",
    rotate: 90,
    x: 40,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

export const ICON_VARIANTS2 = {
  rest: {
    opacity: 0,
    x: 0,
    transition: {
      duration: 2,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 2,
    opacity: 1,
    color: "white",
    rotate: 270,
    x: 40,
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

export const NAV_LINKS = [
  // { name: "Home", to: "/", id: 1 },
  { name: "Services", to: "/#whatwedo", id: 2 },
  { name: "Portfolio", to: "/#portfolio", id: 3 },
  { name: "Blog", to: "/#blog", id: 4 },
  { name: "Contact", to: "/#contact", id: 5 },
];

export const FOOTER_LINKS = [
  { name: "Home", to: "/", id: 1 },
  { name: "Terms", to: "/terms", id: 2 },
  { name: "Privacy", to: "/privacy", id: 3 },
  { name: "About", to: "/about", id: 4 },
  { name: "Contact", to: "/contact", id: 5 },
];

export const SERVICES_LIST = [
  {
    id: 1,
    imageSrc: "/images/apisystem.png",
    cardTitle: "API Development Service",
    cardDesc: `Your own custom API`,
    cardContent:
      "We specialize in creating robust, scalable APIs that seamlessly connect your software applications, enabling enhanced functionality, data exchange, and integration across your systems. Work with us to unlock new possibilities and streamline your operations through the power of APIs.",
    buttonLink: "/api-development",
    buttonLabel: "Read More",
  },
  {
    id: 2,
    imageSrc: "/images/saas.png",
    cardTitle: "Custom SaaS Development",
    cardDesc: `Stand Out From The Competition`,
    cardContent:
      "Turn your vision into reality with our Custom SaaS Development service. Experience hands-on development that perfectly aligns with your unique requirements.",
    buttonLink: "/custom-saas-development",
    buttonLabel: "Learn More",
  },
  {
    id: 3,
    imageSrc: "/images/chromeextension.png",
    cardTitle: "Chrome Extension Development",
    cardDesc: `Custom Chrome extensions boost productivity`,
    cardContent:
      "We build custom extensions to improve productivity, streamline tasks, and bring your ideas to life. Our team of developers is ready to make your browsing experience unique and efficient. Elevate your Chrome with extensions that fit exactly what you need.",
    buttonLink: "/chrome-extension-development",
    buttonLabel: "Read More",
  },
  {
    id: 4,
    imageSrc: "/images/nextjs.png",
    cardTitle: "Custom Next.JS Development",
    cardDesc: `We Let The Metrics Speak For Us`,
    cardContent:
      "Enhance your web presence with our Custom Next.js Development services. Specializing in creating fast, SEO-friendly, and scalable web applications, we leverage the power of Next.js to deliver exceptional user experiences. Partner with us to build cutting-edge websites and applications that set you apart.",
    buttonLink: "/custom-nextjs-development",
    buttonLabel: "Learn More",
  },
];

export const SITE_DESCRIPTION =
  "CheekySaaS is a powerful webapp development agency designed to propel your ideas into enterprise level applications. Get started today.";

export const SUPABASE_PUBLIC_BUCKET_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/v1/object/public/publicimages`;

export const ABOUT = `## Who&apos;s Crafting Your Code?

**David** stands at the forefront of CheekySaaS, wielding over two decades of programming prowess. With a brain wired for both logic and laughs, David&apos;s approach to technology is nothing short of legendary. He&apos;s not just the guy who reads the manual—he writes a new one, because let&apos;s face it, the original could&apos;ve used a few jokes.

### The Journey of a Thousand Codes

David&apos;s odyssey through the digital domain has seen him mastering everything from the arcane arts of assembly language to the modern mystics of high-level programming. E-commerce platforms? Done. Mobile applications that transform your device? Easy. Building sophisticated software solutions while cracking a smile? Daily routine.

David believes in the power of laughter, the thrill of the build, and the sheer joy of turning complex problems into elegant solutions. At CheekySaaS, we&apos;re more than just a software development agency—we&apos;re your partners in creating digital experiences that stand out, all while having a good time.

Ready to add a dash of cheekiness to your next project? **David** and the CheekySaaS team are here to turn your visions into reality, one line of code at a time.`;

export const PRIVACY_POLICY = `# Privacy Policy for CheekySaaS

Effective date: March 1, 2024

Welcome to CheekySaaS. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read it carefully.

## Information We Collect

### Information You Provide to Us
- **Personal Information**: We collect personal information you voluntarily provide to us, such as your name, email address, company details, and project requirements when you sign up for our services or contact us.
- **Payment Information**: If you purchase services, we may collect payment information, which is processed by third-party payment processors.

### Information We Collect Automatically
- **Log Data**: Includes your computer&apos;s Internet Protocol (IP) address, browser type, browser version, our service pages that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
- **Cookies and Tracking Technologies**: We use cookies and similar tracking technologies to track activity on our service and hold certain information.

## Use of Information

We use the information we collect to:
- Provide and maintain our services
- Notify you about changes to our services
- Allow you to participate in interactive features of our service when you choose to do so
- Provide customer support
- Gather analysis or valuable information so that we can improve our service
- Monitor the usage of our service
- Detect, prevent, and address technical issues
- Provide you with news, special offers, and general information about other goods, services, and events which we offer

## Sharing Your Information

We may share your information with third parties in the following situations:
- **With Service Providers**: We may share your information with service providers who perform services for us, such as payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
- **For Legal Reasons**: We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).

## Security of Your Information

We are committed to protecting the security of your personal information. We use a variety of security technologies and procedures to help protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet, or method of electronic storage is 100% secure.

## Children&apos;s Privacy

Our services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under the age of 13. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us.

## Changes to This Privacy Policy

We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Effective date" at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

## Your Rights

You have certain rights under applicable data protection laws, including the right to access, correct, update, or request deletion of your personal information. CheekySaaS takes reasonable steps to allow you to correct, amend, delete, or limit the use of your personal information. If you wish to be informed about what personal information we hold about you and if you want it to be removed from our systems, please contact us.

In certain circumstances, you have the following data protection rights:
- The right to access, update, or delete the information we have on you.
- The right of rectification if that information is inaccurate or incomplete.
- The right to object to our processing of your personal information.
- The right of restriction to limit the processing of your information.
- The right to data portability, meaning to receive a copy of the information we have on you in a structured, machine-readable and commonly used format.
- The right to withdraw consent at any time where CheekySaaS relied on your consent to process your personal information.

Please note that we may ask you to verify your identity before responding to such requests.

## Contact Us

If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at privacy@cheekysaas.com.

We are committed to respecting your privacy and protecting your personal information.
`;

export const TERMS_AND_CONDITIONS = `# Terms and Conditions for CheekySaaS

## Introduction

Welcome to CheekySaaS. By accessing our website or using our services, you agree to be bound by these Terms and Conditions. Please read them carefully.

## Services

CheekySaaS provides software development services, including but not limited to web development, mobile application development, and custom software solutions.

## User Obligations

- Users must provide accurate and complete information when registering for our services and must keep that information up to date.
- Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account.
- Users agree to use our services only for lawful purposes and in compliance with all applicable laws and regulations.

## Intellectual Property Rights

- All materials provided by CheekySaaS, including software, documentation, and content, are the intellectual property of CheekySaaS or its licensors and are protected by copyright and other intellectual property laws.
- Users are granted a limited, non-exclusive, non-transferable license to use the materials for their personal or internal business purposes.
- Users must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the materials without the prior written consent of CheekySaaS.

## Payment

- Fees for our services will be as agreed upon in the service contract or proposal.
- Payments are due as specified in the contract or proposal. Late payments may incur additional fees.

## Termination

- CheekySaaS may terminate or suspend access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
- All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.

## Disclaimer

The services provided by CheekySaaS are on an "AS IS" and "AS AVAILABLE" basis. CheekySaaS makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, or materials included therein.

## Limitation of Liability

In no event shall CheekySaaS, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the services; (ii) any conduct or content of any third party on the services; (iii) any content obtained from the services; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed its essential purpose.

## Changes

We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our service after those revisions become effective, you agree to be bound by the revised terms.

## Contact Us

If you have any questions about these Terms, please contact us at support@cheekysaas.com.

*Last updated: March 1, 2024*
`;
