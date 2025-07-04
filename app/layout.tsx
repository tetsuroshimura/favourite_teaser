import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Favourite",
  description: "Favouriteは、志村徹朗によるデザイン活動を行うスタジオです。オンスクリーンメディアのデザイン、グラフィックデザインを中心に、インターネット文化、自転車文化、絵画、ゲーム、アニメ、哲学、生活から得たアイデアを別の仕方でかたちにすることを試みています。委託制作から企画、文化、コミュニティへの貢献をやっていきます。お気軽にご相談ください。",
  metadataBase: new URL('https://favourite.design'),
  openGraph: {
    title: "Favourite",
    description: "Favouriteは、志村徹朗によるデザイン活動を行うスタジオです。オンスクリーンメディアのデザイン、グラフィックデザインを中心に、インターネット文化、自転車文化、絵画、ゲーム、アニメ、哲学、生活から得たアイデアを別の仕方でかたちにすることを試みています。委託制作から企画、文化、コミュニティへの貢献をやっていきます。お気軽にご相談ください。",
    images: [
      {
        url: '/ogp.png',
        width: 1200,
        height: 630,
        alt: 'Favourite - Design Studio by Tetsuro Shimura',
      }
    ],
    type: 'website',
    siteName: 'Favourite',
    locale: 'ja_JP',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Favourite",
    description: "Favouriteは、志村徹朗によるデザイン活動を行うスタジオです。オンスクリーンメディアのデザイン、グラフィックデザインを中心に、インターネット文化、自転車文化、絵画、ゲーム、アニメ、哲学、生活から得たアイデアを別の仕方でかたちにすることを試みています。委託制作から企画、文化、コミュニティへの貢献をやっていきます。お気軽にご相談ください。",
    images: ['/ogp.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Open Graph meta tags */}
        <meta property="og:title" content="Favourite" />
        <meta property="og:description" content="Favouriteは、志村徹朗によるデザイン活動を行うスタジオです。オンスクリーンメディアのデザイン、グラフィックデザインを中心に、インターネット文化、自転車文化、絵画、ゲーム、アニメ、哲学、生活から得たアイデアを別の仕方でかたちにすることを試みています。委託制作から企画、文化、コミュニティへの貢献をやっていきます。お気軽にご相談ください。" />
        <meta property="og:url" content="https://favourite.design/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://favourite.design/ogp.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        
        {/* Twitter Card meta tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Favourite" />
        <meta name="twitter:description" content="Favouriteは、志村徹朗によるデザイン活動を行うスタジオです。オンスクリーンメディアのデザイン、グラフィックデザインを中心に、インターネット文化、自転車文化、絵画、ゲーム、アニメ、哲学、生活から得たアイデアを別の仕方でかたちにすることを試みています。委託制作から企画、文化、コミュニティへの貢献をやっていきます。お気軽にご相談ください。" />
        <meta name="twitter:image" content="https://favourite.design/ogp.png" />
        
        <link rel="stylesheet" href="https://morisawafonts.net/c/01JYMVWWK1RZRSMGX144DJKKTR/mf.css" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansJP.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
