# SarkariJob

[![GitHub](https://img.shields.io/badge/GitHub-hinaidris/sarkaijob-181717?logo=github)](https://github.com/hinaidris/sarkaijob)

Hindi-first, mobile-focused government jobs and exam information platform for Indian job seekers.

SarkariJob brings government job notifications, results, admit cards, answer keys, syllabus, admissions, scholarships, government schemes, state-wise updates, and exam tools into one scalable platform.

> **Important disclaimer:** SarkariJob is an independent information portal and is not affiliated with any government body or organization. Always verify every detail from the official notification before applying or making a payment.

## Highlights

- Hindi-first content with English fallback
- Mobile-responsive public website and PWA foundation
- Government jobs, results, admit cards, answer keys, and syllabus
- Category, state, organization, and qualification landing pages
- Filters, sorting, pagination, search, and autocomplete
- Admin authentication and content management
- Python scraper, normalization, duplicate detection, and review queue
- Candidate approval and bulk-import workflows
- Dynamic SEO metadata, sitemap, robots, RSS, and structured data
- Analytics, Web Vitals, advertising slots, email leads, and Telegram CTA
- Feature flags, health monitoring, security headers, and rate limiting
- API keys, authenticated public API, webhooks, freshness checks, and contributor workflow
- Docker, n8n, worker, launch, rollback, infrastructure, and compliance scaffolds

## Technology Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 14 App Router |
| Language | TypeScript |
| UI | React 18 and Tailwind CSS |
| ORM | Prisma |
| Development database | SQLite |
| Production database | PostgreSQL-ready architecture |
| Authentication | NextAuth.js credentials provider |
| Validation | Zod and React Hook Form |
| Scraping | Python 3.11+, Beautiful Soup, Pydantic, python-dateutil |
| Automation | n8n workflow scaffolds |
| Caching and queues | Redis/BullMQ-ready worker architecture |
| Deployment | Docker, Vercel, managed PostgreSQL, and Redis |

## Completed Build Phases

### Phase 1 — Foundation

- Next.js, TypeScript, Tailwind, and Prisma setup
- Admin credentials authentication
- Protected admin routes
- Category, post, state, and settings management
- Database seed and reusable utilities

### Phase 2 — Homepage and content architecture

- Parallel homepage data queries
- Hindi-first i18n tables
- Reusable public components
- Homepage metadata and JSON-LD
- Accessibility and reduced-motion support
- Database-driven disclaimer

### Phase 3 — Discovery, detail pages, and SEO

- Post detail, category listing, state portal, and search routes
- URL filters, sorting, and pagination
- Search autocomplete and result highlighting
- Related posts and view tracking
- Content hubs and exam calendar
- Dynamic sitemap, robots, and RSS
- JobPosting, Dataset, ItemList, Breadcrumb, and FAQ structured data

### Phase 4 — Content automation

- Source registry and source health policies
- Raw scrape records and normalized review candidates
- Python normalization and duplicate scoring
- Candidate approve/reject APIs
- Bulk-import scaffold
- Admin review queue and scrape-run monitoring
- n8n and Docker Compose scaffolds

### Phase 5 — Monetization and launch systems

- Advertising slots and monetization dashboard
- Internal analytics, GA4/Plausible scripts, and Web Vitals
- Email lead capture and Telegram CTA
- Feature flags and operations dashboard
- Health endpoint, rate limiting, CSP, and secure headers
- Launch checklist and rollback documentation

### Phase 6 — Scale and data products

- Authenticated public API with hashed keys and scopes
- Freshness checks and historical snapshots
- Signed webhook dispatch
- Contributor submissions and editorial tasks
- Eligibility, vacancy trends, and cutoff tools
- Organization and qualification SEO hubs
- Saved posts, push prompt, service worker, and PWA foundation
- Infrastructure scaling and compliance documentation

## Application Routes

### Public routes

| Route | Purpose |
| --- | --- |
| `/` | Hindi-first homepage |
| `/post/[slug]` | Universal post details |
| `/category/[slug]` | Category listing with filters and sorting |
| `/state/[slug]` | State-wise portal and statistics |
| `/search` | Full search results |
| `/syllabus` | Exam syllabus hub |
| `/calendar` | Exam calendar |
| `/tools` | Public tools directory |
| `/tools/eligibility` | Basic eligibility checker |
| `/tools/vacancy-trends` | Vacancy trend records |
| `/tools/cutoff-trends` | Cutoff trend foundation |
| `/yojana` | Government schemes |
| `/scholarship` | Scholarship updates |
| `/notice` | Important notices |
| `/organization/[slug]` | Organization-specific pages |
| `/qualification/[slug]` | Qualification-specific pages |
| `/contribute` | Contributor tip submission |

### SEO and feeds

- `/sitemap.xml`
- `/robots.txt`
- `/rss.xml`

### Admin routes

The `/admin/*` area includes:

- Dashboard
- Posts, categories, states, and settings
- Scraper sources and run logs
- Candidate review and imports
- Monetization and analytics
- SEO and feature flags
- Operations monitoring
- Editorial tasks and contributor submissions
- API keys and webhooks

## API Routes

### Public website APIs

- `GET /api/posts`
- `GET /api/posts/[slug]`
- `POST /api/posts/[slug]` — increments view count
- `GET /api/search`
- `GET /api/search/autocomplete`
- `GET /api/exams`
- `POST /api/leads`
- `POST /api/analytics`
- `GET /api/health`
- `POST /api/contributor-submissions`

### Authenticated public API

Send the API key in the `x-api-key` header.

- `GET /api/public/v1/posts`
- `GET /api/public/v1/exams`
- `GET /api/public/v1/states/[slug]`
- `GET /api/public/v1/trends/cutoffs`

Example:

```bash
curl -H "x-api-key: dev_sarkarijob_key" \
  "http://localhost:3000/api/public/v1/posts?limit=10"
```

The development key is configurable through `DEV_PUBLIC_API_KEY`. Never use the default key in production.

## Project Structure

```text
.
├── src/
│   ├── app/                    # App Router pages and API routes
│   ├── components/             # Public, admin, ads, analytics, tools
│   ├── lib/                    # Data services, validation, SEO, security
│   ├── middleware.ts           # Admin route protection
│   └── types/                  # Shared TypeScript types
├── prisma/
│   ├── schema.prisma           # Application data model
│   ├── seed.ts                 # Categories, states, sources, flags, API key
│   └── postgresql-full-text-search.sql
├── scraper/
│   ├── sarkarijob_scraper/     # Normalizer, parsers, dedup, utilities
│   ├── tests/                  # Python pipeline tests
│   └── Dockerfile
├── worker/                     # Queue contracts and scaling notes
├── n8n/                        # Workflow documentation
├── docs/                       # Launch, rollback, infrastructure, compliance
├── public/                     # Manifest, service worker, static files
├── Dockerfile
├── docker-compose.yml
└── .env.example
```

## Local Development

### Requirements

- Node.js 20 or newer
- npm 10 or newer
- Python 3.11 or newer for scraper development

### Installation

```bash
npm install
cp .env.example .env
npx prisma generate
npx prisma db push
npm run db:seed
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

### Development admin

The seed script uses environment variables first. If they are absent in a non-production environment, the fallback credentials are:

```text
Email: admin@sarkarijob.local
Password: Admin@123
```

Change these values before deployment.

## Environment Variables

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Prisma database connection string |
| `NEXTAUTH_SECRET` | Yes | NextAuth signing secret |
| `NEXTAUTH_URL` | Yes | Authentication base URL |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical public website URL |
| `ADMIN_EMAIL` | Production | Seeded administrator email |
| `ADMIN_PASSWORD` | Production | Seeded administrator password |
| `REDIS_URL` | Optional | Redis connection for queues and cache |
| `NEXT_PUBLIC_GA4_ID` | Optional | Google Analytics measurement ID |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Optional | Plausible analytics domain |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | Optional | AdSense client identifier |
| `TELEGRAM_CHANNEL_URL` | Optional | Public Telegram channel URL |
| `CRON_SECRET` | Production | Freshness job authorization secret |
| `WEBHOOK_DISPATCH_SECRET` | Production | Internal webhook dispatch secret |
| `DEV_PUBLIC_API_KEY` | Development | Seeded development API key |

Generate secure secrets rather than reusing the example values.

## npm Commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run Next.js ESLint |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:push` | Push the schema in development |
| `npm run db:migrate` | Create and apply a development migration |
| `npm run db:seed` | Seed application data |
| `npm run db:studio` | Open Prisma Studio |

## Python Scraper

```bash
cd scraper
python -m venv .venv
source .venv/bin/activate
pip install -e .
python main.py
```

On Windows PowerShell:

```powershell
cd scraper
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e .
python main.py
```

The scraper package includes normalization, category and badge detection, date extraction, duplicate scoring, and parser contracts. Scraped content enters the admin review queue before publication.

## Docker

The Docker Compose scaffold includes web, PostgreSQL, Redis, scraper, and n8n services.

```bash
docker compose up --build
```

The current Prisma schema uses SQLite for lightweight local development. Before using the PostgreSQL Docker service in production, change the Prisma datasource provider to `postgresql`, generate a reviewed migration, test it on staging, and apply the optional full-text search index.

## PostgreSQL Full-Text Search

The default search implementation uses portable Prisma `contains` queries so local SQLite development works immediately.

For production-scale PostgreSQL search:

1. Move the Prisma datasource to PostgreSQL.
2. Apply reviewed Prisma migrations.
3. Review and apply `prisma/postgresql-full-text-search.sql`.
4. Replace portable search with ranked `plainto_tsquery` queries.

Do not run the PostgreSQL SQL file while using SQLite.

## Security Notes

- Admin routes are protected through NextAuth middleware.
- API keys are stored as hashes.
- Cron and webhook routes require secrets.
- Analytics, leads, and contributor endpoints are validated and rate-limited.
- CSP and standard security headers are configured.
- Scraped and contributor content must be moderated before publishing.
- Production credentials must never be committed.

## Operations and Deployment

Read the operational documents before deployment:

- [`docs/LAUNCH_CHECKLIST.md`](docs/LAUNCH_CHECKLIST.md)
- [`docs/ROLLBACK.md`](docs/ROLLBACK.md)
- [`docs/INFRASTRUCTURE.md`](docs/INFRASTRUCTURE.md)
- [`docs/COMPLIANCE.md`](docs/COMPLIANCE.md)
- [`n8n/README.md`](n8n/README.md)
- [`worker/README.md`](worker/README.md)

Recommended production services:

- Vercel or a Node.js container platform
- Managed PostgreSQL with connection pooling and backups
- Managed Redis
- Containerized scraper workers
- Self-hosted or managed n8n
- CDN, uptime monitoring, and error tracking

## Verification

The project was reviewed and verified for:

- TypeScript and TSX syntax
- Local import resolution
- Prisma model and enum name duplication
- Python normalization and duplicate-classification behavior
- Cross-phase file compatibility
- API key hash lookup correctness
- Slug generation uniqueness
- Environment variable validation consistency
- Minified file expansion for readability

A complete dependency installation, Prisma generation, migration, and production build should be run in the target development or CI environment before deployment.

## Disclaimer

SarkariJob is not a government website. Information is aggregated for convenience and may change. Users must verify eligibility, dates, fees, vacancies, and links from the official notification and official department website.
