import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Despacha Fácil — SaaS de Catálogos & Despachos para Redes Sociales",
  description:
    "El SaaS que elimina sobreventas por WhatsApp y organiza tus despachos con reserva atómica en tiempo real.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/df-isotipo.webp", type: "image/webp" },
    ],
    shortcut: "/favicon.ico",
    apple: "/df-isotipo.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
