"""Type definitions for scraper data."""
from dataclasses import dataclass
from typing import Optional, TypedDict


class SourceRegistry(TypedDict, total=False):
    id: str
    name: str
    slug: str
    baseUrl: str
    websiteUrl: str


class ScrapeRunLog(TypedDict, total=False):
    id: str
    sourceId: str
    status: str
    entriesFound: int
    entriesNew: int
    errors: str

@dataclass
class ScrapedEntry:
    source_url: str
    raw_title: str
    raw_content: Optional[str] = None
    raw_html: Optional[str] = None
    content_hash: Optional[str] = None

@dataclass
class NormalizedEntry:
    title: str
    title_hindi: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    category_slug: Optional[str] = None
    organization: Optional[str] = None
    state: Optional[str] = None
    qualification: Optional[str] = None
    total_posts: Optional[int] = None
    application_start: Optional[str] = None
    application_end: Optional[str] = None
    exam_date: Optional[str] = None
    result_date: Optional[str] = None
    apply_link: Optional[str] = None
    notification_link: Optional[str] = None
    admit_card_link: Optional[str] = None
    answer_key_link: Optional[str] = None
    official_website: Optional[str] = None
    badge_type: Optional[str] = None
