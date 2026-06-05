import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

import { MSWProvider } from "../components/MSWProvider";

export const metadata: Metadata = {
  title: "React Bank Dashboard",
  description: "Premium banking experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#maincontent" className="skipLink">
          Skip to main content
        </a>
        <MSWProvider>
          {children}
        </MSWProvider>
      </body>
    </html>
  );
}
