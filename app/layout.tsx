import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Fatiya's Portfolio",
  description: "Portfolio using Next.js",
  openGraph: {
    title: "Fatiya Quzza | Portfolio",
    description:
      "A personal portfolio that blends functionality and elegance, built using Next.js and modular React Bits.",
    siteName: "Fatiya's Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
        <html lang="en" className="scroll-smooth">
          <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <body className={`${poppins.variable} font-sans antialiased`}>
          {children}
        </body>
      </html>
  );
}
