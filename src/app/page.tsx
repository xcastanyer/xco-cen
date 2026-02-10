import { auth } from "@/auth"
import LoginButton from "@/components/auth/LoginButton"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()

  if (session?.user) {
    // Redirect logged-in users automatically
    if (session.user.isActive === false) {
      redirect("/inactive")
    } else {
      redirect("/dashboard")
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Next.js Google Auth</h1>
      <div className="text-center">
        <p className="mb-4 text-gray-600">Please sign in to continue.</p>
        <LoginButton />
      </div>
    </main>
  )
}
