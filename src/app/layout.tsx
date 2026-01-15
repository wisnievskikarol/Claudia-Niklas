import "./globals.css";
import type { Metadata } from "next";
import { Layout } from "@/components";
import { EditorialNavbar } from "@/components/editorial-navbar";
import { EditorialFooter } from "@/components/editorial-footer";
import ClientProvider from "./provider";
import PageLoader from "@/components/page-loader";

export const metadata: Metadata = {
  title: "Claudia & Niklas",
  description: "Zaproszenie ślubne - Claudia & Niklas",
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
      <body className="bg-editorial-cream">
        <PageLoader />
        <ClientProvider>
          <Layout>
            <EditorialNavbar coupleNames="C & N" />
            {children}
            <EditorialFooter coupleNames="C & N" date="08.08.2026" />
          </Layout>
        </ClientProvider>
      </body>
    </html>
  );
}
