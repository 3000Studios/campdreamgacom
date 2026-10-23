import { Link } from 'react-router-dom';

import { pricingPlans, programs } from '@/content/siteContent';
import { trackEvent } from '@/lib/analytics';

interface BookingCtaProps {
  variant?: 'panel' | 'section';
}

export const BookingCta = ({ variant = 'section' }: BookingCtaProps): JSX.Element => {
  const summerCampPlan = pricingPlans.find((plan) => plan.id === 'summer-camp') ?? pricingPlans[0];
  const summerCampProgram =
    programs.find((program) => program.slug === 'summer-camp') ?? programs[0];

  if (!summerCampPlan || !summerCampProgram) {
    return <></>;
  }

  const content = (
    <>
      <p className="eyebrow">Book Camp Dream</p>
      <h2>2026 Summer Camp registration is open.</h2>
      <p>
        {summerCampProgram.summary} {summerCampPlan.summary}
      </p>
      <ul className="check-list">
        {summerCampProgram.highlights.map((highlight) => (
          <li key={highlight}>{highlight}</li>
        ))}
      </ul>
      <div className="hero-actions">
        <a
          className="button"
          href={summerCampPlan.ctaHref}
          onClick={() =>
            trackEvent('cta_click', {
              placement: 'booking_cta',
              target: summerCampPlan.ctaHref,
            })
          }
          rel="noreferrer"
          target="_blank"
        >
          Start the Camper Application
        </a>
        <Link className="button button-secondary" to="/contact">
          Ask a booking question
        </Link>
      </div>
      <p className="muted">
        {summerCampPlan.name}: {summerCampPlan.price} · {summerCampPlan.cadence}.{' '}
        {summerCampPlan.tag}.
      </p>
    </>
  );

  if (variant === 'panel') {
    return <aside className="panel cta-panel booking-cta">{content}</aside>;
  }

  return (
    <section className="section section-tight">
      <div className="container">
        <div className="panel cta-panel booking-cta">{content}</div>
      </div>
    </section>
  );
};
