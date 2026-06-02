export interface Service {
  numeral: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  cursorImage?: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  price: string;
  description: string;
  duration: string;
}

export interface ServiceCategory {
  category: string;
  description: string;
  items: ServiceItem[];
}

export interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export interface HoursItem {
  days: string;
  time: string;
}

export interface SocialItem {
  platform: string;
  url: string;
}

export interface AboutData {
  title: string;
  subtitle: string;
  paragraphs: string[];
  features: {
    number: string;
    label: string;
    desc: string;
  }[];
}

export interface SiteConfig {
  name: string;
  tagline: string;
  taglineSub: string;
  city: string;
  metaDescription: string;
  heroHeadline: string[];
  heroSubtitle: string;
  phone: string;
  email: string;
  address: string;
  bookingUrl: string;
  bookingCTA: string;
  hours: HoursItem[];
  socials: SocialItem[];
  aboutPullQuote: string;
  aboutBody: string[];
  aboutStats: {
    years: number;
    clients: number;
  };
  about: AboutData;
  services: Service[];
  gallery: GalleryItem[];
  testimonials: TestimonialItem[];
}
