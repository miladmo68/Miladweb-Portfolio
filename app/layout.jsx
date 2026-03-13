import { Inter, Lato } from "next/font/google";
import "./globals.scss";

const inter = Inter({ subsets: ["latin"] });
const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

export const metadata = {
  title: "Milad Mo - Full Stack Developer | Web Development Portfolio",
  description:
    "Experienced Full Stack Developer specializing in React, Node.js, MongoDB, and modern web technologies. View my portfolio of web applications and projects.",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React Developer",
    "Node.js",
    "JavaScript",
    "Portfolio",
    "Milad Mo",
    "Front-end Developer",
    "Back-end Developer",
    "MERN Stack",
  ],
  authors: [{ name: "Milad Mo" }],
  creator: "Milad Mo",
  publisher: "Milad Mo",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://miladweb.com",
    title: "Milad Mo - Full Stack Developer Portfolio",
    description:
      "Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    siteName: "MiladWeb",
    images: [
      {
        url: "/milad.png",
        width: 1200,
        height: 630,
        alt: "Milad Mo - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Milad Mo - Full Stack Developer",
    description:
      "Experienced Full Stack Developer specializing in React, Node.js, and modern web technologies.",
    images: ["/milad.png"],
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
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0d1116" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
