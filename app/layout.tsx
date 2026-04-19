import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"

const BASE_URL = "https://invoice.moneystom7.com"

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "견적서 생성기 — MoneyStom7",
    template: "%s | MoneyStom7",
  },
  description: "간단한 입력으로 견적서를 즉시 출력. 무료 온라인 견적서 생성기. Free online invoice maker. Create and print professional invoices instantly. No registration needed.",
  keywords: ["견적서 생성기", "Invoice Maker", "무료", "온라인", "계산기", "invoice maker", "invoice generator", "free invoice", "invoice template"],
  authors: [{ name: "MoneyStom7" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "견적서 생성기 — MoneyStom7",
    description: "간단한 입력으로 견적서를 즉시 출력. 무료 온라인 견적서 생성기.",
    url: BASE_URL,
    siteName: "MoneyStom7",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "견적서 생성기 — MoneyStom7",
    description: "간단한 입력으로 견적서를 즉시 출력. 무료 온라인 견적서 생성기.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        {children}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8414331859152952"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
