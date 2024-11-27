import Header from "@/components/Header/Header";
import "./globals.css";

export const metadata = {
  title: "Barname Chie? - برنامه چیه؟",
  description:
    "An event and service application designed for Iranians living outside Iran.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
