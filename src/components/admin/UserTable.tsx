"use client"

import { useState } from "react"

type User = {
    id: string
    name: string | null
    email: string | null
    isActive: boolean
    isSuperUser: boolean
    createdAt: string
}

type UserTableProps = {
    initialUsers: User[]
}

export default function UserTable({ initialUsers }: UserTableProps) {
    const [users, setUsers] = useState<User[]>(initialUsers)
    const [filter, setFilter] = useState<"all" | "pending" | "active">("all")
    const [loading, setLoading] = useState<string | null>(null)

    const filteredUsers = users.filter((user) => {
        if (filter === "pending") return !user.isActive
        if (filter === "active") return user.isActive
        return true
    })

    const toggleUserStatus = async (userId: string) => {
        setLoading(userId)
        try {
            const response = await fetch(`/api/users/${userId}/toggle-active`, {
                method: "POST",
            })

            if (!response.ok) {
                const error = await response.json()
                alert(error.error || "Failed to update user status")
                return
            }

            const data = await response.json()

            // Update local state
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === userId ? data.user : user
                )
            )
        } catch (error) {
            console.error("Error toggling user status:", error)
            alert("Failed to update user status")
        } finally {
            setLoading(null)
        }
    }

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex gap-2">
                <button
                    onClick={() => setFilter("all")}
                    className={`px-4 py-2 rounded ${filter === "all"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Todos ({users.length})
                </button>
                <button
                    onClick={() => setFilter("pending")}
                    className={`px-4 py-2 rounded ${filter === "pending"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Pendientes ({users.filter((u) => !u.isActive).length})
                </button>
                <button
                    onClick={() => setFilter("active")}
                    className={`px-4 py-2 rounded ${filter === "active"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                >
                    Activos ({users.filter((u) => u.isActive).length})
                </button>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                                Nombre
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                                Estado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                                Rol
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                                Creado
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {user.name || "Sin nombre"}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span
                                        className={`px-2 py-1 text-xs font-semibold rounded ${user.isActive
                                                ? "bg-green-100 text-green-800"
                                                : "bg-red-100 text-red-800"
                                            }`}
                                    >
                                        {user.isActive ? "Activo" : "Inactivo"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {user.isSuperUser ? (
                                        <span className="px-2 py-1 text-xs font-semibold rounded bg-purple-100 text-purple-800">
                                            Super Usuario
                                        </span>
                                    ) : (
                                        "Usuario"
                                    )}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <button
                                        onClick={() => toggleUserStatus(user.id)}
                                        disabled={loading === user.id}
                                        className={`px-3 py-1 rounded font-medium ${user.isActive
                                                ? "bg-red-600 hover:bg-red-700 text-white"
                                                : "bg-green-600 hover:bg-green-700 text-white"
                                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {loading === user.id
                                            ? "..."
                                            : user.isActive
                                                ? "Desactivar"
                                                : "Activar"}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredUsers.length === 0 && (
                <p className="text-center text-gray-500 py-8">
                    No hay usuarios que mostrar con este filtro.
                </p>
            )}
        </div>
    )
}
