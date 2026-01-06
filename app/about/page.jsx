"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HeartHandshake, Brain, ShieldCheck, Users } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

export default function AboutPage() {
  const pillars = [
    {
      icon: <Brain className="w-7 h-7 text-primary" />,
      title: "Clear information",
      body: "Evidence-informed explanations of common mental health conditions, written in everyday language.",
    },
    {
      icon: <Users className="w-7 h-7 text-primary" />,
      title: "Caring professionals",
      body: "Access to licensed counselors and therapists for online sessions when you’re ready to reach out.",
    },
    {
      icon: <HeartHandshake className="w-7 h-7 text-primary" />,
      title: "Supportive community",
      body: "Spaces to connect with others who understand, so you don’t have to carry everything alone.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20 pt-32 pb-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/15 via-background to-background dark:from-emerald-950/40" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.16] dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0 0, rgba(16,185,129,0.16) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(45,212,191,0.14) 0, transparent 55%)",
        }}
      />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Intro */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-6">

            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground"
            >
              Bridging the gap between{" "}
              <span className="text-primary dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-300 dark:bg-clip-text dark:text-transparent">
                struggle and support
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed"
            >
              Mind Bridge was created to make compassionate mental health support
              easier to find, easier to understand, and easier to access—no
              matter where you are on your journey.
            </motion.p>
          </motion.div>
        </motion.section>

        {/* Mission & values */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="h-full rounded-3xl border border-border/60 bg-card shadow-lg shadow-emerald-500/5 overflow-hidden">
              <div className="absolute pointer-events-none -top-16 -right-16 h-56 w-56 bg-primary/10 blur-3xl" />
              <CardHeader className="p-7 space-y-3 relative">
                <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                    <Brain className="w-7 h-7 text-primary" />
                  </div>
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="px-7 pb-7 space-y-3 text-foreground/70 relative leading-relaxed">
                <p>
                  We aim to de-stigmatize mental health by offering clear,
                  trustworthy information, access to licensed professionals, and
                  a supportive community where people feel seen and heard.
                </p>
                <p>
                  Whether you&apos;re taking your very first step, supporting a
                  loved one, or continuing a long-term healing journey, Mind
                  Bridge is here to walk alongside you.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Card className="h-full rounded-3xl border border-border/60 bg-card shadow-lg shadow-emerald-500/5 overflow-hidden">
              <div className="absolute pointer-events-none -bottom-20 -left-20 h-60 w-60 bg-primary/10 blur-3xl" />
              <CardHeader className="p-7 space-y-3 relative">
                <CardTitle className="flex items-center gap-3 text-2xl text-foreground">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                    <ShieldCheck className="w-7 h-7 text-primary" />
                  </div>
                  Our Values
                </CardTitle>
              </CardHeader>

              <CardContent className="px-7 pb-7 relative">
                <ul className="space-y-2 list-disc list-inside text-foreground/70 leading-relaxed">
                  <li>
                    <span className="font-semibold text-foreground">
                      Compassion first:
                    </span>{" "}
                    we lead with empathy, not judgment.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Safety & privacy:
                    </span>{" "}
                    your story is yours to share, on your terms.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Accessibility:
                    </span>{" "}
                    support should be understandable, affordable, and close at
                    hand.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">
                      Collaboration:
                    </span>{" "}
                    we bridge individuals, communities, and professionals.
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </section>

        {/* How we help */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-10 space-y-3"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-foreground">
              What you&apos;ll find at Mind Bridge
            </h2>
            <p className="text-sm md:text-base text-foreground/70 max-w-2xl mx-auto">
              We combine education, tools, and human connection to support your
              mental wellbeing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {pillars.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06, duration: 0.5, ease: "easeOut" }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Card className="h-full rounded-3xl border border-border/60 bg-card p-7 shadow-lg shadow-emerald-500/5 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 relative overflow-hidden">
                  <div className="absolute -top-14 -right-14 w-40 h-40 bg-primary/10 blur-3xl" />
                  <div className="relative space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-lg text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing message */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <p className="text-lg md:text-xl font-semibold text-foreground">
            However you&apos;re arriving here—curious, overwhelmed, hopeful, or
            unsure—you&apos;re welcome.
          </p>
          <p className="text-sm md:text-base text-foreground/70 leading-relaxed">
            Our hope is that Mind Bridge can be one steady, reassuring place in
            a noisy world: a reminder that what you&apos;re feeling matters, and
            that support is closer than it might seem.
          </p>
        </motion.section>
      </div>
    </div>
  );
}
