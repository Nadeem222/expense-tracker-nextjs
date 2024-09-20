
import Nav from "./components/Navigation";
import "./globals.css";


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
