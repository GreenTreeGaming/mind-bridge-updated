// import { clerkMiddleware } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';
// import { createRouteMatcher } from '@clerk/nextjs/server';

// const isProtectedRoute = createRouteMatcher([
//   "/counselors(.*)",
//   "/onboarding(.*)",
//   "/counselor(.*)",
//   "/admin(.*)",
//   "/video-call(.*)",
//   "/appointments(.*)",
//   "/resources(.*)",
//   "/testimonials(.*)",
//   "/about(.*)",
//   "/contact(.*)",
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   const { userId } = await auth();

//   if (!userId && isProtectedRoute(req)) {
//     // Redirect to the app's internal sign-in page so we stay on our domain
//     const returnTo = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search);
//     return NextResponse.redirect(new URL(`/sign-in?returnTo=${returnTo}`, req.url));
//   }

//   // Add pathname to headers for active link detection
//   const response = NextResponse.next();
//   response.headers.set('x-pathname', req.nextUrl.pathname);
//   return response;
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };

// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher([
//   '/counselors(.*)',
//   '/onboarding(.*)',
//   '/counselor(.*)',
//   '/admin(.*)',
//   '/video-call(.*)',
//   '/appointments(.*)',
//   '/resources(.*)',
//   '/testimonials(.*)',
//   '/about(.*)',
//   '/contact(.*)',
// ]);

// export default clerkMiddleware((auth, req) => {
//   const { userId } = auth(); // ✅ DO NOT await

//   if (!userId && isProtectedRoute(req)) {
//     const returnTo = encodeURIComponent(
//       req.nextUrl.pathname + req.nextUrl.search
//     );

//     return NextResponse.redirect(
//       new URL(`/sign-in?returnTo=${returnTo}`, req.url)
//     );
//   }

//   const response = NextResponse.next();
//   response.headers.set('x-pathname', req.nextUrl.pathname);
//   return response;
// });

// export const config = {
//   matcher: [
//     // Run middleware on app + api routes, but not on next internals / static assets
//     '/((?!_next/static|_next/image|favicon.ico|assets|.*\\..*).*)',
//     '/(api|trpc)(.*)',
//   ],
// };

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/counselors(.*)',
  '/onboarding(.*)',
  '/counselor(.*)',
  '/admin(.*)',
  '/video-call(.*)',
  '/appointments(.*)',
  '/resources(.*)',
  '/testimonials(.*)',
  '/about(.*)',
  '/contact(.*)',
]);

export default clerkMiddleware((auth, req) => {
  // If it's a protected route, use Clerk's built-in protect()
  // This handles authentication properly without manual redirects
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
    '/(api|trpc)(.*)',
  ],
};