import re
from datetime import datetime
from dateutil import parser
PATTERNS=[r'\b\d{1,2}[/-]\d{1,2}[/-]\d{2,4}\b',r'\b\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4}\b']
def extract_dates(text:str):
 out=[]
 for p in PATTERNS:
  for m in re.findall(p,text,re.I):
   try:out.append(parser.parse(m,dayfirst=True))
   except Exception:pass
 return out
def infer_dates(text:str):
 d=extract_dates(text);return{'application_start_date':d[0] if d else None,'application_end_date':d[1] if len(d)>1 else(d[0] if d else None)}
