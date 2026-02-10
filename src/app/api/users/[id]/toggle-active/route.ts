import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await auth()

        // Check if user is authenticated and is a super user
        if (!session?.user || !session.user.isSuperUser) {
            return NextResponse.json(
                { error: "Unauthorized. Super user access required." },
                { status: 403 }
            )
        }

        const { id: userId } = await params

        // Prevent super users from deactivating themselves
        if (userId === session.user.id) {
            return NextResponse.json(
                { error: "Cannot modify your own active status" },
                { status: 400 }
            )
        }

        // Get current user state
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isActive: true },
        })

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            )
        }

        // Toggle the isActive status
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { isActive: !user.isActive },
            select: {
                id: true,
                name: true,
                email: true,
                isActive: true,
                isSuperUser: true,
                createdAt: true,
            },
        })

        return NextResponse.json({ user: updatedUser })
    } catch (error) {
        console.error("Error toggling user status:", error)
        return NextResponse.json(
            { error: "Failed to update user status" },
            { status: 500 }
        )
    }
}
