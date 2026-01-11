import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#4A9F6D" },
    { media: "(prefers-color-scheme: dark)", color: "#0F1419" },
  ],
};

export const metadata: Metadata = {
  title: "숲속의바다 펜션 | 태안 안면도 프리미엄 오션뷰 펜션",
  description: "태안 안면도의 소나무 숲과 서해 바다가 만나는 곳. 전 객실 오션뷰, 개별 바베큐 테라스, 프라이빗 스파. 파도 소리로 잠들고 새소리로 눈뜨는 특별한 휴식.",
  keywords: "태안펜션, 안면도펜션, 오션뷰, 바다전망, 수영장, 스파, 바베큐, 갯벌체험, 숲속의바다, 프리미엄펜션, 독채펜션",
  authors: [{ name: "숲속의바다" }],
  manifest: "/manifest.json",
  openGraph: {
    title: "숲속의바다 펜션 | 태안 안면도 프리미엄 오션뷰",
    description: "태안 안면도의 소나무 숲과 서해 바다가 만나는 곳. 전 객실 오션뷰, 개별 바베큐 테라스, 프라이빗 스파.",
    url: "https://woodinsea.com",
    siteName: "숲속의바다 펜션",
    images: [
      {
        url: "http://www.woodinsea.com/html/img/gallery/main/1.jpg",
        width: 1200,
        height: 630,
        alt: "숲속의바다 펜션 전경",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "숲속의바다 펜션 | 태안 안면도 프리미엄 오션뷰",
    description: "전 객실 오션뷰, 개별 바베큐 테라스, 프라이빗 스파",
    images: ["http://www.woodinsea.com/html/img/gallery/main/1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "숲속의바다",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
