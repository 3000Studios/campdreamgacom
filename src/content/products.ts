import type { Product, ProductCollection } from '../types.js';

export const products: Product[] = [
  {
    badges: ['Best seller', 'Cozy'],
    category: 'Apparel',
    description:
      'A ridiculously soft hoodie built for cool mornings, warm mugs, and late-night star stories. Brushed interior, roomy fit, and a color palette that feels like sunrise after a good night’s sleep.',
    highlights: ['Cloud-soft fleece interior', 'Roomy unisex fit', 'Campfire-ready colorway'],
    media: [
      {
        alt: 'Campfire hoodie folded on a wooden bench',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1520975958225-1c2b7f07a8da?auto=format&fit=crop&w=1400&q=80',
      },
      {
        alt: 'Slow-moving forest canopy video loop',
        attribution: { name: 'Coverr', url: 'https://coverr.co' },
        kind: 'video',
        posterUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
        url: 'https://cdn.coverr.co/videos/coverr-hikers-in-the-woods-1579/1080p.mp4',
      },
    ],
    name: 'Campfire Cloud Hoodie',
    price: { amount: 58, currency: 'USD', display: '$58' },
    slug: 'campfire-cloud-hoodie',
    tagline: 'Warm, soft, and made for joy.',
  },
  {
    badges: ['Giftable', 'New'],
    category: 'Drinkware',
    description:
      'A bright enamel mug that looks great in your hand and even better in photos. Lightweight, durable, and the perfect excuse to make a second cup.',
    highlights: ['Lightweight enamel', 'Classic camp silhouette', 'Joyful color pop'],
    media: [
      {
        alt: 'Enamel mug on a picnic table outdoors',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1400&q=80',
      },
      {
        alt: 'Coffee steam rising video loop',
        attribution: { name: 'Coverr', url: 'https://coverr.co' },
        kind: 'video',
        posterUrl: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?auto=format&fit=crop&w=1400&q=80',
        url: 'https://cdn.coverr.co/videos/coverr-coffee-time-1578/1080p.mp4',
      },
    ],
    name: 'Sunrise Enamel Mug',
    price: { amount: 18, currency: 'USD', display: '$18' },
    slug: 'sunrise-enamel-mug',
    tagline: 'Cheers to early light.',
  },
  {
    badges: ['Tiny joy', 'Collectible'],
    category: 'Accessories',
    description:
      'A little enamel pin that says “I choose joy” without saying a word. Toss it on a jacket, bag, or lanyard and let the color do the talking.',
    highlights: ['Hard enamel finish', 'Secure backing', 'Perfect on packs + jackets'],
    media: [
      {
        alt: 'Enamel pin on a backpack strap',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1526481280695-3c687fd5432c?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Trail Joy Enamel Pin',
    price: { amount: 9, currency: 'USD', display: '$9' },
    slug: 'trail-joy-enamel-pin',
    tagline: 'A pop of happy, anywhere.',
  },
  {
    badges: ['Night vibes', 'Outdoor'],
    category: 'Camp Gear',
    description:
      'A compact lantern-style light designed for good vibes: soft glow, easy carry, and a look that turns any table into a little campsite.',
    highlights: ['Warm ambient glow', 'Pack-friendly size', 'Looks great on shelves too'],
    media: [
      {
        alt: 'Lantern glowing in a tent at night',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      },
      {
        alt: 'String lights gently moving video loop',
        attribution: { name: 'Coverr', url: 'https://coverr.co' },
        kind: 'video',
        posterUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
        url: 'https://cdn.coverr.co/videos/coverr-lights-1566/1080p.mp4',
      },
    ],
    name: 'Stargazer Lantern',
    price: { amount: 24, currency: 'USD', display: '$24' },
    slug: 'stargazer-lantern',
    tagline: 'Glow that feels like a hug.',
  },
  {
    badges: ['Picnic-ready', 'Soft'],
    category: 'Outdoor Living',
    description:
      'A foldable blanket made for spontaneous picnics, movie nights, and “we should go outside” moments. Big enough to share, cute enough to leave out.',
    highlights: ['Easy fold + carry', 'Big shareable size', 'Playful pattern energy'],
    media: [
      {
        alt: 'Picnic blanket laid out on grass with snacks',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Joy Picnic Blanket',
    price: { amount: 34, currency: 'USD', display: '$34' },
    slug: 'joy-picnic-blanket',
    tagline: 'Your outdoors, upgraded.',
  },
  {
    badges: ['Hydration', 'Everyday'],
    category: 'Drinkware',
    description:
      'A reusable bottle with a bright, clean look and a “take it everywhere” feel. Great for day hikes, desk days, and everything between.',
    highlights: ['Leak-resistant', 'Easy-grip shape', 'Looks great in photos'],
    media: [
      {
        alt: 'Reusable water bottle on a rock by a lake',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1526401485004-2aa7d2706d8b?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Daytrip Water Bottle',
    price: { amount: 22, currency: 'USD', display: '$22' },
    slug: 'daytrip-water-bottle',
    tagline: 'Sip, smile, repeat.',
  },
  {
    badges: ['Self-care', 'Cozy'],
    category: 'Home',
    description:
      'A warm, clean candle scent inspired by cabins, cedar, and that tiny moment of quiet before everyone wakes up.',
    highlights: ['Warm cedar vibe', 'Giftable jar', 'Instant cozy'],
    media: [
      {
        alt: 'Candle on a cozy table with soft light',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Cozy Cabin Candle',
    price: { amount: 16, currency: 'USD', display: '$16' },
    slug: 'cozy-cabin-candle',
    tagline: 'Light the mood, gently.',
  },
  {
    badges: ['Bright', 'Decor'],
    category: 'Camp Gear',
    description:
      'Solar-style string lights that turn any space into a mini celebration. Drape them, wrap them, or hang them and let the glow do its thing.',
    highlights: ['Soft warm glow', 'Instant vibe upgrade', 'Great for photos + parties'],
    media: [
      {
        alt: 'String lights on a porch at dusk',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Solar Glow String Lights',
    price: { amount: 19, currency: 'USD', display: '$19' },
    slug: 'solar-glow-string-lights',
    tagline: 'Make every night golden.',
  },
  {
    badges: ['Limited', 'Sticker joy'],
    category: 'Accessories',
    description:
      'A sticker pack for water bottles, laptops, journals, and whatever else deserves a little joy. Bright, durable, and unapologetically fun.',
    highlights: ['Weather-resistant vinyl', 'Mix of bold + minimal', 'Perfect for gifts'],
    media: [
      {
        alt: 'Stickers arranged on a desk with a notebook',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Joy Sticker Pack',
    price: { amount: 7, currency: 'USD', display: '$7' },
    slug: 'joy-sticker-pack',
    tagline: 'Tiny art. Big mood.',
  },
  {
    badges: ['Write it down', 'New'],
    category: 'Paper Goods',
    description:
      'A simple, beautiful journal for checklists, trail notes, gratitude, and daydreams. Smooth pages, sturdy cover, and “I’m actually going to use this” energy.',
    highlights: ['Smooth pages', 'Sturdy cover', 'Perfect for trip planning'],
    media: [
      {
        alt: 'Journal open with pen on a wooden table',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Adventure Journal',
    price: { amount: 14, currency: 'USD', display: '$14' },
    slug: 'adventure-journal',
    tagline: 'Plans, stories, sparkles.',
  },
  {
    badges: ['Chill', 'Outdoor'],
    category: 'Outdoor Living',
    description:
      'A colorful hammock-inspired lounge pick for porch naps and backyard reads. The vibe is “I’m off-duty and it shows.”',
    highlights: ['Relaxed lounge energy', 'Bold color palette', 'Perfect for slow afternoons'],
    media: [
      {
        alt: 'Hammock between trees in bright sunlight',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Rainbow Hammock',
    price: { amount: 39, currency: 'USD', display: '$39' },
    slug: 'rainbow-hammock',
    tagline: 'Nap like it’s your job.',
  },
  {
    badges: ['Digital', 'Instant'],
    category: 'Digital',
    description:
      'A “press play” playlist concept for slow mornings, road trips, and golden-hour walks. It’s a vibe guide—light, bright, and made for movement.',
    highlights: ['Instant vibe boost', 'Perfect for travel', 'Joy-forward mood'],
    media: [
      {
        alt: 'Headphones on a desk beside a notebook',
        attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
        kind: 'image',
        url: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1400&q=80',
      },
    ],
    name: 'Golden Hour Playlist (Digital)',
    price: { amount: 5, currency: 'USD', display: '$5' },
    slug: 'golden-hour-playlist',
    tagline: 'Press play, feel better.',
  },
];

export const collections: ProductCollection[] = [
  {
    description: 'Warm colors, soft textures, and “stay a little longer” energy.',
    heroMedia: {
      alt: 'Campfire glow video loop',
      attribution: { name: 'Coverr', url: 'https://coverr.co' },
      kind: 'video',
      posterUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80',
      url: 'https://cdn.coverr.co/videos/coverr-campfire-1641/1080p.mp4',
    },
    name: 'Campfire Cozy',
    productSlugs: ['campfire-cloud-hoodie', 'sunrise-enamel-mug', 'cozy-cabin-candle'],
    slug: 'campfire-cozy',
  },
  {
    description: 'Little wins, bright pops, and accessories that make you smile.',
    heroMedia: {
      alt: 'Bright colorful objects on a desk',
      attribution: { name: 'Unsplash', url: 'https://unsplash.com' },
      kind: 'image',
      url: 'https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1400&q=80',
    },
    name: 'Tiny Joy',
    productSlugs: ['trail-joy-enamel-pin', 'joy-sticker-pack', 'adventure-journal'],
    slug: 'tiny-joy',
  },
  {
    description: 'Sun, snacks, and all the “let’s go outside” essentials.',
    heroMedia: {
      alt: 'Wind through trees video loop',
      attribution: { name: 'Coverr', url: 'https://coverr.co' },
      kind: 'video',
      posterUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80',
      url: 'https://cdn.coverr.co/videos/coverr-wind-in-the-trees-1546/1080p.mp4',
    },
    name: 'Daytrip Essentials',
    productSlugs: ['joy-picnic-blanket', 'daytrip-water-bottle', 'stargazer-lantern'],
    slug: 'daytrip-essentials',
  },
];

export const getProductBySlug = (slug: string): Product | undefined =>
  products.find((product) => product.slug === slug);

export const getCollectionBySlug = (slug: string): ProductCollection | undefined =>
  collections.find((collection) => collection.slug === slug);
