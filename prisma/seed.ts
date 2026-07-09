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
