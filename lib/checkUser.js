import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  let clerkUser;

  // 🛡️ Prevent Clerk middleware edge crashes
  try {
    clerkUser = await currentUser();
  } catch {
    return null;
  }

  if (!clerkUser) return null;

  // 1️⃣ Try lookup by clerkUserId
  let user = await db.user.findUnique({
    where: { clerkUserId: clerkUser.id },
  });

  if (user) return user;

  // 2️⃣ Fallback: lookup by email
  const email = clerkUser.emailAddresses[0]?.emailAddress;

  if (email) {
    user = await db.user.findUnique({
      where: { email },
    });

    if (user) {
      // 🔁 Backfill clerkUserId to claim existing account
      return await db.user.update({
        where: { email },
        data: { clerkUserId: clerkUser.id },
      });
    }
  }

  // 3️⃣ Create new user (safe)
  return await db.user.create({
    data: {
      clerkUserId: clerkUser.id,
      email,
      name: `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim(),
      imageUrl: clerkUser.imageUrl ?? "",
      role: "UNASSIGNED",
    },
  });
};
