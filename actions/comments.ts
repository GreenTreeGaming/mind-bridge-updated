"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

/* ---------------------------------------
   Fetch comments for a blog
--------------------------------------- */
export async function getBlogComments(blogId: string) {
    const comments = await db.blogComment.findMany({
        where: { blogId },
        orderBy: { createdAt: "asc" },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            author: {
                select: {
                    id: true,
                    clerkUserId: true, // ✅ REQUIRED
                    name: true,
                    imageUrl: true,
                    role: true,
                },
            },
        },
    });

    return comments;
}

/* ---------------------------------------
   Create a comment
--------------------------------------- */
export async function createComment(
    blogId: string,
    content: string
) {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, error: "You must be logged in" };
    }

    if (!content.trim()) {
        return { success: false, error: "Comment cannot be empty" };
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        select: { id: true },
    });

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const comment = await db.blogComment.create({
        data: {
            blogId,
            authorId: user.id,
            content,
        },
        select: {
            id: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            author: {
                select: {
                    id: true,
                    clerkUserId: true, // ✅ THIS WAS MISSING
                    name: true,
                    imageUrl: true,
                    role: true,
                },
            },
        },
    });


    return { success: true, comment };
}

export async function updateComment(
    commentId: string,
    content: string
) {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, error: "Unauthorized" };
    }

    if (!content.trim()) {
        return { success: false, error: "Comment cannot be empty" };
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        select: { id: true },
    });

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const updated = await db.blogComment.updateMany({
        where: {
            id: commentId,
            authorId: user.id,
        },
        data: {
            content,
        },
    });

    if (updated.count === 0) {
        return { success: false, error: "Not allowed" };
    }

    return { success: true };
}

/* ---------------------------------------
   Delete a comment (author only)
--------------------------------------- */
export async function deleteComment(commentId: string) {
    const { userId } = await auth();
    if (!userId) {
        return { success: false, error: "Unauthorized" };
    }

    const user = await db.user.findUnique({
        where: { clerkUserId: userId },
        select: { id: true },
    });

    if (!user) {
        return { success: false, error: "User not found" };
    }

    const deleted = await db.blogComment.deleteMany({
        where: {
            id: commentId,
            authorId: user.id,
        },
    });

    if (deleted.count === 0) {
        return { success: false, error: "Not allowed" };
    }

    return { success: true };
}