import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Brendan Cane - Portfolio",
  description: "Creative Director and UI/UX Designer specializing in web development and print media",
  icons: {
    icon: "/images/favicon/favicon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${spaceGrotesk.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
