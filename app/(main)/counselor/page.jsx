import { getDoctorAppointments, getDoctorAvailability } from "@/actions/doctor";
import { getCurrentUser } from "@/actions/onboarding";
import { redirect } from "next/navigation";
import { getDoctorEarnings, getDoctorPayouts } from "@/actions/payout";
import { DoctorDashboard } from "./_components/doctor-dashboard";

export default async function DoctorDashboardPage() {
  const user = await getCurrentUser();

  const [appointmentsData, availabilityData, earningsData, payoutsData] =
    await Promise.all([
      getDoctorAppointments(),
      getDoctorAvailability(),
      getDoctorEarnings(),
      getDoctorPayouts(),
    ]);

  //   // Redirect if not a doctor
  if (user?.role !== "DOCTOR") {
    redirect("/onboarding");
  }

  // If already verified, redirect to dashboard
  if (user?.verificationStatus !== "VERIFIED") {
    redirect("/doctor/verification");
  }

  return (
    <DoctorDashboard
      appointments={appointmentsData.appointments || []}
      slots={availabilityData.slots || []}
      earnings={earningsData.earnings || {}}
      payouts={payoutsData.payouts || []}
    />
  );
}