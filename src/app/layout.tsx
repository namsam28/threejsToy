import "./globals.css";

import type {Metadata} from "next";

export const metadata: Metadata = {
  title: "three.js toy",
  description: "three.js 연습장",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`antialiased`}>
        <main>{children}</main>
        {/* svg symbol // */}
      </body>
    </html>
  );
}
