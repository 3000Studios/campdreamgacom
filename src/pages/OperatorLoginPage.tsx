import { DemoNotice } from '@/components/DemoNotice';
import { SeoHead } from '@/components/SeoHead';

export const OperatorLoginPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Protected operator sign-in for Camp Dream GA."
      noIndex
      path="/operator-sign-in"
      title="Operator sign in"
    />
    <section className="operator-login">
      <div className="panel operator-login-card">
        <p className="eyebrow">Protected operator access</p>
        <h1>Operator access is disabled on this demo.</h1>
        <p>
          This test site does not allow sign-ins, submissions, or client-side actions to be sent.
        </p>
        <div className="lead-form">
          <DemoNotice>
            Operator login is disabled on this demo build. Use{' '}
            <a href="https://campdreamga.org" rel="noreferrer" target="_blank">
              campdreamga.org
            </a>{' '}
            for official Camp Dream information.
          </DemoNotice>
          <button className="button button-disabled" disabled type="button">
            Enter operator workspace
          </button>
        </div>
      </div>
    </section>
  </>
);
