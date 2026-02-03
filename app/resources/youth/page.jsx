"use client";

import { useState } from "react";
import {
  BookOpen,
  Users,
  Sparkles,
  Cloud,
  CheckCircle,
  Heart,
  Trophy,
  MessageCircle,
  Home,
  Lightbulb,
  Target,
  Star,
  Sun,
  AlertCircle,
} from "lucide-react";

const challenges = [
  {
    title: "Academic Pressure & Perfectionism",
    icon: BookOpen,
    description:
      "The pressure to excel academically can feel overwhelming. Perfectionism, fear of failure, and constant comparison to peers can lead to burnout, anxiety, and loss of joy in learning.",
    signs: [
      "Excessive worry about grades or performance",
      "Procrastination due to fear of not doing well enough",
      "Difficulty sleeping before tests or deadlines",
      "Feeling like you're never good enough",
      "Physical symptoms like headaches or stomach aches",
      "Loss of interest in activities you once enjoyed",
    ],
  },
  {
    title: "Social Anxiety & Peer Relationships",
    icon: Users,
    description:
      "Navigating friendships, peer pressure, and social situations can be challenging. Social anxiety can make even everyday interactions feel daunting, leading to isolation and loneliness.",
    signs: [
      "Intense fear of being judged or embarrassed",
      "Avoiding social situations or school activities",
      "Difficulty speaking up in class or groups",
      "Overthinking social interactions afterward",
      "Physical symptoms like blushing, sweating, or trembling",
      "Feeling lonely even when around others",
    ],
  },
  {
    title: "Identity & Self-Esteem",
    icon: Sparkles,
    description:
      "Adolescence and young adulthood are times of identity exploration. Questions about who you are, self-worth, body image, and belonging can feel confusing and sometimes painful.",
    signs: [
      "Harsh self-criticism or negative self-talk",
      "Comparing yourself constantly to others",
      "Feeling like you don't fit in anywhere",
      "Struggling with body image or appearance concerns",
      "Difficulty making decisions about your future",
      "Questioning your values, beliefs, or identity",
    ],
  },
  {
    title: "Depression & Anxiety",
    icon: Cloud,
    description:
      "Mental health conditions like depression and anxiety are common among young people. These aren't just 'moods'—they're real conditions that affect how you think, feel, and function every day.",
    signs: [
      "Persistent sadness, emptiness, or hopelessness",
      "Loss of interest in things you used to enjoy",
      "Changes in sleep (too much or too little)",
      "Difficulty concentrating or making decisions",
      "Excessive worry that's hard to control",
      "Thoughts of self-harm or suicide (seek help immediately)",
    ],
  },
];

function WorrySorting() {
  const [worries, setWorries] = useState([]);
  const [currentWorry, setCurrentWorry] = useState("");
  const [sortedWorries, setSortedWorries] = useState({ canControl: [], cantControl: [] });

  const addWorry = () => {
    if (currentWorry.trim()) {
      setWorries([...worries, { text: currentWorry, id: Date.now() }]);
      setCurrentWorry("");
    }
  };

  const sortWorry = (worry, category) => {
    setSortedWorries(prev => ({
      ...prev,
      [category]: [...prev[category], worry]
    }));
    setWorries(worries.filter(w => w.id !== worry.id));
  };

  const removeFromSorted = (worry, category) => {
    setSortedWorries(prev => ({
      ...prev,
      [category]: prev[category].filter(w => w.id !== worry.id)
    }));
    setWorries([...worries, worry]);
  };

  return (
    <div className="rounded-3xl bg-card/70 backdrop-blur-md border border-border shadow-sm">
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Target className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-bold text-foreground">Worry Sorting Activity</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Write down your worries, then sort them into what you can and can't control. This helps you focus your energy where it matters most.
        </p>

        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentWorry}
              onChange={(e) => setCurrentWorry(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addWorry()}
              placeholder="What's on your mind? (e.g., upcoming test, friend conflict)"
              className="flex-1 p-3 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button onClick={addWorry} className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 rounded-lg font-medium transition-colors">
              Add
            </button>
          </div>

          {worries.length > 0 && (
            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-xs text-muted-foreground mb-3">Tap to sort your worries:</p>
              <div className="space-y-2">
                {worries.map(worry => (
                  <div key={worry.id} className="flex gap-2">
                    <button
                      onClick={() => sortWorry(worry, 'canControl')}
                      className="flex-1 p-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-left text-sm text-foreground transition-colors"
                    >
                      {worry.text}
                    </button>
                    <button
                      onClick={() => sortWorry(worry, 'cantControl')}
                      className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-xs text-foreground transition-colors"
                    >
                      Can't Control
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-primary" />
                <h5 className="font-semibold text-foreground text-sm">I Can Control</h5>
              </div>
              {sortedWorries.canControl.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">Your actionable worries will appear here</p>
              ) : (
                <div className="space-y-2">
                  {sortedWorries.canControl.map(worry => (
                    <div key={worry.id} className="flex items-center justify-between gap-2 p-2 rounded bg-background/50 border border-border/50">
                      <span className="text-sm text-foreground">{worry.text}</span>
                      <button
                        onClick={() => removeFromSorted(worry, 'canControl')}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 rounded-xl bg-muted/30 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Cloud className="w-4 h-4 text-muted-foreground" />
                <h5 className="font-semibold text-foreground text-sm">I Can't Control</h5>
              </div>
              {sortedWorries.cantControl.length === 0 ? (
                <p className="text-xs text-muted-foreground italic">Worries outside your control will appear here</p>
              ) : (
                <div className="space-y-2">
                  {sortedWorries.cantControl.map(worry => (
                    <div key={worry.id} className="flex items-center justify-between gap-2 p-2 rounded bg-background/50 border border-border/50">
                      <span className="text-sm text-foreground">{worry.text}</span>
                      <button
                        onClick={() => removeFromSorted(worry, 'cantControl')}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {(sortedWorries.canControl.length > 0 || sortedWorries.cantControl.length > 0) && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
              <p className="text-xs text-primary mb-2 font-semibold">💡 What this means:</p>
              {sortedWorries.canControl.length > 0 && (
                <p className="text-xs text-muted-foreground mb-2">
                  • Focus your energy on the <strong className="text-primary">{sortedWorries.canControl.length} thing(s) you can control</strong>. Make a plan, take one small step.
                </p>
              )}
              {sortedWorries.cantControl.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  • For the <strong className="text-foreground">{sortedWorries.cantControl.length} thing(s) you can't control</strong>, practice letting go. It's okay to stop carrying them.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SelfCompassionBuilder() {
  const [criticalThought, setCriticalThought] = useState("");
  const [compassionateResponse, setCompassionateResponse] = useState("");

  const examples = [
    {
      critical: "I'm so stupid for failing that test",
      compassionate: "One test doesn't define my intelligence. I can learn from this and do better next time."
    },
    {
      critical: "Nobody likes me, I'm so awkward",
      compassionate: "I'm still learning how to socialize, and that's okay. The right people will appreciate me for who I am."
    },
    {
      critical: "I should be doing better in school",
      compassionate: "I'm doing my best with what I have right now. It's okay to not be perfect."
    },
    {
      critical: "I'm a burden to everyone",
      compassionate: "People who care about me want to be there for me. Asking for help is a sign of strength, not weakness."
    }
  ];

  const [currentExample, setCurrentExample] = useState(0);
  const [savedResponses, setSavedResponses] = useState([]);

  const saveResponse = () => {
    if (criticalThought.trim() && compassionateResponse.trim()) {
      setSavedResponses([...savedResponses, {
        critical: criticalThought,
        compassionate: compassionateResponse,
        id: Date.now()
      }]);
      setCriticalThought("");
      setCompassionateResponse("");
    }
  };

  const loadExample = () => {
    setCriticalThought(examples[currentExample].critical);
    setCompassionateResponse(examples[currentExample].compassionate);
    setCurrentExample((currentExample + 1) % examples.length);
  };

  const removeResponse = (id) => {
    setSavedResponses(savedResponses.filter(r => r.id !== id));
  };

  return (
    <div className="rounded-3xl bg-card/70 backdrop-blur-md border border-border shadow-sm">
      <div className="p-6 space-y-5">
        <div className="flex items-center gap-3">
          <Heart className="w-5 h-5 text-primary" />
          <h4 className="text-lg font-bold text-foreground">Self-Compassion Builder</h4>
        </div>
        <p className="text-sm text-muted-foreground">
          Transform harsh self-criticism into kind, supportive thoughts. Practice talking to yourself like you would a good friend.
        </p>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <label className="text-xs font-semibold text-muted-foreground mb-2 block">
              Critical thought (what you tell yourself):
            </label>
            <textarea
              value={criticalThought}
              onChange={(e) => setCriticalThought(e.target.value)}
              placeholder="e.g., I'm not good enough..."
              className="w-full p-3 rounded-lg bg-background border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-destructive/50 min-h-[80px] resize-none"
            />
          </div>

          <div className="flex justify-center">
            <div className="p-2 rounded-full bg-primary/10 border border-primary/30">
              <svg className="w-5 h-5 text-primary" fill="none" strokeWidth="2" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
            <label className="text-xs font-semibold text-primary mb-2 block">
              Compassionate response (what you'd tell a friend):
            </label>
            <textarea
              value={compassionateResponse}
              onChange={(e) => setCompassionateResponse(e.target.value)}
              placeholder="How would you respond with kindness and understanding?"
              className="w-full p-3 rounded-lg bg-background border border-primary/50 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px] resize-none"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={saveResponse}
              disabled={!criticalThought.trim() || !compassionateResponse.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-sm px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Save Response
            </button>
            <button
              onClick={loadExample}
              className="border border-border text-foreground hover:bg-muted text-sm px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4" />
              See Example
            </button>
          </div>

          {savedResponses.length > 0 && (
            <div className="space-y-3 pt-2">
              <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Star className="w-4 h-4 text-primary" />
                Your Compassionate Responses
              </h5>
              {savedResponses.map(response => (
                <div key={response.id} className="p-4 rounded-xl bg-muted/70 border border-border space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="text-xs text-destructive/70 mb-1 line-through">{response.critical}</p>
                      <p className="text-sm text-primary">{response.compassionate}</p>
                    </div>
                    <button
                      onClick={() => removeResponse(response.id)}
                      className="text-muted-foreground hover:text-foreground text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {savedResponses.length > 0 && (
            <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 text-center">
              <p className="text-xs text-primary font-semibold">
                💚 You're practicing being kind to yourself—that's powerful!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SupportCard({ title, description, icon: IconComponent }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      onClick={() => setOpen(!open)}
      className="group relative overflow-hidden rounded-3xl bg-card/80 backdrop-blur-md border border-primary/15 cursor-pointer transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
    >
      <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="p-6 space-y-4">
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
          <div className="pt-2">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
          </div>
        )}

        <p className="text-xs text-primary">
          {open ? "Tap to collapse" : "Tap to learn more"}
        </p>
      </div>
    </div>
  );
}

export default function YouthMentalHealthPage() {
  return (
    <div className="relative min-h-screen bg-background pt-32 pb-24 px-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 10% 20%, hsl(var(--primary) / 0.15) 0, transparent 55%), radial-gradient(circle at 90% 80%, hsl(var(--primary) / 0.15) 0, transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
            Youth & Student <span className="text-primary">Mental Health</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Resources focused on academic pressure, social wellbeing, and emotional health for teens and young adults.
          </p>
        </div>

        {/* Welcome Note */}
        <div className="mb-16 bg-card/70 backdrop-blur-md border border-border rounded-3xl shadow-sm">
          <div className="p-6 flex gap-4">
            <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-2">
              <p className="text-muted-foreground">
                You're not alone in what you're feeling. The pressures of school, friendships, and figuring out who you are can be overwhelming. It's okay to struggle, and it's okay to ask for help.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong className="text-foreground">Remember:</strong> Your mental health matters just as much as your grades. Taking care of yourself isn't selfish—it's necessary.
              </p>
            </div>
          </div>
        </div>

        {/* Common Challenges */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Common Challenges for Young People
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {challenges.map((challenge, i) => {
              const IconComponent = challenge.icon;
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl bg-card/90 backdrop-blur-md border border-primary/15 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

                  <div className="p-0">
                    <div className="pb-4 pt-7 px-7">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-7 h-7 text-primary" />
                        </div>
                        <h3 className="text-lg font-bold text-foreground">
                          {challenge.title}
                        </h3>
                      </div>
                    </div>

                    <div className="px-7 pb-7 space-y-5">
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {challenge.description}
                      </p>
                      <div className="pt-2">
                        <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Common Signs
                        </h4>
                        <ul className="space-y-2.5 text-sm text-muted-foreground">
                          {challenge.signs.map((s, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="mt-1.5 w-1 h-1 rounded-full bg-primary/60 shrink-0"></span>
                              <span className="leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Tools & Resources */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Tools for Managing Stress & Building Wellbeing
          </h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto">
            Small changes can make a big difference. Try these tools to support your mental health.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WorrySorting />
            <SelfCompassionBuilder />
          </div>
        </section>

        {/* Impact Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            How Mental Health Impacts Your Life
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Academic Performance</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mental health struggles can make it hard to concentrate, remember information, or complete assignments. Anxiety and depression can affect motivation and make school feel overwhelming.
              </p>
            </div>
            
            <div className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Friendships & Social Life</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mental health can affect how you connect with others. You might withdraw from friends, feel misunderstood, or struggle with conflict. Building healthy relationships starts with taking care of yourself.
              </p>
            </div>
            
            <div className="p-6 rounded-3xl bg-card/70 backdrop-blur-md border border-border shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">Physical Health & Energy</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your mind and body are connected. Mental health challenges can lead to sleep problems, low energy, changes in appetite, and physical aches. Taking care of your mental health helps your whole body thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Support Approaches */}
        <section className="mb-20">
          <h2 className="text-3xl font-extrabold text-center mb-10 text-foreground">
            Getting the Support You Deserve
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SupportCard
              title="School & Campus Resources"
              icon={Home}
              description="Many schools offer counseling services, peer support programs, and accommodations for mental health. School counselors can help with stress, academic concerns, and connecting you to additional support. Don't be afraid to reach out—they're there to help you succeed, not judge you."
            />

            <SupportCard
              title="Therapy for Young People"
              icon={MessageCircle}
              description="Therapy isn't just for adults. Many therapists specialize in working with teens and young adults, helping with anxiety, depression, identity questions, and life transitions. Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), and talk therapy can teach you skills to manage emotions and navigate challenges."
            />

            <SupportCard
              title="Self-Care & Lifestyle Changes"
              icon={Star}
              description="Small daily habits make a difference: getting enough sleep, moving your body, eating nourishing foods, and spending time with people who care about you. Setting boundaries with social media, making time for hobbies, and practicing self-compassion are all acts of mental health care."
            />
          </div>
        </section>

        {/* Crisis Resources */}
        <div className="bg-primary/5 border border-primary/20 rounded-3xl shadow-sm">
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">Need Help Right Now?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              If you're in crisis or having thoughts of self-harm or suicide, please reach out immediately. Text or call the 988 Suicide & Crisis Lifeline (call or text 988) or contact a trusted adult, school counselor, or emergency services.
            </p>
            <p className="text-sm text-primary font-semibold">
              Your life matters. You deserve support and care.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}