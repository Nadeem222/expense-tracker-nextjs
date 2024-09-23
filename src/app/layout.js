"use client"

import Nav from "./components/Navigation";
import "./globals.css";
import FinanceContextProvider from "./lib/store/FinanceContext";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FinanceContextProvider>

          <Nav />
          {children}
        </FinanceContextProvider>
      </body>
    </html>
  );
}
