import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Nepal Community Fund | Supporting Local Communities",
  description: "We raise funds to support community development projects across Nepal, focusing on education, healthcare, and sustainable infrastructure.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
