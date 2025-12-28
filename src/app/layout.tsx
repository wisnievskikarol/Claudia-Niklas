import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { Layout, Footer } from "@/components";
import { Navbar } from "@/components";
import ClientProvider from "./provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Claudia & Niklas",
  description: "Wesele Claudia & Niklas",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <head>
        <script
          defer
          data-site="https://www.gowedding.online/"
          src="https://api.nepcha.com/js/nepcha-analytics.js"
        ></script>
        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>
      <body className={`${roboto.className} bg-primary`}>
        <ClientProvider>
          <Layout>
            <Navbar />
            {children}
            <Footer />
          </Layout>
        </ClientProvider>
      </body>
    </html>
  );
}
