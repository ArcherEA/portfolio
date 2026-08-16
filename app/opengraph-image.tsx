import { ImageResponse } from 'next/og';
import { PERSONAL_INFO } from '@/lib/personal_data';

// Route segment config
export const alt = `${PERSONAL_INFO.name} | Full Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Dynamically generated 1200x630 social card (og:image + twitter:image).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b3d 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', color: '#22d3ee', fontSize: 30, letterSpacing: 4, marginBottom: 24 }}>
          &lt;/ PORTFOLIO &gt;
        </div>
        <div style={{ display: 'flex', color: '#ffffff', fontSize: 88, fontWeight: 700, lineHeight: 1.1 }}>
          {PERSONAL_INFO.name}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 28,
            fontSize: 42,
            fontWeight: 700,
            color: 'transparent',
            backgroundImage: 'linear-gradient(90deg, #ec4899, #22d3ee)',
            backgroundClip: 'text',
            // @ts-expect-error non-standard but supported by Satori
            '-webkit-background-clip': 'text',
          }}
        >
          Full Stack Developer
        </div>
        <div style={{ display: 'flex', marginTop: 40, fontSize: 26, color: '#94a3b8' }}>
          React · Next.js · Vue · Node.js · iOS
        </div>
      </div>
    ),
    { ...size }
  );
}
