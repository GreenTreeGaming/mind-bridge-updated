"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X, User, Medal, FileText, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { updateDoctorStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import { BarLoader } from "react-spinners";

export function PendingDoctors({ doctors }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const { loading, data, fn: submitStatusUpdate } =
    useFetch(updateDoctorStatus);

  const handleViewDetails = (doctor) => setSelectedDoctor(doctor);
  const handleCloseDialog = () => setSelectedDoctor(null);

  const handleUpdateStatus = async (doctorId, status) => {
    if (loading) return;

    const formData = new FormData();
    formData.append("doctorId", doctorId);
    formData.append("status", status);

    await submitStatusUpdate(formData);
  };

  useEffect(() => {
    if (data?.success) handleCloseDialog();
  }, [data]);

  return (
    <div>
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-foreground">
            Pending Counselor Verifications
          </CardTitle>
          <CardDescription>
            Review and approve counselor applications
          </CardDescription>
        </CardHeader>

        <CardContent>
          {doctors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending verification requests at this time.
            </div>
          ) : (
            <div className="space-y-4">
              {doctors.map((doctor) => (
                <Card
                  key={doctor.id}
                  className="bg-card border-border transition-colors hover:border-primary/30"
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-muted p-2">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground">
                            {doctor.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {doctor.specialty} • {doctor.experience} years
                            experience
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end md:self-auto">
                        <Badge className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/20">
                          Pending
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(doctor)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      {selectedDoctor && (
        <Dialog open onOpenChange={handleCloseDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-foreground">
                Counselor Verification Details
              </DialogTitle>
              <DialogDescription>
                Review the counselor&apos;s information carefully before making a
                decision
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  ["Full Name", selectedDoctor.name],
                  ["Email", selectedDoctor.email],
                  [
                    "Application Date",
                    format(new Date(selectedDoctor.createdAt), "PPP"),
                  ],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-medium text-foreground break-words leading-snug">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <Separator />

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Medal className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-foreground">
                    Professional Information
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Specialty</p>
                    <p className="text-foreground break-words leading-snug">
                      {selectedDoctor.specialty}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">
                      Years of Experience
                    </p>
                    <p className="text-foreground">
                      {selectedDoctor.experience} years
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground">Credentials</p>
                    <a
                      href={selectedDoctor.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      View Credentials
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-medium text-foreground">
                    Service Description
                  </h3>
                </div>
                <p className="text-muted-foreground whitespace-pre-line">
                  {selectedDoctor.description}
                </p>
              </div>
            </div>

            {loading && <BarLoader width="100%" color="#36d7b7" />}

            <DialogFooter className="flex justify-between">
              <Button
                variant="destructive"
                disabled={loading}
                onClick={() =>
                  handleUpdateStatus(selectedDoctor.id, "REJECTED")
                }
              >
                <X className="mr-2 h-4 w-4" />
                Reject
              </Button>

              <Button
                disabled={loading}
                onClick={() =>
                  handleUpdateStatus(selectedDoctor.id, "VERIFIED")
                }
              >
                <Check className="mr-2 h-4 w-4" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}