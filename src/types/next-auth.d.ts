import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's active status. */
            isActive: boolean
            /** The user's super user status. */
            isSuperUser: boolean
        } & DefaultSession["user"]
    }

    interface User {
        isActive: boolean
        isSuperUser: boolean
    }
}

declare module "@auth/core/adapters" {
    interface AdapterUser {
        isActive: boolean
        isSuperUser: boolean
    }
}
