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
import {
  Clock,
  Plus,
  Loader2,
  AlertCircle,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import {
  setAvailabilitySlots,
  deleteAvailabilitySlot,
  deleteAllAvailability,
} from "@/actions/doctor";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function AvailabilitySettings({ slots }) {
  const [showForm, setShowForm] = useState(false);

  const { loading, fn: submitSlots, data } = useFetch(setAvailabilitySlots);
  const { loading: deletingOne, fn: removeSlot } =
    useFetch(deleteAvailabilitySlot);
  const { loading: deletingAll, fn: removeAllSlots } =
    useFetch(deleteAllAvailability);

  const {
    register,
    handleSubmit,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const now = new Date();
  const todayDateString = format(now, "yyyy-MM-dd");
  const currentTimeString = format(now, "HH:mm");

  const selectedDate = watch("date");
  const isToday = selectedDate === todayDateString;

  const onSubmit = async (data) => {
    if (loading) return;

    const { date, startTime, endTime } = data;

    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    const now = new Date();

    if (start >= end) {
      toast.error("End time must be after start time");
      return;
    }

    if (start <= now || end <= now) {
      toast.error("Availability must be in the future");
      return;
    }

    const formData = new FormData();
    formData.append("startTime", start.toISOString());
    formData.append("endTime", end.toISOString());

    await submitSlots(formData);
  };

  useEffect(() => {
    if (data?.success) {
      toast.success("Availability added");
      reset(); // allow quick adding multiple slots
    }
  }, [data, reset]);

  const formatTime = (d) => format(new Date(d), "h:mm a");
  const formatDate = (d) => format(new Date(d), "MMM d, yyyy");

  const slotsByDate = slots.reduce((acc, slot) => {
    const key = format(new Date(slot.startTime), "yyyy-MM-dd");
    acc[key] ||= [];
    acc[key].push(slot);
    return acc;
  }, {});

  const sortedDates = Object.keys(slotsByDate).sort();

  return (
    <Card className="rounded-3xl border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-emerald-600" />
          Availability
        </CardTitle>
        <CardDescription>
          Choose specific days and times you are available
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {!showForm ? (
          <>
            <div className="space-y-4">
              <h3 className="text-sm font-semibold">Current availability</h3>

              {slots.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No availability set yet.
                </p>
              ) : (
                <>
                  <div className="max-h-[400px] overflow-y-auto space-y-3">
                    {sortedDates.map((dateKey) => (
                      <div key={dateKey} className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          {formatDate(slotsByDate[dateKey][0].startTime)}
                        </p>

                        {slotsByDate[dateKey].map((slot) => (
                          <div
                            key={slot.id}
                            className="flex items-center gap-4 rounded-2xl border px-4 py-3"
                          >
                            <div className="h-9 w-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                              <Clock className="h-4 w-4 text-emerald-600" />
                            </div>

                            <div className="flex-1">
                              <p className="font-medium">
                                {formatTime(slot.startTime)} →{" "}
                                {formatTime(slot.endTime)}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {slot.status}
                              </p>
                            </div>

                            {slot.status === "AVAILABLE" && (
                              <Button
                                size="icon"
                                variant="ghost"
                                disabled={deletingOne}
                                onClick={async () => {
                                  await removeSlot(slot.id);
                                  toast.success("Availability removed");
                                }}
                                className="text-red-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="destructive"
                    disabled={deletingAll}
                    onClick={async () => {
                      if (!confirm("Remove all future availability?")) return;
                      await removeAllSlots();
                      toast.success("All availability removed");
                    }}
                    className="w-full rounded-xl"
                  >
                    {deletingAll ? "Removing…" : "Remove all availability"}
                  </Button>
                </>
              )}
            </div>

            <Button
              onClick={() => setShowForm(true)}
              className="w-full bg-emerald-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add availability
            </Button>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 border rounded-2xl p-5"
          >
            <h3 className="text-sm font-semibold">
              Add availability (multiple allowed)
            </h3>

            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                min={todayDateString}
                {...register("date", { required: true })}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start time</Label>
                <Input
                  type="time"
                  min={isToday ? currentTimeString : undefined}
                  {...register("startTime", { required: true })}
                />
              </div>

              <div className="space-y-2">
                <Label>End time</Label>
                <Input
                  type="time"
                  min={isToday ? currentTimeString : undefined}
                  {...register("endTime", { required: true })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
              >
                Done
              </Button>
              <Button type="submit" disabled={loading} className="bg-emerald-600">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Add slot"
                )}
              </Button>
            </div>
          </form>
        )}

        <div className="rounded-2xl border bg-muted/40 p-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-emerald-600" />
            <p className="text-sm text-muted-foreground">
              You can add multiple availability slots across different days.
              Overlapping times are prevented automatically.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
