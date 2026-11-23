import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
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

const siteUrl = "https://despachafacil.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Despacha Fácil — SaaS de Catálogos & Despachos para Redes Sociales",
    template: "%s | Despacha Fácil",
  },
  description:
    "El software para marcas de ropa y emprendedores en Perú. Catálogo web móvil, pedidos directos a WhatsApp con foto de comprobante Yape/Plin, cero sobreventas en Lives y control de envíos Olva Courier & Shalom.",
  keywords: [
    "despacha facil",
    "catalogo virtual peru",
    "ventas por whatsapp peru",
    "pedidos yape plin",
    "control de stock tiktok live",
    "olva courier despachos",
    "shalom envios ecommerce",
    "saas comercio social peru",
    "catalogo movil para tiendas de ropa",
    "sistema de pedidos whatsapp",
  ],
  authors: [{ name: "Despacha Fácil", url: siteUrl }],
  creator: "Despacha Fácil",
  publisher: "Despacha Fácil",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/favicon.ico?v=2",
  },
  openGraph: {
    title: "Despacha Fácil — Vende Más Sin Caos y en un Clic",
    description:
      "Catálogo web móvil con apartado de prendas en tiempo real, pedidos ordenados a WhatsApp con Yape/Plin y gestión de despachos Olva Courier & Shalom.",
    url: siteUrl,
    siteName: "Despacha Fácil",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/perfil.png",
        width: 1121,
        height: 1121,
        alt: "Despacha Fácil",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Despacha Fácil — Vende Más Sin Caos",
    description:
      "Catálogo web móvil, pedidos a WhatsApp y control de despachos para tiendas de ropa en Perú.",
    images: ["/perfil.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://despachafacil.com/#software",
      name: "Despacha Fácil",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "49.00",
        priceCurrency: "PEN",
        priceValidUntil: "2027-12-31",
      },
      description:
        "Plataforma de catálogo web móvil con apartado automático de prendas, checkout a WhatsApp y gestión de envíos con Olva Courier y Shalom para marcas en Perú.",
      url: "https://despachafacil.com",
    },
    {
      "@type": "Organization",
      "@id": "https://despachafacil.com/#organization",
      name: "Despacha Fácil",
      url: "https://despachafacil.com",
      logo: "https://despachafacil.com/despacha-facil-logo.webp",
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: ["PE", "LATAM"],
        availableLanguage: "Spanish",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-LVCSNBYSMK";

  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        {gaMeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}', {
                  page_path: window.location.pathname,
                });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
