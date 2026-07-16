import Link from 'next/link'
export type BreadcrumbItem = { name: string; href: string }
export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return <nav aria-label="Breadcrumb" className="mb-5 text-sm text-slate-600"><ol className="flex flex-wrap items-center gap-2">{items.map((item, index) => <li key={`${item.href}-${index}`} className="flex items-center gap-2">{index ? <span aria-hidden="true">/</span> : null}{index === items.length - 1 ? <span aria-current="page" className="line-clamp-1 font-medium text-slate-800">{item.name}</span> : <Link href={item.href} className="text-secondary hover:underline">{item.name}</Link>}</li>)}</ol></nav>
}
