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

interface TeamMember {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline';
}

interface ChatMsg {
  id: number;
  sender: string;
  text: string;
  time: string;
}

interface CalendarEvent {
  date: number;
  title: string;
}

interface ClientRecord {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'pending';
  joinedDate: string;
}

const adminTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'messaging', label: 'Messages' },
  { id: 'video', label: 'Video Meeting' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'clients', label: 'Clients' },
  { id: 'blog', label: 'Blog' },
  { id: 'operator', label: 'AI Operator' },
] as const;

type AdminTab = (typeof adminTabs)[number]['id'];

const teamMembers: TeamMember[] = [
  { id: '1', name: 'Jennifer Swain', role: 'Executive Director', status: 'online' },
  { id: '2', name: 'Marcus Thompson', role: 'Camp Director', status: 'online' },
  { id: '3', name: 'Sarah Mitchell', role: 'Volunteer Coordinator', status: 'offline' },
  { id: '4', name: 'David Chen', role: 'Fundraising Lead', status: 'online' },
  { id: '5', name: 'Emily Rodriguez', role: 'Board Member', status: 'offline' },
];

const sampleChats: Record<string, ChatMsg[]> = {
  '1': [
    {
      id: 1,
      sender: 'Jennifer Swain',
      text: 'Has the summer camp schedule been finalized?',
      time: '9:15 AM',
    },
    { id: 2, sender: 'You', text: 'Yes, sessions run July 7-10 and July 14-17.', time: '9:20 AM' },
    { id: 3, sender: 'Jennifer Swain', text: 'Perfect. Lets update the website.', time: '9:22 AM' },
  ],
  '2': [
    {
      id: 1,
      sender: 'Marcus Thompson',
      text: 'We have 12 new counselor applications this week.',
      time: '10:30 AM',
    },
    {
      id: 2,
      sender: 'You',
      text: 'Great! I will start processing background checks.',
      time: '10:45 AM',
    },
  ],
};

const calendarEvents: CalendarEvent[] = [
  { date: 5, title: 'Board Meeting' },
  { date: 12, title: 'Fundraiser Prep' },
  { date: 18, title: 'Volunteer Training' },
  { date: 25, title: 'Camp Inspection' },
];

const clientRecords: ClientRecord[] = [
  { id: 'C001', name: 'Ashley Payne', type: 'Camper', status: 'active', joinedDate: '2024-03-15' },
  {
    id: 'C002',
    name: 'Bryson Higgins',
    type: 'Counselor',
    status: 'active',
    joinedDate: '2023-06-01',
  },
  {
    id: 'C003',
    name: 'Williams Family',
    type: 'Donor',
    status: 'active',
    joinedDate: '2025-01-10',
  },
  {
    id: 'C004',
    name: 'First Baptist Church',
    type: 'Sponsor',
    status: 'active',
    joinedDate: '2024-08-22',
  },
  { id: 'C005', name: 'Jordan Lee', type: 'Camper', status: 'pending', joinedDate: '2026-02-28' },
  {
    id: 'C006',
    name: 'Taylor Morgan',
    type: 'Counselor',
    status: 'pending',
    joinedDate: '2026-03-10',
  },
];

export const OperatorDashboardPage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [command, setCommand] = useState('');
  const [proposal, setProposal] = useState<OperatorProposal | null>(null);
  const [logs, setLogs] = useState<OperatorLogEntry[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const [selectedContact, setSelectedContact] = useState<string>('1');
  const [chatMessages, setChatMessages] = useState<Record<string, ChatMsg[]>>(sampleChats);
  const [messageInput, setMessageInput] = useState('');

  const [isInMeeting, setIsInMeeting] = useState(false);

  const [blogTitle, setBlogTitle] = useState('');
  const [blogContent, setBlogContent] = useState('');
  const [blogCategory, setBlogCategory] = useState('');

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
    () =>
      typeof window !== 'undefined' &&
      Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
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
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });
      if (!response.ok) throw new Error('The operator command could not be processed.');
      const data = (await response.json()) as {
        logs: OperatorLogEntry[];
        proposal: OperatorProposal;
      };
      setProposal(data.proposal);
      setLogs(data.logs);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'The operator command failed.');
    }
  };

  const handleSendMessage = (): void => {
    if (!messageInput.trim()) return;
    const newMsg: ChatMsg = {
      id: Date.now(),
      sender: 'You',
      text: messageInput.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages((prev) => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] ?? []), newMsg],
    }));
    setMessageInput('');
  };

  const today = new Date();
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  const firstDayOfWeek = new Date(today.getFullYear(), today.getMonth(), 1).getDay();

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
        </div>

        <div className="admin-tab-list">
          {adminTabs.map((tab) => (
            <button
              className={activeTab === tab.id ? 'admin-tab admin-tab-active' : 'admin-tab'}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              type="button"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="admin-stats-grid">
              <article className="panel admin-stat-card">
                <span className="admin-stat-value">$47,250</span>
                <span className="admin-stat-label">Total Revenue</span>
              </article>
              <article className="panel admin-stat-card">
                <span className="admin-stat-value">156</span>
                <span className="admin-stat-label">Active Members</span>
              </article>
              <article className="panel admin-stat-card">
                <span className="admin-stat-value">$12,800</span>
                <span className="admin-stat-label">Contributions</span>
              </article>
              <article className="panel admin-stat-card">
                <span className="admin-stat-value">42</span>
                <span className="admin-stat-label">Volunteers</span>
              </article>
            </div>

            <div className="operator-card-grid">
              {summary?.summaryCards.map((card) => (
                <article className="panel" key={card.label} style={{ padding: '1.35rem' }}>
                  <p className="eyebrow">{card.label}</p>
                  <strong className="operator-card-value">{card.value}</strong>
                </article>
              ))}
            </div>

            <div className="panel" style={{ padding: '1.35rem' }}>
              <p className="eyebrow">Runtime status</p>
              <h2>What the hidden operator surface is responsible for</h2>
              <ul className="check-list">
                <li>Signed session validation for admin routes and protected API access</li>
                <li>
                  Inquiry intake, checkout-path configuration, and launch-readiness monitoring
                </li>
                <li>AI operator previews for content, pricing, SEO, and campaign changes</li>
              </ul>
            </div>
          </>
        )}

        {activeTab === 'messaging' && (
          <div className="panel admin-messaging">
            <ul className="admin-contacts-list">
              {teamMembers.map((member) => (
                <li
                  className={`admin-contact-item ${selectedContact === member.id ? 'admin-contact-item-active' : ''}`}
                  key={member.id}
                  onClick={() => setSelectedContact(member.id)}
                >
                  <span className="admin-contact-name">
                    {member.name}{' '}
                    <span
                      style={{
                        color: member.status === 'online' ? 'var(--evergreen)' : 'var(--copy-soft)',
                        fontSize: '0.7rem',
                      }}
                    >
                      ●
                    </span>
                  </span>
                  <span className="admin-contact-role">{member.role}</span>
                </li>
              ))}
            </ul>
            <div className="admin-chat-area">
              <div className="admin-chat-messages">
                {(chatMessages[selectedContact] ?? []).map((msg) => (
                  <div
                    className={`chat-msg ${msg.sender === 'You' ? 'chat-msg-user' : 'chat-msg-bot'}`}
                    key={msg.id}
                  >
                    <strong style={{ fontSize: '0.82rem' }}>{msg.sender}</strong> · {msg.time}
                    <br />
                    {msg.text}
                  </div>
                ))}
              </div>
              <div className="admin-chat-input">
                <input
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="Type a message..."
                  type="text"
                  value={messageInput}
                />
                <button onClick={handleSendMessage} type="button">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'video' && (
          <div className="panel admin-video-section">
            <p className="eyebrow">Video Conference</p>
            <h2>Team Meeting Room</h2>
            <p>Start or join a video meeting with Camp Dream board members and staff.</p>
            {isInMeeting ? (
              <>
                <div className="admin-video-grid">
                  {teamMembers
                    .filter((m) => m.status === 'online')
                    .map((member) => (
                      <div className="admin-video-participant" key={member.id}>
                        <span>
                          {member.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </span>
                      </div>
                    ))}
                  <div
                    className="admin-video-participant"
                    style={{ background: 'var(--evergreen)' }}
                  >
                    <span>You</span>
                  </div>
                </div>
                <div
                  style={{
                    marginTop: '1.5rem',
                    display: 'flex',
                    gap: '0.8rem',
                    justifyContent: 'center',
                  }}
                >
                  <button className="button" onClick={() => setIsInMeeting(false)} type="button">
                    End Meeting
                  </button>
                </div>
              </>
            ) : (
              <div style={{ marginTop: '1.5rem' }}>
                <button className="button" onClick={() => setIsInMeeting(true)} type="button">
                  Start Video Meeting
                </button>
                <p style={{ marginTop: '1rem', fontSize: '0.9rem', color: 'var(--copy-soft)' }}>
                  {teamMembers.filter((m) => m.status === 'online').length} team members online
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="panel admin-calendar" style={{ padding: '1.5rem' }}>
            <div className="admin-calendar-header">
              <h2>
                {today.toLocaleString('default', { month: 'long' })} {today.getFullYear()}
              </h2>
              <p className="eyebrow">Schedule</p>
            </div>
            <div className="admin-calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div className="admin-calendar-day-name" key={day}>
                  {day}
                </div>
              ))}
              {Array.from({ length: firstDayOfWeek }, (_, i) => (
                <div className="admin-calendar-cell" key={`empty-${String(i)}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const isToday = day === today.getDate();
                const hasEvent = calendarEvents.some((e) => e.date === day);
                return (
                  <div
                    className={`admin-calendar-cell ${isToday ? 'admin-calendar-today' : ''} ${hasEvent ? 'admin-calendar-event' : ''}`}
                    key={day}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <h3>Upcoming Events</h3>
              <ul className="check-list">
                {calendarEvents.map((event) => (
                  <li key={event.title}>
                    <strong>
                      {today.toLocaleString('default', { month: 'short' })} {event.date}:
                    </strong>{' '}
                    {event.title}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'clients' && (
          <div className="panel" style={{ padding: '1.5rem' }}>
            <p className="eyebrow">Client Management</p>
            <h2>Campers, Counselors, Donors & Sponsors</h2>
            <div style={{ overflowX: 'auto', marginTop: '1rem' }}>
              <table className="admin-clients-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {clientRecords.map((client) => (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.name}</td>
                      <td>{client.type}</td>
                      <td>
                        <span
                          className={`admin-status-badge ${client.status === 'active' ? 'admin-status-active' : 'admin-status-pending'}`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td>{client.joinedDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div className="panel" style={{ padding: '1.5rem' }}>
            <p className="eyebrow">Blog Management</p>
            <h2>Create a New Blog Post</h2>
            <div className="admin-blog-editor">
              <input
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Post title"
                type="text"
                value={blogTitle}
              />
              <input
                onChange={(e) => setBlogCategory(e.target.value)}
                placeholder="Category (e.g. Announcements, Stories, Events)"
                type="text"
                value={blogCategory}
              />
              <textarea
                onChange={(e) => setBlogContent(e.target.value)}
                placeholder="Write your blog post content..."
                value={blogContent}
              />
              <button
                className="button"
                onClick={() => {
                  if (blogTitle && blogContent) {
                    setBlogTitle('');
                    setBlogContent('');
                    setBlogCategory('');
                  }
                }}
                type="button"
              >
                Publish Post
              </button>
            </div>
          </div>
        )}

        {activeTab === 'operator' && (
          <div className="operator-grid">
            <div className="panel" style={{ padding: '1.35rem' }}>
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

            <div className="panel" style={{ padding: '1.35rem' }}>
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
