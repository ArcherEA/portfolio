import MainApp from '@/components/Portfolio';
import { getAllPosts } from '@/lib/blog';
import { PERSONAL_INFO } from '@/lib/personal_data';

// TODO: change to the custom domain once it's live (also in layout/sitemap/robots).
const SITE_URL = 'https://yukuan.dpdns.org';

// JSON-LD Person schema — helps Google understand this site represents a person
// (a developer) and links it to the GitHub/LinkedIn profiles for the same entity.
const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: PERSONAL_INFO.name,
  url: SITE_URL,
  jobTitle: 'Full Stack Developer',
  email: PERSONAL_INFO.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Sherbrooke',
    addressRegion: 'Quebec',
    addressCountry: 'CA',
  },
  sameAs: [PERSONAL_INFO.github, PERSONAL_INFO.linkedin],
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: "Bishop's University" },
    { '@type': 'CollegeOrUniversity', name: 'Jilin University' },
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'Vue.js',
    'Node.js',
    'TypeScript',
    'Swift',
    'iOS Development',
    'Full Stack Development',
  ],
};

export default function Home() {
  // Read posts server-side (fs) and pass metadata to the client app.
  const posts = getAllPosts().map(({ content, ...meta }) => meta);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <MainApp posts={posts} />
    </>
  );
}
