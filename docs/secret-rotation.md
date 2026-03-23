# Secret Rotation Required

The repo does not contain live secrets, but credentials pasted into chat or shared outside a secure secrets manager must be treated as compromised.

## Rotate Immediately

- OpenAI API keys
- Cloudflare API tokens
- Cloudflare zone and account scoped credentials
- GitHub personal access tokens and bot tokens
- PayPal client secrets and client IDs where possible
- Gemini API keys
- Any webhook URLs that embed secret query parameters
- Any global or blueprint-style service keys tied to deployments

## Why This Matters

- Chat transcripts and pasted text are not an approved secret store
- Anyone with access to the transcript may have seen those values
- Reusing compromised values in code or deployment tooling creates a preventable production risk

## Safe Follow-Up

1. Rotate every affected credential in the provider dashboard.
2. Update only the environment variable values in your hosting platforms.
3. Confirm old tokens are revoked.
4. Never place the replacement values in repo files or documentation.

## Repository Policy

- `.env.example` and `.dev.vars.example` contain placeholders only
- `wrangler.toml` contains no live secrets
- The operator scaffold intentionally expects env-based API credentials only
