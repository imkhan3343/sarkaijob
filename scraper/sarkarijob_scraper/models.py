from datetime import datetime
from enum import Enum
from pydantic import BaseModel,Field
class BadgeType(str,Enum): NEW='NEW';HOT='HOT';LAST_DATE='LAST_DATE';RESULT='RESULT';UPDATE='UPDATE'
class RawEntry(BaseModel):
 source_slug:str;source_url:str;title:str|None=None;raw_html:str|None=None;raw_text:str|None=None;raw_json:dict|None=None
class NormalizedCandidate(BaseModel):
 source_slug:str;source_url:str;title:str;slug:str;excerpt:str|None=None;content:str|None=None;category_slug:str|None=None;badge_text:str|None=None;badge_type:BadgeType|None=None;organization:str|None=None;state:str|None=None;qualification:str|None=None;total_posts:int|None=None;application_start_date:datetime|None=None;application_end_date:datetime|None=None;normalized_title_hash:str|None=None;dedup_score:int=Field(0,ge=0,le=100)
