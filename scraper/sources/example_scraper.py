"""Example scraper for demonstration."""
from base_scraper import BaseScraper
from utils.logger import get_logger

logger = get_logger(__name__)


class Scraper(BaseScraper):
    async def fetch_list(self) -> list[dict]:
        logger.info(f"Fetching list from {self.base_url}")
        return [
            {"title": "Example Job Notification", "url": f"{self.base_url}/job1"},
        ]

    async def fetch_detail(self, url: str) -> dict:
        return {
            "content": "This is an example job notification content.",
        }

    def normalize(self, raw: dict) -> dict:
        return {
            "title": raw.get("title", ""),
            "content": raw.get("content", ""),
            "organization": "Example Organization",
        }
