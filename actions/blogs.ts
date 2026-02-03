"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

/* ======================================================
   CREATE BLOG (doctor-only)
====================================================== */
export async function createBlog(data: {
  title: string;
  excerpt: string;
  content: string;
  published: boolean;
}) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const doctor = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, role: true },
    });

    if (!doctor || doctor.role !== "DOCTOR") {
      return {
        success: false,
        error: "Only counselors can create blogs",
      };
    }

    if (!data.title || !data.content) {
      return {
        success: false,
        error: "Title and content are required",
      };
    }

    const blog = await db.blog.create({
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        published: data.published,
        authorId: doctor.id,
      },
    });

    return { success: true, blog };
  } catch (error) {
    console.error("createBlog error:", error);
    return { success: false, error: "Failed to create blog" };
  }
}

/* ======================================================
   GET BLOGS FOR DOCTOR DASHBOARD
====================================================== */
export async function getDoctorBlogs() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, blogs: [] };
    }

    const doctor = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, role: true },
    });

    if (!doctor || doctor.role !== "DOCTOR") {
      return { success: false, blogs: [] };
    }

    const blogs = await db.blog.findMany({
      where: { authorId: doctor.id },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        published: true,
        createdAt: true,
      },
    });

    return { success: true, blogs };
  } catch (error) {
    console.error("getDoctorBlogs error:", error);
    return { success: false, blogs: [] };
  }
}

/* ======================================================
   GET BLOG FOR EDIT PAGE
====================================================== */
export async function getBlogForEdit(blogId: string) {
  try {
    const { userId } = await auth();
    if (!userId) return { success: false };

    const doctor = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, role: true },
    });

    if (!doctor || doctor.role !== "DOCTOR") {
      return { success: false };
    }

    const blog = await db.blog.findFirst({
      where: {
        id: blogId,
        authorId: doctor.id,
      },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        published: true,
      },
    });

    if (!blog) return { success: false };

    return { success: true, blog };
  } catch (error) {
    console.error("getBlogForEdit error:", error);
    return { success: false };
  }
}

/* ======================================================
   UPDATE BLOG
====================================================== */
export async function updateBlog(
  blogId: string,
  data: {
    title: string;
    excerpt: string;
    content: string;
    published: boolean;
  }
) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: "Unauthorized" };
    }

    const doctor = await db.user.findUnique({
      where: { clerkUserId: userId },
      select: { id: true, role: true },
    });

    if (!doctor || doctor.role !== "DOCTOR") {
      return { success: false, error: "Not authorized" };
    }

    const updated = await db.blog.updateMany({
      where: {
        id: blogId,
        authorId: doctor.id,
      },
      data: {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        published: data.published,
      },
    });

    if (updated.count === 0) {
      return { success: false, error: "Blog not found" };
    }

    return { success: true };
  } catch (error) {
    console.error("updateBlog error:", error);
    return { success: false, error: "Failed to update blog" };
  }
}

/* ======================================================
   PUBLIC BLOG LIST (BLOGS PAGE)
====================================================== */
export async function getPublicBlogs() {
  try {
    return await db.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        title: true,
        excerpt: true,
        createdAt: true,
        author: {
          select: {
            name: true,
            specialty: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("getPublicBlogs error:", error);
    return [];
  }
}

/* ======================================================
   GET SINGLE BLOG (PUBLIC READER PAGE)
====================================================== */
export async function getBlogById(blogId: string) {
  try {
    return await db.blog.findUnique({
      where: { id: blogId },
      include: {
        author: {
          select: {
            name: true,
            specialty: true,
            imageUrl: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("getBlogById error:", error);
    return null;
  }
}
