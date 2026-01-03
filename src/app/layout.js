import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MenuBar from "@/components/MenuBar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* SEO Meta Tags */}
        <title>
          TDG Transit Design Group - LED Lighting Solutions for Rail Industry
        </title>
        <meta
          name="description"
          content="TDG Transit Design Group offers customized and innovative LED lighting solutions for both interior and exterior lighting systems for the global rail industry. With LED drivers in service since 1999 and over 100,000 hours of actual in-car performance from its systems."
        />
        <meta
          name="keywords"
          content="TDG Transit Design Group, LED lighting solutions, rail industry lighting, interior lighting systems, exterior lighting systems, transit lighting, railway lighting, LED drivers, energy efficient lighting, rail transit lighting, public transportation lighting, emergency lighting, light rail lighting, commuter rail lighting, heavy rail lighting, locomotive lighting, railway safety standards, LED lighting certification"
        />
        <meta name="author" content="TDG Transit Design Group" />
        <meta name="creator" content="TDG Transit Design Group" />
        <meta name="publisher" content="TDG Transit Design Group" />
        <meta name="robots" content="index, follow" />
        <meta
          name="googlebot"
          content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
        />
        <link rel="canonical" href="https://tdgdesign.com" />
        <meta
          name="format-detection"
          content="telephone=no, address=no, email=no"
        />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:url" content="https://tdgdesign.com" />
        <meta property="og:site_name" content="TDG Transit Design Group" />
        <meta
          property="og:title"
          content="TDG Transit Design Group - LED Lighting Solutions for Rail Industry"
        />
        <meta
          property="og:description"
          content="Leading provider of LED lighting solutions for the global rail industry. Innovative interior and exterior lighting systems with over 200,000 hours of operation and up to 80% energy savings."
        />
        <meta
          property="og:image"
          content="https://tdgdesign.com/icons/logo.svg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TDG Transit Design Group Logo" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="TDG Transit Design Group - LED Lighting Solutions for Rail Industry"
        />
        <meta
          name="twitter:description"
          content="Leading provider of LED lighting solutions for the global rail industry. Innovative interior and exterior lighting systems with over 200,000 hours of operation."
        />
        <meta
          name="twitter:image"
          content="https://tdgdesign.com/icons/logo.svg"
        />

        {/* Icons */}
        <link rel="icon" href="/icons/logo.svg" />
        <link rel="shortcut icon" href="/icons/logo.svg" />
        <link rel="apple-touch-icon" href="/icons/logo.svg" />

        {/* Font Preconnect - Non-blocking */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Non-blocking font loading - Load asynchronously after page load */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          as="style"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var fontLink = document.createElement('link');
                fontLink.rel = 'stylesheet';
                fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap';
                fontLink.media = 'print';
                fontLink.onload = function() { this.media = 'all'; };
                document.head.appendChild(fontLink);
              })();
            `,
          }}
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
            rel="stylesheet"
          />
        </noscript>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MenuBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
