"use server";

import { geminiTask } from "@/trigger/gemini";
import { cropTask } from "@/trigger/crop";
import { extractFrameTask } from "@/trigger/extractFrame";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function triggerLLM(payload: any) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const run = await geminiTask.trigger(payload);
  return run.id;
}

export async function triggerCrop(payload: any) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const run = await cropTask.trigger(payload);
  return run.id;
}

export async function triggerExtractFrame(payload: any) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const run = await extractFrameTask.trigger(payload);
  return run.id;
}

// Polling or Webhook to get result? For simplicity 3s timeout for now or poll
export async function getTaskResult(runId: string) {
  // Use Trigger.dev runs.retrieve or similar
  // return runs.retrieve(runId)
  return { status: "COMPLETED", output: "Mocked output from server action" };
}

export async function saveWorkflow(name: string, nodes: any[], edges: any[]) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return await prisma.workflow.upsert({
    where: { id: "current-workspace" }, // Simplified for demo
    create: {
      id: "current-workspace",
      name,
      userId,
      nodes: JSON.stringify(nodes),
      edges: JSON.stringify(edges),
    },
    update: {
      name,
      nodes: JSON.stringify(nodes),
      edges: JSON.stringify(edges),
    },
  });
}
