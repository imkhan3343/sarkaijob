import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const categories = [
    { name: 'Results', slug: 'results', nameHindi: 'रिजल्ट', sortOrder: 1 },
    { name: 'Admit Cards', slug: 'admit-card', nameHindi: 'एडमिट कार्ड', sortOrder: 2 },
    { name: 'Latest Jobs', slug: 'latest-job', nameHindi: 'नवीनतम भर्ती', sortOrder: 3 },
    { name: 'Answer Key', slug: 'answer-key', nameHindi: 'उत्तर कुंजी', sortOrder: 4 },
    { name: 'Syllabus', slug: 'syllabus', nameHindi: 'पाठ्यक्रम', sortOrder: 5 },
    { name: 'Admission', slug: 'admission', nameHindi: 'प्रवेश', sortOrder: 6 },
    { name: 'Documents', slug: 'documents', nameHindi: 'दस्तावेज़', sortOrder: 7 },
    { name: 'Sarkari Yojana', slug: 'sarkari-yojana', nameHindi: 'सरकारी योजना', sortOrder: 8 },
    { name: 'Scholarship', slug: 'scholarship', nameHindi: 'छात्रवृत्ति', sortOrder: 9 },
    { name: 'Career News', slug: 'career-news', nameHindi: 'करियर समाचार', sortOrder: 10 },
    { name: 'Notice', slug: 'notice', nameHindi: 'सूचना', sortOrder: 11 },
    { name: 'Tools', slug: 'tools', nameHindi: 'उपकरण', sortOrder: 12 },
  ]

  const states = [
    { name: 'All India', slug: 'all-india', nameHindi: 'अखिल भारतीय', sortOrder: 0 },
    { name: 'Uttar Pradesh', slug: 'uttar-pradesh', nameHindi: 'उत्तर प्रदेश', sortOrder: 1 },
    { name: 'Bihar', slug: 'bihar', nameHindi: 'बिहार', sortOrder: 2 },
    { name: 'Rajasthan', slug: 'rajasthan', nameHindi: 'राजस्थान', sortOrder: 3 },
    { name: 'Madhya Pradesh', slug: 'madhya-pradesh', nameHindi: 'मध्य प्रदेश', sortOrder: 4 },
    { name: 'Delhi', slug: 'delhi', nameHindi: 'दिल्ली', sortOrder: 5 },
    { name: 'Jharkhand', slug: 'jharkhand', nameHindi: 'झारखंड', sortOrder: 6 },
  ]

  const settings = [
    { key: 'site_name', value: 'SarkariJob', valueHindi: 'सरकारीजॉब', group: 'general', description: 'Site name' },
    { key: 'site_tagline', value: 'Government Jobs, Results, Admit Cards', valueHindi: 'सरकारी नौकरी, रिजल्ट, एडमिट कार्ड', group: 'general', description: 'Site tagline' },
    { key: 'contact_email', value: 'contact@sarkarijob.local', group: 'contact', description: 'Contact email' },
    { key: 'default_meta_title', value: 'SarkariJob - Government Jobs, Results, Admit Cards', valueHindi: 'सरकारीजॉब - सरकारी नौकरी, रिजल्ट, एडमिट कार्ड', group: 'seo', description: 'Default meta title' },
    { key: 'default_meta_description', value: 'Find latest government jobs, results, admit cards, answer keys and syllabus for Sarkari Naukri across India.', valueHindi: 'देश भर में सरकारी नौकरी, रिजल्ट, एडमिट कार्ड, उत्तर कुंजी और पाठ्यक्रम खोजें।', group: 'seo', description: 'Default meta description' },
    { key: 'footer_disclaimer', value: 'SarkariJob is an independent information portal and is not affiliated with any government body or organization. All job, result, admit card, and exam data is aggregated for convenience — users must verify every detail from the official notification before acting.', valueHindi: 'सरकारीजॉब एक स्वतंत्र सूचना पोर्टल है और किसी सरकारी निकाय या संगठन से संबद्ध नहीं है। सभी नौकरी, रिजल्ट, एडमिट कार्ड और परीक्षा डेटा सुविधा के लिए एकत्र किया गया है - उपयोगकर्ताओं को कार्रवाई करने से पहले आधिकारिक अधिसूचना से प्रत्येक विवरण सत्यापित करना होगा।', group: 'footer', description: 'Footer disclaimer' },
    { key: 'logo_text', value: 'SarkariJob', valueHindi: 'सरकारीजॉब', group: 'branding', description: 'Logo text' },
    { key: 'launch_year', value: '2024', group: 'general', description: 'Launch year' },
  ]

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    })
  }

  for (const st of states) {
    await prisma.statePage.upsert({
      where: { slug: st.slug },
      update: st,
      create: st,
    })
  }

  for (const s of settings) {
    await prisma.siteSetting.upsert({
      where: { key: s.key },
      update: s,
      create: s,
    })
  }

  const hashedPassword = await bcrypt.hash('Admin@123', 12)
  await prisma.adminUser.upsert({
    where: { email: 'admin@sarkarijob.local' },
    update: {},
    create: {
      email: 'admin@sarkarijob.local',
      password: hashedPassword,
      name: 'Admin',
      role: Role.ADMIN,
    },
  })

  const nationalSources = [
    { name: 'SSC', slug: 'ssc', websiteUrl: 'https://ssc.nic.in', baseUrl: 'https://ssc.nic.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 30, categorySlug: 'latest-job' },
    { name: 'UPSC', slug: 'upsc', websiteUrl: 'https://upsc.gov.in', baseUrl: 'https://upsc.gov.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 30, categorySlug: 'latest-job' },
    { name: 'RRB', slug: 'rrb', websiteUrl: 'https://rrb.gov.in', baseUrl: 'https://rrb.gov.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 30, categorySlug: 'latest-job' },
    { name: 'IBPS', slug: 'ibps', websiteUrl: 'https://ibps.in', baseUrl: 'https://ibps.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 30, categorySlug: 'latest-job' },
    { name: 'SBI', slug: 'sbi', websiteUrl: 'https://sbi.co.in', baseUrl: 'https://sbi.co.in/careers', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, categorySlug: 'latest-job' },
    { name: 'RBI', slug: 'rbi', websiteUrl: 'https://rbi.org.in', baseUrl: 'https://rbi.org.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, categorySlug: 'latest-job' },
    { name: 'Indian Navy', slug: 'indian-navy', websiteUrl: 'https://joinindiannavy.gov.in', baseUrl: 'https://joinindiannavy.gov.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 120, categorySlug: 'latest-job' },
    { name: 'Indian Airforce', slug: 'indian-airforce', websiteUrl: 'https://indianairforce.nic.in', baseUrl: 'https://indianairforce.nic.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 120, categorySlug: 'latest-job' },
    { name: 'Indian Army', slug: 'indian-army', websiteUrl: 'https://joinindianarmy.nic.in', baseUrl: 'https://joinindianarmy.nic.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 120, categorySlug: 'latest-job' },
    { name: 'NTA', slug: 'nta', websiteUrl: 'https://nta.ac.in', baseUrl: 'https://nta.ac.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 30, categorySlug: 'results' },
    { name: 'AIIMS', slug: 'aiims', websiteUrl: 'https://aiims.edu', baseUrl: 'https://aiims.edu', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 120, categorySlug: 'latest-job' },
    { name: 'DRDO', slug: 'drdo', websiteUrl: 'https://drdo.gov.in', baseUrl: 'https://drdo.gov.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 120, categorySlug: 'latest-job' },
    { name: 'EPFO', slug: 'epfo', websiteUrl: 'https://epfindia.gov.in', baseUrl: 'https://epfindia.gov.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 120, categorySlug: 'latest-job' },
    { name: 'ESIC', slug: 'esic', websiteUrl: 'https://esic.gov.in', baseUrl: 'https://esic.gov.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 120, categorySlug: 'latest-job' },
    { name: 'BPSC', slug: 'bpsc', websiteUrl: 'https://bpsc.bihar.gov.in', baseUrl: 'https://bpsc.bihar.gov.in', sourceType: 'STATE' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, stateSlug: 'bihar', categorySlug: 'latest-job' },
    { name: 'UPPSC', slug: 'uppsc', websiteUrl: 'https://uppsc.up.nic.in', baseUrl: 'https://uppsc.up.nic.in', sourceType: 'STATE' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, stateSlug: 'uttar-pradesh', categorySlug: 'latest-job' },
    { name: 'UP Police', slug: 'up-police', websiteUrl: 'https://uppbpb.gov.in', baseUrl: 'https://uppbpb.gov.in', sourceType: 'STATE' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, stateSlug: 'uttar-pradesh', categorySlug: 'latest-job' },
    { name: 'MPPSC', slug: 'mppsc', websiteUrl: 'https://mppsc.mp.gov.in', baseUrl: 'https://mppsc.mp.gov.in', sourceType: 'STATE' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, stateSlug: 'madhya-pradesh', categorySlug: 'latest-job' },
    { name: 'RPSC', slug: 'rpsc', websiteUrl: 'https://rpsc.rajasthan.gov.in', baseUrl: 'https://rpsc.rajasthan.gov.in', sourceType: 'STATE' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, stateSlug: 'rajasthan', categorySlug: 'latest-job' },
    { name: 'DSSSB', slug: 'dsssb', websiteUrl: 'https://dsssb.delhi.gov.in', baseUrl: 'https://dsssb.delhi.gov.in', sourceType: 'STATE' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, stateSlug: 'delhi', categorySlug: 'latest-job' },
    { name: 'HSSC', slug: 'hssc', websiteUrl: 'https://hssc.gov.in', baseUrl: 'https://hssc.gov.in', sourceType: 'STATE' as const, parserType: 'HTML_LIST' as const, scheduleMin: 60, stateSlug: null, categorySlug: 'latest-job' },
    { name: 'Pan Card', slug: 'pan-card', websiteUrl: 'https://www.tin-nsdl.com', baseUrl: 'https://www.tin-nsdl.com', sourceType: 'UTILITY' as const, parserType: 'HTML_LIST' as const, scheduleMin: 1440, categorySlug: 'documents' },
    { name: 'Aadhaar Card', slug: 'aadhaar-card', websiteUrl: 'https://uidai.gov.in', baseUrl: 'https://uidai.gov.in', sourceType: 'UTILITY' as const, parserType: 'HTML_LIST' as const, scheduleMin: 1440, categorySlug: 'documents' },
    { name: 'Voter ID', slug: 'voter-id', websiteUrl: 'https://eci.gov.in', baseUrl: 'https://eci.gov.in', sourceType: 'UTILITY' as const, parserType: 'HTML_LIST' as const, scheduleMin: 1440, categorySlug: 'documents' },
    { name: 'Scholarship Portal', slug: 'scholarship-portal', websiteUrl: 'https://scholarships.gov.in', baseUrl: 'https://scholarships.gov.in', sourceType: 'NATIONAL' as const, parserType: 'HTML_LIST' as const, scheduleMin: 360, categorySlug: 'scholarship' },
  ]

  const categoriesMap = new Map<string, string>()
  for (const c of await prisma.category.findMany()) { categoriesMap.set(c.slug, c.id) }
  const statesMap = new Map<string, string>()
  for (const s of await prisma.statePage.findMany()) { statesMap.set(s.slug, s.id) }

  for (const src of nationalSources) {
    await prisma.sourceRegistry.upsert({
      where: { slug: src.slug },
      update: {},
      create: {
        name: src.name,
        slug: src.slug,
        websiteUrl: src.websiteUrl,
        sourceType: src.sourceType,
        parserType: src.parserType,
        baseUrl: src.baseUrl,
        scheduleMin: src.scheduleMin,
        categoryId: categoriesMap.get(src.categorySlug) || undefined,
        stateId: src.stateSlug ? (statesMap.get(src.stateSlug) || undefined) : undefined,
      },
    })
  }

  console.log('Seed completed successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
