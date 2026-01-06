"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote, Heart } from "lucide-react";
import { Card } from "@/components/ui/card";

const stories = [
  {
    name: "Alex M.",
    journey: "Living with Anxiety",
    initials: "AM",
    story: (
      <>
        <p>
          For a long time, I told myself that what I was feeling was normal,that
          everyone felt constantly tense, exhausted, and on edge. I learned how
          to function while carrying anxiety quietly, even when it made simple
          things feel overwhelming. Over time, that pressure built up, and I
          started avoiding people, conversations, and even moments that used to
          make me happy.
        </p>

        <p>
          The hardest part wasn’t the anxiety itself,it was the feeling that I
          had to deal with it alone. I convinced myself that asking for help
          meant I had failed somehow. But one night, after hours of
          overthinking and no sleep, I realized I couldn’t keep living like this.
        </p>

        <p>
          Reaching out was terrifying. I didn’t suddenly feel better, and nothing
          magically disappeared. But for the first time, I felt understood.{" "}
          <strong className="text-foreground">
            That moment,being heard without judgment,changed everything.
          </strong>{" "}
          Today, I still have anxious days, but they no longer control my life.
          I’ve learned that progress isn’t about eliminating fear,it’s about
          learning how to move forward with it.
        </p>
      </>
    ),
  },
  {
    name: "Jordan L.",
    journey: "Depression Recovery",
    initials: "JL",
    story: (
      <>
        <p>
          I used to wake up every day already exhausted, even after sleeping for
          hours. Things I once loved felt distant and heavy, like they belonged
          to someone else. I smiled when I needed to, showed up when expected,
          and kept telling myself it would pass.
        </p>

        <p>
          Over time, the silence inside became louder. I stopped talking about
          how I felt because I didn’t want to be a burden. The days blended
          together, and I started believing that this was just how life was going
          to be.
        </p>

        <p>
          What finally shifted things wasn’t a single moment,it was a slow
          realization that I deserved help even if I couldn’t explain why I felt
          this way. Opening up felt uncomfortable and unfamiliar, but it also
          felt honest.{" "}
          <strong className="text-foreground">
            For the first time, I stopped pretending I was okay.
          </strong>
        </p>

        <p>
          Healing didn’t happen overnight. Some days were still heavy. But
          gradually, color returned to my life. I learned that asking for help
          wasn’t weakness,it was an act of self-respect.
        </p>
      </>
    ),
  },
  {
    name: "Sam R.",
    journey: "Burnout & Self-Rediscovery",
    initials: "SR",
    story: (
      <>
        <p>
          I thought being constantly busy meant I was doing something right. I
          pushed through exhaustion, ignored warning signs, and kept setting
          higher expectations for myself. Rest felt like failure, and slowing
          down felt impossible.
        </p>

        <p>
          Eventually, my body forced me to stop. I couldn’t focus, couldn’t
          sleep, and felt disconnected from everything,including myself. That
          scared me more than I expected. I realized I had spent so long meeting
          everyone else’s needs that I forgot how to take care of my own.
        </p>

        <p>
          Learning to slow down was uncomfortable. I had to sit with thoughts
          I’d been avoiding for years. But in that space, I began to understand
          what I actually needed.{" "}
          <strong className="text-foreground">
            Not productivity,peace.
          </strong>
        </p>

        <p>
          Now, I approach life differently. I still care deeply, but I’ve learned
          to set boundaries and listen to myself. Recovery didn’t mean becoming
          someone new,it meant finally coming back to who I was.
        </p>
      </>
    ),
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

export default function TestimonialsPage() {
  return (
    <div className="relative min-h-screen bg-background pt-32 pb-24 px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/10 via-background to-background dark:from-emerald-950/35" />

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Header (unchanged) */}
        <motion.div
          initial="initial"
          animate="animate"
          className="text-center mb-20 space-y-6"
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
            These are longer stories,because healing is never just a sentence.
          </motion.p>
        </motion.div>

        {/* Stories */}
        <div className="space-y-16">
          {stories.map((story, index) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
            >
              <Card className="rounded-3xl border border-border/60 bg-card p-8 md:p-10 shadow-lg mb-4">
                <div className="space-y-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {story.name}
                      </p>
                      <p className="text-xs uppercase tracking-wide text-primary font-semibold">
                        {story.journey}
                      </p>
                    </div>
                    <Quote className="w-6 h-6 text-primary/50" />
                  </div>

                  {/* Story */}
                  <div className="space-y-5 text-base md:text-lg leading-relaxed text-foreground/80">
                    {story.story}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center space-y-4"
        >
          <Heart className="mx-auto w-8 h-8 text-primary/70" />
          <p className="text-lg font-semibold text-foreground">
            Your story deserves time, space, and care.
          </p>
          <p className="text-sm md:text-base text-foreground/70 max-w-xl mx-auto">
            Healing isn’t about rushing forward. It’s about being honest,
            taking one step at a time, and knowing you don’t have to do it alone.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
