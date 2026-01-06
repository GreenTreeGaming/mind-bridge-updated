"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar, Clock, BookOpen } from "lucide-react";
import DoctorAppointmentsList from "./appointment-list";
import { AvailabilitySettings } from "./availability-settings";
import { Blogs } from "./blogs";

export function DoctorDashboard({ appointments, slots }) {
  return (
    <Tabs
      defaultValue="appointments"
      className="grid grid-cols-1 lg:grid-cols-12 gap-6"
    >
      {/* Sidebar */}
      <aside className="lg:col-span-3 lg:sticky lg:top-24 h-fit">
        <div className="rounded-3xl border border-border bg-background/70 backdrop-blur shadow-sm">
          <div className="px-6 pt-6 pb-4">
            <p className="text-xs font-semibold tracking-wide uppercase text-foreground/50">
              Dashboard
            </p>
          </div>

          {/* Tabs */}
          <TabsList
            className="
              w-full bg-transparent p-2 h-auto
              flex lg:flex-col gap-2
              overflow-x-auto lg:overflow-visible
              [scrollbar-width:none] [-ms-overflow-style:none]
            "
          >
            {/* Appointments */}
            <TabsTrigger
              value="appointments"
              className="
                flex items-center justify-center lg:justify-start gap-2
                whitespace-nowrap
                rounded-2xl
                px-4 py-3
                text-sm font-medium
                text-foreground/70
                hover:bg-muted/70 hover:text-foreground
                data-[state=active]:bg-emerald-600
                data-[state=active]:text-white
                data-[state=active]:shadow-sm
              "
            >
              <Calendar className="h-4 w-4" />
              <span>Appointments</span>
            </TabsTrigger>

            {/* Availability */}
            <TabsTrigger
              value="availability"
              className="
                flex items-center justify-center lg:justify-start gap-2
                whitespace-nowrap
                rounded-2xl
                px-4 py-3
                text-sm font-medium
                text-foreground/70
                hover:bg-muted/70 hover:text-foreground
                data-[state=active]:bg-emerald-600
                data-[state=active]:text-white
                data-[state=active]:shadow-sm
              "
            >
              <Clock className="h-4 w-4" />
              <span>Availability</span>
            </TabsTrigger>

            {/* Blogs */}
            <TabsTrigger
              value="blogs"
              className="
                flex items-center justify-center lg:justify-start gap-2
                whitespace-nowrap
                rounded-2xl
                px-4 py-3
                text-sm font-medium
                text-foreground/70
                hover:bg-muted/70 hover:text-foreground
                data-[state=active]:bg-emerald-600
                data-[state=active]:text-white
                data-[state=active]:shadow-sm
              "
            >
              <BookOpen className="h-4 w-4" />
              <span>Blogs</span>
            </TabsTrigger>
          </TabsList>

          <div className="px-6 pb-6 pt-4">
            <div className="h-px bg-border mb-4" />
            <p className="text-xs text-foreground/60 leading-relaxed">
              Manage appointments, availability, and your published articles.
            </p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:col-span-9 min-w-0">
        <TabsContent value="appointments" className="p-0 mt-0">
          <DoctorAppointmentsList appointments={appointments} />
        </TabsContent>

        <TabsContent value="availability" className="p-0 mt-0">
          <AvailabilitySettings slots={slots} />
        </TabsContent>

        <TabsContent value="blogs" className="p-0 mt-0">
          <Blogs />
        </TabsContent>
      </main>
    </Tabs>
  );
}
