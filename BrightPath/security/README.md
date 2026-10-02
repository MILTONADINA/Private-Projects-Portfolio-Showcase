# Application Security Evidence

My security work combines application design, implementation boundaries and practical assessment. These materials separate an abstract client-design discussion from a local training-lab result.

## What is available

| Material | What it demonstrates | Scope |
|---|---|---|
| [STRIDE threat model and data-flow diagram](./threat-models/BrightPath-STRIDE-threat-model.md) | Threat identification, trust boundaries and control/verification mapping. | Abstract school-platform design; no client schema, source, records or operational configuration. |
| [Application security patterns](./patterns.md) | Authorization, database privileges, validation, retries, privacy controls and security automation. | Explanations of engineering decisions, without copied private implementation. |
| [OWASP Juice Shop assessment](./scans/OWASP-JuiceShop-ZAP-assessment.md) | Passive scan interpretation, triage and proposed mitigations. | Authorized local Docker training target, May 30, 2026. |
| [Raw ZAP JSON](./scans/zap.json), [HTML](./scans/zap.html) and [Markdown](./scans/zap.md) | Original scanner output supporting the lab assessment. | Juice Shop evidence only; no client or third-party scan. |

## Reading the results

The Juice Shop baseline recorded ten alerts across 158 crawled URLs: two medium, five low and three informational. It used a spider and passive rules. The report discusses CSP, CORS and cross-origin isolation; proposed mitigations are not represented as deployed fixes or a clean rescan.

The threat model is a design artifact. Where a control depends on deployment settings, identity-provider configuration, endpoint coverage or an operational process, the table identifies that boundary rather than treating it as already verified. Short token lifetimes do not prevent phishing, and structured logs require field and sink review before claiming sensitive-data exclusion.

Client CI configurations, literal policies, proprietary test fixtures and private run artifacts are not published here. The patterns describe how I use SAST, secret/dependency checks, SBOM generation and focused tests without presenting client implementation as public sample code.

[← BrightPath case](../README.md) · [All case studies](../../README.md)
