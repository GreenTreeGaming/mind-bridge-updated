import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogById } from "@/actions/blogs";
import { Clock, User, ArrowLeft } from "lucide-react";
import { CommentsSection } from "./comments-section";

/* ---------------------------------------
   Helper: reading time (200 wpm)
--------------------------------------- */
function getReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  // ✅ Required for App Router
  const { blogId } = await params;

  const blog = await getBlogById(blogId);

  if (!blog || !blog.published) {
    notFound();
  }

  const readingTime = getReadingTime(blog.content);

  return (
    <article className="relative min-h-screen bg-background pt-28 pb-24 px-4">
      <div className="mx-auto max-w-3xl space-y-10">
        {/* Back Button */}
        <Link
          href="/blogs"
          className="
            inline-flex items-center gap-2
            text-sm font-medium
            text-muted-foreground
            hover:text-foreground
            transition
          "
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        {/* Title + Meta */}
        <header className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {/* Author */}
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">
                {blog.author.name}
              </span>
              {blog.author.specialty && (
                <span>· {blog.author.specialty}</span>
              )}
            </div>

            {/* Reading time */}
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>

            {/* Date */}
            <span>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </header>

        {/* Divider */}
        <div className="h-px bg-border" />

        {/* Content */}
        <section className="prose prose-neutral dark:prose-invert max-w-none">
          {blog.content.split("\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </section>

        <CommentsSection blogId={blogId} />
      </div>
    </article>
  );
}
