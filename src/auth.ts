import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import authConfig from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig,
    callbacks: {
        ...authConfig.callbacks,
        async jwt({ token, user, trigger }) {
            if (user) {
                // Initial sign in: user comes from database via adapter
                token.isActive = (user as any).isActive;
                token.isSuperUser = (user as any).isSuperUser;
                token.id = user.id;
            } else if (trigger === "update") {
                // If we need to refresh data from DB during session update
                const dbUser = await prisma.user.findUnique({
                    where: { id: token.id as string }
                });
                if (dbUser) {
                    token.isActive = dbUser.isActive;
                    token.isSuperUser = dbUser.isSuperUser;
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.isActive = token.isActive as boolean;
                session.user.isSuperUser = token.isSuperUser as boolean;
            }
            return session;
        },
    },
})
