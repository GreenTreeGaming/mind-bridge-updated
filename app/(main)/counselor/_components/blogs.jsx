"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, PlusCircle, Edit3 } from "lucide-react";

import { getDoctorBlogs } from "@/actions/blogs";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      const res = await getDoctorBlogs();
      if (res?.success) {
        setBlogs(res.blogs);
      }
      setLoading(false);
    }

    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="py-16 text-center text-sm text-muted-foreground">
        Loading your blogs…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-foreground">
            Your Blogs
          </h2>
          <p className="text-sm text-muted-foreground">
            Write and manage articles that help educate and support patients.
          </p>
        </div>

        <Button asChild className="rounded-xl">
          <Link href="/blogs/new">
            <PlusCircle className="h-4 w-4 mr-2" />
            Create Blog
          </Link>
        </Button>
      </div>

      {/* Blogs List */}
      {blogs.length > 0 ? (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <Card
              key={blog.id}
              className="rounded-2xl border border-border bg-card"
            >
              <CardContent className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-foreground">
                      {blog.title}
                    </p>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>

                      <span
                        className={
                          blog.published
                            ? "text-emerald-600 font-medium"
                            : "text-yellow-600 font-medium"
                        }
                      >
                        {blog.published ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                >
                  <Link href={`/blogs/${blog.id}/edit`}>
                    <Edit3 className="h-4 w-4 mr-2" />
                    Edit
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Empty state */
        <Card className="rounded-3xl border border-border bg-card">
          <CardContent className="p-10 text-center space-y-4">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-primary/10 border border-primary/15 flex items-center justify-center">
              <BookOpen className="h-7 w-7 text-primary" />
            </div>

            <h3 className="text-lg font-semibold text-foreground">
              No blogs yet
            </h3>

            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Share your expertise by writing your first article. Blogs help
              patients learn, reduce stigma, and build trust.
            </p>

            <Button asChild className="rounded-xl">
              <Link href="/blogs/new">
                <PlusCircle className="h-4 w-4 mr-2" />
                Write Your First Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
