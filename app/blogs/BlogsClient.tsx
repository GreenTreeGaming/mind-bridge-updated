"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  UserCheck,
  CalendarDays,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* Animations */
const fadeInUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.08 },
  },
};

export default function BlogsClient({ blogs }) {
  return (
    <div className="relative min-h-screen bg-background pt-32 pb-24 px-4">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 15% 20%, rgba(16,185,129,0.18) 0, transparent 55%), radial-gradient(circle at 85% 80%, rgba(45,212,191,0.18) 0, transparent 55%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerContainer}
          className="text-center mb-14 space-y-6"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold"
          >
            Mental Health{" "}
            <span className="text-primary">Insights & Articles</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Thoughtful, evidence-informed articles written by licensed mental
            health professionals.
          </motion.p>
        </motion.div>

        {/* Trust note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-16"
        >
          <Card className="bg-card/70 backdrop-blur-md rounded-3xl">
            <CardContent className="p-6 md:p-8 flex gap-4 items-start">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                <UserCheck className="w-7 h-7 text-primary" />
              </div>
              <div>
                <p className="font-semibold">
                  Written by trained professionals
                </p>
                <p className="text-sm text-muted-foreground">
                  Educational content only — not a substitute for care.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Blogs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {blogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <Card className="rounded-3xl border hover:border-primary/30 transition">
                <CardHeader className="p-7">
                  <CardTitle className="text-2xl font-bold">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="px-7 pb-7 space-y-4">
                  <p className="text-muted-foreground">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>

                  <p className="text-sm">
                    <span className="font-semibold">
                      {blog.author.name}
                    </span>{" "}
                    · {blog.author.specialty}
                  </p>

                  <Button asChild variant="outline" size="sm">
                    <Link href={`/blogs/${blog.id}`}>
                      Read Article
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
