import { useMemo } from 'react';

import { DemoNotice } from '@/components/DemoNotice';

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
  const submitLabel = useMemo(
    () => (compact ? 'Request next steps' : 'Send my inquiry'),
    [compact],
  );

  return (
    <div className={`lead-form ${compact ? 'lead-form-compact' : ''}`} data-demo-source={source}>
      <div className="lead-form-heading">
        <p className="eyebrow">Inquiry capture</p>
        <h3>{title}</h3>
      </div>
      <DemoNotice>
        This demo does not accept contact requests, quotes, or submissions. Use{' '}
        <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
          campdreamga.org
        </a>{' '}
        for official Camp Dream information and live forms.
      </DemoNotice>
      <button className="button button-disabled" disabled type="button">
        {submitLabel}
      </button>
    </div>
  );
};
