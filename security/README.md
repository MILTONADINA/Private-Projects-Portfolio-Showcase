# Security Engineering Artifacts

Hands-on application-security work — threat modeling and DAST — by **Milton Adina Shisia**.
These are sanitized, real artifacts: a design-level threat model of production architecture, and a
real dynamic scan performed against a legal, intentionally-vulnerable training target. **No client
data, secrets, or proprietary source code appear here.**

## Contents

### 🧭 Threat modeling
- **[BrightPath — STRIDE Threat Model & Data-Flow Diagram](./threat-models/BrightPath-STRIDE-threat-model.md)**
  A full STRIDE analysis (Spoofing, Tampering, Repudiation, Information disclosure, Denial of
  service, Elevation of privilege) over a data-flow diagram with explicit trust boundaries, mapping
  each threat to the control actually implemented — JWT-derived server-side tenant scope, PostgreSQL
  Row-Level Security (1,063 policies across 403 tables), an append-only audit log proven by an
  immutability test, and HMAC-verified payment webhooks.

### 🔎 Dynamic Application Security Testing (DAST)
- **[OWASP ZAP Baseline — OWASP Juice Shop assessment](./scans/OWASP-JuiceShop-ZAP-assessment.md)**
  A real OWASP ZAP baseline scan against OWASP Juice Shop (the Foundation's deliberately-vulnerable
  app): **0 High / 2 Medium / 5 Low / 3 Informational; 59 passive-rule passes, 0 failures**, with
  triage and remediation for the Medium findings (CSP, CORS). Raw machine-readable output:
  [`scans/zap.json`](./scans/zap.json) · full report: [`scans/zap.html`](./scans/zap.html).

## Why these are here
Most of my production work is under private client NDAs, so the source isn't public. These artifacts
let a reviewer verify the *security reasoning and tooling* directly — threat-modeling methodology and
a real scan→triage→remediate loop — independent of any private repository. The same checks (ZAP,
Semgrep, gitleaks, CycloneDX SBOM, dependency CVE auditing) run shift-left in my projects' CI/CD.
