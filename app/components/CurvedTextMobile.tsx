'use client';

export default function CurvedTextMobile() {

  return (
    <svg 
      width="393" 
      height="595" 
      viewBox="0 0 393 595" 
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      style={{ 
        overflow: 'visible'
      }}
    >
      <defs>
        {/* Mobile text path from human_text01_sp.svg */}
        <path 
          id="textPathMobile" 
          d="M265 11.5C285.5 20 289 34.5 300.5 58C324.5 69.5 328.5 58 358 82.5C380.329 101.045 374.5 129 366 147C356.469 167.184 326 178 310.5 176C298.1 174.4 282.333 167.5 276.5 162C256 186.5 258 204.667 256 220.5C271.5 235.5 277.5 248 281 261.5C284.5 275 274.5 290.5 266.5 299.5C258.5 308.5 172 420 164 437.5C156 455 164 488.5 164 498C164 507.5 144.5 525 137.5 531C130.5 537 117 539 104.5 540.5C92 542 82.0461 533.854 79 527C75 518 74 512 75 502.5C76 493 69.5 478.5 61.5 461C53.5 443.5 64 433 69.5 424C75 415 92.5 417.5 93.5 413.5C94.5 409.5 113.5 343.5 117 332.5C119.8 323.7 129.833 311.5 134.5 306.5L130 293.5C74.5 298.5 35.5 277 22.5 265C9.5 253 0.5 215 0.5 197C0.5 179 22.5 140 45 122C64.6191 106.305 113 77 126 58C139 39 156.5 17 180 5.99999C203.5 -5.00001 241.251 1.65271 265 11.5Z"
          transform="translate(9.5, 27)"
        />
      </defs>
      
      {/* Japanese text following the mobile path */}
      <text 
        className="fill-gray-800 font-medium"
        style={{ 
          fontFamily: 'MFW-PIshiiGothicStdN-M',
          fontSize: 'clamp(8px, 2.5vw, 12px)',
          letterSpacing: '0px'
        }}
      >
        <textPath href="#textPathMobile" startOffset="0%">
          Favouriteは、webデザイナーの志村徹朗によるデザインスタジオです。webデザイン、グラフィックデザインを中心にできることをやっていきます。インターネット文化や、自転車、絵画の考え方を応用しながら、あらゆる形を作り出す手伝いを行います。自主企画での制作や、コミュニティへの貢献活動も含みます。気軽にご相談ください。
        </textPath>
      </text>
    </svg>
  );
}