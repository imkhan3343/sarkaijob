export function internalLinks(input: { organization?: string | null; qualification?: string | null; state?: string | null; categorySlug?: string | null }) {
  const slug = (value: string) => encodeURIComponent(value.toLowerCase().replace(/\s+/g, '-'))
  const links: Array<{ label: string; href: string }> = []
  if (input.organization) links.push({ label: `${input.organization} Jobs`, href: `/organization/${slug(input.organization)}` })
  if (input.qualification) links.push({ label: `${input.qualification} Jobs`, href: `/qualification/${slug(input.qualification)}` })
  if (input.state) links.push({ label: `${input.state} Jobs`, href: `/search?state=${encodeURIComponent(input.state)}` })
  if (input.categorySlug) links.push({ label: 'Related Category', href: `/category/${input.categorySlug}` })
  return links
}
