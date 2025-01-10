import Header from "@/components/Header/Header";
import "./globals.css";
import BottomMenuProvider from "@/context/BottomMenuContext";
import BackProvider from "@/context/Back/BackContext";
// import useLenis from "@/lib/useLenis";

export const metadata = {
  title: "Barname Chie? - برنامه چیه؟",
  description:
    "An event and service application designed for Iranians living outside Iran.",
};

export default function RootLayout({ children }) {
  // useLenis();
  return (
    <html lang="en">
      <body>
        <BackProvider>
          <BottomMenuProvider>
            <Header />
            {children}
          </BottomMenuProvider>
        </BackProvider>
      </body>
    </html>
  );
}
