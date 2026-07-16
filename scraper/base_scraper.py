"""Base scraper class that all source scrapers must extend."""
import hashlib
from abc import ABC, abstractmethod
from typing import Optional
from models import ScrapedEntry
from utils.logger import get_logger

logger = get_logger(__name__)


class BaseScraper(ABC):
    CANDIDATE_FIELD_MAP = {
        "title": "normalizedTitle",
        "content": "normalizedContent",
        "category": "extractedCategory",
        "categorySlug": "extractedCategory",
        "organization": "extractedOrg",
        "state": "extractedState",
        "qualification": "extractedQualification",
        "totalPosts": "extractedTotalPosts",
        "applicationStartDate": "extractedStartDate",
        "applicationEndDate": "extractedEndDate",
        "examDate": "extractedExamDate",
        "resultDate": "extractedResultDate",
        "applyLink": "extractedApplyLink",
        "notificationLink": "extractedNotifyLink",
        "admitCardLink": "extractedAdmitLink",
        "answerKeyLink": "extractedAnswerLink",
        "officialWebsite": "extractedWebsite",
    }

    def __init__(self, source: dict, db):
        self.source = source
        self.db = db
        self.base_url = source["baseUrl"]

    @abstractmethod
    async def fetch_list(self) -> list[dict]:
        pass

    @abstractmethod
    async def fetch_detail(self, url: str) -> Optional[dict]:
        pass

    @abstractmethod
    def normalize(self, raw: dict) -> Optional[dict]:
        pass

    def compute_hash(self, text: str) -> str:
        return hashlib.sha256(text.encode()).hexdigest()[:16]

    def save_raw_entry(self, entry: ScrapedEntry) -> str:
        return self.db.insert("RawScrapeEntry", {
            "sourceId": self.source["id"],
            "sourceUrl": entry.source_url,
            "rawTitle": entry.raw_title,
            "rawContent": entry.raw_content,
            "rawHtml": entry.raw_html,
            "contentHash": entry.content_hash or self.compute_hash(entry.raw_title),
        })

    async def run(self) -> list[dict]:
        items = await self.fetch_list()
        entries = []
        for item in items:
            detail = await self.fetch_detail(item.get("url", ""))
            raw = {**item, **(detail or {})}
            normalized = self.normalize(raw)
            if normalized:
                entry = ScrapedEntry(
                    source_url=item.get("url", ""),
                    raw_title=item.get("title", ""),
                    raw_content=detail.get("content") if detail else None,
                    raw_html=detail.get("html") if detail else None,
                )
                entry_id = self.save_raw_entry(entry)
                candidate = {
                    self.CANDIDATE_FIELD_MAP[key]: value
                    for key, value in normalized.items()
                    if value is not None and key in self.CANDIDATE_FIELD_MAP
                }
                self.db.insert("ScrapeCandidate", {
                    "rawEntryId": entry_id,
                    **candidate,
                })
                entries.append(normalized)
        return entries
