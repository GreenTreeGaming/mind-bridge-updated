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
import { Check, Ban, Loader2, User, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { updateDoctorActiveStatus } from "@/actions/admin";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

export function VerifiedDoctors({ doctors }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [targetDoctor, setTargetDoctor] = useState(null);
  const [actionType, setActionType] = useState(null);

  const { loading, data, fn: submitStatusUpdate } =
    useFetch(updateDoctorActiveStatus);

  const filteredDoctors = doctors.filter((doctor) => {
    const q = searchTerm.toLowerCase();
    return (
      doctor.name.toLowerCase().includes(q) ||
      doctor.specialty.toLowerCase().includes(q) ||
      doctor.email.toLowerCase().includes(q)
    );
  });

  const handleStatusChange = async (doctor, suspend) => {
    if (loading) return;

    const confirmed = window.confirm(
      `Are you sure you want to ${
        suspend ? "suspend" : "reinstate"
      } ${doctor.name}?`
    );
    if (!confirmed) return;

    const formData = new FormData();
    formData.append("doctorId", doctor.id);
    formData.append("suspend", suspend ? "true" : "false");

    setTargetDoctor(doctor);
    setActionType(suspend ? "SUSPEND" : "REINSTATE");

    await submitStatusUpdate(formData);
  };

  useEffect(() => {
    if (data?.success && targetDoctor && actionType) {
      toast.success(
        `${actionType === "SUSPEND" ? "Suspended" : "Reinstated"} ${
          targetDoctor.name
        } successfully!`
      );
      setTargetDoctor(null);
      setActionType(null);
    }
  }, [data]);

  return (
    <div>
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div>
              <CardTitle className="text-xl font-bold text-foreground">
                Manage Counselors
              </CardTitle>
              <CardDescription>
                View and manage all verified counselors
              </CardDescription>
            </div>

            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search counselors..."
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {filteredDoctors.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {searchTerm
                ? "No counselors match your search."
                : "No verified counselors available."}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDoctors.map((doctor) => {
                const isSuspended =
                  doctor.verificationStatus === "REJECTED";

                return (
                  <Card
                    key={doctor.id}
                    className="bg-card border-border transition-colors hover:border-primary/30"
                  >
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
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
                            <p className="text-sm text-muted-foreground">
                              {doctor.email}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto">
                          {isSuspended ? (
                            <>
                              <Badge className="bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20">
                                Suspended
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={loading}
                                onClick={() =>
                                  handleStatusChange(doctor, false)
                                }
                              >
                                {loading &&
                                targetDoctor?.id === doctor.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Check className="h-4 w-4 mr-1" />
                                )}
                                Reinstate
                              </Button>
                            </>
                          ) : (
                            <>
                              <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/20">
                                Active
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                disabled={loading}
                                onClick={() =>
                                  handleStatusChange(doctor, true)
                                }
                                className="text-red-600 dark:text-red-400"
                              >
                                {loading &&
                                targetDoctor?.id === doctor.id ? (
                                  <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                                ) : (
                                  <Ban className="h-4 w-4 mr-1" />
                                )}
                                Suspend
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}