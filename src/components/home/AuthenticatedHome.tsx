"use client";

import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";
import React from "react";
import { Bot, Sparkles, Wand2 } from "lucide-react";
import { saveWorkflow } from "@/app/actions/workflow";
import { Canvas } from "@/components/workflow/Canvas";
import { History } from "@/components/workflow/History";
import { Sidebar } from "@/components/workflow/Sidebar";
import { useWorkflowStore } from "@/store/useWorkflowStore";

export function AuthenticatedHome() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f3eee5]">
        <div className="size-12 animate-spin rounded-full border-4 border-[#5260f4] border-t-transparent" />
      </div>
    );
  }

  return (
    <main className="flex h-screen w-full flex-col overflow-hidden bg-[#f3eee5] font-sans selection:bg-[#5260f4]/10 selection:text-[#5260f4]">
      <header className="z-50 flex h-20 w-full shrink-0 items-center justify-between border-b border-black/[0.03] bg-white/80 px-8 backdrop-blur-xl">
        <div className="flex items-center gap-10">
          <div className="group flex cursor-pointer items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-[18px] bg-[#1d1d1b] text-white shadow-[0_8px_20px_rgba(29,29,27,0.2)] transition-transform group-hover:scale-105 group-hover:rotate-3">
              <Bot className="size-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-[#1d1d1b]">NextFlow</h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#5260f4]/60">
                AI Orchestrator
              </p>
            </div>
          </div>

          <nav className="flex items-center gap-1 overflow-hidden rounded-2xl border border-black/[0.03] bg-black/[0.02] p-1">
            <button className="flex items-center gap-2 rounded-xl border border-black/[0.01] bg-white px-5 py-2.5 text-sm font-bold text-black shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              <Sparkles className="size-4 text-[#5260f4]" />
              Build
            </button>
            <button className="flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-black/40 transition-all hover:bg-white/50 hover:text-black/60">
              <Wand2 className="size-4" />
              Templates
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          {!isSignedIn ? (
            <SignInButton mode="modal">
              <button className="rounded-full bg-[#5260f4] px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#4453d6] shadow-[0_8px_25px_rgba(82,96,244,0.3)] hover:scale-[0.98] active:scale-[0.95]">
                Sign In
              </button>
            </SignInButton>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={() => useWorkflowStore.getState().loadSampleWorkflow()}
                className="rounded-full border border-[#5260f4]/20 bg-[#5260f4]/10 px-6 py-2.5 text-sm font-bold text-[#5260f4] shadow-sm transition-colors hover:bg-[#5260f4]/20"
              >
                Load Sample
              </button>
              <button
                onClick={() => useWorkflowStore.getState().executeWorkflow()}
                className="rounded-full bg-[#5260f4] px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#4453d6] shadow-[0_8px_25px_rgba(82,96,244,0.3)] active:scale-95"
              >
                Run Workflow
              </button>
              <button
                onClick={() => {
                  const { nodes, edges } = useWorkflowStore.getState();
                  saveWorkflow("My Workflow", nodes, edges);
                }}
                className="rounded-full border border-black/8 bg-white px-6 py-2.5 text-sm font-bold text-black/70 shadow-sm transition-colors hover:bg-black/5"
              >
                Save Workflow
              </button>
              <button className="rounded-full border border-black/8 bg-white px-6 py-2.5 text-sm font-bold text-black/70 shadow-sm transition-colors hover:bg-black/5">
                Export JSON
              </button>
              <div className="mx-2 h-10 w-px bg-black/5" />
              <UserButton afterSignOutUrl="/" />
            </div>
          )}
        </div>
      </header>

      <div className="relative flex flex-1 overflow-hidden">
        {isSignedIn ? (
          <>
            <Sidebar />
            <div className="relative flex-1 bg-[#fbf8f2]/40">
              <Canvas />
            </div>
            <History />
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-8 bg-[radial-gradient(circle_at_top,#f8f8f3_0%,#f4f1ea_35%,#ece7de_100%)] px-4 text-center">
            <div className="relative">
              <div className="absolute -inset-10 animate-pulse rounded-full bg-[#5260f4]/5 blur-3xl" />
              <div className="relative flex size-24 items-center justify-center rounded-[32px] bg-[#1d1d1b] text-white shadow-2xl">
                <Bot className="size-12" />
              </div>
            </div>
            <div className="max-w-2xl space-y-6">
              <h2 className="text-6xl leading-[1.1] font-black tracking-tight text-[#1d1d1b]">
                Build beautiful <span className="text-[#5260f4]">AI workflows</span>.
              </h2>
              <p className="mx-auto max-w-lg text-xl font-medium leading-relaxed text-black/40">
                Connect LLMs, media processing tools, and custom logic on an infinite,
                pixel-accurate canvas.
              </p>
            </div>
            <SignInButton mode="modal">
              <button className="group relative flex items-center gap-4 rounded-full bg-[#5260f4] px-12 py-6 text-xl font-bold text-white shadow-[0_20px_50px_rgba(82,96,244,0.3)] transition-all hover:scale-105 active:scale-95">
                Get Started Free
                <Sparkles className="size-6 transition-transform group-hover:rotate-12" />
                <div className="absolute inset-x-0 -bottom-1 h-px bg-white/20 blur-sm" />
              </button>
            </SignInButton>
          </div>
        )}
      </div>
    </main>
  );
}
