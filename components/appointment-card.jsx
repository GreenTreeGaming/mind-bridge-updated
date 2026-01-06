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
        return "bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 border-yellow-300 dark:bg-yellow-500/20 dark:text-yellow-300 dark:border-yellow-500/30";
      case "COMPLETED":
        return "bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30";
      case "CANCELLED":
        return "bg-red-100 text-red-800 border-red-300 dark:bg-red-500/20 dark:text-red-300 dark:border-red-500/30";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/30";
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
    <Card className="bg-emerald-50 border-emerald-200 hover:border-emerald-300 dark:bg-emerald-500/20 dark:border-emerald-500/30 dark:hover:border-emerald-500/50 transition-all">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-lg">
              {appointment.patient?.name || "Patient"}
            </h4>
            <p className="text-sm text-gray-600 dark:text-emerald-200">
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
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-emerald-100">
                <Calendar className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{format(appointmentDate, "MMMM d, yyyy")}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-emerald-100">
                <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <span>{format(appointmentDate, "h:mm a")}</span>
              </div>
            </>
          )}
          {appointment.patient?.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-emerald-100">
              <Phone className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>{appointment.patient.phone}</span>
            </div>
          )}
        </div>

        {appointment.notes && (
          <div className="mb-4 p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded border border-emerald-200 dark:border-emerald-500/20">
            <p className="text-xs font-medium text-emerald-800 dark:text-emerald-200 mb-1">Notes:</p>
            <p className="text-sm text-gray-700 dark:text-emerald-100">{appointment.notes}</p>
          </div>
        )}

        <div className="flex gap-2">
          {isUpcoming && appointment.status === "CONFIRMED" && (
            <>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-emerald-300 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:text-emerald-300 dark:hover:bg-emerald-500/20"
                onClick={() => {
                  // Handle reschedule logic
                }}
              >
                Reschedule
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/20"
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
                className="flex-1 bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-500/30 dark:text-emerald-100 dark:hover:bg-emerald-500/40"
                onClick={() => {
                  // Handle confirm logic
                }}
              >
                Confirm
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 border-red-300 text-red-700 hover:bg-red-100 dark:border-red-500/30 dark:text-red-300 dark:hover:bg-red-500/20"
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