import { useMemo, useState } from 'react';

import { DemoNotice } from '@/components/DemoNotice';
import { runtimeConfig } from '@/lib/runtime';

interface LeadCaptureFormProps {
  compact?: boolean;
  source: string;
  title?: string;
}

type LeadIntent = 'order_request' | 'product_question' | 'partnership' | 'general';

const buildMailtoLink = (subject: string, body: string): string => {
  const params = new URLSearchParams();
  params.set('subject', subject);
  params.set('body', body);
  return `mailto:${runtimeConfig.contactEmail}?${params.toString()}`;
};

export const LeadCaptureForm = ({
  compact = false,
  source,
  title = 'Send a quick message to the store',
}: LeadCaptureFormProps): JSX.Element => {
  const [intent, setIntent] = useState<LeadIntent>('order_request');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const submitLabel = useMemo(
    () => (compact ? 'Send message' : 'Send my message'),
    [compact],
  );

  const mailtoHref = useMemo(() => {
    const body = [
      'Hi!',
      '',
      `Intent: ${intent}`,
      `Name: ${name || '(not provided)'}`,
      `Email: ${email || '(not provided)'}`,
      '',
      'Message:',
      note || '(no message)',
      '',
      `Source: ${source}`,
      `Site: ${runtimeConfig.siteUrl}`,
    ].join('\n');

    return buildMailtoLink('Store inquiry', body);
  }, [email, intent, name, note, source]);

  return (
    <form
      className={`lead-form ${compact ? 'lead-form-compact' : ''}`}
      data-demo-source={source}
      onSubmit={async (event) => {
        event.preventDefault();
        setStatus('sending');

        try {
          const endpoint = new URL('/api/inquiries', runtimeConfig.apiBaseUrl).toString();
          const response = await fetch(endpoint, {
            body: JSON.stringify({
              email: email.trim() || runtimeConfig.contactEmail,
              intent,
              name: name.trim() || 'Anonymous',
              note: note.trim(),
              source,
            }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
          });

          if (!response.ok) {
            throw new Error('Inquiry request failed.');
          }

          setStatus('sent');
        } catch {
          window.location.href = mailtoHref;
          setStatus('sent');
        }
      }}
    >
      <div className="lead-form-heading">
        <p className="eyebrow">Inquiry</p>
        <h3>{title}</h3>
      </div>

      <DemoNotice>
        Messages attempt a direct post to the configured API, and fall back to a pre-filled email
        request if the API is unavailable.
      </DemoNotice>

      <label>
        What’s this about?
        <select onChange={(event) => setIntent(event.target.value as LeadIntent)} value={intent}>
          <option value="order_request">Order request</option>
          <option value="product_question">Product question</option>
          <option value="partnership">Partnership</option>
          <option value="general">General</option>
        </select>
      </label>

      <div className="lead-form-grid">
        <label>
          Name
          <input onChange={(event) => setName(event.target.value)} placeholder="Your name" value={name} />
        </label>
        <label>
          Email
          <input
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            type="email"
            value={email}
          />
        </label>
      </div>

      <label>
        Message
        <textarea
          onChange={(event) => setNote(event.target.value)}
          placeholder="Tell us what you want. Include product names, quantities, or questions."
          rows={compact ? 3 : 5}
          value={note}
        />
      </label>

      <div className="lead-form-actions">
        <button className="button" disabled={status === 'sending'} type="submit">
          {status === 'sending' ? 'Sending…' : status === 'sent' ? 'Sent' : submitLabel}
        </button>
        <a className="button button-secondary" href={mailtoHref}>
          Open email draft
        </a>
      </div>

      {status === 'error' ? <p className="form-error">Something went wrong. Try the email draft.</p> : null}
    </form>
  );
};

