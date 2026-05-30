# DAST Assessment — OWASP ZAP Baseline against OWASP Juice Shop

> **What this is.** A real Dynamic Application Security Testing (DAST) run performed with **OWASP ZAP**
> against **OWASP Juice Shop** — the OWASP Foundation's *intentionally vulnerable* training
> application, which exists so engineers can practice scanning and triage on a legal, safe target.
> **No client or third-party systems were scanned.** This artifact demonstrates the workflow,
> tooling, and triage/remediation reasoning — the same shift-left checks I wire into my projects'
> CI/CD.
>
> **Tool:** OWASP ZAP `zap-baseline.py` (passive rules + spider), image `ghcr.io/zaproxy/zaproxy:stable`
> **Target:** `bkimminich/juice-shop` (Docker, 158 URLs crawled) · **Date:** 2026-05-30 (UTC)
> **Run result:** 0 FAIL · 59 passive rules PASS · alerts below.
> **Raw output (verbatim, in this folder):** [`zap.json`](./zap.json) · [`zap.html`](./zap.html) · [`zap.md`](./zap.md)
>
> Every count and finding name below is taken directly from `zap.json`. The baseline profile runs
> ZAP's **passive** rules plus a spider — it flags configuration/header weaknesses without firing
> active attack payloads, so it is safe to run in CI on every build.

---

## Results at a glance

The baseline scan raised **10 distinct alerts** across 158 crawled URLs:

| Risk | Count |
|------|------:|
| High | 0 |
| **Medium** | **2** |
| Low | 5 |
| Informational | 3 |
| **Total** | **10** |

## Medium-risk findings — triage & remediation

### 1. Content Security Policy (CSP) Header Not Set — CWE-693 · 5 instances
**Risk.** Without a `Content-Security-Policy` header the browser will load scripts/styles from any
origin, removing a key defense-in-depth layer against cross-site scripting (XSS) and data injection.
**Remediation.** Send a restrictive CSP, e.g.
`default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none'; base-uri 'self'`.
Roll out in `Content-Security-Policy-Report-Only` first, review violations, then enforce. I apply CSP
at the edge/middleware layer.

### 2. Cross-Domain Misconfiguration — CWE-264 · 5 instances
**Risk.** A permissive Cross-Origin Resource Sharing (CORS) response lets other origins read
responses, enabling cross-origin data theft when paired with credentialed requests.
**Remediation.** Replace any wildcard/over-broad `Access-Control-Allow-Origin` with an explicit
allow-list of trusted origins; never combine `Allow-Origin: *` with `Allow-Credentials: true`. (My
Internet Applications project hardened CORS for exactly this reason.)

## Low-risk findings (5)

| Finding | CWE | Instances |
|---------|-----|----------:|
| Cross-Origin-Embedder-Policy (COEP) Header Missing or Invalid | CWE-693 | 5 |
| Cross-Origin-Opener-Policy (COOP) Header Missing or Invalid | CWE-693 | 5 |
| Deprecated Feature Policy Header Set | CWE-16 | 5 |
| Timestamp Disclosure – Unix | CWE-497 | 5 |
| Dangerous JS Functions | CWE-749 | 1 |

**General remediation.** Add the cross-origin isolation headers (`Cross-Origin-Embedder-Policy`,
`Cross-Origin-Opener-Policy`); replace the deprecated `Feature-Policy` header with
`Permissions-Policy`; avoid leaking server-side Unix timestamps in responses; and review/justify any
use of dangerous sink functions (e.g. `eval`-class calls) flagged in client JS, preferring safe
DOM APIs.

## Informational findings (3)

| Finding | CWE | Instances |
|---------|-----|----------:|
| Storable but Non-Cacheable Content | CWE-524 | 5 |
| Modern Web Application | — | 5 |
| Storable and Cacheable Content | CWE-524 | 1 |

**Notes.** "Modern Web Application" is an informational fingerprint (SPA detected), not a defect.
The cache items are advisory: set `Cache-Control: no-store` on any response that could carry
sensitive data. The complete, authoritative list with exact URLs, parameters, and evidence is in the
attached [`zap.html`](./zap.html) and [`zap.json`](./zap.json).

## How this maps to my own engineering

The same classes of check run automatically, shift-left, in my private projects' CI/CD:

- **OWASP ZAP baseline** — DAST on deployed previews (this report demonstrates the technique).
- **Semgrep** — Static Application Security Testing (SAST) on every pull request.
- **gitleaks** — secret scanning.
- **CycloneDX SBOM + dependency CVE auditing** — supply-chain visibility.

Header/CSP/CORS hardening of the kind recommended here is applied at the edge/middleware layer. See
the companion [STRIDE threat model](../threat-models/BrightPath-STRIDE-threat-model.md) for the
design-level controls (JWT-derived tenant scope, PostgreSQL Row-Level Security, append-only audit
log, HMAC-verified webhooks).

---
*Methodology: OWASP ZAP baseline scan (passive rules + spider) against OWASP Juice Shop in Docker.
Target is the OWASP Foundation's deliberately-vulnerable reference app; no third-party or client
systems were tested. Counts and finding names are taken verbatim from the ZAP JSON output included
in this directory (0 High, 2 Medium, 5 Low, 3 Informational; 59 passive-rule PASSes, 0 failures).*
