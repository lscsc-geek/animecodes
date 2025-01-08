import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import Script from "next/script";
import { getCanonicalUrl } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: React.ReactNode;
  params: any;
}

export async function generateMetadata({ params }: RootLayoutProps): Promise<Metadata> {
  // 获取当前路径
  const path = params?.slug ? params.slug.join('/') : '';
  
  return {
    title: "AnimeCodes - The Ultimate Anime Gaming Codes Hub",
    description: "Get the latest game codes, guides, and updates for popular anime-themed games. Find verified codes and exclusive rewards for your favorite games.",
    alternates: {
      canonical: getCanonicalUrl(path)
    }
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4514454519275192"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
        >
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "pqwicv5hht");
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="flex">
          <Sidebar />
          <main className="flex-1">
            {children}
            <Footer />
          </main>
        </div>
      </body>
    </html>
  );
}
