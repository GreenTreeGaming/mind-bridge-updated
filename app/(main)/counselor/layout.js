import React from "react";
import { Stethoscope } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";

export const metadata = {
  title: "Counselor Dashboard - MindBridge",
  description: "Counselor Dashboard Layout for MindBridge",
};

const CounselorDashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      {/* subtle top gradient for depth */}
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-emerald-50/70 to-transparent pointer-events-none" />

      <div className="relative container mx-auto max-w-7xl px-4 py-10">
        <PageHeader
          icon={<Stethoscope className="text-emerald-600" />}
          title="Counselor Dashboard"
          backLink="/"
          backLabel="Back to Home"
        />

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
};

export default CounselorDashboardLayout;
