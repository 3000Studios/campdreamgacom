import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DemoNotice } from '@/components/DemoNotice';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { SeoHead } from '@/components/SeoHead';
import { runtimeConfig } from '@/lib/runtime';
import { buildBreadcrumbSchema } from '@/lib/schema';

export const ContactPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Contact the Camp Dream Store sandbox storefront for questions, order requests, and partnerships."
      path="/contact"
      structuredData={buildBreadcrumbSchema([
        { label: 'Home', path: '/' },
        { label: 'Contact', path: '/contact' },
      ])}
      title="Contact"
    />

    <section className="section">
      <div className="container split-layout">
        <div className="prose-shell">
          <Breadcrumbs
            items={[
              { href: '/', label: 'Home' },
              { href: '/contact', label: 'Contact' },
            ]}
          />
          <p className="eyebrow">Contact</p>
          <h1>Questions, order requests, or partnerships?</h1>
          <p className="lede">
            Send a message below. If the configured API isn’t available, we’ll open a pre-filled
            email draft so your request still goes through.
          </p>
          <div className="panel">
            <p>
              <strong>Email:</strong> {runtimeConfig.contactEmail}
            </p>
            <p>
              <strong>Response time:</strong> Typically 1–2 business days (sandbox demo)
            </p>
            <p>
              <strong>Best for:</strong> order requests, product questions, and partnerships
            </p>
            <p>
              <strong>Notes:</strong> Include product names and quantities for faster replies
            </p>
            <DemoNotice />
          </div>
        </div>
        <LeadCaptureForm source="contact-page" title="Send your message" />
      </div>
    </section>
  </>
);
