import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SeoHead } from '@/components/SeoHead';

export const OperatorLoginPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/session', {
        body: JSON.stringify({ email, passcode }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('The email or passcode did not match the configured operator account.');
      }

      navigate('./dashboard');
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'We could not sign you in right now.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
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
          <h1>Sign in to the Camp Dream GA runtime.</h1>
          <p>
            This route is excluded from public discovery and validated server-side with a signed
            session cookie.
          </p>
          <form className="lead-form" onSubmit={handleSubmit}>
            <label>
              Operator email
              <input
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </label>
            <label>
              Passcode
              <input
                onChange={(event) => setPasscode(event.target.value)}
                required
                type="password"
                value={passcode}
              />
            </label>
            {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
            <button className="button" disabled={isSubmitting} type="submit">
              {isSubmitting ? 'Signing in...' : 'Enter operator workspace'}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
