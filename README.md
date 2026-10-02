# Engineering Case Studies

I'm **Milton Adina Shisia**, a software engineer working across client applications, mobile products and application security. These cases explain the problem, my contribution, implementation decisions and supporting evidence behind the work.

[Portfolio](https://miltonadina.github.io) · [GitHub](https://github.com/MILTONADINA) · [LinkedIn](https://www.linkedin.com/in/miltonadina) · miltonadina@gmail.com

## Client engagements

### [BrightPath: school operations and payments](./BrightPath)

**Full-Stack & Security Engineer · April 2025 to present · Private client source**

Schools need enrollment, grades, attendance, fees and parent communication to stay connected across web and mobile. As the primary engineer, I built tenant-aware API workflows, shared TypeScript/Dart contracts, payment-retry handling and transactional invoice reconciliation. The case also covers durable imports with row checkpoints, quota reservation before paid AI requests, department-bound assessment approval and scoped offline data.

**Stage:** Active development, with release gates still in place. October 1 focused backend checks passed 43 cases across quota, money, offline authorization and import outcomes; the case separates these from the historical 260-check record. [SchoolGrid](./BrightPath/SchoolGrid) and [Exam Analytics](./BrightPath/ExamAnalytics) document related offline administration tools.

### [Lumière: bilingual content management and checkout](./Lumiere)

**Full-Stack Developer · December 2025 to February 2026 · Private client source**

A digital agency needed English/Swahili content, staff-managed services and portfolio pages, and inquiry/order handling. I implemented the Next.js application, translation schema, CMS administration and validated Stripe checkout, with identity/membership checks in admin API handlers and rate limits on public submission handlers.

**Deliverables:** Localized pages, CMS workflows, order/checkout integration and content history. Nine offline sanitization/rate-limit checks passed on October 1, 2026: five existing checks and four focused boundary probes. The original five-check smoke image was first committed in February 2026 and remains a separate historical record; these checks do not verify live payments, email or CMS persistence.

### [Flourish: family milestones, consent and controlled reports](./Flourish)

**Full-Stack & Compliance Engineer · Private client source**

Parents need to record developmental observations and prepare information for a professional conversation. My work spans a versioned deterministic rules pipeline, encrypted observations and reasoning traces, private reports, provider-directory ingestion, application-role audit privileges and consent/deletion/data-request workflows.

**Stage:** Implementation includes reporting, provider ingestion, notifications, administration and data-request fulfillment; launch remains gated. The rules use synthetic development content, and billing activation is deferred. Forty-five focused rules/mapping tests passed on October 1; the separate May summary records 1,278 checks.

## Independent product

### [Light Routines: timed mobile sessions](./LightRoutines)

**Founder & Sole Engineer · December 2025 to present · Private product source**

I built the Flutter app, approved-user Firebase beta, session controller and recorded history. The closed beta began with real testers on June 29, 2026, followed by an Android internal release. Kotlin/Swift bridges and SQLite repositories are documented separately from the beta's Dart/Firestore session path. The beta turns output off before awaiting persistence, and access rules separate approved users from pending profiles. October 1 validation passed 71 selected Flutter tests and 44 access-rule tests against a local Firestore emulator; hardware execution remains outside that scope.

## Original open-source project

### [DevOPs: workflow and memory for coding agents](./DevOPs)

**Independent project · Systems Engineer · 2026 to present · MIT license**

I built multi-role planning/verification workflows, six kinds of typed memory, bounded session recall, source graphs and a local model gateway. Claude Code is the coding-agent adapter; provider routing separately supports Anthropic, OpenAI, OpenRouter, Gemini and local-compatible models. Jev-assisted failure triage and Git-backed fact checks complement reproducible completion records. On October 1, 231 focused runtime/triage tests passed with injected dependencies; a real-source indexing demonstration mapped 116 files. Context pruning remains experimental. [Public source](https://github.com/MILTONADINA/DevOPs).

## Contributions to other projects

| Work | My contribution | Status and evidence |
|---|---|---|
| [Graph Engineering](./GraphEngineering) | Extended the collaborative foundation with SQLite context, reviewed persistent memory, Laya/Jev decision controls, MCP access, source analysis and plan-bound execution. | Changes merged in my [public fork](https://github.com/MILTONADINA/graph-engineering/tree/dev); two upstream proposals remain open. |
| [Hive](./Contributions#hive) | Windows onboarding guidance and tool-integration documentation. | One upstream PR merged; four documentation PRs covering 18 integrations remain open. |
| [Private security contributions](./PrivateSecurityContributions) | Authored authorization, ownership, session, webhook and privacy-workflow submissions across three private repositories. | Submitted through PRs and unmerged; the case describes the work without private source or issue details. |

Graph Engineering’s October 1 focused validation passed 130 engine tests and nine Python sidecar tests. A separate CLI demonstration verified memory across process restarts and flagged changed source. A single 1,000-file synthetic indexing measurement is documented with hardware and retrieval limits. The original scaffold is credited; the wider platform has no root license yet.

Contribution statuses are dated **October 1, 2026**. The [contribution record](./Contributions) distinguishes upstream acceptance, fork development and private submissions.

## Coursework and security practice

- [Doctor Who Knowledge API](./Dr.WHO): three-person coursework project. My work includes frontend, schema-aware OpenAI Q&A, authentication and migration work; the case credits the team and scopes the test evidence.
- [Public coursework index](./Coursework): Spring Boot user/product API, Vue/Express applications, Java desktop and persistence projects, C++ game development, and data structures.
- [Application-security artifacts](./BrightPath/security): conceptual STRIDE threat model and abstract security patterns. The [OWASP Juice Shop assessment](./BrightPath/security/scans/OWASP-JuiceShop-ZAP-assessment.md) is a separate training-lab scan with documented mitigations.

## Reading the evidence

Client cases pair confidential-safe test evidence with abstract architectural views. BrightPath and Flourish present current focused-test summaries alongside sanitized historical records; Lumière retains its original five-check smoke image. Light Routines includes its May summary and a distinct September project-record excerpt. Captions identify the date, scope and evidence type. Conceptual diagrams explain implementation decisions and do not represent additional test runs.

Client source, product interfaces, business schemas and unredacted internal artifacts remain private. Public projects link to inspectable repositories and PRs. Independent-product, public-project and lab cases retain their applicable historical artifacts, with dates and scope beside recorded results.

## Background

**B.S. Computer Science, Cybersecurity specialization**, Oklahoma Christian University. GPA **3.48**, Honor Roll; expected graduation **April 30, 2027**. I also hold a B.S. in Epidemiology & Biostatistics.

Languages used across these projects and coursework: **TypeScript, JavaScript, Java, Dart, Python, SQL, Kotlin, Swift, C++ and Rust**. The cases explain their scope, from application and mobile work to Python evaluation tooling and experimental Rust hashing.
