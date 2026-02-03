"use client";

import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock } from "lucide-react";

function getReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default function BlogReader({ blog }) {
  const readingTime = getReadingTime(blog.content);

  return (
    <div className="relative min-h-screen bg-background pt-28 pb-24 px-4">
      <div className="mx-auto max-w-3xl">
        {/* Back */}
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        {/* Header */}
        <header className="space-y-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            {blog.title}
          </h1>

          <p className="text-muted-foreground text-lg">
            {blog.excerpt}
          </p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString()}
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {readingTime} min read
            </div>

            <div>
              <span className="font-medium text-foreground">
                {blog.author.name}
              </span>{" "}
              · {blog.author.specialty}
            </div>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-border mb-10" />

        {/* Content */}
        <article
          className="
            prose prose-neutral dark:prose-invert
            max-w-none
            prose-headings:font-extrabold
            prose-p:leading-relaxed
            prose-li:leading-relaxed
          "
        >
          {blog.content.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </article>
      </div>
    </div>
  );
}
