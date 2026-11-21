import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "GameHub PRO — Gaming platform",
  description: "GameHub gaming library, competitions, community and AI assistant."
};
export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en"><body>{children}</body></html>;
}
