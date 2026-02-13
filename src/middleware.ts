// Middleware is simplified because database sessions don't work in Edge runtime
// Page-level protection is handled in Server Components (e.g., dashboard/layout.tsx)

import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)
export { auth as middleware }

export const config = {
    // Only protect API routes, let Server Components handle page protection
    matcher: ["/api/:path*"]
}
