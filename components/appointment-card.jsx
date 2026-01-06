"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Phone, Mail } from "lucide-react";
import { format } from "date-fns";

export function AppointmentCard({
  appointment,
  userRole = "DOCTOR",
  refetchAppointments,
}) {
  const getStatusColor = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-emerald-500/20 text-emerald-300 border-emerald-500/30";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "COMPLETED":
        return "bg-blue-500/20 text-blue-300 border-blue-500/30";
      case "CANCELLED":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  if (!appointment || !appointment.id) {
    return null;
  }

  // Safari-compatible date parsing
  const parseDate = (dateString) => {
    if (!dateString) return null;
    
    // Handle string dates that Safari doesn't parse well
    if (typeof dateString === 'string') {
      // Replace dots with dashes for Safari compatibility
      let normalizedDate = dateString.replace(/\./g, '-');
      // Replace spaces with 'T' for ISO format compatibility
      normalizedDate = normalizedDate.replace(' ', 'T');
      
      const date = new Date(normalizedDate);
      return isNaN(date.getTime()) ? null : date;
    }
    
    // Handle Date objects or timestamps
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  };

  const appointmentDate = parseDate(appointment.startTime || appointment.appointmentDate);
  const isValidDate = appointmentDate !== null;
  const isUpcoming = isValidDate && appointmentDate > new Date();

  return (
    <Card className="bg-emerald-500/20 border-emerald-500/30 hover:border-emerald-500/50 transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-white text-lg">
              {appointment.patient?.name || "Patient"}
            </h4>
            <p className="text-sm text-emerald-200">
              {appointment.patient?.email || "No email provided"}
            </p>
          </div>
          <Badge
            variant="outline"
            className={`${getStatusColor(appointment.status)}`}
          >
            {appointment.status || "PENDING"}
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          {isValidDate && (
            <>
              <div className="flex items-center gap-2 text-sm text-emerald-100">
                <Calendar className="h-4 w-4 text-emerald-400" />
                <span>{format(appointmentDate, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-100">
                <Clock className="h-4 w-4 text-emerald-400" />
                <span>{format(appointmentDate, "h:mm a")}</span>
              </div>
            </>
          )}
          {appointment.patient?.phone && (
            <div className="flex items-center gap-2 text-sm text-emerald-100">
              <Phone className="h-4 w-4 text-emerald-400" />
              <span>{appointment.patient.phone}</span>
            </div>
          )}
        </div>

        {appointment.notes && (
          <div className="mb-4 p-3 bg-emerald-900/30 rounded border border-emerald-500/20">
            <p className="text-xs font-medium text-emerald-200 mb-1">Notes:</p>
            <p className="text-sm text-emerald-100">{appointment.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          {isUpcoming && appointment.status === "CONFIRMED" && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20"
                onClick={() => {
                  // Handle reschedule logic
                }}
              >
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-red-500/30 text-red-300 hover:bg-red-500/20"
                onClick={() => {
                  // Handle cancel logic
                }}
              >
                Cancel
              </Button>
            </>
          )}
          {appointment.status === "PENDING" && (
            <>
              <Button
                size="sm"
                className="flex-1 bg-emerald-500/30 text-emerald-100 hover:bg-emerald-500/40"
                onClick={() => {
                  // Handle confirm logic
                }}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-red-500/30 text-red-300 hover:bg-red-500/20"
                onClick={() => {
                  // Handle decline logic
                }}
              >
                Decline
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
