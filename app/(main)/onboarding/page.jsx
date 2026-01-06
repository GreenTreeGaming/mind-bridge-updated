"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Stethoscope, Loader2 } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { setUserRole } from "@/actions/onboarding";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SPECIALTIES } from "@/lib/specialities";

const counselorFormSchema = z.object({
  specialty: z.string().min(1, "Specialty is required"),
  experience: z
    .number()
    .min(1, "Experience must be at least 1 year")
    .max(70, "Experience must be less than 70 years"),
  credentialUrl: z
    .string()
    .url("Please enter a valid URL"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(1000, "Description must be less than 1000 characters"),
});

const Onboarding = () => {
  const [step, setStep] = useState("choose-role");
  const { data, fn, loading } = useFetch(setUserRole);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(counselorFormSchema),
    defaultValues: {
      specialty: "",
      experience: undefined,
      credentialUrl: "",
      description: "",
    },
  });

  const specialtyValue = watch("specialty");

  /* ---------------------- Patient Flow ---------------------- */
  const handlePatientSelection = async () => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "PATIENT");

    await fn(formData);
  };

  /* ---------------------- Counselor Flow ---------------------- */
  const onCounselorSubmit = async (formDataValues) => {
    if (loading) return;

    const formData = new FormData();
    formData.append("role", "DOCTOR");
    formData.append("specialty", formDataValues.specialty);
    formData.append("experience", formDataValues.experience.toString());
    formData.append("credentialUrl", formDataValues.credentialUrl);
    formData.append("description", formDataValues.description);

    await fn(formData);
  };

  /* ---------------------- Redirect ---------------------- */
  useEffect(() => {
    if (data?.success) {
      toast.success("Role selected successfully!");
      router.push(data.redirect);
    }
  }, [data, router]);

  /* ====================== STEP 1 ====================== */
  if (step === "choose-role") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Patient */}
        <button
          onClick={handlePatientSelection}
          disabled={loading}
          className="group rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900 hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-xl transition-all p-8 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <User className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2">
            Join as a Patient
          </h3>

          <p className="text-sm text-foreground/70 dark:text-foreground/60 mb-6 leading-relaxed">
            Book appointments, consult with counselors, and manage your mental health journey.
          </p>

          <Button
            className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-base font-semibold"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing…
              </>
            ) : (
              "Continue as Patient"
            )}
          </Button>
        </button>

        {/* Counselor */}
        <button
          onClick={() => setStep("counselor-form")}
          className="group rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900 hover:border-emerald-500 dark:hover:border-emerald-600 hover:shadow-xl transition-all p-8 text-center focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
            <Stethoscope className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>

          <h3 className="text-xl font-bold text-foreground mb-2">
            Join as a Counselor
          </h3>

          <p className="text-sm text-foreground/70 dark:text-foreground/60 mb-6 leading-relaxed">
            Create your professional profile and provide care to patients.
          </p>

          <Button className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white text-base font-semibold">
            Continue as Counselor
          </Button>
        </button>
      </div>

    );
  }

  /* ====================== STEP 2 ====================== */
  return (
    <div className="space-y-6">
      {/* Top header */}
      <div className="rounded-3xl border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900 p-7 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <div className="min-w-0">
            <CardTitle className="text-2xl md:text-3xl font-extrabold text-foreground">
              Complete your counselor profile
            </CardTitle>
            <CardDescription className="mt-2 text-base text-foreground/70 dark:text-foreground/60 leading-relaxed">
              Provide your professional information for verification. This helps keep MindBridge safe and trusted.
            </CardDescription>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/50 px-4 py-2 text-sm text-emerald-800 dark:text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
              Verification required before you can accept bookings
            </div>
          </div>

          <div className="shrink-0">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-emerald-700 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Form card */}
      <Card className="border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-900 rounded-3xl shadow-sm">
        <CardContent className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onCounselorSubmit)} className="space-y-7">
            {/* Fields grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Specialty */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">Specialty</Label>
                <Select
                  value={specialtyValue}
                  onValueChange={(value) =>
                    setValue("specialty", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={`h-12 rounded-2xl bg-white dark:bg-gray-950 border-emerald-200 dark:border-emerald-800 focus:ring-2 focus:ring-emerald-500/30 ${errors.specialty ? "border-red-400 focus:ring-red-500/25" : ""
                      }`}
                  >
                    <SelectValue placeholder="Select your specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    {SPECIALTIES.map((spec) => (
                      <SelectItem key={spec.name} value={spec.name}>
                        <div className="flex items-center gap-2">
                          {spec.icon}
                          {spec.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.specialty && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.specialty.message}</p>
                )}
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">Years of Experience</Label>
                <Input
                  type="number"
                  placeholder="e.g. 5"
                  className={`h-12 rounded-2xl bg-white dark:bg-gray-950 border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500/30 ${errors.experience ? "border-red-400 focus-visible:ring-red-500/25" : ""
                    }`}
                  {...register("experience", { valueAsNumber: true })}
                />
                {errors.experience && (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.experience.message}</p>
                )}
              </div>

              {/* Credential URL (full width) */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-semibold text-foreground">Certification URL</Label>
                <Input
                  type="url"
                  placeholder="https://example.com/certification"
                  className={`h-12 rounded-2xl bg-white dark:bg-gray-950 border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500/30 ${errors.credentialUrl ? "border-red-400 focus-visible:ring-red-500/25" : ""
                    }`}
                  {...register("credentialUrl")}
                />
                {errors.credentialUrl ? (
                  <p className="text-sm text-red-600 dark:text-red-400">{errors.credentialUrl.message}</p>
                ) : (
                  <p className="text-xs text-foreground/60 dark:text-foreground/50">
                    Link to a license lookup, credential profile, or official certificate page.
                  </p>
                )}
              </div>

              {/* Description (full width) */}
              <div className="space-y-2 md:col-span-2">
                <Label className="text-sm font-semibold text-foreground">Description</Label>
                <Textarea
                  rows={5}
                  placeholder="Describe your expertise, therapeutic approach, and what clients can expect..."
                  className={`rounded-2xl bg-white dark:bg-gray-950 border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500/30 ${errors.description ? "border-red-400 focus-visible:ring-red-500/25" : ""
                    }`}
                  {...register("description")}
                />
                <div className="flex items-center justify-between gap-3">
                  {errors.description ? (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.description.message}</p>
                  ) : (
                    <p className="text-xs text-foreground/60 dark:text-foreground/50">
                      Keep it warm, clear, and specific. (10–1000 chars)
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep("choose-role")}
                disabled={loading}
                className="h-12 rounded-2xl border-emerald-200 dark:border-emerald-800 bg-white dark:bg-gray-950 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 text-foreground"
              >
                Back
              </Button>

              <Button
                type="submit"
                className="h-12 rounded-2xl px-8 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600 text-white font-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit for Verification"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;