import type { ListingSearchParams } from '@/lib/listing'
export function FilterBar({ params, states = [], organizations = [], showCategory = false, categories = [] }: { params: ListingSearchParams; states?: string[]; organizations?: string[]; showCategory?: boolean; categories?: Array<{ slug: string; name: string; nameHindi: string | null }> }) {
  const input = 'min-h-11 rounded border border-slate-300 bg-white px-3 text-sm'
  return <form method="GET" className="mb-6 grid gap-3 rounded border border-border-subtle bg-white p-4 md:grid-cols-4" aria-label="Listing filters">
    {showCategory ? <select name="cat" defaultValue={params.cat || ''} className={input}><option value="">सभी श्रेणियां</option>{categories.map((category) => <option key={category.slug} value={category.slug}>{category.nameHindi || category.name}</option>)}</select> : null}
    {states.length ? <select name="state" defaultValue={params.state || ''} className={input}><option value="">सभी राज्य</option>{states.map((state) => <option key={state} value={state}>{state}</option>)}</select> : null}
    <input name="qualification" defaultValue={params.qualification || ''} placeholder="योग्यता" className={input} />
    {organizations.length ? <select name="organization" defaultValue={params.organization || ''} className={input}><option value="">सभी संगठन</option>{organizations.map((organization) => <option key={organization} value={organization}>{organization}</option>)}</select> : <input name="organization" defaultValue={params.organization || ''} placeholder="संगठन" className={input} />}
    <select name="badge" defaultValue={params.badge || ''} className={input}><option value="">सभी बैज</option><option value="NEW">NEW</option><option value="HOT">HOT</option><option value="LAST_DATE">LAST DATE</option><option value="RESULT">RESULT</option><option value="UPDATE">UPDATE</option></select>
    <input type="date" name="from" defaultValue={params.from || ''} aria-label="From date" className={input} /><input type="date" name="to" defaultValue={params.to || ''} aria-label="To date" className={input} />
    <select name="sort" defaultValue={params.sort || 'latest'} className={input}><option value="latest">नवीनतम</option><option value="oldest">सबसे पुराना</option><option value="most-viewed">सबसे ज्यादा देखा गया</option><option value="nearest-last-date">नजदीकी अंतिम तिथि</option><option value="alphabetical">नाम के अनुसार</option></select>
    <div className="flex gap-2"><button type="submit" className="min-h-11 flex-1 rounded bg-primary px-4 text-sm font-bold text-white hover:bg-primary-container">फिल्टर लगाएं</button><a href="?" className="flex min-h-11 items-center rounded border px-3 text-sm">रीसेट</a></div>
  </form>
}
