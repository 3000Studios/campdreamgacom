import { Breadcrumbs } from '@/components/Breadcrumbs';
import { SeoHead } from '@/components/SeoHead';
import { buildBreadcrumbSchema, organizationSchema } from '@/lib/schema';

export const AboutPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Learn about Camp Dream Foundation mission, values, and year-round impact."
      path="/about"
      structuredData={[
        organizationSchema,
        buildBreadcrumbSchema([
          { label: 'Home', path: '/' },
          { label: 'About', path: '/about' },
        ]),
      ]}
      title="What We Do"
    />

    <section className="page-hero">
      <div className="page-hero-overlay" />
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/about', label: 'About' },
          ]}
        />
        <p className="eyebrow">What We Do</p>
        <h1>
          Camp Dream provides life-changing camp experiences for children and adults with
          disabilities.
        </h1>
        <p className="lede">
          Since 1996, Camp Dream has offered Summer Camp and Camp Out programs in a barrier-free
          environment. No child has ever been turned away due to the severity of condition or
          financial capability.
        </p>
      </div>
    </section>

    <section className="section">
      <div className="container split-layout">
        <div className="animate-on-scroll slide-in-left">
          <h2>Our mission</h2>
          <p>
            Camp Dream provides an experience not found elsewhere that enriches the lives of
            children and young adults with moderate to severe physical and developmental
            disabilities now, tomorrow, and for the rest of their lives.
          </p>
          <p>
            Play and social connection are essential to healthy development. Camp Dream creates a
            safe space where campers can have fun, build confidence, and feel empowered.
          </p>
        </div>
        <div className="panel animate-on-scroll slide-in-right">
          <p className="eyebrow">What sets us apart</p>
          <ul className="check-list">
            <li>100% volunteer-driven programs and leadership</li>
            <li>One-to-one camper-to-counselor support model in Summer Camp</li>
            <li>Financial support model that helps families pay what they can</li>
            <li>Year-round events and community engagement across Georgia</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="section-heading animate-on-scroll">
          <p className="eyebrow">Our ethos</p>
          <h2>Camp Dream imparts self-worth, joy, and belonging.</h2>
          <p>
            Camp Dream counselors and staff work closely with every camper to provide an
            individualized experience. Campers are encouraged to participate, build friendships, and
            discover their own strengths.
          </p>
        </div>
        <div className="card-grid">
          <article className="panel animate-on-scroll">
            <h3>For campers</h3>
            <p>Recreational and social opportunities that are often unavailable elsewhere.</p>
          </article>
          <article className="panel animate-on-scroll">
            <h3>For families</h3>
            <p>A caring community that supports participation regardless of financial ability.</p>
          </article>
          <article className="panel animate-on-scroll">
            <h3>For volunteers</h3>
            <p>Meaningful service opportunities that create life-changing impact.</p>
          </article>
        </div>
      </div>
    </section>
  </>
);
