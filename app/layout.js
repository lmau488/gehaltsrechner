export const metadata = {
  title: 'Brutto Netto Rechner 2025 – Gehaltsrechner kostenlos | GehaltsCheck.de',
  description: 'Kostenloser Brutto-Netto-Rechner 2025: Nettolohn berechnen mit allen Steuerklassen, Kirchensteuer, Sozialabgaben. Sofort-Ergebnis ohne Anmeldung.',
  keywords: 'Brutto Netto Rechner, Gehaltsrechner, Nettolohn, Steuerklasse, Lohnsteuer, Sozialabgaben, Brutto Netto 2025, Gehaltsrechner kostenlos',
  openGraph: {
    title: 'Brutto Netto Rechner 2025 – Gehalt kostenlos berechnen',
    description: 'Kostenloser Brutto-Netto-Rechner 2025. Nettolohn sofort berechnen — alle Steuerklassen, Kirchensteuer, Sozialabgaben.',
    type: 'website',
    locale: 'de_DE',
    url: 'https://gehaltscheck.de',
    siteName: 'GehaltsCheck.de',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brutto Netto Rechner 2025 – GehaltsCheck.de',
    description: 'Nettolohn kostenlos berechnen. Alle Steuerklassen, Sozialabgaben, Kirchensteuer.',
  },
  robots: 'index, follow',
  alternates: { canonical: 'https://gehaltscheck.de' },
  icons: { icon: '/favicon.svg', apple: '/favicon.svg' },
};

export default function RootLayout({ children }) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "Wie berechnet man das Nettogehalt?", "acceptedAnswer": { "@type": "Answer", "text": "Vom Bruttogehalt werden Lohnsteuer, Solidaritätszuschlag, ggf. Kirchensteuer sowie Sozialabgaben (Kranken-, Renten-, Arbeitslosen- und Pflegeversicherung) abgezogen." }},
      { "@type": "Question", "name": "Was bleibt von 3.000 € brutto netto?", "acceptedAnswer": { "@type": "Answer", "text": "Bei Steuerklasse 1, ohne Kirchensteuer und ohne Kinder bleiben von 3.000 € brutto ca. 2.010–2.050 € netto übrig (je nach KV-Zusatzbeitrag)." }},
      { "@type": "Question", "name": "Welche Steuerklasse ist die beste?", "acceptedAnswer": { "@type": "Answer", "text": "Steuerklasse 1 für Ledige, Steuerklasse 3/5 für Verheiratete mit unterschiedlichem Einkommen, Steuerklasse 4/4 bei ähnlichem Verdienst. Die Wahl beeinflusst nur die monatliche Vorauszahlung, nicht die Jahressteuerlast." }},
      { "@type": "Question", "name": "Was ist der Solidaritätszuschlag?", "acceptedAnswer": { "@type": "Answer", "text": "Der Soli beträgt 5,5% der Lohnsteuer, fällt aber erst ab einer Lohnsteuer von ca. 18.130 € (Ledige) bzw. 36.260 € (Verheiratete) an. Seit 2021 zahlen ca. 90% der Arbeitnehmer keinen Soli mehr." }},
    ]
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "GehaltsCheck.de – Brutto Netto Rechner",
    "url": "https://gehaltscheck.de",
    "description": "Kostenloser Brutto-Netto-Rechner 2025 mit allen Steuerklassen und Sozialabgaben.",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "EUR" },
  };

  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#f0883e" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet" />
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5227565874576366" crossOrigin="anonymous"></script>
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}/>
        {children}
      </body>
    </html>
  );
}
