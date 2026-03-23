import { Link, useParams } from 'react-router-dom';

import { SeoHead } from '@/components/SeoHead';

export const BookingStatusPage = (): JSX.Element => {
  const { status } = useParams();
  const isSuccess = status === 'success';
  const title = isSuccess ? 'Booking confirmed' : 'Booking canceled';

  return (
    <>
      <SeoHead
        description={`Camp Dream GA booking status: ${title}.`}
        noIndex
        path={`/booking/${status ?? 'status'}`}
        title={title}
      />
      <section className="section">
        <div className="container narrow-panel panel">
          <p className="eyebrow">Booking status</p>
          <h1>{isSuccess ? 'Your booking is moving forward.' : 'Your booking was not completed.'}</h1>
          <p>
            {isSuccess
              ? 'Check your email for next steps, arrival guidance, or follow-up from our team.'
              : 'No problem. You can return to pricing, explore resources, or ask for help choosing the right path.'}
          </p>
          <div className="hero-actions">
            <Link className="button" to={isSuccess ? '/contact' : '/pricing'}>
              {isSuccess ? 'Ask a follow-up question' : 'Return to pricing'}
            </Link>
            <Link className="button button-secondary" to="/book">
              Back to booking options
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
