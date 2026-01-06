"use server";

import { db } from "@/lib/prisma";
import { getCurrentUser } from "./onboarding";

export async function getDoctorEarnings() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "DOCTOR") {
      return { earnings: {} };
    }

    // Get doctor's total credits and appointments
    const doctorPayouts = await db.payout.findMany({
      where: { doctorId: user.id },
    });

    const doctorAppointments = await db.appointment.findMany({
      where: { doctorId: user.id, status: "COMPLETED" },
    });

    const totalEarnings = doctorPayouts.reduce((sum, payout) => sum + payout.netAmount, 0);

    return {
      earnings: {
        totalEarnings: totalEarnings,
        totalAppointments: doctorAppointments.length,
      },
    };
  } catch (error) {
    console.error("Error fetching doctor earnings:", error);
    return { earnings: { totalEarnings: 0, totalAppointments: 0 } };
  }
}

export async function getDoctorPayouts() {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== "DOCTOR") {
      return { payouts: [] };
    }

    const payouts = await db.payout.findMany({
      where: { doctorId: user.id },
      orderBy: { createdAt: "desc" },
    });

    return { payouts: payouts || [] };
  } catch (error) {
    console.error("Error fetching doctor payouts:", error);
    return { payouts: [] };
  }
}
