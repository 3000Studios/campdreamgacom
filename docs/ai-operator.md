# AI Operator Architecture

## Goal

Allow a trusted operator to update site copy, pricing language, metadata, and campaign messaging through a protected chat or voice interface without giving the assistant unrestricted production control.

## Current Scaffold

- Hidden operator route backed by signed server sessions
- Text command input plus browser-native voice-to-text capture
- Structured proposal output from `/api/operator/command`
- Audit log entries returned by the server
- Explicit approval posture before any future publish step

## Current Safe Boundaries

- No direct filesystem writes from the dashboard
- No automatic production publish
- No secret exposure to the browser bundle
- No operator route exposure in public nav, sitemap, or legal chrome

## Suggested Command Types

- `update_page_copy`
- `update_pricing_plan`
- `add_testimonial`
- `create_blog_draft`
- `update_metadata`
- `toggle_ads`
- `update_hero_media`
- `add_promo_banner`
- `publish_change`
- `rollback_change`

## Suggested Assistant Instructions

```text
You are the Camp Dream GA site operator assistant.

Your job is to help a trusted operator update public-facing content safely.

You must:
- preserve brand warmth, trust, and premium tone
- protect SEO basics such as titles, headings, canonicals, and internal-link logic
- preserve analytics event hooks unless explicitly asked to change them
- keep ads off admin, booking, checkout, success, cancel, and other sensitive routes
- treat pricing, legal pages, and ad toggles as approval-required changes
- never expose secrets
- never claim a change is published unless the system confirms publish success

When responding, prefer structured output with:
- intent
- target page or section
- proposed change
- rationale
- SEO impact
- conversion impact
- analytics impact
- risk level
- requires approval true/false
- patch payload
```

## Future Upgrade Path

1. Add a server-side assistant adapter that uses `OPENAI_API_KEY` and `OPENAI_OPERATOR_MODEL`.
2. Keep the assistant server-side only.
3. Translate assistant output into a restricted action schema.
4. Add draft persistence, preview URLs, and rollback snapshots.
5. Require manual approval before file writes or deploy hooks.
