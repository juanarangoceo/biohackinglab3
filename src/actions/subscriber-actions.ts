"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { subscribers } from "@/db/schema";
import { insertSubscriberSchema } from "@/lib/validations";
import { type NewSubscriber } from "@/lib/validations"; // Ensure this is exported in validations.ts
import { eq } from "drizzle-orm";

export type ActionResponse<T = any> = {
  success: boolean;
  error?: string;
  data?: T;
};

export async function subscribeUser(data: NewSubscriber): Promise<ActionResponse> {
  try {
    console.log("📝 Attempting subscription for:", data.email);
    // 1. Validation
    const validatedFields = insertSubscriberSchema.safeParse(data);

    if (!validatedFields.success) {
      return {
        success: false,
        error: "Invalid input fields: " + validatedFields.error.flatten().fieldErrors,
      };
    }

    const { email, tags, source } = validatedFields.data;

    // 2. Auth Check
    // Note: Subscription is a public action, so no user auth required.
    // For protected actions, we would check session here.

    // 3. DB Operation
    // Check for existing
    const existingUser = await db.select().from(subscribers).where(eq(subscribers.email, email));
    
    if (existingUser.length > 0) {
        // Idempotent success or error depending on UX requirement. 
        // For privacy, often better to say "Success" or "Already Registered" without generic error.
        return { success: true, data: { message: "Already subscribed" } }; 
    }

    await db.insert(subscribers).values({
      email,
      tags: tags || ["newsletter"],
      source: source || "website",
      status: "active"
    });

    // 4. Revalidate
    revalidatePath("/");

    return { success: true, data: { message: "Successfully subscribed" } };
  } catch (error) {
    console.error("Subscription Error:", error);
    return {
      success: false,
      error: "Failed to subscribe. Please try again later.",
    };
  }
}
