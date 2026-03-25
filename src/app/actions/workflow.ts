"use server";

import { auth } from "@clerk/nextjs/server";
import type { Edge, Node } from "@xyflow/react";
import { prisma } from "@/lib/prisma";
import { cropTask } from "@/trigger/crop";
import { extractFrameTask } from "@/trigger/extractFrame";
import { geminiTask } from "@/trigger/gemini";

interface TriggerTaskRun {
  id: string;
}

async function requireUser() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

export async function triggerLLM(payload: Parameters<typeof geminiTask.trigger>[0]) {
  await requireUser();
  const run = (await geminiTask.trigger(payload)) as TriggerTaskRun;
  return run.id;
}

export async function triggerCrop(payload: Parameters<typeof cropTask.trigger>[0]) {
  await requireUser();
  const run = (await cropTask.trigger(payload)) as TriggerTaskRun;
  return run.id;
}

export async function triggerExtractFrame(
  payload: Parameters<typeof extractFrameTask.trigger>[0]
) {
  await requireUser();
  const run = (await extractFrameTask.trigger(payload)) as TriggerTaskRun;
  return run.id;
}

export async function saveWorkflow(name: string, nodes: Node[], edges: Edge[]) {
  const userId = await requireUser();

  return prisma.workflow.upsert({
    where: { id: "current-workspace" },
    create: {
      id: "current-workspace",
      name,
      userId,
      definition: { nodes, edges },
    },
    update: {
      name,
      definition: { nodes, edges },
    },
  });
}
