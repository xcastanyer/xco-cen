import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import UserTable from "@/components/admin/UserTable"
import Link from "next/link"

export default async function AdminUsersPage() {
    const session = await auth()

    // Redirect if not authenticated or not a super user
    if (!session?.user) {
        redirect("/")
    }

    if (!session.user.isSuperUser) {
        redirect("/dashboard")
    }

    // Fetch all users
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            isActive: true,
            isSuperUser: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    })

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Gestión de Usuarios
                        </h1>
                        <p className="text-gray-600 mt-1">
                            Administra el acceso de usuarios a la aplicación
                        </p>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                    >
                        ← Volver al Dashboard
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <UserTable initialUsers={users} />
                </div>
            </div>
        </div>
    )
}
