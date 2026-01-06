import {
  BookOpen,
  Heart,
  Users,
  Calendar,
  MessageCircle,
  Shield,
} from "lucide-react";

/* =========================
   SUPPORT FEATURES (Homepage)
   ========================= */
export const supportFeatures = [
  {
    icon: <BookOpen className="h-6 w-6 text-emerald-400" />,
    title: "Learn About Mental Health",
    description:
      "Access easy-to-understand guides on anxiety, depression, trauma, and more. Learn symptoms, causes, and healthy coping strategies backed by professionals.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "Book Online Counseling",
    description:
      "Schedule confidential virtual sessions with licensed counselors and therapists at times that fit your lifestyle.",
  },
  {
    icon: <Users className="h-6 w-6 text-emerald-400" />,
    title: "Supportive Community",
    description:
      "Join moderated discussion forums and peer-support groups where you can share experiences and connect with others who understand.",
  },
  {
    icon: <MessageCircle className="h-6 w-6 text-emerald-400" />,
    title: "Talk to Someone Now",
    description:
      "Instant access to chat-based support and crisis resources when you need someone to listen.",
  },
  {
    icon: <Heart className="h-6 w-6 text-emerald-400" />,
    title: "Stories of Recovery",
    description:
      "Read real-life stories from individuals who sought help, built resilience, and reclaimed their wellbeing.",
  },
  {
    icon: <Shield className="h-6 w-6 text-emerald-400" />,
    title: "Safe & Confidential",
    description:
      "Your privacy matters. All interactions are secure, confidential, and designed to protect your wellbeing.",
  },
];

/* =========================
   MENTAL HEALTH RESOURCES
   ========================= */
export const mentalHealthResources = [
  {
    title: "Anxiety Disorders",
    description:
      "Learn about generalized anxiety, panic attacks, social anxiety, and phobias—along with grounding techniques and treatment options.",
    link: "/resources/anxiety",
  },
  {
    title: "Depression",
    description:
      "Understand the signs of depression, how it affects daily life, and how therapy, lifestyle changes, and support can help.",
    link: "/resources/depression",
  },
  {
    title: "Stress & Burnout",
    description:
      "Explore the impact of chronic stress and burnout, especially in work and caregiving roles, and discover recovery strategies.",
    link: "/resources/stress-burnout",
  },
  {
    title: "Trauma & PTSD",
    description:
      "Information on trauma responses, post-traumatic stress disorder, and evidence-based paths toward healing.",
    link: "/resources/ptsd",
  },
  {
    title: "Youth & Student Mental Health",
    description:
      "Resources focused on academic pressure, social anxiety, and emotional wellbeing for teens and young adults.",
    link: "/resources/youth",
  },
];

/* =========================
   BLOG POSTS
   ========================= */
export const mentalHealthBlogs = [
  {
    title: "5 Ways to Manage Anxiety in Daily Life",
    excerpt:
      "Practical techniques you can use today to calm your nervous system and reduce anxious thoughts.",
    link: "/blog/manage-anxiety",
  },
  {
    title: "What to Expect from Your First Therapy Session",
    excerpt:
      "A beginner-friendly guide to therapy, including common questions and how to prepare.",
    link: "/blog/first-therapy-session",
  },
  {
    title: "How to Support a Loved One with Depression",
    excerpt:
      "Learn how to listen, offer help, and encourage professional support without judgment.",
    link: "/blog/support-loved-one",
  },
];

/* =========================
   RECOVERY STORIES / TESTIMONIALS
   ========================= */
export const recoveryStories = [
  {
    name: "Sarah M.",
    initials: "SM",
    journey: "Anxiety Disorders",
    quote:
      "For the first time, I didn’t feel ashamed of what I was going through. The resources and community gave me the courage to seek therapy.",
  },
  {
    name: "Daniel K.",
    initials: "DK",
    journey: "Depression",
    quote:
      "Reading others’ stories helped me realize I wasn’t weak. Booking an online session changed my life.",
  },
  {
    name: "Aisha R.",
    initials: "AR",
    journey: "Stress & Burnout",
    quote:
      "The blog posts and support forums helped me recognize burnout early and prioritize my mental health.",
  },
  {
    name: "Michael T.",
    initials: "MT",
    journey: "Anxiety Disorders",
    quote:
      "Learning grounding techniques helped me manage panic attacks when they felt overwhelming. I finally felt like I had tools.",
  },
  {
    name: "Emily L.",
    initials: "EL",
    journey: "Youth & Student Mental Health",
    quote:
      "Balancing school and expectations felt impossible. These resources helped me feel understood and less alone.",
  },
  {
    name: "Jorge P.",
    initials: "JP",
    journey: "Depression",
    quote:
      "I didn’t realize how much depression was affecting my daily life until I started reading about it here.",
  },
  {
    name: "Priya S.",
    initials: "PS",
    journey: "Trauma & PTSD",
    quote:
      "Understanding trauma responses helped me stop blaming myself and start focusing on healing.",
  },
  {
    name: "Kevin W.",
    initials: "KW",
    journey: "Stress & Burnout",
    quote:
      "I was constantly exhausted and disconnected. Learning about burnout helped me make changes before things got worse.",
  },
  {
    name: "Hannah B.",
    initials: "HB",
    journey: "Anxiety Disorders",
    quote:
      "Social anxiety controlled my life for years. Seeing others share similar experiences gave me hope.",
  },
  {
    name: "Noah C.",
    initials: "NC",
    journey: "Youth & Student Mental Health",
    quote:
      "Academic pressure made me feel like I was failing. These resources reminded me that my mental health matters.",
  },
  {
    name: "Fatima A.",
    initials: "FA",
    journey: "Trauma & PTSD",
    quote:
      "Learning about trauma helped me understand my reactions instead of feeling broken.",
  },
  {
    name: "Lucas D.",
    initials: "LD",
    journey: "Depression",
    quote:
      "Small steps felt impossible at first, but reading recovery stories showed me progress doesn’t have to be linear.",
  },
  {
    name: "Olivia N.",
    initials: "ON",
    journey: "Stress & Burnout",
    quote:
      "I thought feeling drained was normal. These articles helped me realize I needed to slow down and ask for help.",
  },
  {
    name: "Ryan S.",
    initials: "RS",
    journey: "Anxiety Disorders",
    quote:
      "Having access to clear explanations and coping strategies made anxiety feel more manageable.",
  },
  {
    name: "Zara H.",
    initials: "ZH",
    journey: "Youth & Student Mental Health",
    quote:
      "Seeing mental health talked about openly helped me feel safe reaching out for support.",
  },
];


/* =========================
   CRISIS HELPLINES
   ========================= */
export const crisisHelplines = [
  {
    number: "988",
    name: "Suicide & Crisis Lifeline (US)",
    description: "Call or text 988 for 24/7 confidential support",
  },
  {
    number: "741741",
    name: "Crisis Text Line (US & Canada)",
    description: "Text HOME to connect with a trained crisis counselor",
  },
  {
    number: "116 123",
    name: "Samaritans (UK & ROI)",
    description: "Free, confidential emotional support",
  },
  {
    number: "13 11 14",
    name: "Lifeline (Australia)",
    description: "24/7 crisis support and suicide prevention",
  },
];

/* =========================
   COMMUNITY FEATURES
   ========================= */
export const communityFeatures = [
  {
    title: "Discussion Forums",
    description:
      "Topic-based forums for anxiety, depression, stress, and general mental wellbeing.",
  },
  {
    title: "Live Group Chats",
    description:
      "Scheduled, moderated chat rooms focused on shared experiences and coping strategies.",
  },
  {
    title: "Peer Support Groups",
    description:
      "Small, supportive groups where members encourage and learn from each other.",
  },
];
