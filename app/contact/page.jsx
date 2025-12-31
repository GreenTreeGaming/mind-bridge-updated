"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, PhoneCall } from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background selection:bg-emerald-500/30 pt-32 pb-24 px-4">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-background to-background -z-10" />
      <div
        className="absolute inset-0 opacity-30 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0, rgba(16,185,129,0.16) 0, transparent 55%), radial-gradient(circle at 80% 100%, rgba(45,212,191,0.16) 0, transparent 55%)",
        }}
      />

      <div className="container mx-auto max-w-5xl">
        {/* Intro */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={{
            animate: {
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="text-center mb-14 space-y-6"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full">
              <MessageCircle className="w-4 h-4 mr-2 inline" />
              Contact & Support
            </Badge>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Reach out when{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              you&apos;re ready
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Whether you have a question about the platform, need help getting
            started, or simply want to share feedback, we&apos;re here to
            listen.
          </motion.p>
        </motion.div>

        {/* Crisis disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <Card className="bg-red-950/30 border-red-500/40 rounded-3xl">
            <CardContent className="p-6 md:p-7 flex flex-col md:flex-row gap-4 md:gap-6 items-start">
              <div className="w-10 h-10 rounded-2xl bg-red-500/30 flex items-center justify-center flex-shrink-0">
                <PhoneCall className="w-6 h-6 text-red-200" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-red-100">
                  If you&apos;re in immediate crisis, please don&apos;t wait for
                  an email response.
                </p>
                <p className="text-sm text-red-100/80">
                  Contact your local emergency number or a crisis helpline in
                  your area right away. You deserve rapid, live support when
                  things feel overwhelming.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Form + contact options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <Card className="bg-emerald-950/40 border-emerald-500/30 rounded-3xl">
              <CardContent className="p-7 space-y-5">
                <h2 className="text-xl font-semibold">Send us a message</h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium" htmlFor="name">
                      Name (optional)
                    </label>
                    <Input
                      id="name"
                      placeholder="How would you like us to address you?"
                      className="bg-background/60 border-emerald-500/25 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium" htmlFor="email">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="we@mindbridge.example"
                      className="bg-background/60 border-emerald-500/25 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium" htmlFor="subject">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      placeholder="Tell us briefly what you need help with"
                      className="bg-background/60 border-emerald-500/25 rounded-xl"
                    />
                  </div>

                  <div className="space-y-2 text-left">
                    <label className="text-sm font-medium" htmlFor="message">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Share as much or as little as you'd like. Please avoid sharing very sensitive personal details."
                      className="min-h-[140px] bg-background/60 border-emerald-500/25 rounded-xl"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="mt-3 w-full md:w-auto rounded-2xl h-11 px-8 font-semibold bg-emerald-600 hover:bg-emerald-700"
                  >
                    Send message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-emerald-950/40 border-emerald-500/30 rounded-3xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-semibold text-base">Other ways to reach us</h3>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Email</p>
                    <p>support@mindbridge.example</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-muted-foreground">
                  <div className="w-8 h-8 rounded-2xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Community</p>
                    <p>
                      Join our peer-support spaces to connect with others who
                      understand.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


