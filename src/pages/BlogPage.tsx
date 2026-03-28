import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { buildBreadcrumbSchema } from '@/lib/schema';

interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  gradient: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 'summer-camp-2026-registration',
    title: 'Summer Camp 2026 Registration Is Now Open',
    date: 'March 15, 2026',
    excerpt:
      'Registration for Camp Dream Summer Camp 2026 is officially open. Sessions are scheduled for July at the Calvin Center in Hampton, Georgia.',
    category: 'Announcements',
    gradient: 'linear-gradient(135deg, #2f4f43 0%, #3a6b5a 100%)',
  },
  {
    id: 'volunteer-spotlight-bryson',
    title: 'Volunteer Spotlight: How Bryson Found His Purpose at Camp Dream',
    date: 'February 28, 2026',
    excerpt:
      'Bryson Higgins shares his experience as a first-time counselor and how one-to-one support changed his perspective on service.',
    category: 'Stories',
    gradient: 'linear-gradient(135deg, #b45a2a 0%, #c97c47 100%)',
  },
  {
    id: 'annual-fundraiser-recap',
    title: 'Annual Fundraiser Raises Record Support for Camper Scholarships',
    date: 'January 20, 2026',
    excerpt:
      'The 2025 annual fundraiser raised enough to sponsor 40 camper scholarships for the upcoming summer session.',
    category: 'Events',
    gradient: 'linear-gradient(135deg, #8f4620 0%, #b45a2a 100%)',
  },
  {
    id: 'new-activities-2026',
    title: 'New Activities Coming to Summer Camp 2026',
    date: 'January 5, 2026',
    excerpt:
      'Camp Dream is introducing adaptive kayaking, sensory-friendly art stations, and expanded music programming for 2026.',
    category: 'Programs',
    gradient: 'linear-gradient(135deg, #2f4f43 0%, #4a7a6a 100%)',
  },
  {
    id: 'community-partner-spotlight',
    title: 'Community Partner Spotlight: The Calvin Center',
    date: 'December 10, 2025',
    excerpt:
      'A look at our long-standing partnership with the Calvin Center, the scenic 536-acre retreat that hosts Camp Dream Summer Camp.',
    category: 'Community',
    gradient: 'linear-gradient(135deg, #675844 0%, #8f7a5c 100%)',
  },
];

export const BlogPage = (): JSX.Element => (
  <>
    <SeoHead
      description="News, stories, and updates from Camp Dream Foundation."
      path="/blog"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Blog', path: '/blog' },
      ])}
      title="Blog"
    />

    <section className="page-hero">
      <div className="page-hero-overlay" />
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/blog', label: 'Blog' },
          ]}
        />
        <p className="eyebrow">Camp Dream Blog</p>
        <h1>News, stories, and updates from the Camp Dream community.</h1>
        <p className="lede">
          Stay connected with camp announcements, volunteer spotlights, fundraiser recaps, and
          program updates.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container blog-grid">
        {blogPosts.map((post) => (
          <article className="panel blog-card animate-on-scroll" key={post.id}>
            <div
              className="blog-card-image"
              style={{
                background: post.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.3)',
                fontSize: '3rem',
              }}
            >
              ✦
            </div>
            <div className="blog-card-body">
              <span className="badge">{post.category}</span>
              <h3>{post.title}</h3>
              <p className="blog-card-date">{post.date}</p>
              <p>{post.excerpt}</p>
              <span className="text-link">Read more →</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  </>
);
