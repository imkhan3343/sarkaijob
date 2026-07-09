"""Text processing utilities."""
import re
from typing import Optional


def clean_html(html: str) -> str:
    clean = re.sub(r"<[^>]+>", " ", html)
    clean = re.sub(r"\s+", " ", clean).strip()
    return clean


def extract_date(text: str) -> Optional[str]:
    patterns = [
        r"\d{1,2}[/-]\d{1,2}[/-]\d{4}",
        r"\d{4}[/-]\d{1,2}[/-]\d{1,2}",
    ]
    for pattern in patterns:
        match = re.search(pattern, text)
        if match:
            return match.group()
    return None


def extract_numbers(text: str) -> Optional[int]:
    match = re.search(r"\d+", text.replace(",", ""))
    return int(match.group()) if match else None
