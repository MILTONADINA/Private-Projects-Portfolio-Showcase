<div align="center">

# Private Projects — Technical Showcase

**Engineering depth behind proprietary client and product work.**

[![BrightPath](https://img.shields.io/badge/BrightPath-Suite-0078D4?style=for-the-badge&logo=react)](./BrightPath)
[![Lumière](https://img.shields.io/badge/Lumière-Digital_Agency-8B5CF6?style=for-the-badge&logo=nextdotjs)](./Lumiere)
[![Light Routines](https://img.shields.io/badge/Light_Routines-Cross--Platform_Mobile-02569B?style=for-the-badge&logo=flutter)](./LightRoutines)
[![Flourish](https://img.shields.io/badge/Flourish-Compliance--Engineered-10B981?style=for-the-badge&logo=stethoscope)](./Flourish)
[![DevOPs](https://img.shields.io/badge/DevOPs-Agent_OS-F38020?style=for-the-badge&logo=cloudflare)](./DevOPs)

</div>

---

## Why This Repo Exists

The source code for these projects is private (client work + active product development). This repository serves as a **technical evidence folder** — architecture diagrams, database schemas, security patterns, and engineering decisions — that demonstrates the depth of work behind each project.

> No proprietary code is exposed. All diagrams and schemas are abstracted representations of the systems built.

---

## Projects

| #   | Project                                  | Domain                          | Stack                                                            | Focus                                                                 |
| --- | ---------------------------------------- | ------------------------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1   | [**BrightPath Suite**](./BrightPath)     | SaaS School Management (+ 2 companion modules) | React 18 · TypeScript · Vite · Supabase · PostgreSQL | Multi-tenancy, RLS, RBAC, Payments — plus [SchoolGrid](./BrightPath/SchoolGrid) (offline timetabling) and [Exam Analytics](./BrightPath/ExamAnalytics) (Flutter desktop) |
| 2   | [**Lumière Digital Agency**](./Lumiere)  | Full-Stack Agency Website       | Next.js 15 · React 19 · Prisma · Supabase · Tailwind             | Server Components, CMS, i18n                                          |
| 3   | [**Light Routines**](./LightRoutines)    | Cross-Platform Wellness App     | Flutter · Swift · Kotlin · SQLite · BLE                          | Clean Architecture, Offline-First, Safety-Critical                    |
| 4   | [**Flourish**](./Flourish)               | Compliance-Engineered Child-Health Platform | Next.js 16 · Expo · Fastify · tRPC · Drizzle · Clerk | HIPAA-ready, FDA SaMD-avoidance, multi-jurisdiction privacy           |
| 5   | [**DevOPs + Stratum**](./DevOPs)         | Agent Operating System + Memory Backend | TypeScript · Fastify · Cloudflare Workers · Rust/WASM        | Deterministic safety hooks, three-tier persistent memory, context pruning |

---

## Cross-Project Documentation

| Folder                                         | Description                                                                                                       |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| [**Security Patterns**](./Security-Patterns)   | JWT, bcrypt, RLS, XSS/CSRF mitigation, rate limiting, GDPR — patterns used across projects                        |
| [**Security Evidence**](./Security-Evidence)   | Sanitized excerpts of real CI workflows: Semgrep SAST, gitleaks secret scanning, CycloneDX SBOM, Playwright + CSP |
| [**Test Evidence**](./Test-Evidence)           | Testing strategies and CI/CD pipelines with terminal output evidence                                              |

---

## Technologies Used

```
Frontend        React 18 · React 19 · Next.js 15/16 · Flutter · Tailwind CSS · shadcn/ui · MUI v7 · Framer Motion
Backend         Supabase · Prisma · Drizzle · Fastify · tRPC · Deno (Edge Functions) · NestJS · Node.js
Mobile          Flutter (Dart) · Swift (CoreBluetooth) · Kotlin (Foreground Services) · Expo (React Native)
Database        PostgreSQL · SQLite · Row-Level Security · Drizzle · Prisma · drift ORM
Auth & Security JWT · bcrypt · TOTP MFA · Biometric Gates · RLS · Clerk · Zod Validation · DOMPurify
Payments        Stripe · M-Pesa (Safaricom Daraja) · Airtel Money · MTN Mobile Money
Testing         Vitest · Playwright · Flutter Test · Testing Library · Maestro
CI/CD           GitHub Actions · Docker · Vercel · Netlify · Cloudflare Workers
Security CI     Semgrep · gitleaks · CycloneDX SBOM · pnpm audit · axe-core (Playwright)
Edge / Infra    Cloudflare Workers · Supabase Edge Functions · Rust + WASM hot paths
i18n            react-i18next · next-intl (EN/SW/FR/PT)
Monitoring      Sentry · Langfuse · Web Vitals · Custom Audit Logging
```

---

## About

Computer Science student (Cybersecurity specialization) with a background in Epidemiology & Biostatistics. These projects represent real client work and active product development where I served as the primary engineer — from system design through deployment.

Each case study in this repo documents the "how" and "why" behind every major engineering decision.

---

<div align="center">

_Built to demonstrate engineering depth, not to replace code._

</div>
