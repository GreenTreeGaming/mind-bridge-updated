import { getCounselorById } from "@/actions/counselors";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowLeft, Calendar } from "lucide-react";
import Link from "next/link";
import { BookingConfirmation } from "@/components/booking-confirmation";

export default async function BookSessionPage({ params, searchParams }) {
  const { counselorId } = await params;
  const { slotId } = await searchParams;

  const counselor = await getCounselorById(counselorId);
  if (!counselor) notFound();

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  // Group availability by date
  const availabilityByDate =
    counselor.availabilities?.reduce((acc, slot) => {
      const dateKey = new Date(slot.startTime).toISOString().split("T")[0];
      acc[dateKey] ||= [];
      acc[dateKey].push(slot);
      return acc;
    }, {}) || {};

  const sortedDates = Object.keys(availabilityByDate).sort();

  // No slot selected → show time slot selection
  if (!slotId) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Button asChild variant="ghost" className="gap-2">
          <Link href={`/counselors/${counselorId}`}>
            <ArrowLeft className="h-4 w-4" />
            Back to Profile
          </Link>
        </Button>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Book a Session</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{counselor.name}</span>
              </div>
            </div>

            {counselor.availabilities?.length > 0 ? (
              <div className="space-y-4">
                <label className="text-sm font-medium">
                  Select an available time slot
                </label>

                <div className="space-y-4">
                  {sortedDates.map((dateKey) => (
                    <div key={dateKey} className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(dateKey).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {availabilityByDate[dateKey]
                          .sort(
                            (a, b) =>
                              new Date(a.startTime) - new Date(b.startTime)
                          )
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
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">
                  No available time slots at the moment.
                </p>
                <Button asChild variant="ghost" className="mt-4">
                  <Link href={`/counselors/${counselorId}`}>
                    Back to Profile
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // Slot selected → show confirmation
  const slot = counselor.availabilities.find((s) => s.id === slotId);
  if (!slot) notFound();

  return (
    <BookingConfirmation 
      counselor={counselor}
      slot={slot}
      counselorId={counselorId}
    />
  );
}