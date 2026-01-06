"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  BookOpen,
  Shield,
  Sparkles,
  PhoneCall,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  mentalHealthResources,
  supportFeatures,
  recoveryStories,
  crisisHelplines,
} from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: "easeOut" },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

// 🔒 One material rule for the site
const surfaceCard =
  "bg-surface-glass backdrop-blur-md border border-surface-border/60 rounded-3xl shadow-xl shadow-primary/10 hover:shadow-2xl hover:shadow-primary/15 transition-all";

export default function MentalHealthHome() {
  const stats = [
    { number: "10K+", label: "Community Members" },
    { number: "500+", label: "Licensed Counselors" },
    { number: "24/7", label: "Crisis Support" },
    { number: "100%", label: "Confidential" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25">
      {/* HERO */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Calm background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/35 via-background to-background" />
        <div
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 45%, rgba(16,185,129,0.18) 0%, transparent 55%), radial-gradient(circle at 82% 80%, rgba(45,212,191,0.12) 0%, transparent 52%)",
          }}
        />

        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-4">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-8 lg:pr-8"
            >

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight"
              >
                Healing Begins
                <span className="block mt-2 bg-gradient-to-r from-emerald-300 via-primary to-teal-300 bg-clip-text text-transparent">
                  With Hope
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl md:text-2xl text-muted-foreground max-w-xl"
              >
                A compassionate space where mental wellness meets expert care. You&apos;re not alone on this journey.
              </motion.p>

              {/* Stats */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 pt-4">
                {stats.map((stat, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -inset-1 rounded-3xl bg-primary/10 blur-xl opacity-50" />
                    <div className="relative bg-surface-glass backdrop-blur-md border border-surface-border/70 rounded-3xl p-5 hover:border-primary/40 transition-all">
                      <div className="text-3xl md:text-4xl font-black text-emerald-300 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  size="lg"
                  className="h-16 px-10 rounded-2xl text-lg font-bold bg-primary hover:bg-emerald-600 shadow-2xl shadow-primary/25 group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="h-16 px-10 rounded-2xl text-lg font-bold border border-primary/30 bg-surface-glass backdrop-blur-md hover:bg-emerald-950/35"
                >
                  Explore Resources
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative lg:pl-8 px-4"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 border border-primary/15">
                <Image
                  src="/heroimage.jpg"
                  alt="Person meditating peacefully"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
              </div>

              {/* Floating cards (calm, consistent) */}
              <div
                className={`absolute -left-6 top-20 max-w-[190px] ${surfaceCard} p-5`}
              >
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="w-7 h-7 text-emerald-300" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/90 mb-1">
                  Secure
                </p>
                <p className="text-sm font-semibold">100% Private</p>
              </div>

              <div
                className={`absolute -right-6 bottom-20 max-w-[190px] ${surfaceCard} p-5`}
              >
                <div className="w-12 h-12 bg-primary/15 rounded-xl flex items-center justify-center mb-3">
                  <Heart className="w-7 h-7 text-emerald-300" />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-emerald-300/90 mb-1">
                  Support
                </p>
                <p className="text-sm font-semibold">Always Here</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SUPPORT FEATURES */}
      <section className="py-32 px-4 relative" id="resources">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/18 to-background" />

        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">

            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Everything You Need in
              <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                One Place
              </span>
            </h2>

            <p className="text-xl text-muted-foreground">
              Access professional support, resources, and a caring community anytime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Card className={`${surfaceCard} h-full overflow-hidden`}>
                  <CardHeader className="p-8 space-y-4">
                    <div className="w-16 h-16 bg-primary/15 rounded-2xl flex items-center justify-center shadow-lg shadow-primary/10">
                      {React.cloneElement(feature.icon, {
                        className: "w-8 h-8 text-emerald-300",
                        strokeWidth: 2.5,
                      })}
                    </div>
                    <CardTitle className="text-2xl font-bold">{feature.title}</CardTitle>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CRISIS */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-red-950/22 to-background" />

        <div className="mx-auto max-w-screen-2xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="bg-crisis-surface backdrop-blur-md border border-red-500/40 rounded-[3rem] p-10 md:p-16 relative overflow-hidden"
          >
            <div className="relative z-10 space-y-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 bg-red-900/70 rounded-2xl flex items-center justify-center flex-shrink-0 border border-red-500/30">
                  <PhoneCall className="w-10 h-10 text-red-200" />
                </div>

                <div className="flex-1">
                  <h2 className="text-4xl md:text-5xl font-extrabold mb-3 tracking-tight">
                    Crisis Support Available Now
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    If you're in crisis, help is available 24/7. You don't have to face this alone.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {crisisHelplines.map((line, i) => (
                  <div
                    key={i}
                    className="group bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-red-500/25 hover:border-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/10"
                  >
                    <div className="flex items-center justify-between gap-6">
                      <div>
                        <p className="text-3xl font-black text-red-300 mb-1">{line.number}</p>
                        <p className="font-bold text-lg mb-1">{line.name}</p>
                        <p className="text-sm text-muted-foreground">{line.description}</p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl w-12 h-12 group-hover:bg-red-500 group-hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                className="w-full sm:w-auto px-10 h-16 rounded-2xl font-bold text-lg bg-red-600 hover:bg-red-500 text-white shadow-2xl shadow-red-500/20"
              >
                Connect With Support Now
              </Button>
            </div>

            <div className="absolute -top-28 -right-28 w-80 h-80 bg-red-500/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-red-600/10 rounded-full blur-[120px]" />
          </motion.div>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="py-32 px-4 relative" id="community">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background to-emerald-950/10" />
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Understanding Mental Health
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn about different conditions and find the right support for your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {mentalHealthResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
              >
                <Card className={`${surfaceCard} h-full`}>
                  <CardHeader className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-emerald-300" />
                      </div>
                      <CardTitle className="text-2xl font-bold">{resource.title}</CardTitle>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {resource.description}
                    </p>

                    <Button
                      asChild
                      variant="ghost"
                      className="w-fit px-0 text-emerald-300 hover:text-emerald-200 font-bold group"
                    >
                      <Link href={resource.link} className="flex items-center gap-2">
                        Learn More
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="py-32 px-4 relative overflow-hidden" id="stories">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/14 via-background to-background" />
        <div
          className="absolute inset-0 -z-10 opacity-25"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, rgba(16,185,129,0.14) 1px, transparent 0)",
            backgroundSize: "54px 54px",
          }}
        />

        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="text-center mb-20 space-y-4">

            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Stories of Strength &<br />
              <span className="bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
                Recovery
              </span>
            </h2>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Real experiences from brave individuals who found their path to healing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recoveryStories.map((story, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
              >
                <Card className={`${surfaceCard} p-8 relative overflow-hidden h-full`}>
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

                  <div className="relative">
                    <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 mb-6">
                      <span className="text-white font-black text-xl">{story.initials}</span>
                    </div>

                    <p className="text-xl font-medium leading-relaxed mb-8 text-muted-foreground italic">
                      &quot;{story.quote}&quot;
                    </p>

                    <div className="pt-4 border-t border-surface-border/60">
                      <p className="font-bold text-lg">{story.name}</p>
                      <p className="text-emerald-300 font-semibold text-sm">{story.journey}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="mx-auto max-w-screen-2xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[4rem] p-12 md:p-20 text-center text-white overflow-hidden"
          >
            <div className="relative z-10 space-y-8 max-w-3xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
                Your Journey Starts Today
              </h2>
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed">
                Join thousands who've found hope, healing, and community. Take the first step towards a healthier mind.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                <Button
                  size="lg"
                  className="h-16 px-12 rounded-2xl text-lg font-bold bg-white text-emerald-800 hover:bg-gray-100 shadow-2xl"
                >
                  Get Started Free
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="
                    h-16 px-12 rounded-2xl text-lg font-bold
                    bg-transparent
                    border-2 border-white/40
                    text-white/90
                    hover:bg-white/20 hover:text-white
                    shadow-none
                    transition
                  "
                >
                  Explore Resources
                </Button>
              </div>
            </div>

            <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
