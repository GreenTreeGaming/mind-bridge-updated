import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ThemeToggle from "@/components/ui/theme-toggle";

import Header from "@/components/ui/header.jsx";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mind Bridge",
  description: "Get the mental health support you deserve.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
        {/*Header*/}
        <Header />

        <main className="min-h-screen">{children}</main>
        <ThemeToggle /> 
        <Toaster richColors position="top-right" />

        {/*Footer*/}
        <footer className="bg-muted/50">
          <div className="w-full border-t border-zinc-200 bg-zinc-50 py-6 text-center text-sm text-zinc-300 dark:border-zinc-800 dark:bg-black">
            &copy; {new Date().getFullYear()} Mind Bridge. All rights reserved.
          </div>
        </footer>
        </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
