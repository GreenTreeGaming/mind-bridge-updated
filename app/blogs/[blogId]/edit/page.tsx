"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, BookOpen } from "lucide-react";
import { toast } from "sonner";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { getBlogForEdit, updateBlog } from "@/actions/blogs";

export default function EditBlogPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const blogId = params.id;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    published: false,
  });

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    async function loadBlog() {
      const res = await getBlogForEdit(blogId);
      if (!res.success) {
        router.replace("/counselor");
        return;
      }

      setForm(res.blog);
      setLoading(false);
    }

    loadBlog();
  }, [blogId, router]);

  async function handleSave(publish: boolean) {
    setSaving(true);

    const res = await updateBlog(blogId, {
      ...form,
      published: publish,
    });

    setSaving(false);

    if (!res.success) {
      toast.error(res.error || "Failed to update blog");
      return;
    }

    toast.success(publish ? "Blog updated & published" : "Draft updated");
    router.push("/counselor");
  }

  if (loading) {
    return (
      <div className="py-20 text-center text-sm text-muted-foreground">
        Loading blog…
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] flex justify-center px-4 pt-28 pb-20">
      <div className="w-full max-w-3xl space-y-8">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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

          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={saving}
              onClick={() => handleSave(false)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>

            <Button
              disabled={saving}
              onClick={() => handleSave(true)}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <BookOpen className="h-4 w-4 mr-2" />
              Publish
            </Button>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold text-foreground">
            Edit Blog
          </h1>
          <p className="text-muted-foreground">
            Update your article before publishing or sharing.
          </p>
        </div>

        {/* Editor */}
        <Card className="rounded-3xl border border-border bg-card shadow-sm">
          <CardContent className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Short Summary</label>
              <Textarea
                rows={3}
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                rows={14}
                value={form.content}
                onChange={(e) => update("content", e.target.value)}
                className="leading-relaxed"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
