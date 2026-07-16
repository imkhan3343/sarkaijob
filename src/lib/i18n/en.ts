export const en = {
  siteName: 'SarkariJob',
  siteTagline: 'Reliable government jobs, results and admit-card information',
  nav: {
    home: 'Home',
    latestJobs: 'Latest Jobs',
    admitCard: 'Admit Card',
    result: 'Results',
    answerKey: 'Answer Key',
    syllabus: 'Syllabus',
  },
  sections: {
    flashNews: 'FLASH NEWS',
    featured: 'Featured Updates',
    results: 'Results',
    admitCards: 'Admit Cards',
    latestJobs: 'Latest Jobs',
    answerKey: 'Answer Key',
    syllabus: 'Syllabus',
    admission: 'Admission',
    documents: 'Document Services',
    states: 'State Jobs',
    disclaimer: 'Important Notice',
    viewMore: 'View More »',
    noPosts: 'No posts are available yet.',
  },
  search: {
    placeholder: 'Search jobs...',
    action: 'Search',
  },
  quickLinks: {
    tenth: '10th Pass Jobs',
    twelfth: '12th Pass Jobs',
    graduate: 'Graduate Jobs',
    allIndia: 'All India Jobs',
    action: 'View details',
  },
  footer: {
    quickLinks: 'Quick Links',
    states: 'States',
    about: 'About',
    rights: 'All rights reserved.',
  },
  accessibility: {
    skipToContent: 'Skip to main content',
    primaryNavigation: 'Primary navigation',
    mobileNavigation: 'Mobile navigation',
    searchLabel: 'Search government jobs',
    quickLinks: 'Popular job categories',
    breakingNews: 'Breaking updates',
  },
} as const

export type EnStrings = typeof en
