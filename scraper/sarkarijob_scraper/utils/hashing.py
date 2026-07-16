import hashlib
from .text import clean_text
def sha256(v:str)->str:return hashlib.sha256(v.encode()).hexdigest()
def normalized_title_hash(t:str)->str:return sha256(clean_text(t).lower())
