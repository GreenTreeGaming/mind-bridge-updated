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

export async function getCounselorById(counselorId) {
  if (!counselorId) return null;

  try {
    const counselor = await db.user.findFirst({
      where: {
        id: counselorId,
        role: "DOCTOR",
      },
      include: {
        availabilities: {
          where: {
            status: "AVAILABLE",
            startTime: {
              gte: new Date(),
            },
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

    if (!counselor) return null;

    return {
      ...counselor,
      availabilities: counselor.availabilities.map((slot) => ({
        ...slot,
        startTime: slot.startTime.toISOString(),
        endTime: slot.endTime.toISOString(),
      })),
    };
  } catch (err) {
    console.error("Failed to fetch counselor:", err);
    return null;
  }
}
