import type { ReactNode } from 'react';

interface DemoNoticeProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

export const DemoNotice = ({
  children,
  className = '',
  title = 'Demo only',
}: DemoNoticeProps): JSX.Element => (
  <div className={`demo-notice ${className}`.trim()}>
    <p className="eyebrow">{title}</p>
    <p>
      {children ?? (
        <>
          Contact forms, applications, and donations are disabled on this demo site. Use{' '}
          <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
            campdreamga.org
          </a>{' '}
          for official Camp Dream information and live actions.
        </>
      )}
    </p>
  </div>
);
