"use client";

import { Calendar, Clock, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Appointment = {
  id: string;
  startTime: string;
  endTime: string;
  status: "SCHEDULED" | "COMPLETED" | "CANCELLED";
  doctor: {
    name: string | null;
    imageUrl: string | null;
    specialty: string | null;
  };
};

export default function PatientAppointmentsClient({
  appointments,
}: {
  appointments: Appointment[];
}) {
  return (
    <div className="max-w-5xl mx-auto pt-32 pb-24 px-4 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-foreground">
          My Appointments
        </h1>
        <p className="text-muted-foreground">
          View your upcoming and past sessions.
        </p>
      </div>

      {/* Empty state */}
      {appointments.length === 0 && (
        <Card className="rounded-3xl">
          <CardContent className="p-10 text-center space-y-4">
            <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-semibold">
              No appointments yet
            </h3>
            <p className="text-sm text-muted-foreground">
              When you book a session, it will appear here.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Appointments list */}
      <div className="space-y-4">
        {appointments.map((appt) => (
          <Card key={appt.id} className="rounded-3xl">
            <CardContent className="p-6 flex gap-6">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                {appt.doctor.imageUrl ? (
                  <img
                    src={appt.doctor.imageUrl}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-6 w-6 text-primary" />
                )}
              </div>

              {/* Info */}
              <div className="flex-1 space-y-2">
                <h3 className="text-lg font-semibold">
                  {appt.doctor.name || "Counselor"}
                </h3>

                {appt.doctor.specialty && (
                  <p className="text-sm text-muted-foreground">
                    {appt.doctor.specialty}
                  </p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {new Date(appt.startTime).toLocaleDateString()}
                  </span>

                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {new Date(appt.startTime).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    –{" "}
                    {new Date(appt.endTime).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              {/* Status */}
              <div className="flex items-start">
                <Badge
                  variant={
                    appt.status === "SCHEDULED"
                      ? "default"
                      : appt.status === "COMPLETED"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {appt.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
