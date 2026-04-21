import { DemoNotice } from '@/components/DemoNotice';
import { SeoHead } from '@/components/SeoHead';

export const OperatorLoginPage = (): JSX.Element => (
  <>
    <SeoHead
      description="Protected operator sign-in for the Camp Dream Store sandbox storefront."
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
          <DemoNotice />
          <button className="button button-disabled" disabled type="button">
            Enter operator workspace
          </button>
        </div>
      </div>
    </section>
  </>
);
