<div align="center">

# Security Evidence

**Sanitized excerpts of real CI workflows from private projects.**

</div>

---

## Why this folder exists

The [Security Patterns](../Security-Patterns) page documents *what* security controls are in place across the projects in this showcase. This folder documents *the evidence that those controls run* — sanitized excerpts of the actual GitHub Actions workflows that gate every push and pull request in the source repositories.

**Sanitization rules used in this folder:**

- All repository names, owner usernames, full file paths, and internal project URLs replaced with neutral placeholders.
- Workflow names normalized; the comments giving context to engineering decisions are preserved because that context is the whole point of evidence.
- No `secrets.*` values or API tokens are present in the source workflows (those live only in GitHub Actions Secrets) — nothing to redact.

---

## Index

| File                                                                       | Source project | Tool                       | Purpose                                                     |
| -------------------------------------------------------------------------- | -------------- | -------------------------- | ----------------------------------------------------------- |
| [`semgrep-config.yml`](./semgrep-config.yml)                               | Flourish       | Semgrep OSS                | SAST — OWASP Top 10, Node.js, secrets, project-specific rules |
| [`gitleaks-config.yml`](./gitleaks-config.yml)                             | Flourish       | gitleaks-action@v2         | Secret leakage scanning on PR, push, and daily cron         |
| [`sbom-workflow.yml`](./sbom-workflow.yml)                                 | Flourish       | CycloneDX (`cdxgen`)       | Software Bill of Materials generation and commit            |
| [`dependency-audit-workflow.yml`](./dependency-audit-workflow.yml)         | Flourish       | pnpm audit + Trivy         | Two-layer vulnerable-dependency detection                   |
| [`playwright-csp-example.spec.ts`](./playwright-csp-example.spec.ts)       | SchoolGrid     | Playwright                 | E2E test enforcing the Content Security Policy in production builds |
| [`playwright-a11y-example.spec.ts`](./playwright-a11y-example.spec.ts)     | SchoolGrid     | `@axe-core/playwright`     | WCAG accessibility audit run in CI on every PR              |

---

## Methodology

Each workflow file in this folder is a transcription of the real workflow at the corresponding source repository, with the following transformations:

1. **Names normalized.** The `name:` header is changed to a neutral description; project-specific job names are kept because they describe what the job does.
2. **Paths replaced.** Repo-relative paths to private documentation (`docs/00-project/decision-log.md#d-019`, etc.) are kept because they prove the workflow ties to a real decision-log entry; the workflows themselves are not reproducible from this folder without the underlying project — that's intentional.
3. **Comments preserved.** The "why" comments inline in the workflows (e.g., "Replaces the GHAS-gated CodeQL workflow per D-019 — Semgrep OSS rulesets cover the same ground without the $49/committer/month GitHub Advanced Security subscription.") are the whole evidence value.
4. **No secrets.** No `${{ secrets.* }}` values are ever in source-controlled workflow files; nothing to redact.
5. **Verifiable assertions.** If a workflow file claims a particular ruleset or schedule, the comment beside it states why — making the choice independently reviewable.

---

## Tool coverage summary

| Tool                       | Type         | When it runs                                 | What it catches                                                  |
| -------------------------- | ------------ | -------------------------------------------- | ---------------------------------------------------------------- |
| **Semgrep OSS**            | SAST         | Push, PR, weekly cron                        | OWASP Top 10, secrets, Node.js patterns, project-specific rules  |
| **gitleaks-action@v2**     | Secret scan  | Push, PR, daily cron                         | Hardcoded credentials in git history                             |
| **pnpm audit (`--prod`)**  | Dependencies | Push, PR, weekly cron                        | GitHub advisory CVEs in production dependencies                  |
| **Trivy (fs)**             | Dependencies | Push, PR, weekly cron                        | Broader CVE database + license scan                              |
| **CycloneDX cdxgen**       | SBOM         | Push to main when lockfile changes           | Software Bill of Materials regeneration + commit                 |
| **Playwright + axe-core**  | DAST (a11y)  | PR                                           | WCAG accessibility violations in browser                         |
| **Playwright (CSP)**       | DAST (CSP)   | PR                                           | Content Security Policy regressions                              |

---

<div align="center">

[← Back to Portfolio](../README.md)

</div>
