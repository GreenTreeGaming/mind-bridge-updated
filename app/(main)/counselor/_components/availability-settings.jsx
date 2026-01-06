"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, Plus, Loader2, AlertCircle } from "lucide-react";
import { format, addDays, setHours, setMinutes, startOfDay } from "date-fns";
import { setAvailabilitySlots } from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function AvailabilitySettings({ slots }) {
  const [showForm, setShowForm] = useState(false);
  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startTime: "",
      endTime: "",
    },
  });

  function createLocalDateFromTime(timeStr, daysAhead = 0) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const baseDate = startOfDay(addDays(new Date(), daysAhead));
    return setMinutes(setHours(baseDate, hours), minutes);
  }

  const onSubmit = async (data) => {
    if (loading) return;

    // Create a date for today with the provided time
    const todayStart = createLocalDateFromTime(data.startTime, 0);
    const todayEnd = createLocalDateFromTime(data.endTime, 0);

    if (todayStart >= todayEnd) {
      toast.error("End time must be after start time");
      return;
    }

    // Create form data with the number of days to create
    const formData = new FormData();
    formData.append("startTime", todayStart.toISOString());
    formData.append("endTime", todayEnd.toISOString());
    formData.append("daysCount", "30"); // Create for next 30 days

    await submitSlots(formData);
  };

  useEffect(() => {
    if (data?.success) {
      setShowForm(false);
      toast.success(`Availability set for ${data.count || 30} days`);
    }
  }, [data]);

  const formatTimeString = (dateString) => {
    try {
      return format(new Date(dateString), "h:mm a");
    } catch {
      return "Invalid time";
    }
  };

  const formatDateString = (dateString) => {
    try {
      return format(new Date(dateString), "MMM d, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  // Group slots by date
  const slotsByDate = slots.reduce((acc, slot) => {
    const dateKey = format(new Date(slot.startTime), "yyyy-MM-dd");
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(slot);
    return acc;
  }, {});

  const sortedDates = Object.keys(slotsByDate).sort();

  return (
    <Card className="bg-card border border-border rounded-3xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-extrabold flex items-center gap-2 text-foreground">
          <Clock className="h-5 w-5 text-emerald-600" />
          Availability
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Set the hours patients can book appointments with you
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* VIEW MODE */}
        {!showForm ? (
          <>
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-3">
                Current availability
              </h3>

              {slots.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  You haven't added any availability yet.
                </p>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                  {sortedDates.slice(0, 10).map((dateKey) => (
                    <div key={dateKey} className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">
                        {formatDateString(slotsByDate[dateKey][0].startTime)}
                      </p>
                      {slotsByDate[dateKey].map((slot) => (
                        <div
                          key={slot.id}
                          className="flex items-center gap-4 rounded-2xl border border-border bg-background/60 px-4 py-3"
                        >
                          <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                            <Clock className="h-4 w-4 text-emerald-600" />
                          </div>

                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {formatTimeString(slot.startTime)} –{" "}
                              {formatTimeString(slot.endTime)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {slot.appointment ? "Booked" : "Available"}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
                  {sortedDates.length > 10 && (
                    <p className="text-xs text-muted-foreground text-center pt-2">
                      Showing first 10 days of {sortedDates.length} days with availability
                    </p>
                  )}
                </div>
              )}
            </div>

            <Button
              onClick={() => setShowForm(true)}
              className="w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add availability
            </Button>
          </>
        ) : (
          /* EDIT MODE */
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-2xl border border-border bg-background/50 p-5"
          >
            <h3 className="text-sm font-semibold text-foreground">
              Add daily availability (next 30 days)
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Start time</Label>
                <Input
                  type="time"
                  {...register("startTime", { required: "Start time required" })}
                  className="h-11 rounded-xl bg-background"
                />
                {errors.startTime && (
                  <p className="text-sm text-red-500">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">End time</Label>
                <Input
                  type="time"
                  {...register("endTime", { required: "End time required" })}
                  className="h-11 rounded-xl bg-background"
                />
                {errors.endTime && (
                  <p className="text-sm text-red-500">
                    {errors.endTime.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                disabled={loading}
                className="rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting availability…
                  </>
                ) : (
                  "Set for next 30 days"
                )}
              </Button>
            </div>
          </form>
        )}

        {/* INFO BOX */}
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-emerald-600 mt-0.5" />
            <div>
              <p className="font-medium text-foreground text-sm">
                How availability works
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Setting availability creates time slots for the next 30 days. Patients can book sessions during these hours. Updating availability will replace all future slots.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}