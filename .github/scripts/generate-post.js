/**
 * Content Automation — Camp Dream GA
 * Generates an SEO resource article about camping, outdoor recreation,
 * and Camp Dream Georgia, then appends it to src/content/resources.ts
 * (the resourceArticles array).
 */

const fs = require('fs');
const path = require('path');

const BLOG_FILE = path.join(__dirname, '..', '..', 'src', 'content', 'resources.ts');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is not set');
  process.exit(1);
}

const CATEGORIES = [
  'Planning Guides',
  'Packing & Logistics',
  'First-Time Campers',
  'Budget & Decision Making',
  'Nature Activities',
  'Family Camping',
  'Seasonal Guides',
];

const TOPICS = [
  'How to prepare kids for their first outdoor adventure in Georgia',
  'Campfire cooking basics for families: safe meals that kids love',
  'Georgia state parks versus private campgrounds: a family comparison',
  'Rainy day camp plans: keeping the adventure alive when weather shifts',
  'Wildlife safety for Georgia campers: what families need to know',
  'Night sky activities for camp weekends: stargazing and nature walks',
  'Building outdoor confidence in children through camp experiences',
  'Seasonal camping in Georgia: what to expect spring through fall',
  'Water activities at Georgia camps: creek play and swimming safety',
  'How to photograph your camp weekend without missing the experience',
  'Camp group dynamics: helping kids make friends in outdoor settings',
  'Post-camp routines: keeping the outdoor spirit alive at home',
  'The benefits of unplugging: digital-free camp weekends for families',
  'Inclusive camping: making outdoor experiences work for every family',
  'Trail etiquette for families: teaching kids to respect nature',
  'Choosing the right sleeping setup for Georgia camp weather',
  'Nature journaling for kids: creative activities during camp downtime',
  'Emergency preparedness for family camping trips in Georgia',
  'How family camp experiences build stronger bonds than vacations',
  'The hidden value of structured outdoor programs for children',
];

async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 4096 },
    }),
  });
  const data = await res.json();
  if (!data.candidates || !data.candidates[0]) {
    console.error('Gemini response error:', JSON.stringify(data, null, 2));
    return null;
  }
  return data.candidates[0].content.parts[0].text;
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function escapeTS(str) {
  return str.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/"/g, '\\"');
}

async function main() {
  const source = fs.readFileSync(BLOG_FILE, 'utf-8');

  // Extract existing slugs
  const slugRegex = /slug:\s*'([^']+)'/g;
  const existingSlugs = new Set();
  let m;
  while ((m = slugRegex.exec(source)) !== null) {
    existingSlugs.add(m[1]);
  }

  // Extract existing titles
  const titleRegex = /title:\s*'([^']+)'/g;
  const existingTitles = new Set();
  while ((m = titleRegex.exec(source)) !== null) {
    existingTitles.add(m[1].toLowerCase());
  }

  const availableTopics = TOPICS.filter((t) => !existingTitles.has(t.toLowerCase()));

  if (availableTopics.length === 0) {
    console.log('All seed topics already used. Skipping.');
    return;
  }

  const topic = availableTopics[Math.floor(Math.random() * availableTopics.length)];
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

  const prompt = `You are a content writer for Camp Dream Georgia (campdreamga.com), a premium family camping and outdoor experience brand.

Write a resource article about: "${topic}"

Requirements:
- SEO-optimized title (may differ slightly from the topic)
- 1-2 sentence meta description
- A warm, informative introduction paragraph (3-4 sentences)
- 4-5 sections, each with a title and 2 body paragraphs
- 3 summary bullet points
- 3 FAQ items with question and answer
- A CTA title and CTA body that gently guide families toward the Camp Dream experience
- Estimated read time in format "X min read"
- Content must be warm, family-friendly, practical, and trustworthy
- No fabricated statistics or fake claims
- Focus on Georgia-specific outdoor experiences where relevant

Return ONLY valid JSON (no markdown fences) with this exact shape:
{
  "title": "string",
  "description": "string",
  "intro": "string",
  "readTime": "string",
  "sections": [
    { "title": "string", "body": ["paragraph1", "paragraph2"] }
  ],
  "summaryPoints": ["string", "string", "string"],
  "faq": [
    { "question": "string", "answer": "string" }
  ],
  "ctaTitle": "string",
  "ctaBody": "string"
}`;

  const raw = await callGemini(prompt);
  if (!raw) {
    console.log('No response from Gemini. Skipping.');
    return;
  }

  let post;
  try {
    const cleaned = raw
      .replace(/```json\s*/g, '')
      .replace(/```\s*/g, '')
      .trim();
    post = JSON.parse(cleaned);
  } catch {
    console.error('Failed to parse Gemini response:', raw);
    return;
  }

  const slug = slugify(post.title);
  if (existingSlugs.has(slug)) {
    console.log(`Slug "${slug}" already exists. Skipping.`);
    return;
  }

  const today = new Date().toISOString().split('T')[0];

  // Get existing slugs for the related field
  const allSlugs = [...existingSlugs];
  const relatedSlugs = allSlugs.slice(0, 2);

  // Build sections
  const sectionsStr = post.sections
    .map((s) => {
      const bodyLines = s.body.map((b) => `          '${escapeTS(b)}',`).join('\n');
      return `      {\n        body: [\n${bodyLines}\n        ],\n        title: '${escapeTS(s.title)}',\n      }`;
    })
    .join(',\n');

  // Build FAQ
  const faqStr = post.faq
    .map(
      (f) =>
        `      {\n        answer:\n          '${escapeTS(f.answer)}',\n        question: '${escapeTS(f.question)}',\n      }`,
    )
    .join(',\n');

  // Build summary points
  const summaryStr = post.summaryPoints.map((s) => `      '${escapeTS(s)}',`).join('\n');

  // Build related
  const relatedStr = relatedSlugs.map((s) => `'${s}'`).join(', ');

  const newEntry = `  {
    adEligible: true,
    category: '${escapeTS(category)}',
    ctaBody:
      '${escapeTS(post.ctaBody)}',
    ctaTitle: '${escapeTS(post.ctaTitle)}',
    description:
      '${escapeTS(post.description)}',
    faq: [
${faqStr},
    ],
    intro:
      '${escapeTS(post.intro)}',
    publishedAt: '${today}',
    readTime: '${post.readTime || '7 min read'}',
    related: [${relatedStr}],
    sections: [
${sectionsStr},
    ],
    slug: '${slug}',
    summaryPoints: [
${summaryStr}
    ],
    title: '${escapeTS(post.title)}',
    updatedAt: '${today}',
  },`;

  // Insert before the closing ]; of the resourceArticles array
  const closingPattern = /\n];\s*\n\s*export const getResourceBySlug/;
  if (!closingPattern.test(source)) {
    console.error('Could not find insertion point in resources.ts');
    return;
  }

  const updated = source.replace(
    closingPattern,
    `\n${newEntry}\n];\n\nexport const getResourceBySlug`,
  );
  fs.writeFileSync(BLOG_FILE, updated, 'utf-8');
  console.log(`Generated resource article: "${post.title}" (slug: ${slug})`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
