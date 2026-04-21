import type { ReactNode } from 'react';

interface DemoNoticeProps {
  children?: ReactNode;
  className?: string;
  title?: string;
}

export const DemoNotice = ({
  children,
  className = '',
  title = 'Sandbox notice',
}: DemoNoticeProps): JSX.Element => (
  <div className={`demo-notice ${className}`.trim()}>
    <p className="eyebrow">{title}</p>
    <p>
      {children ?? (
        <>
          This is a sandbox storefront concept. Product listings and prices are presented as a demo
          catalog, and checkout is handled via email order requests unless direct payment links are
          configured.
        </>
      )}
    </p>
  </div>
);
