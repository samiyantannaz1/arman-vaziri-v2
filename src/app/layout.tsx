import type { Metadata } from "next";
import { Inter, Syncopate } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import GoldenGlow from "@/components/GoldenGlow";
import Navbar from "@/components/Navbar";
import ContactFloat from "@/components/ContactFloat";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const wide = Syncopate({
  variable: "--font-wide",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Arman Vaziri | Architecture & Design",
    template: "%s | Arman Vaziri",
  },
  description: "Architecture and interior design by Arman Vaziri.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
   <html lang="en" className={`${inter.variable} ${wide.variable} antialiased`}>
      <body>
        <GoldenGlow />
        <Navbar />
        {children}
        <Footer />
          <ContactFloat />
      </body>
    </html>
  );
}