"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Brain, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mentalHealthResources } from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
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
    <div className="min-h-screen bg-background selection:bg-emerald-500/30 pt-32 pb-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-background to-background -z-10" />
      <div
        className="absolute inset-0 opacity-30 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(16,185,129,0.18) 0, transparent 55%), radial-gradient(circle at 90% 80%, rgba(45,212,191,0.18) 0, transparent 55%)",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Hero / Intro */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-16 space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full">
              <Brain className="w-4 h-4 mr-2 inline" />
              Understanding Mental Health
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Learn About{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Common Disorders
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            This guide offers gentle, easy-to-understand overviews of common
            mental health conditions so you can recognize signs, reduce stigma,
            and take informed steps toward support.
          </motion.p>
        </motion.div>

        {/* Quick safety note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <Card className="bg-emerald-950/40 border-emerald-500/30 rounded-3xl overflow-hidden">
            <CardContent className="p-6 md:p-8 flex flex-col md:flex-row gap-4 md:gap-8 items-start">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                <HeartPulse className="w-7 h-7 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-foreground">
                  This page is for education, not diagnosis.
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  Everyone&apos;s experience with mental health is unique. If you
                  see yourself or someone you care about in any of these
                  descriptions, consider speaking with a mental health
                  professional who can offer personalized support.
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              <Card className="h-full bg-gradient-to-br from-emerald-950/40 to-background border-emerald-500/25 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 rounded-3xl overflow-hidden">
                <CardHeader className="p-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-emerald-400" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="px-7 pb-7 space-y-4">
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <ul className="list-disc list-inside text-sm text-muted-foreground/90 space-y-1">
                    <li>Common signs and symptoms</li>
                    <li>How it can impact daily life and relationships</li>
                    <li>Therapy and lifestyle approaches that may help</li>
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2 rounded-xl border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/15"
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
          <h2 className="text-2xl md:text-3xl font-extrabold">
            You don&apos;t have to figure this out alone.
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Learning about mental health is a powerful first step. Reaching out
            for help—whether through a trusted friend, a helpline, or a licensed
            professional—is a courageous next one.
          </p>
        </motion.div>
      </div>
    </div>
  );
}


