# n8n workflows

1. Scheduled scraping: Cron → due sources → scraper → complete run → retry/alert.
2. Review alerts: pending candidates → Telegram/email summary.
3. Trusted auto-publish: low dedup score → approval API → cache invalidation.
4. Failed run retry with exponential backoff.
5. Bulk import orchestration and error report.
6. Daily source health report at 09:00 Asia/Kolkata.
