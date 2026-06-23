import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LLD Notes by Toushik",
  description: "All the News That's Fit to Print - Low-Level Design Edition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <html lang="en">
      <body className="antialiased font-body min-h-screen flex flex-col">
        <header className="border-b-4 border-black px-4 py-6 md:py-8 sticky top-0 bg-[#F9F9F7] z-40">
          <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-center mb-2 leading-[0.9]">
              LLD Notes
            </h1>
            <div className="flex justify-between items-center w-full max-w-3xl border-t border-b border-black py-2 mt-4 font-mono text-xs uppercase tracking-widest">
              <span>Vol. 1</span>
              <span>{date}</span>
              <span>By Toushik</span>
            </div>
          </div>
        </header>
        <main className="flex-grow">
          {children}
        </main>
        <footer className="border-t-4 border-black mt-16 py-12 px-4 bg-[#F9F9F7]">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <h2 className="font-serif text-3xl font-black uppercase mb-4">LLD Notes by Toushik</h2>
              <p className="font-body text-neutral-600 max-w-md">
                A comprehensive collection of Low-Level Design concepts, patterns, and interview problems.
              </p>
            </div>
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest flex flex-col justify-end items-start md:items-end">
              <span className="mb-2">Edition: Vol 1.0</span>
              <span>Printed in NYC</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
