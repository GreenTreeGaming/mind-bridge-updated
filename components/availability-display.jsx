"use client";

import { Clock } from "lucide-react";

export function AvailabilityDisplay({ availabilities }) {
  // Helper to parse database timestamp as UTC
  const parseUTC = (dateString) => {
    // If the string doesn't have timezone info, treat it as UTC
    if (dateString && !dateString.includes('Z') && !dateString.includes('+')) {
      return new Date(dateString + 'Z');
    }
    return new Date(dateString);
  };

  // Helper to format time in user's local timezone (client-side)
  const formatTime = (dateString) => {
    return parseUTC(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Helper to format date in user's local timezone (client-side)
  const formatDate = (dateString) => {
    return parseUTC(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
  };

  // Helper to get date key in user's local timezone (client-side)
  const getLocalDateKey = (dateString) => {
    const date = parseUTC(dateString);
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
      <p className="text-muted-foreground text-sm">
        No upcoming availability.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {sortedDates.map((dateKey) => (
        <div key={dateKey} className="rounded-2xl border p-4">
          <p className="font-semibold mb-2">
            {formatDate(availabilityByDate[dateKey][0].startTime)}
          </p>

          <div className="flex flex-wrap gap-2">
            {availabilityByDate[dateKey]
              .sort((a, b) => parseUTC(a.startTime) - parseUTC(b.startTime))
              .map((slot) => (
                <div
                  key={slot.id}
                  className="
                    flex items-center gap-2
                    rounded-full
                    border border-primary/30
                    bg-primary/5
                    px-4 py-2
                    text-sm
                  "
                >
                  <Clock className="h-3.5 w-3.5 text-primary" />
                  <span className="font-medium">
                    {formatTime(slot.startTime)}
                  </span>
                  <span className="text-muted-foreground">–</span>
                  <span className="font-medium">
                    {formatTime(slot.endTime)}
                  </span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}