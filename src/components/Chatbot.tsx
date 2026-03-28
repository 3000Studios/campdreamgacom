import { useRef, useState } from 'react';

interface ChatMessage {
  id: number;
  sender: 'bot' | 'user';
  text: string;
}

const botResponses: Record<string, string> = {
  default:
    'Thank you for reaching out! A Camp Dream team member will get back to you soon. You can also call us at 678-367-0040 or email hello@campdreamga.com.',
  camp: 'Camp Dream Summer Camp is held at the Calvin Center in Hampton, GA. Sessions are in July and registration is open! Visit our Summer Camp page for details.',
  volunteer:
    'We love volunteers! Counselors must be 18+ and pass a background check. Visit our Volunteer page to apply.',
  donate:
    'Every donation supports camper scholarships and programs. Visit our Donate page to contribute. Camp Dream Foundation is a 501(c)(3), EIN 58-1444915.',
  cost: 'The program cost is $800, but families are asked to pay what they can. Scholarships are available through donor support.',
  contact:
    'You can reach Camp Dream at 678-367-0040 or email hello@campdreamga.com. Inquiries are accepted year-round.',
};

const findResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes('camp') || lower.includes('summer') || lower.includes('session'))
    return botResponses.camp;
  if (lower.includes('volunteer') || lower.includes('counselor')) return botResponses.volunteer;
  if (lower.includes('donat') || lower.includes('sponsor') || lower.includes('give'))
    return botResponses.donate;
  if (
    lower.includes('cost') ||
    lower.includes('price') ||
    lower.includes('fee') ||
    lower.includes('pay')
  )
    return botResponses.cost;
  if (
    lower.includes('contact') ||
    lower.includes('phone') ||
    lower.includes('email') ||
    lower.includes('call')
  )
    return botResponses.contact;
  return botResponses.default;
};

export const Chatbot = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi! Welcome to Camp Dream Georgia. How can I help you today?',
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (): void => {
    if (!input.trim()) return;
    const userMsg: ChatMessage = { id: Date.now(), sender: 'user', text: input.trim() };
    const botMsg: ChatMessage = {
      id: Date.now() + 1,
      sender: 'bot',
      text: findResponse(input),
    };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  return (
    <>
      <button
        aria-label="Open chat"
        className="chatbot-toggle"
        onClick={() => setIsOpen((o) => !o)}
        type="button"
      >
        {isOpen ? '✕' : '💬'}
      </button>
      {isOpen ? (
        <div className="chatbot-panel">
          <div className="chatbot-header">
            <h3>Camp Dream Chat</h3>
            <button
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: '#fff',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
              type="button"
            >
              ✕
            </button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                className={`chat-msg ${msg.sender === 'bot' ? 'chat-msg-bot' : 'chat-msg-user'}`}
                key={msg.id}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input-row">
            <input
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about camp, volunteering, or donations..."
              type="text"
              value={input}
            />
            <button onClick={handleSend} type="button">
              Send
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};
