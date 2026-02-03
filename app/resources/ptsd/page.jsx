"use client";
"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Zap,
  Wind,
  Waves,
  Sprout,
  Compass,
  Eye,
  User,
  Home,
  Shield,
  Users,
  Palette,
  MessageCircle,
  Brain,
  Heart,
  AlertTriangle,
  Star,
  Handshake,
  Lightbulb,
} from "lucide-react";

const traumaTypes = [
  {
    title: "Acute Trauma",
    icon: Zap,
    description:
      "Results from a single distressing event—an accident, assault, natural disaster, or sudden loss. The impact can be immediate and intense, but with support, many people recover.",
    signs: [
      "Intrusive memories or flashbacks of the event",
      "Avoiding reminders of what happened",
      "Heightened startle response",
      "Difficulty sleeping or concentrating",
      "Emotional numbness or feeling detached",
      "Physical symptoms like rapid heartbeat",
    ],
  },
  {
    title: "Post-Traumatic Stress Disorder (PTSD)",
    icon: Wind,
    description:
      "A condition that can develop after experiencing or witnessing a traumatic event. Symptoms persist for months or years and significantly impact daily functioning.",
    signs: [
      "Re-experiencing trauma through nightmares or flashbacks",
      "Avoiding people, places, or situations related to trauma",
      "Negative changes in thoughts and mood",
      "Hypervigilance or being constantly on guard",
      "Difficulty trusting others",
      "Feeling disconnected from yourself or surroundings",
    ],
  },
  {
    title: "Complex Trauma (C-PTSD)",
    icon: Waves,
    description:
      "Results from prolonged, repeated trauma—often in situations where escape feels impossible, such as ongoing abuse, neglect, or captivity. It affects core beliefs about self and others.",
    signs: [
      "Difficulty regulating emotions",
      "Persistent feelings of shame or worthlessness",
      "Challenges in forming and maintaining relationships",
      "Feeling permanently damaged or different",
      "Dissociation or feeling disconnected from reality",
      "Difficulty trusting others or feeling safe",
    ],
  },
  {
    title: "Developmental Trauma",
    icon: Sprout,
    description:
      "Trauma experienced during childhood or adolescence that disrupts healthy development. It can affect attachment, sense of safety, and understanding of relationships.",
    signs: [
      "Difficulty identifying or expressing emotions",
      "Patterns of pushing people away or clinging",
      "Low self-worth or harsh self-criticism",
      "Hypervigilance to others' emotions or moods",
      "Difficulty setting or respecting boundaries",
      "Feeling unsafe even in safe environments",
    ],
  },
];

function GroundingExercise() {
  const exercises = [
    {
      name: "5-4-3-2-1 Grounding",
      icon: Eye,
      steps: [
        "Name 5 things you can see around you",
        "Name 4 things you can touch or feel",
        "Name 3 things you can hear",
        "Name 2 things you can smell",
        "Name 1 thing you can taste"
      ]
    },
    {
      name: "Body Scan",
      icon: User,
      steps: [
        "Notice your feet on the ground",
        "Feel the weight of your body in the chair or where you're sitting",
        "Notice your hands—are they warm or cool?",
        "Take a slow breath and notice your chest rising",
        "Gently move your shoulders and release tension"
      ]
    },
    {
      name: "Orienting to Safety",
      icon: Home,
      steps: [
        "Look around the room slowly",
        "Notice the colors, shapes, and objects",
        "Remind yourself: 'I am here, in this moment'",
        "Identify what makes this space safe right now",
        "Take a slow breath and notice you are okay in this moment"
      ]
    }
  ];

  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const exercise = exercises[currentExercise];

  const nextStep = () => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const changeExercise = (index) => {
    setCurrentExercise(index);
    setCurrentStep(0);
  };

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Compass className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-bold text-foreground">Grounding Exercises</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          When you feel overwhelmed or disconnected, these exercises can help bring you back to the present moment.
        </p>

        <div className="flex gap-2 flex-wrap">
          {exercises.map((ex, i) => (
            <button
              key={i}
              onClick={() => changeExercise(i)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                currentExercise === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              <ex.icon className="w-3.5 h-3.5" /> {ex.name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
          <div className="text-center mb-4">
            <exercise.icon className="w-8 h-8 text-primary mx-auto mb-2" />
            <h5 className="font-semibold text-foreground">{exercise.name}</h5>
          </div>

          <div className="bg-card rounded-xl p-4 mb-4 min-h-[80px] flex items-center justify-center border border-border">
            <p className="text-sm text-muted-foreground text-center leading-relaxed">
              {exercise.steps[currentStep]}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <Button
              onClick={prevStep}
              disabled={currentStep === 0}
              variant="outline"
              size="sm"
            >
              Previous
            </Button>
            
            <span className="text-xs text-muted-foreground">
              {currentStep + 1} of {exercise.steps.length}
            </span>

            <Button
              onClick={nextStep}
              disabled={currentStep === exercise.steps.length - 1}
              size="sm"
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function SafetyPlan() {
  const [safetyItems, setSafetyItems] = useState({
    people: "",
    places: "",
    activities: "",
    phrases: ""
  });

  const categories = [
    { 
      key: "people", 
      label: "Safe People",
      icon: Users,
      prompt: "Who can you reach out to when you need support?",
      placeholder: "e.g., Friend's name, therapist, family member"
    },
    { 
      key: "places", 
      label: "Safe Places",
      icon: Home,
      prompt: "Where do you feel calm and safe?",
      placeholder: "e.g., Your bedroom, a park, a coffee shop"
    },
    { 
      key: "activities", 
      label: "Calming Activities",
      icon: Palette,
      prompt: "What activities help you feel grounded?",
      placeholder: "e.g., Drawing, listening to music, taking a walk"
    },
    { 
      key: "phrases", 
      label: "Comforting Phrases",
      icon: MessageCircle,
      prompt: "What can you remind yourself when things feel hard?",
      placeholder: "e.g., 'This feeling will pass,' 'I am safe right now'"
    }
  ];

  const handleChange = (key, value) => {
    setSafetyItems({...safetyItems, [key]: value});
  };

  const hasContent = Object.values(safetyItems).some(item => item.trim() !== "");

  return (
    <Card className="rounded-3xl bg-card/70 backdrop-blur-md border-border">
      <CardContent className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Shield className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-bold text-foreground">Personal Safety Plan</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Build your own collection of resources to turn to when you need support or grounding.
        </p>

        <div className="space-y-4">
          {categories.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <div key={cat.key} className="p-4 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex items-center gap-2 mb-2">
                  <IconComponent className="w-5 h-5 text-primary" />
                  <h5 className="font-semibold text-foreground text-sm">{cat.label}</h5>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{cat.prompt}</p>
                <input
                  type="text"
                  value={safetyItems[cat.key]}
                  onChange={(e) => handleChange(cat.key, e.target.value)}
                  placeholder={cat.placeholder}
                  className="w-full p-4 rounded-lg bg-card border border-border text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
            );
          })}
        </div>

        {hasContent && (
          <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 text-center">
            <p className="text-sm font-semibold text-primary">
              💜 You're building your toolkit for difficult moments
            </p>
          </div>
        )}
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
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-inner shadow-primary/10 group-hover:scale-110 transition-transform duration-300">
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

export default function TraumaPTSDPage() {
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
            Understanding <span className="text-primary">Trauma & PTSD</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Information on trauma responses, post-traumatic stress disorder, and evidence-based paths toward healing.
          </motion.p>
        </motion.div>

        {/* Safety */}
        <Card className="mb-16 bg-card/70 backdrop-blur-md border-border rounded-3xl">
          <CardContent className="p-6 flex gap-4">
            <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-muted-foreground">
                This page discusses trauma and PTSD. If you find the content distressing, please take breaks as needed. You are in control of your healing journey.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>Content note:</strong> This page mentions trauma but does not include graphic descriptions. If you're in crisis or experiencing flashbacks, please reach out to a crisis line or mental health professional.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Types */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Understanding Trauma Responses
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {traumaTypes.map((type, i) => {
              const IconComponent = type.icon;
              return (
                <Card
                  key={i}
                  className="group relative overflow-hidden rounded-3xl bg-linear-to-br from-card/90 via-card/80 to-card/70 backdrop-blur-md border border-primary/15 shadow-lg shadow-primary/5 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/30 to-transparent" />
                  <div className="absolute -inset-1 bg-linear-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

                  <CardContent className="p-0">
                    <div className="pb-4 pt-7 px-7">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-primary/20 to-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner shadow-primary/10">
                          <IconComponent className="w-7 h-7 text-primary" />
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
              );
            })}
          </div>
        </section>

        {/* Activities */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Healing Tools & Resources
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            These tools can help you feel more grounded and supported as you navigate your healing journey.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GroundingExercise />
            <SafetyPlan />
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Impact on Daily Life & Relationships
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Memory & Concentration</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trauma can affect memory, making it hard to concentrate or remember details. You might experience intrusive memories of the trauma while struggling to recall other events.
              </p>
            </Card>
            
            <Card className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Trust & Relationships</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trauma can make it difficult to trust others or feel safe in relationships. You might push people away, have trouble setting boundaries, or struggle with intimacy.
              </p>
            </Card>
            
            <Card className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border-border">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Emotional Regulation</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Trauma survivors often experience intense emotions that feel hard to control—sudden anger, overwhelming sadness, or emotional numbness. These are normal responses to abnormal events.
              </p>
            </Card>
          </div>
        </section>

        {/* Treatment */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Evidence-Based Paths to Healing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TreatmentCard
              title="Trauma-Focused Therapy"
              icon={Star}
              description="Specialized therapies like EMDR (Eye Movement Desensitization and Reprocessing), CPT (Cognitive Processing Therapy), and PE (Prolonged Exposure) are highly effective for trauma. These approaches help process traumatic memories in a safe, controlled way. A trauma-informed therapist creates a space where healing can happen at your own pace."
            />

            <TreatmentCard
              title="Somatic & Body-Based Approaches"
              icon={User}
              description="Trauma is stored in the body as well as the mind. Approaches like Somatic Experiencing, yoga, and mindfulness help release trauma held in the nervous system. These practices help you reconnect with your body, regulate your nervous system, and restore a sense of safety and control."
            />

            <TreatmentCard
              title="Connection & Community"
              icon={Handshake}
              description="Healing happens in connection with others. Support groups, peer communities, and safe relationships remind you that you're not alone. Sharing your story—when you're ready—can be powerful. Building trust with others, at your own pace, is an important part of recovery."
            />
          </div>
        </section>
      </div>
    </div>
  );
}