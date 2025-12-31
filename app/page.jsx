"use client";

import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Heart, 
  Users, 
  Calendar, 
  BookOpen, 
  MessageCircle, 
  Shield, 
  Sparkles,
  PhoneCall,
  ChevronRight,
  Brain
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  mentalHealthResources, 
  supportFeatures, 
  recoveryStories, 
  crisisHelplines,
  mentalHealthBlogs
} from "@/lib/data";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function MentalHealthHome() {
  const stats = [
    { number: "10K+", label: "Community Members" },
    { number: "500+", label: "Licensed Counselors" },
    { number: "24/7", label: "Crisis Support" },
    { number: "100%", label: "Confidential" }
  ];

  return (
    <div className="min-h-screen bg-background selection:bg-emerald-500/30">

      {/* Hero Section - Unique Split Design */}
      <section className="relative pt-32 pb-24 px-4 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/50 via-background to-background -z-10" />
        <div className="absolute inset-0 opacity-30" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(5, 150, 105, 0.15) 0%, transparent 50%)',
        }} />
        
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="space-y-8 lg:pr-8"
            >
              <motion.div variants={fadeInUp}>
                <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-5 py-2 rounded-full text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
                  <Sparkles className="w-3.5 h-3.5 mr-2 inline animate-pulse" />
                  Mental Health Matters
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp} 
                className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tighter"
              >
                Healing Begins
                <span className="block mt-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400 bg-clip-text text-transparent">
                  With Hope
                </span>
              </motion.h1>
              
              <motion.p 
                variants={fadeInUp} 
                className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl"
              >
                A compassionate space where mental wellness meets expert care. You're not alone on this journey.
              </motion.p>
              
              {/* Stats Grid */}
              <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 pt-6">
                {stats.map((stat, index) => (
                  <div 
                    key={index}
                    className="relative group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                    <div className="relative bg-emerald-950/30 backdrop-blur-sm border border-emerald-500/20 rounded-2xl p-5 hover:border-emerald-500/40 transition-all">
                      <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button 
                  size="lg" 
                  className="h-16 px-10 rounded-2xl text-lg font-bold bg-emerald-600 hover:bg-emerald-700 shadow-2xl shadow-emerald-500/25 group"
                >
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-16 px-10 rounded-2xl text-lg font-bold border-emerald-500/30 bg-emerald-950/20 backdrop-blur-sm hover:bg-emerald-950/40"
                >
                  Explore Resources
                </Button>
              </motion.div>
            </motion.div>

            {/* Hero Image with Floating Elements */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative lg:pl-8"
            >
              <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-emerald-500/20 border-4 border-emerald-500/10">
                <Image
                  src="/heroimage.jpg"
                  alt="Person meditating peacefully"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-transparent to-transparent" />
              </div>
              
              {/* Floating Stat Cards */}
              <motion.div 
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-6 top-20 bg-background/95 backdrop-blur-xl p-5 rounded-2xl border border-emerald-500/20 shadow-2xl max-w-[180px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-7 h-7 text-emerald-500" />
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">Secure</p>
                <p className="text-sm font-bold">100% Private</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -right-6 bottom-20 bg-background/95 backdrop-blur-xl p-5 rounded-2xl border border-emerald-500/20 shadow-2xl max-w-[180px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                    <Heart className="w-7 h-7 text-blue-400" />
                  </div>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-1">Support</p>
                <p className="text-sm font-bold">Always Here</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Support Features - Bento Grid Style */}
      <section className="py-32 px-4 relative" id="resources">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 to-background -z-10" />
        
        <div className="container mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-5">
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full">
              Comprehensive Care
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Everything You Need in
              <span className="block bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <Card className="h-full bg-gradient-to-br from-emerald-950/40 to-background border-emerald-500/20 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 group rounded-3xl overflow-hidden backdrop-blur-sm">
                  <CardHeader className="p-8 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/10">
                      {React.cloneElement(feature.icon, { 
                        className: "w-8 h-8 text-emerald-400",
                        strokeWidth: 2.5
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

      {/* Crisis Section - Bold & Clear */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 to-background" />
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-red-900/20 to-red-950/10 border-2 border-red-500/30 rounded-[3rem] p-10 md:p-16 backdrop-blur-sm relative overflow-hidden"
          >
            <div className="relative z-10 space-y-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="w-20 h-20 bg-red-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-10 h-10 text-red-300 animate-pulse" />
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
                    className="group bg-background/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-red-500/20 hover:border-red-500/50 transition-all hover:shadow-xl hover:shadow-red-500/10"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-3xl font-black text-red-400 mb-1">{line.number}</p>
                        <p className="font-bold text-lg mb-1">{line.name}</p>
                        <p className="text-sm text-muted-foreground">{line.description}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="rounded-xl w-12 h-12 group-hover:bg-red-400 group-hover:text-white transition-colors"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                className="w-full sm:w-auto px-10 h-16 rounded-2xl font-bold text-lg bg-red-900 hover:bg-red-700 text-white"
              >
                Connect With Support Now
              </Button>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-red-500/10 rounded-full blur-[120px]" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-red-600/10 rounded-full blur-[120px]" />
          </motion.div>
        </div>
      </section>

      {/* Mental Health Resources */}
      <section className="py-32 px-4 bg-gradient-to-b from-background to-emerald-950/10" id="community">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full">
              Knowledge Hub
            </Badge>
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-card border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/10 rounded-3xl overflow-hidden h-full">
                  <CardHeader className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-7 w-7 text-emerald-400" />
                      <CardTitle className="text-2xl font-bold">{resource.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">{resource.description}</p>
                    <Button
                      asChild
                      variant="ghost"
                      className="w-fit px-0 text-emerald-400 hover:text-emerald-300 font-bold group"
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

      {/* Recovery Stories - Testimonials */}
      <section className="py-32 px-4 relative overflow-hidden" id="stories">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950/20 via-background to-background" />
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(16, 185, 129, 0.15) 1px, transparent 0)',
          backgroundSize: '50px 50px'
        }} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20 space-y-4">
            <Badge className="bg-emerald-500/10 border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full">
              <Heart className="w-3.5 h-3.5 mr-2 inline" />
              Inspiring Journeys
            </Badge>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Stories of Strength &<br />
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                <Card className="bg-gradient-to-br from-emerald-950/40 to-background border-emerald-500/20 hover:border-emerald-500/40 shadow-xl shadow-emerald-500/5 hover:shadow-2xl hover:shadow-emerald-500/10 p-8 rounded-3xl relative overflow-hidden h-full transition-all duration-300">
                  <div className="absolute -top-8 -right-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30 mb-6">
                      <span className="text-white font-black text-xl">{story.initials}</span>
                    </div>
                    
                    <p className="text-xl font-medium leading-relaxed mb-8 text-muted-foreground italic">
                      "{story.quote}"
                    </p>
                    
                    <div className="pt-4 border-t border-emerald-500/20">
                      <p className="font-bold text-lg">{story.name}</p>
                      <p className="text-emerald-400 font-semibold text-sm">{story.journey}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA - Immersive */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
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
                  className="h-16 px-12 rounded-2xl text-lg font-bold bg-white text-emerald-700 hover:bg-gray-100 shadow-2xl"
                >
                  Get Started Free
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-16 px-12 rounded-2xl text-lg font-bold border-2 border-white/30 hover:bg-white/10 text-white"
                >
                  Explore Resources
                </Button>
              </div>
            </div>
            
            {/* Floating decorative elements */}
            <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-10 right-10 w-60 h-60 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}