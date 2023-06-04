import "./globals.css";
import NavBar from "./components/NavBar";
import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Resultadista",
  description: "Resultados de Fútbol en Vivo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar></NavBar>
        {children}
      </body>
    </html>
  );
}
