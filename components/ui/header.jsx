import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { checkUser } from "@/lib/checkUser";
import {
  User,
  Calendar,
  Stethoscope,
  ShieldCheck,
  Menu,
} from "lucide-react";

export default async function Header() {
  const user = await checkUser();

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-2xl bg-muted/70 backdrop-blur-md shadow-sm">
      <nav className="relative flex h-14 items-center justify-between px-4">
        {/* Left – Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/mindbridgelogo.png"
            alt="Mind Bridge Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>

        {/* Center – Desktop navigation */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          <Link href="/counselors" className="hover:text-foreground transition">
            Counselors
          </Link>
          <Link href="/resources" className="hover:text-foreground transition">
            Disorder Information
          </Link>
          <Link href="/blogs" className="hover:text-foreground transition">
            Blogs
          </Link>
          <Link href="/testimonials" className="hover:text-foreground transition">
            Stories
          </Link>
          <Link href="/about" className="hover:text-foreground transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-foreground transition">
            Contact
          </Link>
        </div>

        {/* Right – Actions */}
        <div className="flex items-center gap-2">
          <SignedIn>
            {/* Role-based buttons (desktop) */}
            {user?.role === "DOCTOR" && (
              <Link href="/counselor" className="hidden md:block">
                <Button variant="outline" className="flex items-center gap-2">
                  <Stethoscope className="h-4 w-4" />
                  Counselor Dashboard
                </Button>
              </Link>
            )}

            {user?.role === "PATIENT" && (
              <Link href="/appointments" className="hidden md:block">
                <Button variant="outline" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link href="/admin" className="hidden md:block">
                <Button variant="outline" className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Admin Page
                </Button>
              </Link>
            )}

            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding" className="hidden md:block">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>
              </Link>
            )}

            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Button variant="secondary">Sign In</Button>
            </Link>
          </SignedOut>

          {/* Mobile Menu */}
          <details className="relative md:hidden">
            <summary className="list-none cursor-pointer rounded-xl p-2 hover:bg-muted">
              <Menu className="h-5 w-5" />
            </summary>

            <div className="absolute right-0 mt-2 w-56 rounded-2xl border bg-card p-2 shadow-lg">
              <nav className="flex flex-col gap-1 text-sm font-medium">
                <Link href="/counselors" className="rounded-lg px-3 py-2 hover:bg-muted">
                  Counselors
                </Link>
                <Link href="/resources" className="rounded-lg px-3 py-2 hover:bg-muted">
                  Disorder Information
                </Link>
                <Link href="/blogs" className="rounded-lg px-3 py-2 hover:bg-muted">
                  Blogs
                </Link>
                <Link href="/testimonials" className="rounded-lg px-3 py-2 hover:bg-muted">
                  Stories
                </Link>
                <Link href="/about" className="rounded-lg px-3 py-2 hover:bg-muted">
                  About
                </Link>
                <Link href="/contact" className="rounded-lg px-3 py-2 hover:bg-muted">
                  Contact
                </Link>

                <div className="my-1 h-px bg-border" />

                {user?.role === "DOCTOR" && (
                  <Link href="/counselor" className="rounded-lg px-3 py-2 hover:bg-muted">
                    Counselor Dashboard
                  </Link>
                )}
                {user?.role === "PATIENT" && (
                  <Link href="/appointments" className="rounded-lg px-3 py-2 hover:bg-muted">
                    My Appointments
                  </Link>
                )}
                {user?.role === "ADMIN" && (
                  <Link href="/admin" className="rounded-lg px-3 py-2 hover:bg-muted">
                    Admin Page
                  </Link>
                )}
                {user?.role === "UNASSIGNED" && (
                  <Link href="/onboarding" className="rounded-lg px-3 py-2 hover:bg-muted">
                    Complete Profile
                  </Link>
                )}
              </nav>
            </div>
          </details>
        </div>
      </nav>
    </header>
  );
}
