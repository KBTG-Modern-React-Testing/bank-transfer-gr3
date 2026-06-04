import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

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
        {children}
      </body>
    </html>
  );
}
