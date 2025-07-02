import type { Metadata } from "next";
import { Outfit, Kanit } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gabriel H. Nehls - UX Designer",
  description: "Portfolio of Gabriel H. Nehls, UX Designer specialized in AI and WEB3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${kanit.variable} antialiased`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
