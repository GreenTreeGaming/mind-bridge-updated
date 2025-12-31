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
  const averageEarningsPerAppointment = totalAppointments > 0 ? (totalEarnings / totalAppointments).toFixed(2) : 0;

  const pendingPayouts = payouts.filter(p => p.status === "PROCESSING").length;
  const processedPayouts = payouts.filter(p => p.status === "PROCESSED").length;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Earnings */}
        <Card className="bg-emerald-500/20 border-emerald-500/30">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-emerald-100 flex items-center justify-between">
              <span>Total Earnings</span>
              <DollarSign className="h-5 w-5 text-emerald-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-400">
              ${totalEarnings.toFixed(2)}
            </div>
            <p className="text-xs text-emerald-200 mt-2">
              From {totalAppointments} appointment{totalAppointments !== 1 ? "s" : ""}
            </p>
          </CardContent>
        </Card>

        {/* Average Per Appointment */}
        <Card className="bg-blue-500/20 border-blue-500/30">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-100 flex items-center justify-between">
              <span>Avg Per Appointment</span>
              <TrendingUp className="h-5 w-5 text-blue-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400">
              ${averageEarningsPerAppointment}
            </div>
            <p className="text-xs text-blue-200 mt-2">
              Based on completed appointments
            </p>
          </CardContent>
        </Card>

        {/* Payout Status */}
        <Card className="bg-purple-500/20 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-purple-100 flex items-center justify-between">
              <span>Payouts</span>
              <DollarSign className="h-5 w-5 text-purple-400" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="bg-yellow-500/20 border-yellow-500/30 text-yellow-200">
                {pendingPayouts} pending
              </Badge>
              <Badge variant="outline" className="bg-green-500/20 border-green-500/30 text-green-200">
                {processedPayouts} processed
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payouts History */}
      <Card className="bg-emerald-500/20 border-emerald-500/30">
        <CardHeader>
          <CardTitle className="text-white">Payout History</CardTitle>
          <CardDescription className="text-emerald-100">
            Track your recent payouts and payments
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payouts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-emerald-200">No payouts yet</p>
              <p className="text-sm text-emerald-300 mt-2">
                Your payouts will appear here once you complete appointments
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-emerald-500/30">
                    <th className="text-left py-2 px-3 text-emerald-100 font-medium">Amount</th>
                    <th className="text-left py-2 px-3 text-emerald-100 font-medium">Credits</th>
                    <th className="text-left py-2 px-3 text-emerald-100 font-medium">Platform Fee</th>
                    <th className="text-left py-2 px-3 text-emerald-100 font-medium">Status</th>
                    <th className="text-left py-2 px-3 text-emerald-100 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map((payout) => (
                    <tr key={payout.id} className="border-b border-emerald-500/20 hover:bg-emerald-600/10">
                      <td className="py-3 px-3 text-emerald-200 font-semibold">
                        ${payout.amount.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-emerald-200">
                        {payout.credits}
                      </td>
                      <td className="py-3 px-3 text-emerald-300">
                        ${payout.platformFee.toFixed(2)}
                      </td>
                      <td className="py-3 px-3">
                        <Badge
                          variant="outline"
                          className={
                            payout.status === "PROCESSED"
                              ? "bg-green-500/20 border-green-500/30 text-green-200"
                              : "bg-yellow-500/20 border-yellow-500/30 text-yellow-200"
                          }
                        >
                          {payout.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-3 text-emerald-300 text-xs">
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