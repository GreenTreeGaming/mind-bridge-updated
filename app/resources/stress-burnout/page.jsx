"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Zap,
  Lightbulb,
  Briefcase,
  Heart,
  Activity,
  AlertCircle,
  Brain,
  Flame,
  Wind,
} from "lucide-react";

const stressTypes = [
  {
    title: "Acute Stress",
    icon: AlertCircle,
    description:
      "Short-term stress from immediate pressures or demands, like a deadline, conflict, or sudden change. It's the body's natural response to challenges.",
    signs: [
      "Rapid heartbeat and shallow breathing",
      "Tension headaches or muscle tightness",
      "Irritability or feeling overwhelmed",
      "Difficulty focusing on tasks",
      "Usually resolves when stressor passes",
    ],
  },
  {
    title: "Chronic Stress",
    icon: Wind,
    description:
      "Long-term stress from ongoing situations like financial struggles, difficult relationships, or demanding work environments. The body stays in a state of alert.",
    signs: [
      "Persistent fatigue and exhaustion",
      "Sleep problems and physical aches",
      "Weakened immune system",
      "Anxiety or depressed mood",
      "Difficulty enjoying things",
      "Feeling trapped or helpless",
    ],
  },
  {
    title: "Work Burnout",
    icon: Briefcase,
    description:
      "Emotional, physical, and mental exhaustion caused by prolonged workplace stress, often involving high demands, lack of control, and insufficient support.",
    signs: [
      "Feeling drained and emotionally depleted",
      "Cynicism or detachment from work",
      "Reduced performance and productivity",
      "Physical symptoms like headaches",
      "Loss of motivation and purpose",
      "Difficulty separating work from personal life",
    ],
  },
  {
    title: "Caregiver Burnout",
    icon: Heart,
    description:
      "Exhaustion from the physical and emotional demands of caring for others—family members, children, or those with chronic conditions—often while neglecting your own needs.",
    signs: [
      "Constant fatigue despite rest",
      "Resentment toward care responsibilities",
      "Withdrawing from friends and activities",
      "Changes in appetite or sleep",
      "Feeling guilty or inadequate",
      "Health problems from neglecting self-care",
    ],
  },
];

function StressTracker() {
  const [stressLevel, setStressLevel] = useState(5);
  const [entries, setEntries] = useState([]);
  const [note, setNote] = useState("");

  const addEntry = () => {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setEntries([{ level: stressLevel, note: note || "No notes", time: timestamp }, ...entries].slice(0, 5));
    setNote("");
  };

  const getLevelColor = (level) => {
    if (level <= 3) return "text-primary";
    if (level <= 6) return "text-amber-600 dark:text-amber-500";
    return "text-red-600 dark:text-red-500";
  };

  const getLevelBg = (level) => {
    if (level <= 3) return "bg-primary/10 border-primary/20";
    if (level <= 6) return "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/50 dark:border-amber-700/30";
    return "bg-red-50/50 dark:bg-red-950/20 border-red-200/50 dark:border-red-700/30";
  };

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-bold text-foreground">Stress Check-In</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Track your stress levels throughout the day to identify patterns.
        </p>

        <div className={`p-4 rounded-2xl border ${getLevelBg(stressLevel)}`}>
          <p className="text-sm font-medium text-foreground mb-3">
            How stressed do you feel right now?
          </p>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs text-gray-200">Low</span>
            <input
              type="range"
              min="1"
              max="10"
              value={stressLevel}
              onChange={(e) => setStressLevel(parseInt(e.target.value))}
              className="flex-1 h-2 bg-white rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-xs text-gray-200">High</span>
          </div>
          <p className={`text-2xl font-bold text-center ${getLevelColor(stressLevel)}`}>
            {stressLevel}/10
          </p>
          
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What's contributing to this feeling? (optional)"
            className="w-full mt-3 p-3 rounded-xl bg-card border border-border text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
            rows={2}
          />
        </div>

        <Button onClick={addEntry} className="w-full">
          Log Entry
        </Button>

        {entries.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-muted-foreground">
              Recent Check-Ins
            </p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {entries.map((entry, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border ${getLevelBg(entry.level)}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-semibold ${getLevelColor(entry.level)}`}>
                      {entry.level}/10
                    </span>
                    <span className="text-xs text-muted-foreground">{entry.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{entry.note}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function QuickRelief() {
  const techniques = [
    { 
      name: "Deep Breathing",
      icon: Wind,
      duration: "2 min",
      instruction: "Breathe in for 4 counts, hold for 4, exhale for 6. Repeat 5 times."
    },
    { 
      name: "Progressive Muscle Relaxation",
      icon: Activity,
      duration: "5 min",
      instruction: "Tense and release each muscle group, starting from your toes to your head."
    },
    { 
      name: "Cold Water Splash",
      icon: AlertCircle,
      duration: "1 min",
      instruction: "Splash cold water on your face or hold an ice cube to activate your parasympathetic nervous system."
    },
    { 
      name: "Nature Connection",
      icon: Lightbulb,
      duration: "10 min",
      instruction: "Step outside. Notice 5 things you can see, touch something natural, breathe fresh air."
    },
  ];

  const [selected, setSelected] = useState(null);

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-bold text-foreground">Quick Relief Techniques</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Simple practices to calm your nervous system when stress feels overwhelming.
        </p>

        <div className="space-y-3">
          {techniques.map((technique, i) => {
            const isSelected = selected === i;

            return (
              <div key={i} className="space-y-2">
                <div
                  onClick={() => setSelected(isSelected ? null : i)}
                  className={`p-4 rounded-2xl cursor-pointer transition-all border ${
                    isSelected
                      ? "bg-primary/10 border-primary/30"
                      : "bg-card border-border hover:bg-card/80"
                  } hover:shadow-md`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <technique.icon className="w-5 h-5 text-primary" />
                      <span
                        className={`font-medium ${
                          isSelected ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {technique.name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {technique.duration}
                    </span>
                  </div>
                </div>
                
                {isSelected && (
                  <div className="px-4 py-3 rounded-xl bg-primary/5 border border-primary/10 text-sm text-muted-foreground leading-relaxed">
                    {technique.instruction}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function TreatmentCard({ title, description, icon: IconComponent }) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      onClick={() => setOpen(!open)}
      className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-card/80 via-card/70 to-card/60 backdrop-blur-md border border-primary/15 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-2xl shadow-inner shadow-primary/10 group-hover:scale-110 transition-transform duration-300">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <h4 className="font-semibold text-foreground">{title}</h4>
          </div>

          <svg
            className={`w-4 h-4 text-muted-foreground transition-transform ${
              open ? "rotate-180" : ""
            }`}
            fill="none"
            strokeWidth="2"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="pt-2"
          >
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </motion.div>
        )}

        <p className="text-xs text-primary">
          {open ? "Tap to collapse" : "Tap to learn more"}
        </p>
      </CardContent>
    </Card>
  );
}

export default function StressBurnoutPage() {
  return (
    <div className="relative min-h-screen bg-background pt-32 pb-24 px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-linear-to-b from-primary/10 via-background to-background" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, rgba(16,185,129,0.18) 0, transparent 55%), radial-gradient(circle at 90% 80%, rgba(45,212,191,0.18) 0, transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: { transition: { staggerChildren: 0.08 } },
          }}
          className="text-center mb-16 space-y-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground"
          >
            Understanding <span className="text-primary">Stress & Burnout</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Explore the impact of chronic stress and burnout, especially in work and caregiving roles, and discover recovery strategies.
          </motion.p>
        </motion.div>

        {/* Safety */}
        <Card className="mb-16 bg-card/70 backdrop-blur-md border-border rounded-3xl">
          <CardContent className="p-6 flex gap-4">
            <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-muted-foreground">
                This page is for education, not diagnosis. Stress and burnout are real experiences that deserve attention and care.
              </p>
              <p className="text-sm text-muted-foreground">
                If you're experiencing severe symptoms or thoughts of self-harm, please seek immediate professional support.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Types of Stress & Burnout
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {stressTypes.map((type, i) => (
              <Card
                key={i}
                className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-md border border-primary/15 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                <div className="absolute -inset-1 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                <CardContent className="p-0">
                  <div className="pb-4 pt-7 px-7">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-3xl shadow-inner shadow-primary/10">
                        <type.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-lg font-bold text-foreground">
                        {type.title}
                      </h3>
                    </div>
                  </div>

                  <div className="px-7 pb-7 space-y-5">
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
                            <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0"></span>
                            <span className="leading-relaxed">{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Tools for Managing Stress
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Use these interactive tools to check in with yourself and find immediate relief when stress feels overwhelming.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <StressTracker />
            <QuickRelief />
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Impact on Daily Life
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Work & Productivity</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Chronic stress reduces focus, decision-making ability, and creativity. It can lead to mistakes, missed deadlines, and strained professional relationships.
              </p>
            </Card>
            
            <Card className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Relationships</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Stress often shows up as irritability, emotional withdrawal, or reduced patience. It can create distance in relationships and make communication difficult.
              </p>
            </Card>
            
            <Card className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Physical Health</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Long-term stress weakens immunity, disrupts sleep, and contributes to conditions like high blood pressure, digestive issues, and chronic pain.
              </p>
            </Card>
          </div>
        </section>

        {/* Treatment */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Recovery Strategies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TreatmentCard
              title="Therapy & Counseling"
              icon={Brain}
              description="Therapy provides a safe space to process stress and develop coping strategies. Cognitive Behavioral Therapy (CBT) helps identify stress triggers and change unhelpful thinking patterns. Acceptance and Commitment Therapy (ACT) teaches mindfulness and values-based action. A therapist can help you set boundaries, manage workload, and rebuild a sense of balance."
            />

            <TreatmentCard
              title="Lifestyle Changes"
              icon={Lightbulb}
              description="Recovery from burnout often requires significant lifestyle adjustments. This might include setting work boundaries, taking regular breaks, prioritizing sleep, and incorporating physical activity. Even small changes—like a 10-minute walk, saying no to non-essential commitments, or establishing an evening routine—can reduce stress over time."
            />

            <TreatmentCard
              title="Social Support"
              icon={Heart}
              description="Connection is a powerful buffer against stress. Talk to trusted friends, family, or colleagues about what you're experiencing. Consider joining support groups for people in similar situations—whether you're a caregiver, healthcare worker, or facing workplace stress. Sometimes just knowing you're not alone can lighten the load."
            />
          </div>
        </section>
      </div>
    </div>
  );
}