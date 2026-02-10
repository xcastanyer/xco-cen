import { auth } from "@/auth"
import LogoutButton from "@/components/auth/LogoutButton"
import { redirect } from "next/navigation"

export default async function Dashboard() {
    const session = await auth()

    if (!session) {
        redirect("/")
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <LogoutButton />
                </div>

                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">User Profile</h2>
                    <div className="flex items-center space-x-4">
                        {session.user?.image && (
                            <img
                                src={session.user.image}
                                alt="Profile"
                                className="w-16 h-16 rounded-full"
                            />
                        )}
                        <div>
                            <p className="text-lg font-medium">{session.user?.name}</p>
                            <p className="text-gray-600">{session.user?.email}</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-2">Session Data</h2>
                    <pre className="bg-gray-800 text-gray-100 p-4 rounded overflow-auto text-sm">
                        {JSON.stringify(session, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}
