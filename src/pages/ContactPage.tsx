import { Breadcrumbs } from '@/components/Breadcrumbs';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { SeoHead } from '@/components/SeoHead';
import { contactDetails } from '@/content/siteContent';
import { runtimeConfig } from '@/lib/runtime';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const ContactPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Contact Camp Dream for Summer Camp, volunteer, event, and donor inquiries."
      path="/contact"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Contact', path: '/contact' },
      ])}
      title="Contact Camp Dream"
    />

    <section className="page-hero">
      <div className="page-hero-overlay" />
      <div className="container">
        <Breadcrumbs
          items={[
            { href: '/', label: 'Home' },
            { href: '/contact', label: 'Contact' },
          ]}
        />
        <p className="eyebrow">Contact</p>
        <h1>Contact Camp Dream for camp, volunteer, and donor questions.</h1>
        <p className="lede">{contactDetails.supportNote}</p>
      </div>
    </section>

    <section className="section">
      <div className="container split-layout">
        <div className="animate-on-scroll slide-in-left">
          <div className="panel">
            <p>
              <strong>Phone:</strong> <a href="tel:+16783670040">678-367-0040</a>
            </p>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${runtimeConfig.contactEmail}`}>{runtimeConfig.contactEmail}</a>
            </p>
            <p>
              <strong>Address:</strong> Calvin Center, 13550 Woolsey Rd, Hampton, GA 30228
            </p>
            <p>
              <strong>Availability:</strong> {contactDetails.availability}
            </p>
            <p>
              <strong>Service area:</strong> {contactDetails.serviceArea}
            </p>
          </div>
        </div>
        <div className="animate-on-scroll slide-in-right">
          <LeadCaptureForm source="contact-page" title="Send your question" />
        </div>
      </div>
    </section>
  </>
);
