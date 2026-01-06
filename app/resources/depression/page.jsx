"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Cloud,
  Sun,
  Baby,
  Calendar,
  Brain,
  Pill,
  Users,
  ChevronDown,
  Star,
  Sunrise,
  Book,
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

const depressionTypes = [
  {
    title: "Major Depressive Disorder (MDD)",
    icon: Cloud,
    description:
      "Persistent feelings of sadness, emptiness, or hopelessness that last for weeks or longer, affecting daily functioning.",
    signs: [
      "Loss of interest in activities once enjoyed",
      "Changes in appetite or weight",
      "Sleep problems (too much or too little)",
      "Fatigue and loss of energy",
      "Feelings of worthlessness or excessive guilt",
      "Difficulty concentrating or making decisions",
    ],
  },
  {
    title: "Persistent Depressive Disorder (PDD)",
    icon: Calendar,
    description:
      "A chronic form of depression lasting two years or more, with symptoms that may be less severe but longer-lasting than MDD.",
    signs: [
      "Low mood most of the day, more days than not",
      "Poor appetite or overeating",
      "Low energy or fatigue",
      "Low self-esteem",
      "Difficulty concentrating",
      "Feelings of hopelessness",
    ],
  },
  {
    title: "Seasonal Affective Disorder (SAD)",
    icon: Sun,
    description:
      "Depression that follows a seasonal pattern, typically occurring during fall and winter when there's less natural sunlight.",
    signs: [
      "Depression during specific seasons",
      "Increased sleep and fatigue",
      "Weight gain and carbohydrate cravings",
      "Social withdrawal",
      "Difficulty concentrating",
      "Symptoms improve with season change",
    ],
  },
  {
    title: "Postpartum Depression",
    icon: Baby,
    description:
      "Depression occurring after childbirth, involving intense feelings of sadness, anxiety, and exhaustion that can interfere with caring for yourself or your baby.",
    signs: [
      "Severe mood swings",
      "Excessive crying",
      "Difficulty bonding with baby",
      "Withdrawing from family and friends",
      "Thoughts of harming yourself or baby",
      "Intense irritability and anger",
    ],
  },
];

function GratitudeJournal() {
  const [entries, setEntries] = useState([]);
  const [current, setCurrent] = useState("");

  const prompts = [
    "What's one small thing that went well today?",
    "Who is someone you're grateful for?",
    "What made you smile recently?",
    "What's something about yourself you appreciate?",
  ];

  const [promptIndex, setPromptIndex] = useState(0);

  const addEntry = () => {
    if (current.trim()) {
      setEntries([...entries, current]);
      setCurrent("");
      setPromptIndex((promptIndex + 1) % prompts.length);
    }
  };

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Star className="w-6 h-6 text-primary" />
          <h4 className="text-lg font-bold">Gratitude Practice</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Small moments of gratitude can shift perspective.
        </p>

        <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
          <p className="text-sm font-medium text-foreground mb-3">
            {prompts[promptIndex]}
          </p>
          <textarea
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            placeholder="Write your thoughts here..."
            className="w-full p-3 rounded-xl bg-background border border-border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={3}
          />
        </div>

        <Button onClick={addEntry} className="w-full" disabled={!current.trim()}>
          Add Entry
        </Button>

        {entries.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Your entries today: {entries.length}
            </p>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-background border border-border text-sm"
                >
                  {entry}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function GentleMovement() {
  const activities = [
    { name: "5-minute walk", icon: Sunrise, time: "5 min" },
    { name: "Gentle stretching", icon: Sun, time: "5 min" },
    { name: "Dancing to one song", icon: Star, time: "3 min" },
    { name: "Simple yoga poses", icon: Heart, time: "10 min" },
  ];

  const [completed, setCompleted] = useState([]);

  const toggleActivity = (index) => {
    if (completed.includes(index)) {
      setCompleted(completed.filter((i) => i !== index));
    } else {
      setCompleted([...completed, index]);
    }
  };

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Sunrise className="w-6 h-6 text-primary" />
          <h4 className="text-lg font-bold">Gentle Movement</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Small movements can boost your mood. Start wherever you are.
        </p>

        <div className="space-y-3">
          {activities.map((activity, i) => {
            const Icon = activity.icon;
            const isCompleted = completed.includes(i);

            return (
              <motion.div
                key={i}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleActivity(i)}
                className={`p-4 rounded-2xl cursor-pointer transition-all ${
                  isCompleted
                    ? "bg-primary/20 border-primary/30"
                    : "bg-background border-border"
                } border`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`w-5 h-5 ${
                        isCompleted ? "text-primary" : "text-muted-foreground"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        isCompleted ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {activity.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {completed.length > 0 && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-sm font-semibold text-primary">
              Great job! You've completed {completed.length}{" "}
              {completed.length === 1 ? "activity" : "activities"} 🌟
            </p>
          </div>
        )}
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

export default function DepressionPage() {
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
            Understanding <span className="text-primary">Depression</span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Learn about depression — and find small, gentle activities that can
            help you move forward.
          </motion.p>
        </motion.div>

        {/* Safety */}
        <Card className="mb-16 bg-card/70 backdrop-blur-md rounded-3xl">
          <CardContent className="p-6 flex gap-4">
            <Heart className="w-6 h-6 text-primary" />
            <div className="space-y-2">
              <p className="text-muted-foreground">
                This page is for education, not diagnosis. Depression is
                treatable, and you deserve support.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Crisis support:</strong> If you're having thoughts of
                self-harm, please reach out to the 988 Suicide & Crisis Lifeline
                (call or text 988) or contact emergency services.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            Types of Depression
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {depressionTypes.map((type, i) => (
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

        {/* Activities */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            Small Steps Forward
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            When you're experiencing depression, even small actions can feel
            difficult. These gentle practices meet you where you are.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GratitudeJournal />
            <GentleMovement />
          </div>
        </section>

        {/* Treatment */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10">
            Treatment & Support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TreatmentCard
              title="Psychotherapy"
              icon={Brain}
              description="Several types of therapy are effective for depression. Cognitive Behavioral Therapy (CBT) helps identify and change negative thought patterns. Interpersonal Therapy (IPT) focuses on improving relationships and communication. Behavioral Activation encourages engagement in meaningful activities. A trained therapist can work with you to find what helps most."
            />

            <TreatmentCard
              title="Medication"
              icon={Pill}
              description="Antidepressants can help restore balance to brain chemistry and reduce symptoms of depression. Common options include SSRIs, SNRIs, and other classes of medication. It may take several weeks to feel effects, and finding the right medication often requires patience and open communication with your healthcare provider. Medication is often most effective when combined with therapy."
            />

            <TreatmentCard
              title="Lifestyle & Community"
              icon={Users}
              description="While professional treatment is important, daily habits also play a role in recovery. Regular sleep, balanced nutrition, physical movement, and time in nature can support mental health. Connection with others—whether through support groups, trusted friends, or family—reminds you that you're not alone. Recovery takes time, and every small step matters."
            />
          </div>
        </section>
      </div>
    </div>
  );
}