"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/* ============================================================================
   AVAILABILITY
============================================================================ */

/**
 * Set doctor's availability slots (replaces future availability)
 */
export async function setAvailabilitySlots(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) throw new Error("Doctor not found");

    const startTime = formData.get("startTime");
    const endTime = formData.get("endTime");

    if (!startTime || !endTime) {
      throw new Error("Start time and end time are required");
    }

    const start = new Date(startTime as string);
    const end = new Date(endTime as string);
    const now = new Date();

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid date or time");
    }

    if (start >= end) {
      throw new Error("Start time must be before end time");
    }

    if (start <= now || end <= now) {
      throw new Error("Availability must be in the future");
    }

    // ✅ OPTIONAL: prevent overlapping availability
    const overlap = await db.availability.findFirst({
      where: {
        doctorId: doctor.id,
        status: "AVAILABLE",
        OR: [
          {
            startTime: { lt: end },
            endTime: { gt: start },
          },
        ],
      },
    });

    if (overlap) {
      throw new Error("This availability overlaps with an existing one");
    }

    // ✅ JUST CREATE — DO NOT DELETE ANYTHING
    await db.availability.create({
      data: {
        doctorId: doctor.id,
        startTime: start,
        endTime: end,
        status: "AVAILABLE",
      },
    });

    revalidatePath("/counselor");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to add availability:", error);
    throw new Error(error.message || "Failed to add availability");
  }
}


/**
 * Delete a single availability slot (ONLY if not booked)
 */
export async function deleteAvailabilitySlot(slotId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) throw new Error("Doctor not found");

    const slot = await db.availability.findUnique({
      where: { id: slotId },
    });

    if (!slot || slot.doctorId !== doctor.id) {
      throw new Error("Availability slot not found");
    }

    if (slot.appointmentId) {
      throw new Error("Cannot delete a booked availability slot");
    }

    await db.availability.delete({
      where: { id: slotId },
    });

    revalidatePath("/counselor");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to delete availability slot:", error);
    throw new Error(error.message || "Failed to delete availability slot");
  }
}

/**
 * Delete ALL future availability slots (ONLY unbooked)
 */
export async function deleteAllAvailability() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) throw new Error("Doctor not found");

    // ✅ Only delete AVAILABLE future slots
    await db.availability.deleteMany({
      where: {
        doctorId: doctor.id,
        status: "AVAILABLE",
        startTime: { gte: new Date() },
      },
    });

    revalidatePath("/counselor");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete all availability:", error);
    throw new Error(error.message || "Failed to delete all availability");
  }
}

/**
 * Get doctor's current availability
 */
export async function getDoctorAvailability() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) throw new Error("Doctor not found");

    const slots = await db.availability.findMany({
      where: {
        doctorId: doctor.id,
      },
      orderBy: { startTime: "asc" },
    });

    return { slots };
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch availability");
  }
}

/* ============================================================================
   APPOINTMENTS
============================================================================ */

export async function getDoctorAppointments() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) throw new Error("Doctor not found");

    const appointments = await db.appointment.findMany({
      where: {
        doctorId: doctor.id,
        status: "SCHEDULED",
      },
      include: { patient: true },
      orderBy: { startTime: "asc" },
    });

    return { appointments };
  } catch (error: any) {
    throw new Error(error.message || "Failed to fetch appointments");
  }
}

/**
 * Cancel appointment (doctor or patient)
 */
export async function cancelAppointment(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    const appointmentId = formData.get("appointmentId") as string;
    if (!appointmentId) throw new Error("Appointment ID required");

    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
    });

    if (
      !appointment ||
      (appointment.doctorId !== user.id &&
        appointment.patientId !== user.id)
    ) {
      throw new Error("Not authorized to cancel this appointment");
    }

    await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "CANCELLED" },
    });

    revalidatePath(user.role === "DOCTOR" ? "/counselor" : "/appointments");
    return { success: true };
  } catch (error: any) {
    console.error("Cancel appointment failed:", error);
    throw new Error(error.message || "Failed to cancel appointment");
  }
}

/**
 * Add appointment notes (doctor only)
 */
export async function addAppointmentNotes(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) throw new Error("Doctor not found");

    const appointmentId = formData.get("appointmentId") as string;
    const notes = formData.get("notes") as string;

    if (!appointmentId || !notes) {
      throw new Error("Appointment ID and notes required");
    }

    const updated = await db.appointment.update({
      where: {
        id: appointmentId,
        doctorId: doctor.id,
      },
      data: { notes },
    });

    revalidatePath("/counselor");
    return { success: true, appointment: updated };
  } catch (error: any) {
    throw new Error(error.message || "Failed to update notes");
  }
}

/**
 * Mark appointment completed (doctor only, after end time)
 */
export async function markAppointmentCompleted(formData: FormData) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    const doctor = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "DOCTOR",
      },
    });

    if (!doctor) throw new Error("Doctor not found");

    const appointmentId = formData.get("appointmentId") as string;
    if (!appointmentId) throw new Error("Appointment ID required");

    const appointment = await db.appointment.findUnique({
      where: {
        id: appointmentId,
        doctorId: doctor.id,
      },
    });

    if (!appointment || appointment.status !== "SCHEDULED") {
      throw new Error("Invalid appointment");
    }

    if (new Date() < new Date(appointment.endTime)) {
      throw new Error("Appointment has not ended yet");
    }

    const updated = await db.appointment.update({
      where: { id: appointmentId },
      data: { status: "COMPLETED" },
    });

    revalidatePath("/counselor");
    return { success: true, appointment: updated };
  } catch (error: any) {
    throw new Error(error.message || "Failed to complete appointment");
  }
}
