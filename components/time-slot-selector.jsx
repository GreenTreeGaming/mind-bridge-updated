"use client";

import { Button } from "@/components/ui/button";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

export function TimeSlotSelector({ availabilities, counselorId }) {
  // Helper to format time in user's local timezone (client-side)
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Helper to format date in user's local timezone (client-side)
  const formatDateLong = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  // Helper to get date key in user's local timezone (client-side)
  const getLocalDateKey = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Group availability by date in LOCAL timezone
  const availabilityByDate = (availabilities || []).reduce((acc, slot) => {
    const dateKey = getLocalDateKey(slot.startTime);
    acc[dateKey] ||= [];
    acc[dateKey].push(slot);
    return acc;
  }, {});

  const sortedDates = Object.keys(availabilityByDate).sort();

  if (sortedDates.length === 0) {
    return (
      <div className="text-center py-8">
        <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">
          No available time slots at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">
        Select an available time slot
      </label>

      <div className="space-y-4">
        {sortedDates.map((dateKey) => (
          <div key={dateKey} className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Calendar className="h-4 w-4 text-primary" />
              {formatDateLong(availabilityByDate[dateKey][0].startTime)}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {availabilityByDate[dateKey]
                .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                .map((slot) => (
                  <Button
                    key={slot.id}
                    asChild
                    variant="outline"
                    className="h-auto py-3 flex-col items-start gap-1"
                  >
                    <Link
                      href={`/counselors/${counselorId}/book?slotId=${slot.id}`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-medium text-sm">
                          {formatTime(slot.startTime)}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        to {formatTime(slot.endTime)}
                      </span>
                    </Link>
                  </Button>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}