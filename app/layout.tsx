import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import ClarityProvider from "./components/ClarityProvider";
import "./globals.css";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "KashKick Games",
  description: "KashKick OTT Game Wall",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="bg-white">
        <ClarityProvider />
        {children}
      </body>
    </html>
  );
}
