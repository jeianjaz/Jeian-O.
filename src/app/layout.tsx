import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClickSparkProvider } from "@/components/providers/animation-provider";

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Jeian Jasper O.",
  description: "Personal portfolio of Jeian Jasper O., Frontend Developer",
  icons: {
    icon: [
      { url: '/assets/myfavicon.png?v=1', sizes: '32x32', type: 'image/png' },
      { url: '/assets/myfavicon.png?v=1', sizes: '16x16', type: 'image/png' },
    ],
    apple: { url: '/assets/myfavicon.png?v=1', sizes: '180x180', type: 'image/png' },
    shortcut: { url: '/assets/myfavicon.png?v=1' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ClickSparkProvider enableParticles={true} particlesMouseInteraction={false}>
          {children}
        </ClickSparkProvider>
      </body>
    </html>
  );
}
