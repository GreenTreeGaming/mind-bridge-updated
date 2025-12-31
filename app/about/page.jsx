"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { HeartHandshake, Brain, ShieldCheck, Users } from "lucide-react";

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

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-emerald-500/30 pt-32 pb-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-background to-background -z-10" />
      <div
        className="absolute inset-0 opacity-30 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0 0, rgba(16,185,129,0.16) 0, transparent 55%), radial-gradient(circle at 100% 100%, rgba(45,212,191,0.14) 0, transparent 55%)",
        }}
      />

      <div className="container mx-auto max-w-6xl">
        {/* Intro */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="mb-20"
        >
          <motion.div variants={fadeInUp} className="text-center space-y-6">
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full">
              <HeartHandshake className="w-4 h-4 mr-2 inline" />
              About Mind Bridge
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Bridging the gap between{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                struggle and support
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Mind Bridge was created to make compassionate mental health
              support easier to find, easier to understand, and easier to
              access—no matter where you are on your journey.
            </p>
          </motion.div>
        </motion.section>

        {/* Mission & vision */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-emerald-950/40 border-emerald-500/30 rounded-3xl h-full">
              <CardHeader className="p-7 space-y-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Brain className="w-7 h-7 text-emerald-400" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="px-7 pb-7 space-y-3 text-muted-foreground">
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-emerald-950/30 border-emerald-500/25 rounded-3xl h-full">
              <CardHeader className="p-7 space-y-3">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <ShieldCheck className="w-7 h-7 text-emerald-400" />
                  Our Values
                </CardTitle>
              </CardHeader>
              <CardContent className="px-7 pb-7 space-y-3 text-muted-foreground">
                <ul className="space-y-2 list-disc list-inside">
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
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 space-y-3"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold">
              What you&apos;ll find at Mind Bridge
            </h2>
            <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              We combine education, tools, and human connection to support your
              mental wellbeing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {[
              {
                icon: <Brain className="w-7 h-7 text-emerald-400" />,
                title: "Clear information",
                body: "Evidence-informed explanations of common mental health conditions, written in everyday language.",
              },
              {
                icon: <Users className="w-7 h-7 text-emerald-400" />,
                title: "Caring professionals",
                body: "Access to licensed counselors and therapists for online sessions when you’re ready to reach out.",
              },
              {
                icon: <HeartHandshake className="w-7 h-7 text-emerald-400" />,
                title: "Supportive community",
                body: "Spaces to connect with others who understand, so you don’t have to carry everything alone.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Card className="bg-gradient-to-br from-emerald-950/40 to-background border-emerald-500/25 rounded-3xl h-full">
                  <CardContent className="p-7 space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      {item.body}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Closing message */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center space-y-4"
        >
          <p className="text-lg md:text-xl font-semibold">
            However you&apos;re arriving here—curious, overwhelmed, hopeful, or
            unsure—you&apos;re welcome.
          </p>
          <p className="text-sm md:text-base text-muted-foreground">
            Our hope is that Mind Bridge can be one steady, reassuring place in
            a noisy world: a reminder that what you&apos;re feeling matters, and
            that support is closer than it might seem.
          </p>
        </motion.section>
      </div>
    </div>
  );
}


