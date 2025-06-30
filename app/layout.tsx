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
    <html lang="en">
      <head>
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
