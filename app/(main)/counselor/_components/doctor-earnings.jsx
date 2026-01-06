"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function DoctorEarnings({ earnings = {}, payouts = [] }) {
  const totalEarnings = earnings.totalEarnings || 0;
  const totalAppointments = earnings.totalAppointments || 0;

  const averageEarningsPerAppointment =
    totalAppointments > 0
      ? (totalEarnings / totalAppointments).toFixed(2)
      : 0;

  const pendingPayouts = payouts.filter(p => p.status === "PROCESSING").length;
  const processedPayouts = payouts.filter(p => p.status === "PROCESSED").length;

  return (
    <div className="space-y-6">
      {/* Summary */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              ${totalEarnings.toFixed(2)}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              From {totalAppointments} appointment
              {totalAppointments !== 1 && "s"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Avg per Appointment
            </CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              ${averageEarningsPerAppointment}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Based on completed appointments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">
              Payouts
            </CardTitle>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Badge variant="outline">
              {pendingPayouts} pending
            </Badge>
            <Badge variant="outline">
              {processedPayouts} processed
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>
            Track your recent payouts and payments
          </CardDescription>
        </CardHeader>

        <CardContent>
          {payouts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg font-semibold text-foreground">
                No payouts yet
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Your payouts will appear once appointments are completed.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="border-b">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Amount</th>
                    <th className="px-3 py-2 text-left font-medium">Credits</th>
                    <th className="px-3 py-2 text-left font-medium">Fee</th>
                    <th className="px-3 py-2 text-left font-medium">Status</th>
                    <th className="px-3 py-2 text-left font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="border-b last:border-0">
                      <td className="px-3 py-3 font-semibold">
                        ${payout.amount.toFixed(2)}
                      </td>
                      <td className="px-3 py-3">{payout.credits}</td>
                      <td className="px-3 py-3">
                        ${payout.platformFee.toFixed(2)}
                      </td>
                      <td className="px-3 py-3">
                        <Badge variant="outline">
                          {payout.status}
                        </Badge>
                      </td>
                      <td className="px-3 py-3 text-muted-foreground text-xs">
                        {new Date(payout.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
