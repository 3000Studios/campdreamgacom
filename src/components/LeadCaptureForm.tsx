import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { trackEvent } from '@/lib/analytics';

interface LeadCaptureFormProps {
  compact?: boolean;
  source: string;
  title?: string;
}

export const LeadCaptureForm = ({
  compact = false,
  source,
  title = 'Tell us what you want help launching',
}: LeadCaptureFormProps): JSX.Element => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: '',
    intent: 'family-weekend',
    name: '',
    note: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  const submitLabel = useMemo(
    () => (compact ? 'Request next steps' : 'Send my inquiry'),
    [compact],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);
    trackEvent('form_submit', { source });

    try {
      const response = await fetch('/api/inquiries', {
        body: JSON.stringify({ ...formState, source }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('We could not send your request right now.');
      }

      trackEvent('lead_created', { source, intent: formState.intent });
      navigate(`/thanks?source=${encodeURIComponent(source)}`);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'We could not send your request right now.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={`lead-form ${compact ? 'lead-form-compact' : ''}`} onSubmit={handleSubmit}>
      <div className="lead-form-heading">
        <p className="eyebrow">Inquiry capture</p>
        <h3>{title}</h3>
      </div>

      <label>
        Name
        <input
          onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
          onFocus={() => {
            if (!hasTrackedStart) {
              setHasTrackedStart(true);
              trackEvent('form_start', { source });
            }
          }}
          placeholder="Your name"
          required
          type="text"
          value={formState.name}
        />
      </label>

      <label>
        Email
        <input
          onChange={(event) =>
            setFormState((current) => ({ ...current, email: event.target.value }))
          }
          placeholder="you@example.com"
          required
          type="email"
          value={formState.email}
        />
      </label>

      <label>
        Best-fit path
        <select
          onChange={(event) =>
            setFormState((current) => ({ ...current, intent: event.target.value }))
          }
          value={formState.intent}
        >
          <option value="family-weekend">Dream Weekend</option>
          <option value="trailblazer">Trailblazer Cohort</option>
          <option value="campcraft">CampCraft Studio</option>
          <option value="unsure">Help me decide</option>
        </select>
      </label>

      <label>
        Notes
        <textarea
          onChange={(event) => setFormState((current) => ({ ...current, note: event.target.value }))}
          placeholder="Tell us about your goals, timeline, or who the experience is for."
          rows={compact ? 4 : 5}
          value={formState.note}
        />
      </label>

      {errorMessage ? <p className="form-error">{errorMessage}</p> : null}

      <button className="button" disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Sending...' : submitLabel}
      </button>
    </form>
  );
};
