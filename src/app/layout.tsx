import { Manrope, Work_Sans, Kalam } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "slick-carousel/slick/slick.css";
import "./assets/main.css";
import MetaPixel from "./Components/Analytics/MetaPixel";

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--body-color-font',
});

const work_sans = Work_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--body-color-font',
});

const kalam = Kalam({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--heading-font',
});

export const metadata = {
  title: {
    absolute: '',
    default: "O's Travel and Tours Services - Cebu Tour Packages",
    template: "%s | O's Travel and Tours Services",
  },
  description:
    "O's Travel and Tours Services — a Cebu-based travel agency offering joiner and private tour packages for Cebu City, Moalboal, Oslob, and Bohol.",
  openGraph: {
    title: "O's Travel and Tours Services - Cebu Tour Packages",
    description:
      "Joiner and private tours for Cebu City, Moalboal, Oslob, and Bohol. Based in Talamban, Cebu City, Philippines.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="author" content="Themeservices" />
        <link rel="icon" href="/assets/img/logo/os-logo.png" type="image/png" />
      </head>
      <body className={`${manrope.variable} ${work_sans.variable} ${kalam.variable}`}>
        <MetaPixel />
        {children}
      </body>
    </html>
  );
}
