import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

export async function middleware(request: NextRequest) {
  const session = await auth();
  console.log("session: ", session);

  // Define the paths that should be protected
  const protectedPaths = ["/home", "/audio"];

  // Define the auth paths (login, register, etc.)
  const authPaths = ["/login"];

  // Check if the current path is in the protectedPaths array
  const isProtectedPath = protectedPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
);

// Check if the current path is in the authPaths array
const isAuthPath = authPaths.some((path) =>
  request.nextUrl.pathname.startsWith(path)
);

console.log('isProtectedPath: ', isProtectedPath);
console.log('isAuthPath: ', isAuthPath);ß
  if (isProtectedPath) {
    // If the user is not authenticated and trying to access a protected path
    if (!session) {
      // Redirect to the login page
      const loginUrl = new URL("/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  } else if (isAuthPath) {
    // If the user is authenticated and trying to access an auth path (like login)
    if (session) {
      // Redirect to the home page
      const homeUrl = new URL("/home", request.url);

      return NextResponse.redirect(homeUrl);
    }
  }

  // If none of the above conditions are met, allow the request to proceed
  return NextResponse.next();
}

// Add a matcher for the paths you want the middleware to run on
export const config = {
  matcher: ["/", "/home", "/audio", "/login"],
};
