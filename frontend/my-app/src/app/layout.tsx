import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import QueryClientComponent from "@/components/QueryClientComponent";
import { AppContextProvider } from "@/context/AppContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-col  min-h-screen ${inter.className}`}>
        <QueryClientComponent>
          <AppContextProvider>


            <Header />
            <Hero />
            <div className="container mx-auto py-10 flex-1">

              {children}
            </div>
            <Footer />

          </AppContextProvider>
        </QueryClientComponent>
      </body>
    </html>
  );
}
