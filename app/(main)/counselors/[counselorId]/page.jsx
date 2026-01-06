import { getCounselorById } from "@/actions/counselors";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Award, MessageSquare, User, ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";

export default async function CounselorProfilePage({ params }) {
  // Await params in Next.js 15+
  const { counselorId } = await params;
  
  const counselor = await getCounselorById(counselorId);

  if (!counselor) notFound();

  // Group availability by date
  const availabilityByDate = counselor.availabilities?.reduce((acc, slot) => {
    const date = new Date(slot.startTime);
    const dateKey = date.toISOString().split('T')[0]; // YYYY-MM-DD
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(slot);
    return acc;
  }, {}) || {};

  // Sort dates
  const sortedDates = Object.keys(availabilityByDate).sort();

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const dateKey = date.toISOString().split('T')[0];
    const todayKey = today.toISOString().split('T')[0];
    const tomorrowKey = tomorrow.toISOString().split('T')[0];

    if (dateKey === todayKey) return "Today";
    if (dateKey === tomorrowKey) return "Tomorrow";

    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
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
        {/* LEFT: Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <Card className="border-border">
            <CardContent className="p-6 flex gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center overflow-hidden shrink-0">
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

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-extrabold text-foreground mb-1">
                  {counselor.name}
                </h1>

                {counselor.specialty && (
                  <Badge
                    variant="outline"
                    className="bg-primary/10 border-primary/20 text-primary mb-2"
                  >
                    {counselor.specialty}
                  </Badge>
                )}

                {counselor.experience && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                    <Award className="h-4 w-4 text-primary" />
                    <span>
                      <span className="font-medium text-foreground">
                        {counselor.experience}
                      </span>{" "}
                      year{counselor.experience !== 1 ? "s" : ""} of experience
                    </span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* About */}
          {counselor.description && (
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    About
                  </h2>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {counselor.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Availability */}
          <Card className="border-border">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-lg font-semibold text-foreground">
                  Available Time Slots
                </h2>
              </div>

              {sortedDates.length > 0 ? (
                <div className="space-y-4">
                  {sortedDates.map((dateKey) => (
                    <div key={dateKey} className="flex flex-col sm:flex-row sm:items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className="w-32 shrink-0">
                        <p className="font-medium text-foreground">
                          {formatDate(dateKey)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(dateKey).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2">
                          {availabilityByDate[dateKey]
                            .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                            .map((slot) => (
                              <Badge
                                key={slot.id}
                                variant="outline"
                                className="bg-primary/5 border-primary/20 text-foreground font-normal"
                              >
                                {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-muted/30 rounded-lg">
                  <Clock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">
                    No upcoming availability at this time.
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Check back later or contact the counselor directly.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Booking CTA */}
        <div className="space-y-6">
          <Card className="border-border sticky top-24">
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">
                Book an Appointment
              </h3>

              <p className="text-sm text-muted-foreground">
                Schedule a private session with{" "}
                <span className="font-medium text-foreground">
                  {counselor.name}
                </span>.
              </p>

              <Button 
                className="w-full h-11 rounded-xl"
                disabled={!counselor.availabilities || counselor.availabilities.length === 0}
              >
                <Calendar className="h-4 w-4 mr-2" />
                {counselor.availabilities && counselor.availabilities.length > 0 
                  ? "Book Session" 
                  : "No Availability"}
              </Button>

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