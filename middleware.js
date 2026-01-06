import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  "/counselors(.*)",
  "/onboarding(.*)",
  "/counselor(.*)",
  "/admin(.*)",
  "/video-call(.*)",
  "/appointments(.*)",
  "/resources(.*)",
  "/testimonials(.*)",
  "/about(.*)",
  "/contact(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  if (!userId && isProtectedRoute(req)) {
    // Redirect to the app's internal sign-in page so we stay on our domain
    const returnTo = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
    return NextResponse.redirect(new URL(`/sign-in?returnTo=${returnTo}`, req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};