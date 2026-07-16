from difflib import SequenceMatcher
from .models import NormalizedCandidate
def score_duplicate(c:NormalizedCandidate,e:dict)->int:
 if c.source_url==e.get('notificationLink'):return 100
 if c.slug==e.get('slug') or c.normalized_title_hash==e.get('normalizedTitleHash'):return 95
 score=round(SequenceMatcher(None,c.title.lower(),str(e.get('title','')).lower()).ratio()*100)
 if c.organization and c.organization==e.get('organization'):score+=5
 return min(score,100)
def classify_dedup(s:int)->str:return 'auto_duplicate' if s>=95 else 'review' if s>=80 else 'new'
