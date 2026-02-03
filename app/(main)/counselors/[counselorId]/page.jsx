import { Card, CardContent } from "@/components/ui/card";
import { getCounselorById } from "@/actions/counselors";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Award,
  MessageSquare,
  User,
  ArrowLeft,
  Clock,
} from "lucide-react";
import Link from "next/link";

export default async function CounselorProfilePage({ params }) {
  const { counselorId } = await params;

  const counselor = await getCounselorById(counselorId);
  if (!counselor) notFound();

  // Helper to format time in user's local timezone
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  // Helper to format date in user's local timezone
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });
  };

  // Helper to get date key in user's local timezone
  const getLocalDateKey = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }).split('/').reverse().join('-'); // Convert MM/DD/YYYY to YYYY-MM-DD
  };

  // Group availability by date in LOCAL timezone
  const availabilityByDate =
    counselor.availabilities?.reduce((acc, slot) => {
      const dateKey = getLocalDateKey(slot.startTime);
      acc[dateKey] ||= [];
      acc[dateKey].push(slot);
      return acc;
    }, {}) || {};

  const sortedDates = Object.keys(availabilityByDate).sort();

  return (
    <div className="space-y-6">
      {/* Back */}
      <Button
        asChild
        variant="ghost"
        className="gap-2 text-muted-foreground hover:text-foreground -ml-2"
      >
        <Link href="/counselors">
          <ArrowLeft className="h-4 w-4" />
          Back to Counselors
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card>
            <CardContent className="p-6 flex gap-6">
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border flex items-center justify-center overflow-hidden">
                {counselor.imageUrl ? (
                  <img
                    src={counselor.imageUrl}
                    alt={counselor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="h-10 w-10 text-primary" />
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-2xl font-extrabold">
                  {counselor.name}
                </h1>

                {counselor.specialty && (
                  <Badge className="mt-2">
                    {counselor.specialty}
                  </Badge>
                )}

                {counselor.experience && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Award className="h-4 w-4" />
                    {counselor.experience} years of experience
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* About */}
          {counselor.description && (
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">About</h2>
                </div>
                <p className="text-muted-foreground">
                  {counselor.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Availability */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5" />
                <h2 className="text-lg font-semibold">
                  Available Time Slots
                </h2>
              </div>

              {sortedDates.length > 0 ? (
                <div className="space-y-4">
                  {sortedDates.map((dateKey) => (
                    <div
                      key={dateKey}
                      className="rounded-2xl border p-4"
                    >
                      <p className="font-semibold mb-2">
                        {formatDate(availabilityByDate[dateKey][0].startTime)}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {availabilityByDate[dateKey]
                          .sort(
                            (a, b) =>
                              new Date(a.startTime) -
                              new Date(b.startTime)
                          )
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
              ) : (
                <p className="text-muted-foreground text-sm">
                  No upcoming availability.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT CTA */}
        <div className="space-y-6">
          <Card className="sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold">
                Book an Appointment
              </h3>

              <p className="text-sm text-muted-foreground">
                Schedule a private session with{" "}
                <span className="font-medium">
                  {counselor.name}
                </span>
                .
              </p>

              {counselor.availabilities?.length > 0 ? (
                <Button asChild className="w-full h-11 rounded-xl">
                  <Link href={`/counselors/${counselor.id}/book`}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Session
                  </Link>
                </Button>
              ) : (
                <Button
                  className="w-full h-11 rounded-xl"
                  disabled
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  No Availability
                </Button>
              )}

              <p className="text-xs text-muted-foreground text-center">
                Secure · Confidential · Online
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
