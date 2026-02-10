import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
    try {
        const session = await auth()

        // Check if user is authenticated and is a super user
        if (!session?.user || !session.user.isSuperUser) {
            return NextResponse.json(
                { error: "Unauthorized. Super user access required." },
                { status: 403 }
            )
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

        return NextResponse.json({ users })
    } catch (error) {
        console.error("Error fetching users:", error)
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        )
    }
}
