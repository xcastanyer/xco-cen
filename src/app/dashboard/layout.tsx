import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await auth()

    // If not logged in, middleware handles it, but good to double check
    if (!session?.user) {
        redirect("/")
    }

    // Check if user is active
    if (session.user.isActive === false) {
        redirect("/inactive")
    }

    return (
        <div className="protected-layout">
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Protected Area</h1>
                    {session.user.isSuperUser && (
                        <a
                            href="/dashboard/admin/users"
                            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                        >
                            Panel de Administrador
                        </a>
                    )}
                </div>
            </header>
            <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <h1>Children</h1>
                    {children}
                </div>
            </main>
        </div>
    )
}
