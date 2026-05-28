<div align="center">

# BrightPath

**Enterprise Multi-Tenant School Management System**

[![Stack](https://img.shields.io/badge/React_18-TypeScript-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![Backend](https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=flat-square&logo=supabase)](https://supabase.com)
[![Testing](https://img.shields.io/badge/Vitest-Playwright-6E9F18?style=flat-square&logo=vitest)](https://vitest.dev)

</div>

---

## Ecosystem

BrightPath is the SaaS core. Two focused, **offline-first** companion modules ship alongside it for use cases the cloud architecture intentionally cannot serve:

| Module                                | Purpose                                                                        | Stack                                       |
| ------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------- |
| [**SchoolGrid**](./SchoolGrid)        | Timetable generator with localStorage-only persistence. Static-host or laptop. | React 18 · TypeScript · Vite · PWA          |
| [**Exam Analytics**](./ExamAnalytics) | Classroom exam analytics on Windows + Android. Drift/SQLite, never cloud.      | Flutter · Dart · drift · Riverpod · bcrypt  |

Each module is its own private repository with its own CI, tests, and documentation; the BrightPath ecosystem framing is about shared domain (African K-12 administration) and shared engineering vocabulary, not shared infrastructure.

---

## The Problem

African educational institutions — spanning primary, secondary, tertiary, and TVET — lack a unified, affordable platform for managing the full lifecycle of school operations: student enrollment, staff management, attendance tracking, grading, financial transactions (including mobile money), and parent-teacher communications.

**Key constraints:**

- Must support **multiple school types** in a single deployment (a school network may contain primary + secondary + TVET campuses)
- Must integrate **African payment providers** (M-Pesa, Airtel Money, MTN) alongside global payment rails (Stripe)
- Must comply with **African data protection regulations** (POPIA in South Africa, NDPR in Nigeria) and GDPR
- Must work **offline** (PWA) — internet connectivity in many African schools is unreliable

---

## The Solution

A production-grade, multi-tenant SaaS platform built with a modern stack optimized for the African educational context.

### Tech Stack

| Layer              | Technology                               | Rationale                                         |
| ------------------ | ---------------------------------------- | ------------------------------------------------- |
| **Frontend**       | React 18, TypeScript, Vite               | Component-based, type-safe, fast HMR              |
| **UI**             | Tailwind CSS, shadcn/ui, MUI Data Grid   | Utility-first styling + enterprise data tables    |
| **Backend**        | Supabase (PostgreSQL, Auth, RLS)         | Managed backend with database-level security      |
| **Edge Functions** | 66 Deno functions (Supabase Edge)        | Serverless business logic (payments, comms, GDPR) |
| **Payments**       | Stripe, M-Pesa (Daraja), Airtel, MTN     | Multi-provider payment orchestration              |
| **Communication**  | SMS, WhatsApp, Email (SES)               | Multi-channel parent/staff notifications          |
| **Testing**        | Vitest, Playwright, Testing Library      | Unit + E2E + accessibility testing                |
| **CI/CD**          | 11 GitHub Actions workflows              | Security, performance, accessibility, deployment  |
| **Monitoring**     | Sentry, Web Vitals, custom audit logging | Error tracking + performance + compliance         |
| **PWA**            | Workbox, Service Workers                 | Offline-first with sync queuing                   |

---

## System Architecture

```mermaid
graph TB
    subgraph Client["Client Layer"]
        PWA["React 18 PWA<br/>TypeScript + Vite"]
        SW["Service Worker<br/>Offline Packs + Sync Queue"]
    end

    subgraph Edge["Edge Layer (66 Deno Functions)"]
        PayFn["Payment Functions<br/>M-Pesa · Stripe · Airtel · MTN"]
        CommFn["Communication Functions<br/>SMS · WhatsApp · Email"]
        AuthFn["Auth Functions<br/>TOTP · WebAuthn · OTP"]
        GDPRFn["GDPR Functions<br/>Export · Delete · Consent"]
        BizFn["Business Functions<br/>Reports · Invoices · Bulk Ops"]
    end

    subgraph Supabase["Supabase Platform"]
        Auth["Supabase Auth<br/>JWT + MFA + SSO-Ready"]
        DB["PostgreSQL<br/>RLS-Enforced Multi-Tenancy"]
        RT["Realtime<br/>Live Subscriptions"]
        Storage["Storage<br/>Documents · Photos"]
    end

    subgraph External["External Services"]
        MPesa["M-Pesa<br/>Safaricom Daraja API"]
        StripeAPI["Stripe<br/>Payment Intents"]
        SES["AWS SES<br/>Transactional Email"]
        SMSGw["SMS Gateway"]
        WA["WhatsApp<br/>Business API"]
        Sentry["Sentry<br/>Error Tracking"]
    end

    PWA -->|"API Requests + JWT"| Auth
    PWA --> SW
    PWA --> DB
    Auth --> DB

    DB --> PayFn & CommFn & AuthFn & GDPRFn & BizFn

    PayFn --> MPesa & StripeAPI
    CommFn --> SES & SMSGw & WA
    AuthFn --> DB
    GDPRFn --> DB & Storage
    BizFn --> DB

    PWA -.->|"Monitoring"| Sentry
```

---

## Database Design

The database implements **58 sequential migrations** with comprehensive Row-Level Security across **1,026 policies**. The full schema spans 398 tables; the diagram below shows the multi-tenant core that drives the rest.

### Entity Relationship Diagram

```mermaid
erDiagram
    TENANTS ||--o{ ORGANIZATIONS : "contains (standalone or network)"
    ORGANIZATIONS ||--o{ USERS : "belongs to"
    ORGANIZATIONS ||--o{ STUDENTS : "enrolled in"
    ORGANIZATIONS ||--o{ STAFF : "employed by"
    ORGANIZATIONS ||--o{ CLASSES : "has"
    ORGANIZATIONS ||--o{ SUBJECTS : "teaches"

    USERS ||--o{ USER_ROLES : "assigned"
    ROLES ||--o{ USER_ROLES : "grants"
    ROLES ||--o{ ROLE_PERMISSIONS : "includes"
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : "defines"

    STUDENTS ||--o{ ENROLLMENTS : "enrolled in"
    CLASSES ||--o{ ENROLLMENTS : "contains"
    STUDENTS ||--o{ GRADES : "receives"
    SUBJECTS ||--o{ GRADES : "assessed in"
    STUDENTS ||--o{ ATTENDANCE_ENTRIES : "tracked"
    CLASSES ||--o{ ATTENDANCE_RECORDS : "has"

    STUDENTS ||--o{ INVOICES : "billed"
    INVOICES ||--o{ PAYMENTS : "paid via"

    TENANTS {
        uuid id PK
        text name
        text type "standalone | network"
        jsonb settings
        text currency "Default KES"
    }

    ORGANIZATIONS {
        uuid id PK
        uuid tenant_id FK
        text name
        text slug "unique"
        text type "primary | secondary | tertiary | tvet"
    }

    STUDENTS {
        uuid id PK
        uuid organization_id FK
        text admission_number "unique per org"
        text full_name
        date date_of_birth
        text gender
        text current_class
    }

    ROLES {
        uuid id PK
        text name "unique"
        integer level "0=platform_admin to 100=student"
    }

    PERMISSIONS {
        uuid id PK
        text resource "students, grades, fees..."
        text action "view, create, update, delete, manage"
    }

    GRADES {
        uuid id PK
        uuid student_id FK
        uuid subject_id FK
        numeric score "0-100"
        text letter_grade
    }

    INVOICES {
        uuid id PK
        uuid student_id FK
        numeric amount
        text status "pending | paid | overdue"
        text currency
    }

    PAYMENTS {
        uuid id PK
        uuid invoice_id FK
        text provider "mpesa | stripe | airtel | mtn | bank"
        text provider_ref
        numeric amount
    }
```

---

## Key Engineering Decision: RLS Over Separate Databases

**Decision**: Use PostgreSQL Row-Level Security (RLS) for tenant isolation instead of per-tenant database instances.

**Why?**

- **Cost**: Separate databases per school is prohibitively expensive in the African market. A single PostgreSQL instance with RLS provides the same isolation guarantees at a fraction of the cost.
- **Enforcement depth**: RLS is enforced at the database engine level — even a bug in the application layer cannot expose cross-tenant data.
- **Implementation scale**: 316 RLS policy references across 34 migration files. Every table with tenant-scoped data has policies that derive `tenant_id` server-side (never trusted from the client).

### RLS Policy Pattern

```sql
-- Tenant isolation: users can only see students belonging to their tenant's organizations
CREATE POLICY "tenant_isolation_select" ON students
FOR SELECT TO authenticated
USING (
    organization_id IN (
        SELECT organization_id
        FROM user_organizations
        WHERE user_id = auth.uid()
    )
);
```

**Key enforcement rule**: The `tenant_id` is derived from the authenticated user's JWT via `auth.uid()` → `user_organizations` lookup. The client never sends a `tenant_id` parameter.

### RLS Enforcement Flow

```mermaid
graph TB
    Client["Authenticated Client<br/>(holds Supabase JWT)"]
    PostgREST["PostgREST / Supabase API<br/>extracts auth.uid() from JWT"]
    Engine["PostgreSQL Engine<br/>enforces RLS USING clauses<br/>on every row"]
    UserCtx["user_roles + users tables<br/>resolve tenant_id server-side"]
    Tables["Tenant-Scoped Tables<br/>students · classes · grades · invoices · payments · ..."]
    Result["Result Set<br/>(only rows matching tenant)"]

    Client -->|"Bearer token"| PostgREST
    PostgREST -->|"set local role + JWT"| Engine
    Engine -->|"evaluate per row"| UserCtx
    UserCtx -->|"tenant_id derived"| Tables
    Tables --> Result

    style Engine fill:#059669,color:#fff
    style UserCtx fill:#0891b2,color:#fff
```

The policy lives at the database engine — even an authentication-bypass bug in the application layer cannot return another tenant's rows, because PostgreSQL itself filters them out before they ever leave the database. Sanitized real-policy excerpts are committed in [`Security-Evidence/brightpath-rls-examples.sql`](../Security-Evidence/brightpath-rls-examples.sql).

---

## RBAC: Role Hierarchy

The system implements **12+ roles** with a hierarchical level system and granular `resource.action` permissions (99 RBAC-related files).

```mermaid
graph TD
    PA["Platform Admin<br/>Level 0<br/>Full system access"]
    SO["School Owner<br/>Level 10<br/>Tenant-wide management"]
    PR["Principal<br/>Level 20<br/>Organization management"]
    AD["Admin / Bursar<br/>Level 30<br/>Administrative operations"]
    CT["Class Teacher<br/>Level 40<br/>Class-scoped operations"]
    TE["Teacher<br/>Level 40<br/>Subject-scoped operations"]
    PA2["Parent<br/>Level 80<br/>Child-scoped read access"]
    ST["Student<br/>Level 100<br/>Self-scoped read access"]

    PA --> SO --> PR --> AD --> CT & TE
    CT --> PA2 --> ST
    TE --> PA2

    style PA fill:#dc2626,color:#fff
    style SO fill:#ea580c,color:#fff
    style PR fill:#d97706,color:#fff
    style AD fill:#65a30d,color:#fff
    style CT fill:#0891b2,color:#fff
    style TE fill:#0891b2,color:#fff
    style PA2 fill:#7c3aed,color:#fff
    style ST fill:#6366f1,color:#fff
```

**Permission format**: `resource.action` (e.g., `students.view`, `grades.create`, `fees.manage`, `users.delete`)

---

## Payment Integration

Multi-provider payment orchestration via Supabase Edge Functions:

| Provider                      | Market              | Integration                       |
| ----------------------------- | ------------------- | --------------------------------- |
| **M-Pesa** (Safaricom Daraja) | Kenya, Tanzania     | STK Push + Webhook verification   |
| **Airtel Money**              | East/Central Africa | Payment initiation + Webhook      |
| **MTN Mobile Money**          | West/Central Africa | Payment initiation + Webhook      |
| **Stripe**                    | Global              | Payment Intents + Webhook (HMAC)  |
| **Bank Transfers**            | All markets         | Manual recording + reconciliation |

---

## Testing & CI/CD

### Testing Stack

| Type              | Tool                | Scope                                  |
| ----------------- | ------------------- | -------------------------------------- |
| **Unit**          | Vitest              | Component logic, hooks, utilities      |
| **Integration**   | Testing Library     | Component rendering, user interactions |
| **E2E**           | Playwright          | Full user flows, cross-browser         |
| **Accessibility** | axe-core + jest-axe | WCAG compliance scanning               |
| **Performance**   | Lighthouse Budget   | Bundle size + Web Vitals               |

### CI/CD Pipeline (11 GitHub Actions Workflows)

| Workflow                | Trigger         | Checks                          |
| ----------------------- | --------------- | ------------------------------- |
| `ci-comprehensive.yml`  | PR to main      | Lint + typecheck + test + build |
| `security-scan.yml`     | Push            | Dependency audit + SAST         |
| `accessibility.yml`     | PR              | axe-core accessibility checks   |
| `performance.yml`       | PR              | Lighthouse budget + bundle size |
| `schema-validation.yml` | Push            | Database schema integrity       |
| `deploy-staging.yml`    | Push to develop | Staging deployment              |
| `deploy-production.yml` | Push to main    | Production deployment           |

![BrightPath Vitest — fresh 2026-05-28 run across 7 test categories (security/a11y/i18n/boundary/regression/rate-limiting/smoke): 19 files, 260/260 tests passed. Full portal surface 705 *.test.* files; repo-wide inventory 2,229 files / 19,697 it/test() call sites.](../Test-Evidence/brightpath-vitest-passing.png)

> The screenshot above is from real `npx vitest run` commands executed against `apps/portal/src/tests/<category>` on 2026-05-28. The figures are verifiable: re-clone, run the same commands, get the same green counts. Full-suite run wasn't feasible in one session (2,229 test files); the categories shown were picked to span correctness (boundary/regression), security (security/rate-limiting), and quality (a11y/i18n/smoke).

---

## Compliance & Data Protection

| Regulation               | Implementation                                                                                                 |
| ------------------------ | -------------------------------------------------------------------------------------------------------------- |
| **GDPR**                 | Consent management, right to erasure, data export (via `gdpr-export-data` + `gdpr-delete-data` edge functions) |
| **POPIA** (South Africa) | Data minimization, purpose limitation, security safeguards                                                     |
| **NDPR** (Nigeria)       | Data processing consent, cross-border transfer controls                                                        |
| **Audit Trail**          | Comprehensive `audit_logs` table: action, resource, user, changes (JSONB before/after), IP address, timestamp  |

---

## Offline-First (PWA)

The application implements a Progressive Web App with:

- **Workbox Service Worker** for asset caching and offline capability
- **Offline Packs** (pre-bundled data sets per school) for low-connectivity environments
- **Sync Queue** for operations performed offline — automatically replayed when connectivity returns

---

<div align="center">

[← Back to Portfolio](../README.md)

</div>
