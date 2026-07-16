"""
SarkariJob Scraper Engine
Orchestrates scraping, normalization, dedup, and publishing.
"""
import asyncio
import importlib
import time
from typing import Optional
from utils.logger import get_logger
from utils.db import get_db
from models import SourceRegistry

logger = get_logger(__name__)

class ScraperEngine:
    def __init__(self):
        self.db = get_db()
        self.sources: list[SourceRegistry] = []

    def load_sources(self, source_slug: Optional[str] = None):
        query = "SELECT * FROM SourceRegistry WHERE isActive = 1"
        params: tuple = ()
        if source_slug:
            query += " AND slug = ?"
            params = (source_slug,)
        self.sources = self.db.fetch_all(query, params)
        logger.info(f"Loaded {len(self.sources)} sources")

    async def run_source(self, source: SourceRegistry):
        start = time.time()
        log_id = self.db.insert("ScrapeRunLog", {
            "sourceId": source["id"],
            "runType": "MANUAL",
            "status": "SUCCESS",
            "startedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
        })
        try:
            module_name = source['slug'].replace('-', '_')
            module = importlib.import_module(f"sources.{module_name}")
            scraper_class = getattr(module, "Scraper")
            scraper = scraper_class(source, self.db)
            entries = await scraper.run()
            duration = int((time.time() - start) * 1000)
            self.db.update("ScrapeRunLog", log_id, {
                "status": "SUCCESS",
                "entriesFound": len(entries),
                "durationMs": duration,
                "completedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            })
            self.db.update("SourceRegistry", source["id"], {
                "lastRunAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                "lastSuccessAt": time.strftime("%Y-%m-%d %H:%M:%S"),
                "healthStatus": "HEALTHY",
                "failureCount": 0,
            })
            logger.info(f"Source {source['slug']}: {len(entries)} entries in {duration}ms")
        except Exception as e:
            duration = int((time.time() - start) * 1000)
            self.db.update("ScrapeRunLog", log_id, {
                "status": "FAILED",
                "errors": str(e),
                "durationMs": duration,
                "completedAt": time.strftime("%Y-%m-%d %H:%M:%S"),
            })
            logger.error(f"Source {source['slug']} failed: {e}")

    async def run_all(self):
        self.load_sources()
        for source in self.sources:
            await self.run_source(source)

    def run_single(self, slug: str):
        self.load_sources(slug)
        if self.sources:
            asyncio.run(self.run_source(self.sources[0]))

if __name__ == "__main__":
    import sys
    engine = ScraperEngine()
    if len(sys.argv) > 1:
        engine.run_single(sys.argv[1])
    else:
        asyncio.run(engine.run_all())
