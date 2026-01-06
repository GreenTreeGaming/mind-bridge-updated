"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Quote, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { recoveryStories } from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const container = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function TestimonialsPage() {
  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20 pt-32 pb-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/15 via-background to-background dark:from-emerald-950/40" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.18] dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(16,185,129,0.18) 1px, transparent 0)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Intro */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={container}
          className="text-center mb-16 space-y-6"
        >

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground"
          >
            Stories of{" "}
            <span className="text-primary dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-300 dark:bg-clip-text dark:text-transparent">
              Hope & Healing
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            These are real voices from people who chose to reach out, get support,
            and reclaim their wellbeing. Your story matters just as much—and it&apos;s
            still being written.
          </motion.p>
        </motion.div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <Card className="relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-r from-emerald-600 to-emerald-800 text-white shadow-2xl shadow-emerald-500/15">
            {/* Overlay for consistent contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/25" />

            <div className="relative p-7 md:p-9 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/15 ring-1 ring-white/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7" />
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-base md:text-lg">
                  You are not the only one.
                </p>
                <p className="text-sm md:text-base text-white/90 leading-relaxed">
                  Behind every statistic is a person with a story. Hearing from others
                  who&apos;ve walked a similar path can make it easier to take the next
                  step—whether that&apos;s asking for help, starting therapy, or simply
                  being kinder to yourself.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Stories grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mb-16">
          {recoveryStories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6 }}
            >
              <Card className="relative h-full rounded-3xl border border-border/60 bg-card p-7 shadow-lg shadow-emerald-500/5 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 overflow-hidden">
                {/* Soft glow */}
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 blur-3xl" />

                <div className="relative space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/25">
                      <span className="text-white font-black text-xl">
                        {story.initials}
                      </span>
                    </div>

                    <Quote className="w-7 h-7 text-primary/70" />
                  </div>

                  <p className="text-base md:text-lg text-foreground/75 leading-relaxed italic">
                    &quot;{story.quote}&quot;
                  </p>

                  <div className="pt-4 border-t border-border/60">
                    <p className="font-semibold text-base text-foreground">
                      {story.name}
                    </p>
                    <p className="text-primary font-semibold text-xs uppercase tracking-wide">
                      {story.journey}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Closing note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <p className="text-lg font-semibold text-foreground">
            Your feelings are valid, and your healing is possible.
          </p>
          <p className="text-sm md:text-base text-foreground/70">
            If these stories resonate with you, consider reaching out to a mental
            health professional, a trusted person in your life, or a helpline in
            your area. Sharing your story—when you&apos;re ready—can be a powerful part
            of your journey too.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
