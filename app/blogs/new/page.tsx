import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/prisma";
import NewBlogClient from "./NewBlogClient";

export default async function NewBlogPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { role: true },
  });

  if (!user || user.role !== "DOCTOR") {
    redirect("/blogs");
  }

  return <NewBlogClient />;
}
