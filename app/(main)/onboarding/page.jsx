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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient */}
        <Card
          className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all"
          onClick={handlePatientSelection}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <User className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Patient
            </CardTitle>
            <CardDescription className="mb-4">
              Book appointments, consult with counselors, and manage your mental
              health journey.
            </CardDescription>
            <Button
              className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Continue as Patient"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Counselor */}
        <Card
          className="border-emerald-900/20 hover:border-emerald-700/40 cursor-pointer transition-all"
          onClick={() => setStep("counselor-form")}
        >
          <CardContent className="pt-6 pb-6 flex flex-col items-center text-center">
            <div className="p-4 bg-emerald-900/20 rounded-full mb-4">
              <Stethoscope className="h-8 w-8 text-emerald-400" />
            </div>
            <CardTitle className="text-xl font-semibold text-white mb-2">
              Join as a Counselor
            </CardTitle>
            <CardDescription className="mb-4">
              Create your professional profile and provide care to patients.
            </CardDescription>
            <Button className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700">
              Continue as Counselor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  /* ====================== STEP 2 ====================== */
  return (
    <Card className="border-emerald-900/20">
      <CardContent className="pt-6">
        <CardTitle className="text-2xl font-bold mb-2">
          Complete Your Counselor Profile
        </CardTitle>
        <CardDescription className="mb-6">
          Provide your professional information for verification.
        </CardDescription>

        <form onSubmit={handleSubmit(onCounselorSubmit)} className="space-y-6">
          {/* Specialty */}
          <div>
            <Label>Specialty</Label>
            <Select
              value={specialtyValue}
              onValueChange={(value) =>
                setValue("specialty", value, { shouldValidate: true })
              }
            >
              <SelectTrigger>
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
              <p className="text-sm text-red-500 mt-1">
                {errors.specialty.message}
              </p>
            )}
          </div>

          {/* Experience */}
          <div>
            <Label>Years of Experience</Label>
            <Input
              type="number"
              placeholder="e.g. 5"
              {...register("experience", { valueAsNumber: true })}
            />
            {errors.experience && (
              <p className="text-sm text-red-500 mt-1">
                {errors.experience.message}
              </p>
            )}
          </div>

          {/* Credential */}
          <div>
            <Label>Certification URL</Label>
            <Input
              type="url"
              placeholder="https://example.com/certification"
              {...register("credentialUrl")}
            />
            {errors.credentialUrl && (
              <p className="text-sm text-red-500 mt-1">
                {errors.credentialUrl.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea
              rows={4}
              placeholder="Describe your expertise and therapeutic approach..."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-between pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep("choose-role")}
              disabled={loading}
            >
              Back
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit for Verification"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Onboarding;
