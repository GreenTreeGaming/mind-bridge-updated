import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Button } from "./button";
import { checkUser } from "@/lib/checkUser";
import { User, Calendar, Stethoscope, ShieldCheck } from "lucide-react";

export default async function Header() {
  // Server-side user lookup (Prisma-safe)
  const user = await checkUser();

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl rounded-2xl bg-muted/50 backdrop-blur-md shadow-sm">
      <nav className="flex h-14 items-center justify-between px-4">
        {/* Left section - Logo */}
        <div className="flex items-center">
          <Link href="/">
            <Image
              src="/mindbridgelogo.png"
              alt="Mind Bridge Logo"
              width={200}
              height={60}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center section - Marketing navigation */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
          <Link href="/counselors" className="hover:text-foreground transition">
            Counselors
          </Link>
          <Link href="/resources" className="hover:text-foreground transition">
            Disorder Information
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

        {/* Right section */}
        <div className="flex items-center gap-3">
          <SignedIn>
            {/* Role-based navigation */}
            {user?.role === "DOCTOR" && (
              <Link href="/counselor">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Stethoscope className="h-4 w-4" />
                  Counselor Dashboard
                </Button>

                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0"
                >
                  <Stethoscope className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {user?.role === "PATIENT" && (
              <Link href="/appointments">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  My Appointments
                </Button>

                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0"
                >
                  <Calendar className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {user?.role === "ADMIN" && (
              <Link href="/admin">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Admin Page
                </Button>

                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0"
                >
                  <ShieldCheck className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {user?.role === "UNASSIGNED" && (
              <Link href="/onboarding">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Complete Profile
                </Button>

                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0"
                >
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            )}

            {/* User menu */}
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9",
                  userButtonPopoverCard: "shadow-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
            />

            {/* Optional name display */}
            {user?.name && (
              <span className="hidden sm:inline text-sm font-medium">
                {user.name}
              </span>
            )}
          </SignedIn>

          <SignedOut>
            <Link href="/sign-in">
              <Button variant="secondary">Sign In</Button>
            </Link>
          </SignedOut>
        </div>
      </nav>
    </header>
  );
}
