"use server";

import { db } from "@/lib/prisma";

/**
 * Get all verified counselors (public endpoint)
 */
export async function getAllCounselors() {
  try {
    const counselors = await db.user.findMany({
      where: {
        role: "DOCTOR",
        verificationStatus: "VERIFIED",
      },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        specialty: true,
        experience: true,
        description: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return { counselors };
  } catch (error) {
    console.error("Failed to fetch counselors:", error);
    throw new Error("Failed to fetch counselors");
  }
}

