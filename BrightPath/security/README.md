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

The Juice Shop baseline recorded ten alerts across 158 crawled URLs: two medium, five low and three informational. It used a spider and passive rules. I investigated CSP, CORS and cross-origin isolation findings and documented proposed mitigations. The exercise covers finding triage and remediation planning.

The threat model maps design controls and their dependencies. I identify deployment settings, identity-provider configuration, endpoint coverage and operational processes that need follow-up checks. Short token lifetimes do not prevent phishing, and protecting sensitive data in structured logs requires review of the fields and log sinks.

Client CI configurations, literal policies, proprietary test fixtures and private run artifacts remain confidential. The patterns explain how I use SAST, secret/dependency checks, SBOM generation and focused tests through abstract examples.

[← BrightPath case](../README.md) · [All case studies](../../README.md)
