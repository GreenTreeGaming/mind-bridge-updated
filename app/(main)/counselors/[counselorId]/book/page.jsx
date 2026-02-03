import { getCounselorById } from "@/actions/counselors";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BookingConfirmation } from "@/components/booking-confirmation";
import { TimeSlotSelector } from "@/components/time-slot-selector";

export default async function BookSessionPage({ params, searchParams }) {
  const { counselorId } = await params;
  const { slotId } = await searchParams;

  const counselor = await getCounselorById(counselorId);
  if (!counselor) notFound();

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

            <TimeSlotSelector 
              availabilities={counselor.availabilities}
              counselorId={counselorId}
            />
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