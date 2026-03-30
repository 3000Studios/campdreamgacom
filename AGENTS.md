# Sandbox Rules And Publish Flow

## Sandbox Scope

- This repository is a sandbox redesign and idea space.
- Do not attempt to log in to, edit, publish to, or gain internal access to `campdreamga.org`.
- The official Camp Dream site may be used only as a public visual reference for brand cues such as colors, copy tone, and layout ideas.
- All work in this repo must stay clearly marked as demo or sandbox work.

## Release Flow

1. Work from the local `main` branch unless the user explicitly asks for a branch-based review flow.
2. Stage only the intended files because this repo often has unrelated local edits in the worktree.
3. Run the core checks before publishing:

```bash
npm run lint
npm run typecheck
npm run test -- server/app.test.ts
```

4. Commit with a focused message:

```bash
git commit --no-verify -m "<short message>"
```

Note: `--no-verify` is currently needed in this checkout because `.husky/pre-commit` is broken.

5. Push `main`. If normal `git push` prompts for GitHub credentials inside WSL, use the Windows GitHub CLI token already available on this machine:

```bash
TOKEN=$(gh.exe auth token -u 3000Studios) && \
git push "https://x-access-token:${TOKEN}@github.com/3000Studios/campdreamgacom.git" main
```

6. Confirm that `main` moved:

```bash
git ls-remote origin refs/heads/main
```

7. Inspect the GitHub Actions runs with the Windows CLI. This repo may inherit a bad `GH_TOKEN` value, so clear it inline when checking runs:

```bash
cmd.exe /c "set GH_TOKEN=& gh run list -L 5 --json databaseId,workflowName,headSha,status,conclusion,url"
```

8. The intended publish path is:
   - push to `main`
   - GitHub Actions `CI` runs
   - GitHub Actions `Deploy Pages` runs
   - Cloudflare Pages deploys the `dist` output

## Current Reality Check

- A push to `main` does trigger both `CI` and `Deploy Pages`.
- If those workflows fail, treat that as a repo or workflow issue to inspect before telling the user the sandbox is live.
- Always report the exact run URL back to the user when a publish attempt fails.
