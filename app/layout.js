import { Lexend_Deca } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import ThemeToggle from "@/components/ui/theme-toggle";

import Header from "@/components/ui/header.jsx";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/sonner";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend-deca",
  display: "swap",
});

export const metadata = {
  title: "Mind Bridge",
  description: "Get the mental health support you deserve.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${lexendDeca.variable} font-sans antialiased`}>
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
            {/* Footer */}
            <footer className="relative mt-24 border-t border-border bg-background">
              {/* Soft background */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/5" />
                <div className="absolute inset-0 opacity-40 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:48px_48px]" />
              </div>

              <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                  {/* Brand */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-extrabold text-foreground">
                      Mind Bridge
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Connecting people with licensed mental health professionals
                      in a safe, supportive, and confidential environment.
                    </p>
                  </div>

                  {/* Explore */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">
                      Explore
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        <a href="/counselors" className="hover:text-foreground transition">
                          Counselors
                        </a>
                      </li>
                      <li>
                        <a href="/blogs" className="hover:text-foreground transition">
                          Blogs
                        </a>
                      </li>
                      <li>
                        <a href="/resources" className="hover:text-foreground transition">
                          Resources
                        </a>
                      </li>
                      <li>
                        <a href="/testimonials" className="hover:text-foreground transition">
                          Stories
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Company */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">
                      Company
                    </h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>
                        <a href="/about" className="hover:text-foreground transition">
                          About Us
                        </a>
                      </li>
                      <li>
                        <a href="/contact" className="hover:text-foreground transition">
                          Contact
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Trust / Safety */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">
                      Trust & Safety
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Educational content only. Mind Bridge does not replace
                      professional medical advice, diagnosis, or treatment.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      If you’re in crisis, please contact local emergency services
                      or a trusted helpline immediately.
                    </p>
                  </div>
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
                  <span>
                    © {new Date().getFullYear()} Mind Bridge. All rights reserved.
                  </span>

                  <span className="text-xs">
                    Built with care for mental well-being.
                  </span>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
