"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createBlog } from "@/actions/blogs";
import { toast } from "sonner";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";

export default function NewBlogPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    published: false,
  });

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(publish = false) {
    setLoading(true);

    const res = await createBlog({
      ...form,
      published: publish,
    });

    setLoading(false);

    if (!res.success) {
      toast.error(res.error || "Failed to save blog");
      return;
    }

    toast.success(
      publish ? "Blog published!" : "Draft saved successfully"
    );

    router.push("/counselor");
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center px-4 pt-28 pb-20">
      <div className="w-full max-w-3xl space-y-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Back + title */}
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <Link href="/counselor">
                <ArrowLeft className="h-4 w-4" />
                Back to Blogs
              </Link>
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={loading}
              onClick={() => handleSubmit(false)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>

            <Button
              disabled={loading}
              onClick={() => handleSubmit(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Title block */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-foreground">
            Create New Blog
          </h1>
          <p className="text-muted-foreground">
            Write a thoughtful, educational article for patients and the public.
          </p>
        </div>

        {/* Editor card */}
        <Card className="rounded-3xl border border-border bg-card shadow-sm">
          <CardContent className="p-8 space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Title
              </label>
              <Input
                placeholder="e.g. Understanding Anxiety and How Therapy Helps"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Short Summary
              </label>
              <Textarea
                rows={3}
                placeholder="Brief overview shown on the blogs page..."
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Content
              </label>
              <Textarea
                rows={14}
                placeholder="Write your article here. Use clear, supportive language."
                value={form.content}
                onChange={(e) => update("content", e.target.value)}
                className="leading-relaxed"
              />
              <p className="text-xs text-muted-foreground">
                Tip: Write in a calm, non-diagnostic tone. This content is educational.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
