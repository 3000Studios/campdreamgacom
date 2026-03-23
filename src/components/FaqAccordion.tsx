import { useState } from 'react';

import { trackEvent } from '@/lib/analytics';
import type { FaqItem } from '@/types';

export const FaqAccordion = ({ items }: { items: FaqItem[] }): JSX.Element => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article className="faq-item" key={item.question}>
            <button
              aria-expanded={isOpen}
              className="faq-button"
              onClick={() => {
                setOpenIndex(isOpen ? null : index);
                trackEvent('faq_click', { question: item.question });
              }}
              type="button"
            >
              <span>{item.question}</span>
              <span>{isOpen ? '−' : '+'}</span>
            </button>
            {isOpen ? <p className="faq-answer">{item.answer}</p> : null}
          </article>
        );
      })}
    </div>
  );
};
