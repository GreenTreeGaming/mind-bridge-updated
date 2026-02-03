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
import { AvailabilityDisplay } from "@/components/availability-display";

export default async function CounselorProfilePage({ params }) {
  const { counselorId } = await params;

  const counselor = await getCounselorById(counselorId);
  if (!counselor) notFound();

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

              <AvailabilityDisplay availabilities={counselor.availabilities} />
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