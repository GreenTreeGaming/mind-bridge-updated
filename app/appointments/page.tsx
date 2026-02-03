import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import PatientAppointmentsClient from "./patient-appointments-client";

export default async function AppointmentsPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { id: true, role: true },
  });

  if (!user || user.role !== "PATIENT") {
    redirect("/");
  }

  const appointments = await db.appointment.findMany({
    where: {
      patientId: user.id,
    },
    orderBy: {
      startTime: "asc",
    },
    include: {
      doctor: {
        select: {
          name: true,
          imageUrl: true,
          specialty: true,
        },
      },
    },
  });

  return <PatientAppointmentsClient appointments={appointments} />;
}
