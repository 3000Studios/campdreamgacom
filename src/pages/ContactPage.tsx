import { Breadcrumbs } from '@/components/Breadcrumbs';
import { DemoNotice } from '@/components/DemoNotice';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { SeoHead } from '@/components/SeoHead';
import { contactDetails } from '@/content/siteContent';
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
          <h1>Contact Camp Dream for camp, volunteer, and donor questions.</h1>
          <p className="lede">{contactDetails.supportNote}</p>
          <div className="panel">
            <DemoNotice>
              Contact actions are disabled on this demo site. Use{' '}
              <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
                campdreamga.org
              </a>{' '}
              for official Camp Dream contact information and live inquiry options.
            </DemoNotice>
            <p>
              <strong>Official site:</strong>{' '}
              <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
                campdreamga.org
              </a>
            </p>
            <p>
              <strong>Phone:</strong> Demo contact actions are disabled
            </p>
            <p>
              <strong>Availability:</strong> {contactDetails.availability}
            </p>
            <p>
              <strong>Service area:</strong> {contactDetails.serviceArea}
            </p>
          </div>
        </div>
        <LeadCaptureForm source="contact-page" title="Send your question" />
      </div>
    </section>
  </>
);
