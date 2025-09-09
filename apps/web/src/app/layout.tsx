import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@repo/ui/globals.css";

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
});

export const metadata: Metadata = {
  title: "Turbo template with shadcn UI",
  description: "Turbo + Next.js + Tailwind CSS + shadcn UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
        {children}
      </body>
    </html>
  );
}
