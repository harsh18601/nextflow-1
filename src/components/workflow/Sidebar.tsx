"use client";

import React from "react";
import { 
  Bot, 
  Crop, 
  FileVideo, 
  ImageUp, 
  Layers3, 
  MoveRight, 
  TextCursorInput, 
  Wand2 
} from "lucide-react";
import { useWorkflowStore, NodeType } from "@/store/useWorkflowStore";

const nodeButtons = [
  { id: "text", label: "Text Node", icon: TextCursorInput },
  { id: "imageUpload", label: "Upload Image Node", icon: ImageUp },
  { id: "videoUpload", label: "Upload Video Node", icon: FileVideo },
  { id: "llm", label: "Run Any LLM Node", icon: Bot },
  { id: "crop", label: "Crop Image Node", icon: Crop },
  { id: "extractFrame", label: "Extract Frame from Video Node", icon: Wand2 },
];

export const Sidebar: React.FC = () => {
  const { addNode } = useWorkflowStore();

  return (
    <aside className="hidden w-[292px] shrink-0 rounded-[28px] border border-black/8 bg-[#f7f3eb]/90 p-5 shadow-[0_24px_80px_rgba(38,30,18,0.08)] backdrop-blur xl:flex xl:flex-col">
      <div className="flex items-center gap-3 rounded-[22px] bg-white/80 px-4 py-3 shadow-sm border border-black/5">
        <div className="flex size-10 items-center justify-center rounded-2xl bg-[#1d1d1b] text-white">
          <Layers3 className="size-5" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-black/45">
            Interview Build
          </p>
          <h1 className="text-lg font-semibold">NextFlow</h1>
        </div>
      </div>

      <section className="mt-6 flex-1 overflow-y-auto pr-1">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-black/45 px-1">
          Quick Access
        </p>
        <div className="mt-4 grid gap-3">
          {nodeButtons.map((node) => (
            <button
              key={node.id}
              onClick={() => addNode(node.id as NodeType)}
              className="flex items-center justify-between rounded-[20px] border border-black/8 bg-white px-4 py-4 text-left group transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(38,30,18,0.06)] hover:border-[#5260f4]/20"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-[12px] bg-[#f5f1e8] text-black/45 group-hover:bg-[#5260f4]/10 group-hover:text-[#5260f4] transition-colors">
                  <node.icon className="size-4" />
                </div>
                <span className="text-sm font-semibold text-black/70 group-hover:text-black/90">
                  {node.label}
                </span>
              </div>
              <MoveRight className="size-4 text-black/20 group-hover:text-[#5260f4] group-hover:translate-x-1 transition-all" />
            </button>
          ))}
        </div>
      </section>
      <section className="mt-6 pt-6 border-t border-black/5">
        <div className="rounded-[24px] border border-[#d8d0c3] bg-[#fffdf9]/50 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-black/30">
            System Status
          </p>
          <div className="mt-3 flex items-center gap-2">
            <div className="size-2 rounded-full bg-[#2eaa81] animate-pulse" />
            <span className="text-xs font-semibold text-black/60">Ready to build</span>
          </div>
        </div>
      </section>
    </aside>
  );
};

