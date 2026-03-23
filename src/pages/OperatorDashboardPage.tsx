import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { SeoHead } from '@/components/SeoHead';

interface OperatorLogEntry {
  id: string;
  intent: string;
  message: string;
  riskLevel: string;
  submittedAt: string;
}

interface OperatorProposal {
  analyticsImpact: string;
  conversionImpact: string;
  intent: string;
  patchPayload: Record<string, unknown>;
  proposedChanges: Record<string, unknown>;
  rationale: string;
  requiresApproval: boolean;
  riskLevel: string;
  seoImpact: string;
  target: {
    pageId: string;
    sectionId: string | null;
  };
}

interface DashboardSummary {
  recentLogs: OperatorLogEntry[];
  summaryCards: Array<{ label: string; value: string }>;
}

const operatorTabs = [
  { id: 'runtime', label: 'Runtime' },
  { id: 'operator', label: 'AI Operator' },
] as const;

export const OperatorDashboardPage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<(typeof operatorTabs)[number]['id']>('runtime');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [command, setCommand] = useState('');
  const [proposal, setProposal] = useState<OperatorProposal | null>(null);
  const [logs, setLogs] = useState<OperatorLogEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const loadDashboard = async (): Promise<void> => {
      try {
        const [sessionResponse, summaryResponse] = await Promise.all([
          fetch('/api/admin/session', { credentials: 'include' }),
          fetch('/api/admin/summary', { credentials: 'include' }),
        ]);

        if (!sessionResponse.ok || !summaryResponse.ok) {
          setIsAuthenticated(false);
          return;
        }

        const summaryData = (await summaryResponse.json()) as DashboardSummary;
        setIsAuthenticated(true);
        setSummary(summaryData);
        setLogs(summaryData.recentLogs);
      } finally {
        setIsLoading(false);
      }
    };

    void loadDashboard();
  }, []);

  const isVoiceSupported = useMemo(
    () => typeof window !== 'undefined' && Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
    [],
  );

  const handleVoiceCapture = (): void => {
    const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!Recognition) {
      setErrorMessage('Voice input is not supported in this browser.');
      return;
    }

    setErrorMessage('');
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? '';
      setCommand(transcript);
    };
    recognition.onerror = () => {
      setErrorMessage('Voice input could not be captured. Try typing the request instead.');
    };
    recognition.start();
  };

  const handleSubmitCommand = async (): Promise<void> => {
    setErrorMessage('');

    try {
      const response = await fetch('/api/operator/command', {
        body: JSON.stringify({ message: command, mode: 'text' }),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('The operator command could not be processed.');
      }

      const data = (await response.json()) as { logs: OperatorLogEntry[]; proposal: OperatorProposal };
      setProposal(data.proposal);
      setLogs(data.logs);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'The operator command failed.');
    }
  };

  if (isLoading) {
    return <div className="operator-loading">Loading operator workspace...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate replace to=".." />;
  }

  return (
    <>
      <SeoHead
        description="Protected Camp Dream GA operator workspace."
        noIndex
        path="/operator-dashboard"
        title="Operator dashboard"
      />
      <section className="operator-dashboard">
        <div className="operator-header">
          <div>
            <p className="eyebrow">Protected runtime and operator tools</p>
            <h1>Camp Dream GA system manager</h1>
          </div>
          <div className="operator-tab-list">
            {operatorTabs.map((tab) => (
              <button
                className={activeTab === tab.id ? 'operator-tab operator-tab-active' : 'operator-tab'}
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'runtime' ? (
          <>
            <div className="operator-card-grid">
              {summary?.summaryCards.map((card) => (
                <article className="panel" key={card.label}>
                  <p className="eyebrow">{card.label}</p>
                  <strong className="operator-card-value">{card.value}</strong>
                </article>
              ))}
            </div>
            <div className="panel">
              <p className="eyebrow">Runtime status</p>
              <h2>What the hidden operator surface is responsible for</h2>
              <ul className="check-list">
                <li>Signed session validation for admin routes and protected API access</li>
                <li>Inquiry intake, checkout-path configuration, and launch-readiness monitoring</li>
                <li>AI operator previews for content, pricing, SEO, and campaign changes</li>
              </ul>
            </div>
          </>
        ) : (
          <div className="operator-grid">
            <div className="panel">
              <p className="eyebrow">Voice or text command</p>
              <h2>Preview a safe website change before anything is published</h2>
              <textarea
                onChange={(event) => setCommand(event.target.value)}
                placeholder="Example: change the homepage headline to highlight summer family weekends in North Georgia."
                rows={6}
                value={command}
              />
              <div className="hero-actions">
                <button className="button" onClick={() => void handleSubmitCommand()} type="button">
                  Generate proposal
                </button>
                <button
                  className="button button-secondary"
                  disabled={!isVoiceSupported}
                  onClick={handleVoiceCapture}
                  type="button"
                >
                  {isVoiceSupported ? 'Use voice input' : 'Voice unavailable'}
                </button>
              </div>
              {errorMessage ? <p className="form-error">{errorMessage}</p> : null}
            </div>

            <div className="panel">
              <p className="eyebrow">Structured proposal</p>
              {proposal ? (
                <div className="operator-proposal">
                  <h3>{proposal.intent}</h3>
                  <p>{proposal.rationale}</p>
                  <ul className="check-list">
                    <li>
                      <strong>SEO:</strong> {proposal.seoImpact}
                    </li>
                    <li>
                      <strong>Conversion:</strong> {proposal.conversionImpact}
                    </li>
                    <li>
                      <strong>Analytics:</strong> {proposal.analyticsImpact}
                    </li>
                    <li>
                      <strong>Risk:</strong> {proposal.riskLevel}
                    </li>
                  </ul>
                  <pre className="operator-json">
                    {JSON.stringify(
                      {
                        patchPayload: proposal.patchPayload,
                        proposedChanges: proposal.proposedChanges,
                        requiresApproval: proposal.requiresApproval,
                        target: proposal.target,
                      },
                      null,
                      2,
                    )}
                  </pre>
                </div>
              ) : (
                <p>
                  Commands are parsed into a structured preview with a patch payload, risk level,
                  SEO note, analytics note, and explicit approval flag.
                </p>
              )}
            </div>

            <div className="panel operator-log-panel">
              <p className="eyebrow">Audit log</p>
              <h2>Recent operator activity</h2>
              <ul className="operator-log-list">
                {logs.map((entry) => (
                  <li key={entry.id}>
                    <strong>{entry.intent}</strong>
                    <span>{entry.message}</span>
                    <small>
                      {entry.riskLevel} risk · {entry.submittedAt}
                    </small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </section>
    </>
  );
};
