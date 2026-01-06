"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Wind,
  Users,
  AlertCircle,
  Brain,
  Eye,
  Hand,
  Ear,
  Smile,
  Stethoscope,
  ChevronDown,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

const anxietyTypes = [
  {
    title: "Generalized Anxiety Disorder (GAD)",
    icon: Brain,
    description:
      "Persistent, excessive worry about everyday matters—work, health, family, finances—that feels difficult to control.",
    signs: [
      "Constant worrying that interferes with daily activities",
      "Restlessness or feeling on edge",
      "Difficulty concentrating",
      "Muscle tension and fatigue",
      "Sleep disturbances",
    ],
  },
  {
    title: "Panic Disorder",
    icon: Heart,
    description:
      "Recurrent, unexpected panic attacks—sudden waves of intense fear with physical symptoms that can feel overwhelming.",
    signs: [
      "Rapid heartbeat or palpitations",
      "Sweating, trembling, or shortness of breath",
      "Feeling of losing control or impending doom",
      "Chest pain or dizziness",
      "Fear of future panic attacks",
    ],
  },
  {
    title: "Social Anxiety Disorder",
    icon: Users,
    description:
      "Intense fear of social situations where you might be judged, embarrassed, or scrutinized by others.",
    signs: [
      "Avoiding social situations",
      "Fear of negative evaluation",
      "Blushing, trembling, or nausea",
      "Excessive self-consciousness",
      "Difficulty speaking or making eye contact",
    ],
  },
  {
    title: "Specific Phobias",
    icon: AlertCircle,
    description:
      "Extreme fear of specific objects or situations that poses little actual danger but leads to avoidance.",
    signs: [
      "Immediate intense fear",
      "Avoidance behavior",
      "Sweating or rapid heartbeat",
      "Recognition fear is excessive",
      "Interference with daily life",
    ],
  },
];

function FiveFourThreeTwoOne() {
  const steps = [
    { label: "5 things you can see", icon: Eye },
    { label: "4 things you can touch", icon: Hand },
    { label: "3 things you can hear", icon: Ear },
    { label: "2 things you can smell", icon: Wind },
    { label: "1 thing you can taste", icon: Smile },
  ];

  const [step, setStep] = useState(0);
  const Icon = steps[step].icon;

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5">
        <h4 className="text-lg font-bold">5-4-3-2-1 Grounding</h4>
        <p className="text-sm text-muted-foreground">
          Move through each step slowly.
        </p>

        <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <Icon className="w-6 h-6 text-primary" />
          <span className="font-medium">{steps[step].label}</span>
        </div>

        <div className="flex justify-between">
          <Button
            variant="ghost"
            disabled={step === 0}
            onClick={() => setStep(step - 1)}
          >
            Back
          </Button>
          {step < steps.length - 1 ? (
            <Button onClick={() => setStep(step + 1)}>Next</Button>
          ) : (
            <Button onClick={() => setStep(0)}>Finished 🌿</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function BoxBreathing() {
  const phases = ["Inhale", "Hold", "Exhale", "Hold"];
  const [phase, setPhase] = useState(0);

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5 text-center">
        <h4 className="text-lg font-bold">Box Breathing</h4>
        <p className="text-sm text-muted-foreground">
          Follow the rhythm of your breath.
        </p>

        <motion.div
          key={phase}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center"
        >
          <span className="text-xl font-semibold text-primary">
            {phases[phase]}
          </span>
        </motion.div>

        <Button
          onClick={() => setPhase((phase + 1) % phases.length)}
          className="w-full"
        >
          Next Breath
        </Button>
      </CardContent>
    </Card>
  );
}

function TreatmentCard({ title, description, icon: Icon }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      onClick={() => setOpen(!open)}
      className="group cursor-pointer rounded-3xl bg-card/70 backdrop-blur-md border border-primary/10
                 hover:-translate-y-1 hover:shadow-xl transition-all"
    >
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">{title}</h4>
          </div>

          <ChevronDown
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Expandable content */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-primary">
          {open ? "Tap to collapse" : "Tap to learn more"}
        </p>
      </CardContent>
    </Card>
  );
}

export default function AnxietyDisordersPage() {
  return (
    <div className="relative min-h-screen bg-background pt-32 pb-24 px-4">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/10 via-background to-background" />

      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-16 space-y-6"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold"
          >
            Understanding{" "}
            <span className="text-primary">Anxiety Disorders</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Learn about anxiety — and interact with tools that can help calm
            your mind and body.
          </motion.p>
        </motion.div>

        {/* Safety */}
        <Card className="mb-16 bg-card/70 backdrop-blur-md rounded-3xl">
          <CardContent className="p-6 flex gap-4">
            <Heart className="w-6 h-6 text-primary" />
            <p className="text-muted-foreground">
              This page is for education, not diagnosis. Anxiety is treatable,
              and support is available.
            </p>
          </CardContent>
        </Card>

        {/* Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            Types of Anxiety Disorders
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {anxietyTypes.map((type, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-md border border-primary/15 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <div className="absolute -inset-1 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                <CardHeader className="pb-4 pt-7 px-7">
                  <CardTitle className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center shadow-inner shadow-primary/10 group-hover:scale-110 transition-transform duration-300">
                      <type.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      {type.title}
                    </span>
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-7 pb-7 space-y-5">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {type.description}
                  </p>
                  <div className="pt-2">
                    <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Common Signs
                    </h4>
                    <ul className="space-y-2.5 text-sm text-muted-foreground">
                      {type.signs.map((s, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 flex-shrink-0"></span>
                          <span className="leading-relaxed">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Grounding */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            Grounding Techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FiveFourThreeTwoOne />
            <BoxBreathing />
          </div>
        </section>

        {/* Treatment */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            Treatment & Self-Care
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TreatmentCard
              title="Cognitive Behavioral Therapy (CBT)"
              icon={Brain}
              description="CBT is one of the most effective treatments for anxiety disorders. It helps you recognize patterns of anxious thinking—such as catastrophizing, overgeneralizing, or constant “what if” thoughts—and learn how to challenge and replace them with more balanced perspectives. CBT also focuses on practical coping skills, emotional regulation, and gradual exposure to feared situations, helping anxiety feel more manageable over time."
            />

            <TreatmentCard
              title="Medication"
              icon={Stethoscope}
              description="For some people, medication can help reduce the intensity of anxiety symptoms such as constant worry, panic attacks, or physical tension. Common options include SSRIs or SNRIs for long-term support, and short-term medications for acute symptoms. Medication is not a sign of weakness and is often most effective when combined with therapy under the guidance of a licensed healthcare provider."
            />

            <TreatmentCard
              title="Lifestyle & Support"
              icon={Users}
              description="Daily habits and supportive relationships play a powerful role in managing anxiety. Regular movement, consistent sleep, balanced nutrition, and mindfulness practices help regulate the nervous system. Connecting with trusted friends, family members, or support groups can reduce isolation and remind you that you are not alone in what you’re experiencing."
            />
          </div>
        </section>
      </div>
    </div>
  );
}
