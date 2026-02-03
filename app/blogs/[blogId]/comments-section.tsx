"use client";

import { useEffect, useState } from "react";
import {
    createComment,
    getBlogComments,
    updateComment,
    deleteComment,
} from "@/actions/comments";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

import { timeAgo } from "@/lib/formatTime";

type Comment = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    author: {
        id: string;
        clerkUserId: string; // ✅ ADD THIS
        name: string | null;
        imageUrl: string | null;
        role: string;
    };
};

export function CommentsSection({ blogId }: { blogId: string }) {
    const [comments, setComments] = useState<Comment[]>([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useUser();

    const [editingId, setEditingId] = useState<string | null>(null);
    const [editingContent, setEditingContent] = useState("");

    async function loadComments() {
        const data = await getBlogComments(blogId);
        setComments(data);
    }

    useEffect(() => {
        loadComments();
    }, [blogId]);

    async function submit() {
        setLoading(true);

        const res = await createComment(blogId, content);

        setLoading(false);

        if (!res.success) {
            toast.error(res.error);
            return;
        }

        setContent("");
        setComments((prev) => [...prev, res.comment]);
    }

    return (
        <section className="mt-20 space-y-6">
            <h3 className="text-2xl font-extrabold text-foreground">
                Discussion
            </h3>

            {/* Comment form */}
            <div className="space-y-3">
                <Textarea
                    placeholder="Share your thoughts respectfully…"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <Button onClick={submit} disabled={loading}>
                    Post Comment
                </Button>
            </div>

            {/* Comment list */}
            <div className="space-y-6">
                {comments.length === 0 && (
                    <p className="text-sm text-muted-foreground">
                        No comments yet. Be the first to contribute.
                    </p>
                )}

                {comments.map((c) => {
                    const isOwner = user?.id === c.author.clerkUserId;

                    return (
                        <div key={c.id} className="flex gap-4">
                            <img
                                src={c.author.imageUrl || "/avatar.png"}
                                alt=""
                                className="w-10 h-10 rounded-full"
                            />

                            <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="font-medium text-foreground">
                                        {c.author.name || "Anonymous"}
                                    </p>

                                    <span className="text-xs text-muted-foreground">
                                        • {timeAgo(c.createdAt)}
                                    </span>

                                    {c.updatedAt !== c.createdAt && (
                                        <span className="text-xs text-muted-foreground">
                                            (edited)
                                        </span>
                                    )}
                                </div>



                                {/* ✅ Edit/Delete ONLY for your own comments */}
                                {isOwner && (
                                    <div className="flex gap-3 text-xs text-muted-foreground">
                                        <button
                                            onClick={() => {
                                                setEditingId(c.id);
                                                setEditingContent(c.content);
                                            }}
                                            className="hover:text-foreground"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={async () => {
                                                const res = await deleteComment(c.id);
                                                if (!res.success) {
                                                    toast.error(res.error);
                                                    return;
                                                }

                                                setComments((prev) =>
                                                    prev.filter((x) => x.id !== c.id)
                                                );
                                            }}
                                            className="hover:text-red-500"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}

                                {/* Content / Edit mode */}
                                {editingId === c.id ? (
                                    <div className="space-y-2">
                                        <Textarea
                                            value={editingContent}
                                            onChange={(e) =>
                                                setEditingContent(e.target.value)
                                            }
                                        />

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                onClick={async () => {
                                                    const res = await updateComment(
                                                        c.id,
                                                        editingContent
                                                    );
                                                    if (!res.success) {
                                                        toast.error(res.error);
                                                        return;
                                                    }

                                                    setComments((prev) =>
                                                        prev.map((x) =>
                                                            x.id === c.id
                                                                ? { ...x, content: editingContent }
                                                                : x
                                                        )
                                                    );

                                                    setEditingId(null);
                                                }}
                                            >
                                                Save
                                            </Button>

                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">
                                        {c.content}
                                    </p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
