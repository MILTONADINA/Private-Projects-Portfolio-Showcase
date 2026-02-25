<div align="center">

# Lumière Digital Agency

**Premium Full-Stack Agency Website with CMS Dashboard**

[![Stack](https://img.shields.io/badge/Next.js_15-React_19-000000?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![ORM](https://img.shields.io/badge/Prisma-PostgreSQL-2D3748?style=flat-square&logo=prisma)](https://prisma.io)
[![i18n](https://img.shields.io/badge/i18n-EN_|_SW-10B981?style=flat-square)](https://next-intl-docs.vercel.app)

</div>

---

## The Problem

A digital agency needs a premium, high-performance web presence that:

- Serves content in **English and Swahili** for the East African market
- Provides a **CMS dashboard** for non-technical team members to manage services, portfolio, team bios, blog posts, and client testimonials — without touching code
- Handles **client inquiries and orders** with payment processing (Stripe)
- Maintains **Grade A+ security** — the admin dashboard is a high-value attack target

---

## The Solution

A monolithic Next.js 15 application leveraging the App Router for both the public-facing website and the internal admin dashboard. React Server Components (RSC) handle data fetching; Client Components hydrate only for interactive elements.

### Tech Stack

| Layer          | Technology                         | Rationale                                 |
| -------------- | ---------------------------------- | ----------------------------------------- |
| **Framework**  | Next.js 15 (App Router)            | SSR/ISR, API Routes, asset optimization   |
| **UI**         | React 19, Tailwind CSS             | Server Components + utility-first styling |
| **Animations** | Framer Motion                      | Smooth, performant micro-animations       |
| **ORM**        | Prisma                             | Type-safe schema, migration management    |
| **Database**   | PostgreSQL (Supabase)              | Relational data + RLS enforcement         |
| **Auth**       | Supabase Auth                      | JWT-based with admin whitelist            |
| **Payments**   | Stripe                             | Secure checkout, payment intents          |
| **i18n**       | next-intl                          | Route-based locale switching (EN/SW)      |
| **Monitoring** | Sentry (client + server + edge)    | Full-stack error tracking                 |
| **Security**   | Zod, DOMPurify, RLS, rate limiting | Defense-in-depth                          |

---

## System Architecture

```mermaid
graph TB
    subgraph Client["Public Website"]
        Home["Home Page<br/>RSC + Framer Motion"]
        Services["Services Page<br/>RSC → Prisma"]
        Portfolio["Portfolio Page<br/>RSC → Prisma"]
        Blog["Blog<br/>RSC → Prisma"]
        Contact["Contact Form<br/>Client Component"]
    end

    subgraph Admin["Admin Dashboard (Protected)"]
        AdminDash["Dashboard Home"]
        SvcMgr["Service Manager<br/>CRUD + Translations"]
        PortMgr["Portfolio Manager<br/>CRUD + Translations"]
        TeamMgr["Team Manager"]
        BlogMgr["Blog Editor<br/>Draft → Published"]
        OrderMgr["Order Tracker"]
        ContactMgr["Submissions Inbox"]
    end

    subgraph Middleware["Next.js Middleware"]
        I18n["Locale Detection<br/>/en vs /sw"]
        AuthGuard["Admin Auth Guard<br/>Supabase Session Check"]
    end

    subgraph Backend["Backend Layer"]
        API["API Routes<br/>POST/PUT/DELETE"]
        Prisma["Prisma ORM<br/>Type-Safe Queries"]
        Validation["Zod Validation<br/>All Inputs"]
        RateLimit["Rate Limiter<br/>IP + Token"]
    end

    subgraph Database["Data Layer"]
        PG["PostgreSQL<br/>14 Models"]
        RLS["Row-Level Security<br/>Read/Write Policies"]
        Supa["Supabase Auth<br/>JWT + Admin Whitelist"]
    end

    subgraph External["External Services"]
        Stripe["Stripe<br/>Payment Processing"]
        Mail["Nodemailer<br/>Email Notifications"]
        SentryExt["Sentry<br/>Error Monitoring"]
    end

    Client -->|"GET requests"| Middleware
    Admin -->|"All requests"| Middleware
    Middleware --> I18n & AuthGuard
    I18n --> Client
    AuthGuard -->|"Unauthenticated"| Admin

    Client -->|"RSC data fetch"| Prisma
    Admin -->|"Mutations"| API
    API --> Validation --> RateLimit --> Prisma --> PG
    PG --> RLS
    Supa --> RLS

    API --> Stripe & Mail
    Client & Admin -.-> SentryExt
```

---

## Data Model

The Prisma schema defines **14 models** with a consistent **translation pattern** — each content entity has a companion `*Translation` table keyed on `[entityId, locale]`.

### Entity Relationship Diagram

```mermaid
erDiagram
    SERVICE ||--o{ SERVICE_TRANSLATION : "translated to"
    SERVICE ||--o{ SERVICE_PACKAGE : "offers"
    SERVICE ||--o{ PORTFOLIO_ITEM_SERVICE : "showcased in"

    SERVICE_PACKAGE ||--o{ SERVICE_PACKAGE_TRANSLATION : "translated to"
    SERVICE_PACKAGE ||--o{ ORDER : "ordered as"

    PORTFOLIO_ITEM ||--o{ PORTFOLIO_ITEM_TRANSLATION : "translated to"
    PORTFOLIO_ITEM ||--o{ PORTFOLIO_ITEM_SERVICE : "uses"

    BLOG_POST ||--o{ BLOG_POST_TRANSLATION : "translated to"

    SERVICE {
        cuid id PK
        string slug "unique"
        decimal basePrice
        string currency "USD"
        int sortOrder
        boolean active
        datetime deletedAt "soft delete"
    }

    SERVICE_TRANSLATION {
        cuid id PK
        string serviceId FK
        string locale "en | sw"
        string title
        string shortDescription
        string longDescription
    }

    SERVICE_PACKAGE {
        cuid id PK
        string slug "unique"
        string serviceId FK
        decimal basePrice
        boolean active
    }

    PORTFOLIO_ITEM {
        cuid id PK
        string slug "unique"
        string clientName
        string industry
        string imageUrl
    }

    PORTFOLIO_ITEM_TRANSLATION {
        cuid id PK
        string portfolioItemId FK
        string locale "en | sw"
        string title
        string challenge
        string solution
        string results
    }

    BLOG_POST {
        cuid id PK
        string slug "unique"
        string status "draft | published"
        string category
        string authorName
        datetime publishedAt
    }

    ORDER {
        cuid id PK
        string servicePackageId FK
        string customerName
        string customerEmail
        decimal amount
        string paymentProvider "stripe"
        string status "pending | paid"
    }

    TESTIMONIAL {
        cuid id PK
        string clientName
        string quote
        string locale "en | sw"
        boolean active
    }

    TEAM_MEMBER {
        cuid id PK
        string name
        string role
        string bio
        int sortOrder
    }

    CONTACT_SUBMISSION {
        cuid id PK
        string name
        string email
        string message
        string status "new | read | replied"
    }

    ADMIN_USER {
        uuid user_id PK
        datetime created_at
    }

    CONTENT_VERSION {
        cuid id PK
        string entityType
        string entityId
        json snapshot "full entity state"
    }

    NEWSLETTER_SUBSCRIPTION {
        cuid id PK
        string email "unique"
        boolean active
    }

    CLIENT_LOGO {
        cuid id PK
        string name
        string imageUrl
        int sortOrder
    }
```

---

## Key Engineering Decision: Translation Pattern

**Decision**: Use dedicated `*Translation` tables instead of JSON columns or duplicate records per locale.

**Why?**

- **Type-safe queries**: Prisma generates typed models for each translation table. TypeScript catches missing translations at compile time.
- **Database-level constraints**: `@@unique([serviceId, locale])` prevents duplicate translations per entity/locale pair — enforced at PostgreSQL level.
- **Clean joins**: Loading a service in Swahili is a single Prisma `include` with a `where` clause on locale, not a JSONB extraction or full-table scan.
- **Indexed lookups**: Separate `@@index([locale])` on each translation table — locale filtering is O(log n).

```typescript
// Example: Fetch service with Swahili translation
const service = await prisma.service.findUnique({
  where: { slug: "web-development" },
  include: {
    translations: {
      where: { locale: "sw" },
    },
    packages: {
      include: {
        translations: { where: { locale: "sw" } },
      },
    },
  },
});
```

---

## Key Engineering Decision: Next.js Server Components Architecture

**Decision**: Use React Server Components (RSC) for all data-fetching pages; Client Components only for interactive elements.

```mermaid
graph LR
    subgraph RSC["Server Components (Zero JS)"]
        ServicesPage["Services Page"]
        PortfolioPage["Portfolio Page"]
        BlogPage["Blog Listing"]
        TeamSection["Team Section"]
    end

    subgraph CC["Client Components (Hydrated)"]
        ContactForm["Contact Form<br/>+ Zod Validation"]
        Carousel["Image Carousel<br/>+ Framer Motion"]
        ThemeToggle["Dark/Light Toggle"]
        AdminForms["Admin CRUD Forms"]
    end

    RSC -->|"include client islands"| CC
    RSC -->|"Direct DB access"| Prisma["Prisma ORM"]
    CC -->|"API mutations"| APIRoutes["API Routes<br/>POST/PUT/DELETE"]

    style RSC fill:#0891b2,color:#fff
    style CC fill:#7c3aed,color:#fff
```

**Why?**

- **Performance**: Public pages ship zero JavaScript for data-fetching logic. Prisma queries run on the server — no client-side waterfall.
- **Security**: Database credentials never reach the browser. Admin mutations go through API routes with `requireAdmin()` guards.
- **SEO**: Full SSR output — search engines get complete HTML without waiting for JavaScript hydration.

---

## Internationalization (i18n)

Fully bilingual (English + Swahili) implementation using `next-intl`:

| Concern             | Implementation                                              |
| ------------------- | ----------------------------------------------------------- |
| **URL structure**   | Locale prefix: `/en/services` vs `/sw/services`             |
| **Middleware**      | Auto-detects browser locale, redirects to `/en` or `/sw`    |
| **Static strings**  | `messages/en.json` (6.3 KB) and `messages/sw.json` (8.5 KB) |
| **Dynamic content** | Database translations via `*Translation` tables             |
| **Admin dashboard** | Not localized (English-only internal tool)                  |

---

## Security Architecture

```mermaid
graph TB
    Request["Incoming Request"] --> MW["Middleware"]

    MW -->|"Public route"| I18n["i18n Locale Routing"]
    MW -->|"/admin/*"| AuthCheck{"Supabase<br/>Session?"}

    AuthCheck -->|"No session"| LoginRedirect["→ /admin/login"]
    AuthCheck -->|"Valid session"| AdminWhitelist{"User in<br/>admin_users?"}

    AdminWhitelist -->|"No"| AccessDenied["403 Forbidden"]
    AdminWhitelist -->|"Yes"| APIRoute["API Route Handler"]

    APIRoute --> ZodValidation["Zod Input Validation"]
    ZodValidation -->|"Invalid"| Error400["400 Bad Request"]
    ZodValidation -->|"Valid"| RateLimiter["Rate Limiter<br/>IP + Token"]
    RateLimiter -->|"Exceeded"| Error429["429 Too Many Requests"]
    RateLimiter -->|"OK"| DOMPurify["DOMPurify<br/>XSS Sanitization"]
    DOMPurify --> Prisma["Prisma ORM"]
    Prisma --> RLS["PostgreSQL RLS<br/>Row-Level Policies"]

    style AuthCheck fill:#dc2626,color:#fff
    style ZodValidation fill:#ea580c,color:#fff
    style RateLimiter fill:#d97706,color:#fff
    style RLS fill:#059669,color:#fff
```

**Defense-in-depth layers:**

1. **Middleware**: Session validation + admin route protection
2. **Admin whitelist**: `admin_users` table — only whitelisted user IDs can access the dashboard
3. **Zod validation**: Schema-validated inputs on every API endpoint
4. **Rate limiting**: IP + token-based rate limiter on contact and newsletter endpoints
5. **DOMPurify**: HTML sanitization for any rich-text content
6. **RLS**: PostgreSQL Row-Level Security policies block unauthorized reads/writes at the database level

---

## Content Versioning

The `ContentVersion` model provides an **audit trail** for CMS content:

| Field        | Purpose                                                                               |
| ------------ | ------------------------------------------------------------------------------------- |
| `entityType` | Which model was changed (`blog_post`, `service`, `portfolio_item`, `service_package`) |
| `entityId`   | The specific record ID                                                                |
| `snapshot`   | Full JSON snapshot of the entity state at that point in time                          |
| `createdAt`  | When the version was created                                                          |

This enables content rollback and change tracking without a full revision system.

---

## Validation

> 📸 **[Screenshot Placeholder]**: Place a screenshot of the system smoke check passing as `../Test-Evidence/lumiere-smoke-check.png`

---

<div align="center">

[← Back to Portfolio](../README.md)

</div>
