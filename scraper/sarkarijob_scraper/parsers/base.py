from abc import ABC,abstractmethod
from ..models import RawEntry,NormalizedCandidate
class BaseScraper(ABC):
 source_slug:str
 @abstractmethod
 async def fetch_list(self)->list[str]:...
 @abstractmethod
 async def fetch_detail(self,url:str)->RawEntry:...
 @abstractmethod
 def normalize(self,raw:RawEntry)->NormalizedCandidate:...
 async def run(self):return[self.normalize(await self.fetch_detail(u)) for u in await self.fetch_list()]
