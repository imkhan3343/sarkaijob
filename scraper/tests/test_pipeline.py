from sarkarijob_scraper.models import RawEntry
from sarkarijob_scraper.normalizer import normalize_raw_entry
from sarkarijob_scraper.dedup import classify_dedup
def test_normalizer():
 c=normalize_raw_entry(RawEntry(source_slug='ssc',source_url='https://example.com',title='SSC Result 2026',raw_text='Result on 10/08/2026'))
 assert c.category_slug=='results' and c.badge_type=='RESULT' and c.slug=='ssc-result-2026'
def test_dedup():assert classify_dedup(95)=='auto_duplicate' and classify_dedup(85)=='review' and classify_dedup(70)=='new'
