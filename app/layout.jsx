import "./globals.css";
import "./store.css";
import "./chat.css";
import { StoreProvider } from "@/components/StoreProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ChatWidget from "@/components/ChatWidget";

export const metadata = {
  title: "Gabo en Asia",
  description: "Learn real Mandarin Chinese, straight from China, with Gabo en Asia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
          <ChatWidget />
        </StoreProvider>
      </body>
    </html>
  );
}
