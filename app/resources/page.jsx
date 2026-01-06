"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentalHealthResources } from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function ResourcesPage() {
  return (
    <div className="relative min-h-screen bg-background pt-32 pb-24 px-4">
      {/* Background (theme-safe) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(16,185,129,0.18) 0, transparent 55%), radial-gradient(circle at 90% 80%, rgba(45,212,191,0.18) 0, transparent 55%)",
          }}
        />
        <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)] bg-[linear-gradient(to_right,rgba(16,185,129,0.10)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.10)_1px,transparent_1px)] bg-[size:48px_48px] opacity-25" />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Hero / Intro */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-14 space-y-6"
        >

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground"
          >
            Learn About{" "}
            <span className="text-primary">
              Mental Health Conditions
            </span>
          </motion.h1>


          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Gentle, easy-to-understand overviews of common mental health conditions—so you can
            recognize signs, reduce stigma, and take informed steps toward support.
          </motion.p>
        </motion.div>

        {/* Quick safety note (high contrast card) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-12"
        >
          <Card className="bg-card/70 backdrop-blur-md border-border rounded-3xl overflow-hidden shadow-lg">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center flex-shrink-0">
                <HeartPulse className="w-7 h-7 text-primary" />
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  This page is for education, not diagnosis.
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  Everyone&apos;s experience is unique. If you recognize yourself or someone you care about,
                  consider speaking with a licensed mental health professional for personalized guidance.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disorders grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">
          {mentalHealthResources.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
            >
              <Card
                className="
                  h-full rounded-3xl overflow-hidden
                  bg-card/70 backdrop-blur-md
                  border-border
                  hover:border-primary/30
                  hover:shadow-2xl hover:shadow-primary/10
                  transition-all duration-300
                "
              >
                <CardHeader className="p-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="px-7 pb-7 space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>

                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Common signs and symptoms</li>
                    <li>How it can impact daily life and relationships</li>
                    <li>Therapy and lifestyle approaches that may help</li>
                  </ul>

                  <Button
                    variant="outline"
                    size="sm"
                    className="
                      mt-2 rounded-xl
                      bg-transparent
                      border-primary/25
                      text-foreground
                      hover:bg-primary/10
                      hover:border-primary/40
                    "
                  >
                    Explore this topic
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Gentle CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
            You don&apos;t have to figure this out alone.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Learning is a powerful first step. Reaching out for help—through a trusted friend,
            a helpline, or a licensed professional—is a courageous next one.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
