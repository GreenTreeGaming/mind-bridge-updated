"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, PhoneCall, ArrowRight } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-background selection:bg-primary/20 pt-32 pb-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-emerald-950/15 via-background to-background dark:from-emerald-950/40" />
      <div
        className="absolute inset-0 -z-10 opacity-[0.16] dark:opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0, rgba(16,185,129,0.16) 0, transparent 55%), radial-gradient(circle at 80% 100%, rgba(45,212,191,0.16) 0, transparent 55%)",
        }}
      />

      <div className="container mx-auto max-w-5xl relative z-10">
        {/* Intro */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{ animate: { transition: { staggerChildren: 0.08 } } }}
          className="text-center mb-14 space-y-6"
        >

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Reach out when{" "}
            <span className="text-primary dark:bg-gradient-to-r dark:from-emerald-400 dark:to-teal-300 dark:bg-clip-text dark:text-transparent">
              you&apos;re ready
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a question about the platform, need help getting
            started, or simply want to share feedback, we&apos;re here to listen.
          </motion.p>
        </motion.div>

        {/* Crisis disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="relative overflow-hidden rounded-3xl border border-red-500/35 bg-card">
            <div className="absolute -top-24 -right-24 h-60 w-60 bg-red-500/15 blur-3xl" />
            <CardContent className="p-6 md:p-7 flex flex-col md:flex-row gap-4 md:gap-6 items-start relative">
              <div className="w-11 h-11 rounded-2xl bg-red-500/15 ring-1 ring-red-500/25 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-6 h-6 text-red-400" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-foreground">
                  If you&apos;re in immediate crisis, please don&apos;t wait for an email response.
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Contact your local emergency number or a crisis helpline in your
                  area right away. You deserve rapid, live support when things feel
                  overwhelming.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form + contact options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-lg shadow-emerald-500/5">
              <div className="absolute -top-28 -left-28 h-72 w-72 bg-primary/10 blur-3xl" />
              <CardContent className="p-7 md:p-8 space-y-5 relative">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-foreground">
                    Send us a message
                  </h2>
                  <p className="text-sm text-foreground/70">
                    We typically respond within 1–2 business days.
                  </p>
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium text-foreground" htmlFor="name">
                      Name (optional)
                    </label>
                    <Input
                      id="name"
                      placeholder="How would you like us to address you?"
                      className="h-11 rounded-xl bg-background/60 border-border/60 focus-visible:ring-primary/25"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium text-foreground" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="h-11 rounded-xl bg-background/60 border-border/60 focus-visible:ring-primary/25"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium text-foreground" htmlFor="subject">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Tell us briefly what you need help with"
                      className="h-11 rounded-xl bg-background/60 border-border/60 focus-visible:ring-primary/25"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium text-foreground" htmlFor="message">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Share as much or as little as you'd like. Please avoid sharing very sensitive personal details."
                      className="min-h-[150px] rounded-xl bg-background/60 border-border/60 focus-visible:ring-primary/25"
                    />
                    <p className="text-xs text-foreground/60">
                      Please don&apos;t include passwords, medical records, or private identifiers.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="mt-2 w-full md:w-auto rounded-2xl h-11 px-8 font-semibold bg-primary hover:bg-primary/90"
                  >
                    Send message
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Side card */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="rounded-3xl border border-border/60 bg-card shadow-lg shadow-emerald-500/5">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-base text-foreground">
                  Other ways to reach us
                </h3>

                <div className="rounded-2xl border border-border/60 bg-background/40 p-4 hover:bg-background/60 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground">Email</p>
                      <p className="text-sm text-foreground/70 break-all">
                        support@mindbridge.example
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/40 p-4 hover:bg-background/60 transition">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-primary/10 ring-1 ring-primary/20 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">Community</p>
                      <p className="text-sm text-foreground/70 leading-relaxed">
                        Join our peer-support spaces to connect with others who understand.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 text-xs text-foreground/60 leading-relaxed">
                  For urgent safety concerns, use emergency services or a crisis helpline.
                </div>
              </CardContent>
            </Card>

            {/* Optional mini reassurance card */}
            <Card className="rounded-3xl border border-border/60 bg-card">
              <CardContent className="p-6">
                <p className="text-sm text-foreground/70 leading-relaxed">
                  We built Mind Bridge to feel safe, calm, and human. If something
                  isn&apos;t working right—or you want a feature—tell us. We actually read this.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
