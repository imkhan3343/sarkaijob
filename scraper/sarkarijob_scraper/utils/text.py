import re,unicodedata
def clean_text(v:str|None)->str:return re.sub(r'\s+',' ',unicodedata.normalize('NFKC',v or '')).strip()
def slugify(v:str)->str:return re.sub(r'(^-|-$)','',re.sub(r'[^a-z0-9]+','-',clean_text(v).lower()))[:160]
def detect_category(t:str)->str:
 x=t.lower()
 if any(w in x for w in ['result','merit list','score card']):return 'results'
 if any(w in x for w in ['admit card','hall ticket','call letter']):return 'admit-card'
 if any(w in x for w in ['answer key','response sheet']):return 'answer-key'
 if any(w in x for w in ['syllabus','exam pattern']):return 'syllabus'
 if any(w in x for w in ['admission','counselling']):return 'admission'
 if any(w in x for w in ['yojana','scheme']):return 'sarkari-yojana'
 return 'latest-job'
def detect_badge(t:str):
 x=t.lower()
 if 'result' in x:return('RESULT','RESULT')
 if 'last date' in x:return('LAST DATE','LAST_DATE')
 if 'answer key' in x:return('ANSWER KEY','UPDATE')
 if 'admit card' in x:return('ADMIT CARD','UPDATE')
 return('NEW','NEW')
