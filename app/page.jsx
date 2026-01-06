"use client"

import React, { useState } from "react";
import {
  ArrowRight,
  Heart,
  BookOpen,
  Shield,
  Sparkles,
  PhoneCall,
  ChevronRight,
  MessageCircle,
  Users,
  Clock,
  CheckCircle2,
} from "lucide-react";

import Link from "next/link";

export default function MentalHealthHome() {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [hoveredStory, setHoveredStory] = useState(null);

  const stats = [
    { number: "10K+", label: "Community Members" },
    { number: "500+", label: "Licensed Counselors" },
    { number: "24/7", label: "Crisis Support" },
    { number: "100%", label: "Confidential" },
  ];

  const supportFeatures = [
    {
      icon: <MessageCircle />,
      title: "24/7 Chat Support",
      description: "Connect with trained counselors anytime through our secure messaging platform.",
    },
    {
      icon: <Users />,
      title: "Support Groups",
      description: "Join peer-led communities sharing similar experiences and journeys.",
    },
    {
      icon: <BookOpen />,
      title: "Resource Library",
      description: "Access evidence-based articles, videos, and self-help tools.",
    },
    {
      icon: <Shield />,
      title: "Safe & Private",
      description: "Your conversations are encrypted and completely confidential.",
    },
    {
      icon: <Sparkles />,
      title: "Personalized Care",
      description: "Tailored recommendations based on your unique needs and goals.",
    },
    {
      icon: <Clock />,
      title: "Flexible Sessions",
      description: "Schedule therapy sessions that fit your lifestyle and timezone.",
    },
  ];

  const mentalHealthResources = [
    {
      title: "Understanding Anxiety",
      description: "Learn about anxiety disorders, symptoms, and effective coping strategies for daily life.",
      link: "#",
    },
    {
      title: "Depression Support",
      description: "Comprehensive resources for recognizing and managing depression with professional guidance.",
      link: "#",
    },
    {
      title: "Stress Management",
      description: "Practical techniques and tools to reduce stress and build resilience.",
      link: "#",
    },
    {
      title: "Sleep & Wellness",
      description: "Discover the connection between sleep quality and mental health.",
      link: "#",
    },
  ];

  const crisisHelplines = [
    {
      number: "988",
      name: "Suicide & Crisis Lifeline",
      description: "24/7 confidential support for people in distress",
    },
    {
      number: "1-800-273-8255",
      name: "National Helpline",
      description: "Free, confidential help anytime, day or night",
    },
  ];

  const recoveryStories = [
    {
      initials: "SM",
      name: "Sarah M.",
      journey: "Anxiety → Peace",
      quote: "I never thought I'd feel calm again. This community gave me tools and hope when I needed it most.",
    },
    {
      initials: "JL",
      name: "James L.",
      journey: "Depression → Hope",
      quote: "Finding the right support changed everything. I'm finally living again, not just surviving.",
    },
    {
      initials: "AR",
      name: "Alex R.",
      journey: "PTSD → Healing",
      quote: "The journey isn't easy, but having people who understand makes all the difference.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/25">
      {/* HERO - Side-by-side split screen layout */}
      <section className="relative min-h-screen grid lg:grid-cols-2">
        {/* Left side - Content */}
        <div className="relative flex items-center px-8 md:px-16 py-32 bg-gradient-to-br from-background via-muted to-primary/5">
          <div className="max-w-2xl space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-sm font-bold text-primary">Welcome to Your Safe Space</span>
            </div>

            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tight">
              Healing
              <span className="block text-primary">Begins</span>
              <span className="block text-primary/80">With Hope</span>
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed">
              A compassionate space where mental wellness meets expert care. You're not alone on this journey.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="h-14 px-8 rounded-full text-base font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/30 transition-all flex items-center gap-2 group">
                <Link href="/counselors">Start Your Journey</Link>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="h-14 px-8 rounded-full text-base font-bold border-2 border-primary/40 bg-transparent hover:bg-primary/10 transition-all">
                <Link href="/resources">Start Your Journey</Link>
              </button>
            </div>
          </div>
        </div>

        {/* Right side - Stats overlay on image */}
        <div className="relative hidden lg:block animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          <img
            src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=1600&fit=crop"
            alt="Peaceful meditation"
            className="w-full h-full object-cover"
          />
          
          {/* Floating stats */}
          <div className="absolute inset-0 p-12 flex flex-col justify-end gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-background/80 backdrop-blur-xl border border-primary/30 rounded-2xl p-6 max-w-xs ml-auto animate-slide-in-right"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="text-4xl font-black text-primary mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUPPORT FEATURES - Bento grid layout */}
      <section className="py-32 px-8 relative bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-5xl md:text-6xl font-black">
              Everything You Need
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support designed around your wellbeing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportFeatures.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredFeature(index)}
                onMouseLeave={() => setHoveredFeature(null)}
                className={`bg-card/50 backdrop-blur-md border border-primary/20 rounded-3xl shadow-xl p-8 transition-all duration-300 cursor-pointer ${
                  hoveredFeature === index ? 'scale-105 shadow-2xl shadow-primary/20' : ''
                } ${index === 0 ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {React.cloneElement(feature.icon, {
                      className: "w-7 h-7 text-primary",
                      strokeWidth: 2,
                    })}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRISIS - Full-width urgent banner with side-by-side cards */}
      <section className="py-24 px-8 relative bg-gradient-to-r from-red-950/40 via-red-900/30 to-red-950/40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(220,38,38,0.1),transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center border border-red-500/40">
                <PhoneCall className="w-8 h-8 text-red-400" />
              </div>
              <h2 className="text-4xl md:text-5xl font-black">
                Crisis Support Available Now
              </h2>
            </div>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              If you're in crisis, immediate help is available. You don't have to face this alone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            {crisisHelplines.map((line, i) => (
              <div
                key={i}
                className="group bg-card/60 backdrop-blur-xl p-8 rounded-3xl border border-red-500/30 hover:border-red-500/60 transition-all hover:scale-105"
              >
                <div className="text-center space-y-3">
                  <p className="text-5xl font-black text-red-400 dark:text-red-300">{line.number}</p>
                  <p className="text-2xl font-bold">{line.name}</p>
                  <p className="text-muted-foreground">{line.description}</p>
                  <button className="mt-4 px-6 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-bold transition-colors inline-flex items-center gap-2">
                    Call Now
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="h-14 px-10 rounded-full font-bold bg-red-600 hover:bg-red-500 text-white shadow-xl shadow-red-500/30 transition-all">
              <Link href="/contact">Connect With Support Now</Link>
            </button>
          </div>
        </div>
      </section>

      {/* RESOURCES - Asymmetric card layout */}
      <section className="py-32 px-8 relative bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 max-w-3xl">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Understanding<br />
              <span className="text-primary">Mental Health</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Learn about different conditions and find the right support for your journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mentalHealthResources.map((resource, index) => (
              <div
                key={index}
                className={`bg-card/50 backdrop-blur-md border border-primary/20 rounded-3xl shadow-xl p-8 group hover:-translate-y-2 transition-all cursor-pointer ${
                  index === 0 ? 'md:col-span-2' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold">{resource.title}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                      <Link href="/resources">Learn More</Link>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES - Horizontal scroll cards */}
      <section className="py-32 relative bg-gradient-to-b from-muted/30 to-background overflow-hidden">
        <div className="px-8 mb-16 max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black text-center mb-4">
            Stories of Strength & Recovery
          </h2>
          <p className="text-xl text-muted-foreground text-center max-w-2xl mx-auto">
            Real experiences from brave individuals who found their path to healing
          </p>
        </div>

        <div className="flex gap-8 px-8 pb-8 overflow-x-auto scrollbar-hide">
          {recoveryStories.map((story, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredStory(i)}
              onMouseLeave={() => setHoveredStory(null)}
              className={`bg-card/50 backdrop-blur-md border border-primary/20 rounded-3xl shadow-xl p-10 min-w-[400px] relative group transition-all duration-300 ${
                hoveredStory === i ? 'scale-105 shadow-2xl shadow-primary/20' : ''
              }`}
            >
              <div className="absolute top-6 right-6 text-6xl font-black text-primary/10">
                "
              </div>
              
              <div className="relative space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center shadow-xl">
                  <span className="text-primary-foreground font-black text-2xl">{story.initials}</span>
                </div>

                <p className="text-lg leading-relaxed text-foreground/80 italic">
                  "{story.quote}"
                </p>

                <div className="pt-4 border-t border-primary/20">
                  <p className="font-bold text-xl mb-1">{story.name}</p>
                  <p className="text-primary font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {story.journey}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA - Centered minimal design */}
      <section className="py-40 px-8 relative bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto border border-primary/40">
                <Heart className="w-10 h-10 text-primary" />
              </div>
              
              <h2 className="text-6xl md:text-7xl font-black leading-tight">
                Your Journey<br />
                <span className="text-primary">Starts Today</span>
              </h2>
              
              <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Join thousands who've found hope, healing, and community. Take the first step towards a healthier mind.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button className="h-16 px-12 rounded-full text-lg font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl shadow-primary/30 transition-all">
                <Link href="/resources">Explore Resources</Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.6s ease-out forwards;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}