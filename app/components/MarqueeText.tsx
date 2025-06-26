'use client';

export default function MarqueeText() {
  const marqueeText = "New Web Site Coming Soon! ";
  // Repeat the text multiple times to ensure seamless scrolling
  const repeatedText = marqueeText.repeat(20);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 flex items-center">
      <div 
        className="w-full overflow-hidden"
        style={{
          height: 'clamp(80px, 8vw, 160px)'
        }}
      >
        <div 
          className="whitespace-nowrap font-bold animate-marquee"
          style={{
            fontFamily: 'Monument Grotesk, sans-serif',
            fontSize: 'clamp(80px, 5.56vw, 120px)',
            lineHeight: 'clamp(80px, 8vw, 160px)',
            letterSpacing: '2px',
            fontWeight: 400,
            color: '#AF9689'
          }}
        >
          {repeatedText}
        </div>
      </div>
    </div>
  );
}