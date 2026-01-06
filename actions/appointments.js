"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createAppointment(counselorId, slotId) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { 
        success: false, 
        error: "You must be logged in to book an appointment" 
      };
    }

    // Get the current user (patient)
    const patient = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, role: true }
    });

    if (!patient) {
      return { 
        success: false, 
        error: "User not found" 
      };
    }

    // Get the availability slot
    const slot = await db.availability.findUnique({
      where: { id: slotId },
      include: {
        doctor: {
          select: { id: true, name: true }
        }
      }
    });

    if (!slot) {
      return { 
        success: false, 
        error: "Time slot not found" 
      };
    }

    if (slot.doctorId !== counselorId) {
      return { 
        success: false, 
        error: "Invalid time slot for this counselor" 
      };
    }

    if (slot.status !== "AVAILABLE") {
      return { 
        success: false, 
        error: "This time slot is no longer available" 
      };
    }

    // Check if slot is in the future
    if (new Date(slot.startTime) < new Date()) {
      return { 
        success: false, 
        error: "Cannot book appointments in the past" 
      };
    }

    // Create appointment and update slot status in a transaction
    const appointment = await db.$transaction(async (tx) => {
      // Mark slot as booked
      await tx.availability.update({
        where: { id: slotId },
        data: { status: "BOOKED" }
      });

      // Create the appointment
      const newAppointment = await tx.appointment.create({
        data: {
          patientId: patient.id,
          doctorId: slot.doctorId,
          startTime: slot.startTime,
          endTime: slot.endTime,
          status: "SCHEDULED"
        },
        include: {
          doctor: {
            select: { id: true, name: true, imageUrl: true }
          },
          patient: {
            select: { id: true, name: true, imageUrl: true }
          }
        }
      });

      return newAppointment;
    });

    // Revalidate relevant paths
    revalidatePath("/counselors");
    revalidatePath(`/counselors/${counselorId}`);
    revalidatePath("/");

    return { 
      success: true, 
      appointment,
      message: "Appointment booked successfully!" 
    };

  } catch (error) {
    console.error("Error creating appointment:", error);
    return { 
      success: false, 
      error: "Failed to book appointment. Please try again." 
    };
  }
}

export async function cancelAppointment(appointmentId) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return { 
        success: false, 
        error: "You must be logged in" 
      };
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, role: true }
    });

    if (!user) {
      return { 
        success: false, 
        error: "User not found" 
      };
    }

    // Get the appointment
    const appointment = await db.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        patient: true,
        doctor: true
      }
    });

    if (!appointment) {
      return { 
        success: false, 
        error: "Appointment not found" 
      };
    }

    // Check authorization
    if (appointment.patientId !== user.id && appointment.doctorId !== user.id) {
      return { 
        success: false, 
        error: "You don't have permission to cancel this appointment" 
      };
    }

    // Cancel appointment and restore slot
    await db.$transaction(async (tx) => {
      // Update appointment status
      await tx.appointment.update({
        where: { id: appointmentId },
        data: { status: "CANCELLED" }
      });

      // Find the corresponding availability slot and mark as available
      const slot = await tx.availability.findFirst({
        where: {
          doctorId: appointment.doctorId,
          startTime: appointment.startTime,
          endTime: appointment.endTime
        }
      });

      if (slot) {
        await tx.availability.update({
          where: { id: slot.id },
          data: { status: "AVAILABLE" }
        });
      }
    });

    revalidatePath("/");
    revalidatePath("/counselors");

    return { 
      success: true, 
      message: "Appointment cancelled successfully" 
    };

  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return { 
      success: false, 
      error: "Failed to cancel appointment" 
    };
  }
}