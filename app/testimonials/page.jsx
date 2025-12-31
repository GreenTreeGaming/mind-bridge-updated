"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Quote, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { recoveryStories } from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-emerald-500/30 pt-32 pb-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-background to-background -z-10" />
      <div
        className="absolute inset-0 opacity-25 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, rgba(16,185,129,0.18) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Intro */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="text-center mb-16 space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full">
              <Heart className="w-4 h-4 mr-2 inline" />
              Inspiring Journeys
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Stories of{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Hope & Healing
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            These are real voices from people who chose to reach out, get
            support, and reclaim their wellbeing. Your story matters just as
            much—and it&apos;s still being written.
          </motion.p>
        </motion.div>

        {/* Highlight banner */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <Card className="bg-gradient-to-r from-emerald-600 to-emerald-800 text-white rounded-3xl overflow-hidden">
            <div className="p-7 md:p-9 flex flex-col md:flex-row gap-6 md:gap-10 items-start">
              <div className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7" />
              </div>
              <div className="space-y-3">
                <p className="font-semibold text-base md:text-lg">
                  You are not the only one.
                </p>
                <p className="text-sm md:text-base opacity-90">
                  Behind every statistic is a person with a story. Hearing from
                  others who&apos;ve walked a similar path can make it easier to
                  take the next step—whether that&apos;s asking for help,
                  starting therapy, or simply being kinder to yourself.
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
            >
              <Card className="bg-gradient-to-br from-emerald-950/40 to-background border-emerald-500/20 hover:border-emerald-500/45 shadow-xl shadow-emerald-500/10 hover:shadow-2xl hover:shadow-emerald-500/20 p-7 rounded-3xl relative overflow-hidden h-full transition-all duration-300">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/15 rounded-full blur-3xl" />
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <span className="text-white font-black text-xl">
                        {story.initials}
                      </span>
                    </div>
                    <Quote className="w-7 h-7 text-emerald-500/70" />
                  </div>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic">
                    &quot;{story.quote}&quot;
                  </p>

                  <div className="pt-4 border-t border-emerald-500/20">
                    <p className="font-semibold text-base">{story.name}</p>
                    <p className="text-emerald-400 font-medium text-xs uppercase tracking-wide">
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
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <p className="text-lg font-semibold">
            Your feelings are valid, and your healing is possible.
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            If these stories resonate with you, consider reaching out to a
            mental health professional, a trusted person in your life, or a
            helpline in your area. Sharing your story—when you&apos;re ready—can
            be a powerful part of your journey too.
          </p>
        </motion.div>
      </div>
    </div>
  );
}


