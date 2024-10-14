"use client"

import Nav from "./components/Navigation";
import "./globals.css";
import AuthContextProvider from "./lib/store/auth-context";
import FinanceContextProvider from "./lib/store/FinanceContext";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>

          <FinanceContextProvider>

            <Nav />
            {children}
          </FinanceContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
