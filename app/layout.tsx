import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "./components/ThemeProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.fatiya.dev"),
  title: { default: "Fatiya Quzza | Web & Mobile Developer", template: "%s | Fatiya Quzza" },
  description: "Portfolio of Fatiya Quzza, a web and mobile developer building reliable, user-friendly digital products.",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Fatiya Quzza | Portfolio",
    description:
      "A personal portfolio that blends functionality and elegance, built using Next.js and modular React Bits.",
    siteName: "Fatiya's Portfolio",
    locale: "en_US",
    type: "website",
    url: "/",
    images: [{ url: "/assets/images/qflora.png", alt: "Fatiya Quzza portfolio preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fatiya Quzza | Portfolio",
    description: "Web and mobile projects by Fatiya Quzza.",
    images: ["/assets/images/qflora.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <noscript><style>{'[data-aos] { opacity: 1 !important; transform: none !important; } .theme-toggle { display: none !important; }'}</style></noscript>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
