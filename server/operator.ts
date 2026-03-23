import { randomUUID } from 'node:crypto';

import { z } from 'zod';

export const operatorCommandSchema = z.object({
  message: z.string().min(6).max(500),
  mode: z.enum(['text', 'voice']).default('text'),
});

export interface OperatorProposal {
  analyticsImpact: string;
  conversionImpact: string;
  intent: string;
  patchPayload: Record<string, unknown>;
  proposedChanges: Record<string, unknown>;
  rationale: string;
  requiresApproval: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  seoImpact: string;
  target: {
    pageId: string;
    sectionId: string | null;
  };
}

export interface OperatorLogEntry {
  id: string;
  intent: string;
  message: string;
  riskLevel: OperatorProposal['riskLevel'];
  submittedAt: string;
}

export const buildOperatorProposal = (message: string): OperatorProposal => {
  const normalized = message.toLowerCase();

  if (normalized.includes('headline') || normalized.includes('hero')) {
    return {
      analyticsImpact: 'Track updated hero CTA copy against the existing hero click event.',
      conversionImpact: 'Likely to improve first-click clarity if the new headline sharpens the value proposition.',
      intent: 'update_page_copy',
      patchPayload: {
        pageId: 'home',
        sectionId: 'hero',
      },
      proposedChanges: {
        message,
        operation: 'replace_text',
      },
      rationale: 'The request targets visible homepage messaging, so the safest path is a hero-copy proposal.',
      requiresApproval: true,
      riskLevel: 'medium',
      seoImpact: 'Low SEO risk if the H1 remains aligned with camp and booking intent.',
      target: {
        pageId: 'home',
        sectionId: 'hero',
      },
    };
  }

  if (normalized.includes('pricing') || normalized.includes('price')) {
    return {
      analyticsImpact: 'Preserve pricing plan selection events and compare conversion before publishing.',
      conversionImpact: 'High potential impact because pricing changes directly affect qualification and checkout behavior.',
      intent: 'update_pricing_plan',
      patchPayload: {
        pageId: 'pricing',
        sectionId: 'pricing-grid',
      },
      proposedChanges: {
        message,
        operation: 'pricing_update',
      },
      rationale: 'Pricing changes should stay isolated to the pricing model and always require approval.',
      requiresApproval: true,
      riskLevel: 'high',
      seoImpact: 'Minimal SEO impact unless pricing copy changes core offer messaging.',
      target: {
        pageId: 'pricing',
        sectionId: 'pricing-grid',
      },
    };
  }

  if (normalized.includes('testimonial')) {
    return {
      analyticsImpact: 'No additional event work required unless the testimonial block changes position.',
      conversionImpact: 'Useful social-proof boost with low operational risk.',
      intent: 'add_testimonial',
      patchPayload: {
        pageId: 'home',
        sectionId: 'social-proof',
      },
      proposedChanges: {
        message,
        operation: 'append_testimonial',
      },
      rationale: 'Testimonial requests can be staged safely as content append operations.',
      requiresApproval: true,
      riskLevel: 'low',
      seoImpact: 'Neutral for SEO and mildly positive for trust signals.',
      target: {
        pageId: 'home',
        sectionId: 'social-proof',
      },
    };
  }

  if (normalized.includes('turn off ads') || normalized.includes('disable ads')) {
    return {
      analyticsImpact: 'Ad impression changes will reduce advertising events on the targeted page template.',
      conversionImpact: 'Potentially positive if the page becomes more product-focused.',
      intent: 'toggle_ads',
      patchPayload: {
        pageId: normalized.includes('resource') ? 'resource-template' : 'page-specific',
        sectionId: null,
      },
      proposedChanges: {
        enabled: false,
        message,
        operation: 'toggle_ads',
      },
      rationale: 'Ad changes affect monetization and compliance, so they should always be explicit and reviewable.',
      requiresApproval: true,
      riskLevel: 'medium',
      seoImpact: 'Neutral for SEO with possible UX gains.',
      target: {
        pageId: normalized.includes('resource') ? 'resources' : 'specific-page',
        sectionId: null,
      },
    };
  }

  return {
    analyticsImpact: 'Review whether new CTA, copy, or metadata changes need custom event annotations.',
    conversionImpact: 'Moderate potential depending on where the requested update lands in the funnel.',
    intent: 'update_page_copy',
    patchPayload: {
      pageId: 'manual-review',
      sectionId: null,
    },
    proposedChanges: {
      message,
      operation: 'manual_content_review',
    },
    rationale: 'The request was mapped to a generic content change so it can be reviewed safely before publishing.',
    requiresApproval: true,
    riskLevel: 'medium',
    seoImpact: 'Review meta alignment and heading structure before publishing.',
    target: {
      pageId: 'manual-review',
      sectionId: null,
    },
  };
};

export const buildOperatorLogEntry = (
  message: string,
  proposal: OperatorProposal,
): OperatorLogEntry => ({
  id: randomUUID(),
  intent: proposal.intent,
  message,
  riskLevel: proposal.riskLevel,
  submittedAt: new Date().toISOString(),
});
