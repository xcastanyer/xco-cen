import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "database" },
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async signIn({ user }) {
            // Allow sign in for everyone, we redirect inactive users in the app logic
            return true;
        },
        async session({ session, user }) {
            if (session.user && user) {
                // user comes from database adapter, so it has isActive and isSuperUser
                session.user.isActive = user.isActive;
                session.user.isSuperUser = user.isSuperUser;
            }
            return session;
        },
    },
})
