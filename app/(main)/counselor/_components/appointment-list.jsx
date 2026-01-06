"use client";

import { useEffect } from "react";
import { getDoctorAppointments } from "@/actions/doctor";
import { AppointmentCard } from "@/components/appointment-card";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/use-fetch";

export default function DoctorAppointmentsList() {
  const {
    loading,
    data,
    fn: fetchAppointments,
  } = useFetch(getDoctorAppointments);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const appointments = data?.appointments || [];

  return (
    <Card className="border border-border bg-card rounded-3xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-extrabold flex items-center gap-2 text-foreground">
          <Calendar className="h-5 w-5 text-emerald-600" />
          Upcoming Appointments
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="py-16 text-center">
            <p className="text-sm text-muted-foreground">
              Loading appointments…
            </p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                userRole="DOCTOR"
                refetchAppointments={fetchAppointments}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="mx-auto mb-4 h-12 w-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
              <Calendar className="h-6 w-6 text-emerald-600" />
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              No upcoming appointments
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              You don’t have any scheduled appointments yet. Make sure your
              availability is set so patients can book sessions.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
