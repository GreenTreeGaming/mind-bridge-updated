"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PhoneCall,
  MessageCircle,
  Globe,
  ArrowRight,
  Heart,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.08 } },
};

const helplines = [
  {
    name: "Suicide & Crisis Lifeline (U.S.)",
    number: "988",
    tel: "988",
    description: "24/7 confidential support for emotional distress or suicidal crisis.",
    icon: PhoneCall,
    featured: true,
  },
  {
    name: "Crisis Text Line",
    number: "Text HOME to 741741",
    tel: "",
    description: "Free, 24/7 text support with a trained crisis counselor.",
    icon: MessageCircle,
  },
  {
    name: "SAMHSA National Helpline",
    number: "1-800-662-HELP (4357)",
    tel: "18006624357",
    description: "Mental health & substance use treatment referrals in the U.S.",
    icon: PhoneCall,
  },
  {
    name: "Lifeline Australia",
    number: "13 11 14",
    tel: "131114",
    description: "24/7 crisis support for people in Australia.",
    icon: PhoneCall,
  },
  {
    name: "Samaritans (UK & ROI)",
    number: "116 123",
    tel: "116123",
    description: "Confidential emotional support in the UK & Ireland.",
    icon: PhoneCall,
  },
  {
    name: "Find Local Helplines Worldwide",
    number: "International Directory",
    tel: "",
    description: "Search trusted crisis helplines by country.",
    icon: Globe,
    link: "https://findahelpline.com",
  },
];

const supportPillars = [
  {
    icon: Clock,
    title: "Available 24/7",
    description: "Help is always just a call or text away, any time of day or night.",
  },
  {
    icon: Shield,
    title: "Completely Confidential",
    description: "Your privacy is protected. Share as much or as little as you're comfortable with.",
  },
  {
    icon: Heart,
    title: "Compassionate Care",
    description: "Trained counselors who listen without judgment and truly care.",
  },
];

export default function HelplinesPage() {
  return (
    <div className="relative min-h-screen bg-background selection:bg-red-500/20">
      {/* Dramatic background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-red-950/30 via-background to-background" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(220,38,38,0.15) 0, transparent 50%), radial-gradient(circle at 80% 80%, rgba(239,68,68,0.12) 0, transparent 50%)",
          }}
        />
      </div>

      {/* Hero section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center mb-16 space-y-8"
          >
            {/* Icon badge */}
            <motion.div variants={fadeInUp} className="flex justify-center">
              <div className="inline-flex items-center gap-3 px-5 py-3 bg-red-500/10 border border-red-500/30 rounded-full">
                <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                  <PhoneCall className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-sm font-bold text-red-400">Crisis Support Available Now</span>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-black leading-[0.95] tracking-tight"
            >
              You don't have to
              <br />
              <span className="text-red-500">face this alone</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
            >
              If things feel overwhelming right now, immediate support is available. These helplines are free, confidential, and here for you.
            </motion.p>
          </motion.div>

          {/* Emergency disclaimer - More prominent */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-950/40 to-card rounded-3xl shadow-2xl shadow-red-500/10 overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-red-500/10 blur-3xl" />
              <CardContent className="p-8 md:p-10 relative">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0 ring-2 ring-red-500/30">
                    <PhoneCall className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-xl mb-2">
                      If you're in immediate danger, call emergency services now
                    </p>
                    <p className="text-foreground/70 leading-relaxed">
                      Call 911 (US), 999 (UK), 000 (Australia), or your local emergency number for urgent, life-threatening situations. These helplines provide vital support but emergency services are best equipped for immediate crises.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured helplines - Large cards */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Primary Crisis Lines
            </h2>
            <p className="text-foreground/60">
              Immediate support when you need it most
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {helplines.slice(0, 2).map((line, i) => {
              const Icon = line.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full rounded-3xl border-2 border-red-500/40 bg-gradient-to-br from-card to-red-950/10 hover:border-red-500/60 transition-all duration-300 shadow-xl shadow-red-500/5 hover:shadow-2xl hover:shadow-red-500/20 overflow-hidden relative group">
                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 blur-3xl group-hover:bg-red-500/15 transition-all duration-500" />
                    <CardContent className="p-8 md:p-10 relative">
                      <div className="space-y-6">
                        <div className="flex items-start gap-5">
                          <div className="w-16 h-16 rounded-2xl bg-red-500/20 flex items-center justify-center flex-shrink-0 ring-2 ring-red-500/30 group-hover:scale-110 transition-transform">
                            <Icon className="w-8 h-8 text-red-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-lg mb-2">{line.name}</p>
                            <p className="text-3xl md:text-4xl font-black text-red-500 mb-3">
                              {line.number}
                            </p>
                            <p className="text-foreground/70 leading-relaxed">
                              {line.description}
                            </p>
                          </div>
                        </div>

                        <div className="pt-4">
                          {line.tel ? (
                            <Link href={`tel:${line.tel}`} className="block">
                              <Button className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-base font-bold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all">
                                <PhoneCall className="mr-2 h-5 w-5" />
                                Call Now
                              </Button>
                            </Link>
                          ) : (
                            <Button className="w-full h-14 rounded-2xl bg-red-600 hover:bg-red-500 text-white text-base font-bold">
                              <MessageCircle className="mr-2 h-5 w-5" />
                              Text HOME to 741741
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional helplines - Compact grid */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-10 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Additional Resources
            </h2>
            <p className="text-foreground/60">
              More specialized support and international helplines
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helplines.slice(2).map((line, i) => {
              const Icon = line.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                >
                  <Card className="h-full rounded-3xl border border-red-500/30 bg-card hover:border-red-500/50 transition-all duration-300 shadow-lg shadow-red-500/5 hover:shadow-xl hover:shadow-red-500/10 overflow-hidden relative group">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-500/5 blur-2xl group-hover:bg-red-500/10 transition-all duration-500" />
                    <CardContent className="p-7 relative">
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-red-500/15 flex items-center justify-center flex-shrink-0 ring-1 ring-red-500/20">
                            <Icon className="w-6 h-6 text-red-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold mb-1">{line.name}</p>
                            <p className="text-xl font-black text-red-500 mb-2">
                              {line.number}
                            </p>
                          </div>
                        </div>
                        <p className="text-sm text-foreground/70 leading-relaxed">
                          {line.description}
                        </p>

                        <div className="pt-2">
                          {line.tel ? (
                            <Link href={`tel:${line.tel}`}>
                              <Button className="w-full rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold">
                                Call Now
                              </Button>
                            </Link>
                          ) : (
                            <Link href={line.link || "#"} target="_blank">
                              <Button
                                variant="outline"
                                className="w-full rounded-xl border-red-500/40 text-red-500 hover:bg-red-500/10 font-semibold"
                              >
                                Find Help Near You
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What to expect - Support pillars */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-14 text-center"
          >
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              What to Expect
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              When you reach out, you'll find compassionate professionals ready to support you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportPillars.map((pillar, idx) => {
              const PillarIcon = pillar.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="h-full rounded-3xl border border-border/60 bg-card p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute -top-16 -right-16 w-48 h-48 bg-red-500/5 blur-3xl group-hover:bg-red-500/10 transition-all duration-500" />
                    <div className="relative space-y-4">
                      <div className="w-14 h-14 rounded-2xl bg-red-500/10 ring-1 ring-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <PillarIcon className="w-7 h-7 text-red-400" />
                      </div>
                      <h3 className="font-bold text-xl">{pillar.title}</h3>
                      <p className="text-foreground/70 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="relative py-32 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-8"
          >
            <div className="space-y-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border-2 border-primary/40">
                <Heart className="w-10 h-10 text-primary" />
              </div>

              <h2 className="text-4xl md:text-5xl font-black leading-tight">
                Beyond Crisis Support
              </h2>

              <p className="text-xl text-foreground/70 max-w-2xl mx-auto leading-relaxed">
                If you're not in crisis but still want support, we have resources and community available for your journey.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link href="/resources">
                <Button className="h-14 px-10 rounded-2xl text-base font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all">
                  Explore Mental Health Resources
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/counselors">
                <Button
                  variant="outline"
                  className="h-14 px-10 rounded-2xl text-base font-bold border-2 border-primary/40 hover:bg-primary/10"
                >
                  Find a Counselor
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}