"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { createAppointment } from "@/actions/appointments";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function BookingConfirmation({ counselor, slot, counselorId }) {
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const formatTime = (d) =>
    new Date(d).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const handleConfirmBooking = async () => {
    setIsBooking(true);
    setError(null);

    const result = await createAppointment(counselorId, slot.id);

    if (result.success) {
      setSuccess(true);
      
      // Redirect immediately without setTimeout to avoid 404 flash
      router.push("/counselors");
      router.refresh();
    } else {
      setError(result.error);
      setIsBooking(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto space-y-6">
        <Card className="border-emerald-200 bg-emerald-50">
          <CardContent className="p-6 text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-emerald-900 mb-2">
                Appointment Booked!
              </h2>
              <p className="text-emerald-700">
                Your session with {counselor.name} has been confirmed.
              </p>
            </div>

            <div className="pt-2">
              <p className="text-sm text-emerald-600">
                Redirecting...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <Button asChild variant="ghost" className="gap-2">
        <Link href={`/counselors/${counselorId}/book`}>
          <ArrowLeft className="h-4 w-4" />
          Change Time Slot
        </Link>
      </Button>

      <Card>
        <CardContent className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Confirm Appointment</h1>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Counselor</p>
                <p className="font-medium">{counselor.name}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm text-muted-foreground">Date & Time</p>
                <p className="font-medium">{formatDate(slot.startTime)}</p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(slot.startTime)} – {formatTime(slot.endTime)}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 space-y-3">
            <Button 
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              onClick={handleConfirmBooking}
              disabled={isBooking}
            >
              {isBooking ? "Booking..." : "Confirm Booking"}
            </Button>

            <Button asChild variant="ghost" className="w-full" disabled={isBooking}>
              <Link href={`/counselors/${counselorId}`}>Cancel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}