import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get('title') || 'The Bitcoin Insurance Company';
  const description = searchParams.get('description') || 'Protect your Bitcoin holdings against market volatility';
  const type = searchParams.get('type') || 'default'; // default, protection, income
  
  // Determine colors based on type
  let bgColor = '#111827'; // default dark background
  let accentColor = '#3B82F6'; // default blue accent
  
  if (type === 'protection') {
    bgColor = '#1E3A8A'; // dark blue for protection
    accentColor = '#3B82F6'; // blue accent
  } else if (type === 'income') {
    bgColor = '#92400E'; // amber/orange for income
    accentColor = '#F59E0B'; // amber accent
  }
  
  try {
    // Font loading can be moved to a separate function
    const interSemiBold = fetch(
      new URL('/public/fonts/Inter-SemiBold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    
    const interBold = fetch(
      new URL('/public/fonts/Inter-Bold.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    
    const [interSemiBoldData, interBoldData] = await Promise.all([
      interSemiBold,
      interBold,
    ]);
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: bgColor,
            color: 'white',
            padding: '40px 80px',
            fontFamily: 'Inter',
          }}
        >
          <div 
            style={{
              position: 'absolute',
              top: 30,
              left: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Logo can be an imported image or SVG */}
            <svg height="48" width="48" viewBox="0 0 24 24" fill="white">
              <path d="M11.5 2C6.81 2 3 5.81 3 10.5S6.81 19 11.5 19h.5v3c4.86-2.34 8-7 8-11.5C20 5.81 16.19 2 11.5 2zm1 14.5h-2v-2h2v2zm0-3.5h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2h-2c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z" />
            </svg>
            <div style={{ marginLeft: '10px', fontSize: '24px', fontWeight: 'bold' }}>
              BitHedge
            </div>
          </div>
          
          <div 
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '20px',
              maxWidth: '900px',
            }}
          >
            <h1 
              style={{ 
                fontSize: '64px', 
                fontWeight: 'bold',
                textAlign: 'center',
                margin: '0 0 20px 0',
                lineHeight: 1.1,
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '28px',
                textAlign: 'center',
                margin: '0 0 40px 0',
                color: '#d1d5db',
                lineHeight: 1.3,
              }}
            >
              {description}
            </p>
          </div>
          
          <div 
            style={{
              position: 'absolute',
              bottom: 40,
              borderRadius: '10px',
              backgroundColor: accentColor,
              padding: '12px 24px',
              fontSize: '22px',
              fontWeight: 'bold',
            }}
          >
            {type === 'income' ? 'Generate Bitcoin Income' : 'Protect Your Bitcoin'}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: interSemiBoldData,
            style: 'normal',
            weight: 600,
          },
          {
            name: 'Inter',
            data: interBoldData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(`Failed to generate image: ${e}`, {
      status: 500,
    });
  }
} 