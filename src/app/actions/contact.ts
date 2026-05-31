"use server";

import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "@/sanity/env";

const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

export async function submitContact(_: unknown, formData: FormData) {
  const name    = (formData.get("name")    as string | null)?.trim() ?? "";
  const email   = (formData.get("email")   as string | null)?.trim() ?? "";
  const message = (formData.get("message") as string | null)?.trim() ?? "";

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return { success: false, error: "Please enter a valid email address." };
  }

  try {
    await writeClient.create({
      _type: "contactSubmission",
      name,
      email,
      message,
      submittedAt: new Date().toISOString(),
    });
    return { success: true, error: null };
  } catch (err) {
    console.error("Contact form submission failed:", err);
    return { success: false, error: "Failed to send your message. Please try again." };
  }
}
