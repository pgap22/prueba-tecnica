import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Productos Crud",
  description: "Prueba tecnica acerca de un crud de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
          <header className="p-4 border-b mb-4">
            <div className="container">
              <Link href={"/"}>
                <h1 className="font-bold text-2xl ">Productos CRUD</h1>
              </Link>
            </div>
          </header>
          <main className="container">
            {children}
          </main>
        </>
      </body>
    </html>
  );
}
