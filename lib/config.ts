const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "") || "447443797893";
const whatsappMessage = "Hello NeuraX, I would like to discuss a website or AI solution.";

export const siteConfig = {
  name: "NeuraX",
  domain: "https://www.neuraxai.co.uk",
  email: "chandibloom@gmail.com",
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() || "",
  showFoundingOffer: process.env.NEXT_PUBLIC_SHOW_FOUNDING_OFFER !== "false",
  gaId: process.env.NEXT_PUBLIC_GA_ID?.trim() || "",
  whatsapp: {
    displayNumber: "+44 7443 797893",
    url: `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
  },
  social: {
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || "",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "",
  },
};
