import Header from "@/components/Header/Header";
import "./globals.css";
import BottomMenuProvider from "@/context/BottomMenuContext";

export const metadata = {
  title: "Barname Chie? - برنامه چیه؟",
  description:
    "An event and service application designed for Iranians living outside Iran.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <BottomMenuProvider>
          <Header />
          {children}
        </BottomMenuProvider>
      </body>
    </html>
  );
}
