import React from 'react'
import { Stethoscope } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

export const metadata = {
  title: "Counselor Dashboard - MindBridge",
  description: "Counselor Dashboard Layout for MindBridge",
}

const CounselorDashboardLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-12">
        <PageHeader
          icon={<Stethoscope />}
          title="Counselor Dashboard"
          backLink="/"
          backLabel="Back to Home"
        />
        {children}
    </div>
  )
}

export default CounselorDashboardLayout