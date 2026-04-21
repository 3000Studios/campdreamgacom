export interface ArticleSection {
  body: string[];
  title: string;
}

export interface FaqItem {
  answer: string;
  question: string;
}

export interface HeroMediaResponse {
  query: string;
  results: HeroVideoAsset[];
  selected: HeroVideoAsset | null;
}

export interface HeroVideoAsset {
  attributionName: string;
  attributionUrl: string;
  duration: number;
  height: number;
  id: string;
  posterUrl: string;
  provider: 'pexels' | 'pixabay';
  sourceUrl: string;
  videoUrl: string;
  width: number;
}

export interface LegalPage {
  description: string;
  sections: ArticleSection[];
  slug: string;
  title: string;
}

export interface NavItem {
  href: string;
  label: string;
}

export interface PricingFeatureRow {
  label: string;
  values: Record<string, string>;
}

export interface PricingPlan {
  cadence: string;
  ctaHref: string;
  ctaLabel: string;
  highlight?: string;
  id: string;
  name: string;
  price: string;
  summary: string;
  tag: string;
}

export interface Program {
  audience: string;
  duration: string;
  highlights: string[];
  priceLabel: string;
  slug: string;
  summary: string;
  title: string;
}

export interface ResourceArticle {
  adEligible: boolean;
  category: string;
  ctaBody: string;
  ctaTitle: string;
  description: string;
  faq: FaqItem[];
  intro: string;
  publishedAt: string;
  readTime: string;
  related: string[];
  sections: ArticleSection[];
  slug: string;
  summaryPoints: string[];
  title: string;
  updatedAt: string;
}

export interface RouteEntry {
  changeFrequency: 'daily' | 'weekly' | 'monthly';
  noIndex?: boolean;
  path: string;
  priority: number;
}

export interface SiteStat {
  label: string;
  value: string;
}

export interface Testimonial {
  location: string;
  name: string;
  quote: string;
  role: string;
}

export interface ProductMediaAttribution {
  name: string;
  url: string;
}

export interface ProductMedia {
  alt: string;
  attribution?: ProductMediaAttribution;
  kind: 'image' | 'video';
  posterUrl?: string;
  url: string;
}

export interface ProductPrice {
  amount: number;
  currency: 'USD';
  display: string;
}

export interface Product {
  badges: string[];
  category: string;
  description: string;
  highlights: string[];
  media: ProductMedia[];
  name: string;
  price: ProductPrice;
  slug: string;
  tagline: string;
}

export interface ProductCollection {
  description: string;
  heroMedia: ProductMedia;
  name: string;
  productSlugs: string[];
  slug: string;
}
