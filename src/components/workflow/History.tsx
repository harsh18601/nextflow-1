"use client";

import React from "react";
import { Clock3, CheckCircle2, XCircle, AlertCircle, Layers3 } from "lucide-react";
import { clsx } from "clsx";

interface HistoryItem {
  id: string;
  title: string;
  timestamp: string;
  status: "success" | "failed" | "partial";
  duration: string;
  scope: "full" | "selected" | "single";
  details?: { node: string; status: string; duration: string; output?: string; error?: string }[];
}

const mockHistory: HistoryItem[] = [
  {
    id: "run-125",
    title: "Run #125",
    timestamp: "Jan 14, 2026 4:30 PM",
    status: "success",
    duration: "2.8s",
    scope: "single",
    details: [
      { node: "LLM Node (node-4)", status: "success", duration: "2.8s", output: "Quick test response..." }
    ]
  },
  {
    id: "run-124",
    title: "Run #124",
    timestamp: "Jan 14, 2026 4:12 PM",
    status: "success",
    duration: "3.1s",
    scope: "selected",
    details: [
      { node: "Crop Image (node-3)", status: "success", duration: "1.5s", output: "https://cdn.transloadit.com/..." },
      { node: "LLM Node (node-4)", status: "success", duration: "3.1s", output: "Updated product copy..." }
    ]
  },
  {
    id: "run-123",
    title: "Run #123",
    timestamp: "Jan 14, 2026 3:45 PM",
    status: "partial",
    duration: "4.2s",
    scope: "full",
    details: [
      { node: "Text Node (node-1)", status: "success", duration: "0.1s", output: "Generate a product description..." },
      { node: "Image Node (node-2)", status: "success", duration: "2.3s", output: "https://cdn.transloadit.com/..." },
      { node: "Crop Image (node-3)", status: "success", duration: "1.8s", output: "https://cdn.transloadit.com/..." },
      { node: "LLM Node (node-4)", status: "success", duration: "4.2s", output: "Introducing our premium..." },
      { node: "Extract Frame (node-5)", status: "failed", duration: "0.5s", error: "Invalid timestamp parameter" }
    ]
  }
];

export const History: React.FC = () => {
  return (
    <aside className="w-[340px] shrink-0 flex flex-col gap-5 h-full overflow-hidden">
      <section className="flex-1 rounded-[28px] border border-black/8 bg-white/90 p-5 shadow-[0_18px_60px_rgba(38,30,18,0.08)] flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex size-11 items-center justify-center rounded-[18px] bg-[#fff3d2] text-[#9f6f00]">
            <Clock3 className="size-5" />
          </div>
          <div>
            <p className="text-lg font-semibold text-[#1d1d1b]">Workflow History</p>
            <p className="text-sm text-black/50">Execution logs and snapshots</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-hide">
          {mockHistory.map((item) => (
            <article
              key={item.id}
              className="group cursor-pointer rounded-[22px] border border-black/8 bg-[#fbf8f2] p-4 transition-all hover:bg-white hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold text-sm text-[#1d1d1b]">{item.title}</h3>
                  <p className="text-[10px] text-black/40 font-medium">{item.timestamp}</p>
                </div>
                <div className={clsx(
                  "flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
                  item.status === "success" && "bg-[#2eaa81]/10 text-[#2eaa81]",
                  item.status === "failed" && "bg-[#ea628b]/10 text-[#ea628b]",
                  item.status === "partial" && "bg-[#9f6f00]/10 text-[#9f6f00]"
                )}>
                  {item.status === "success" && <CheckCircle2 className="size-3" />}
                  {item.status === "failed" && <XCircle className="size-3" />}
                  {item.status === "partial" && <AlertCircle className="size-3" />}
                  {item.duration}
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-black/25">Scope: {item.scope}</span>
                <div className="flex-1 h-px bg-black/5" />
              </div>
              <div className="mt-3 space-y-2">
                {item.details?.slice(0, 1).map((detail, idx) => (
                  <div key={idx} className="flex flex-col gap-1 pl-2 border-l-2 border-black/5">
                    <p className="text-[11px] font-semibold text-black/60 truncate">{detail.node}</p>
                    <p className="text-[10px] text-black/40 truncate">{detail.output || detail.error}</p>
                  </div>
                ))}
                {(item.details?.length || 0) > 1 && (
                  <p className="text-[10px] font-bold text-[#5260f4]/60 pl-2">
                    + {(item.details?.length || 0) - 1} more nodes
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="rounded-[28px] border border-black/8 bg-[#f7f3eb] p-5 shadow-[0_18px_60px_rgba(38,30,18,0.08)]">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-[16px] bg-[#e9ecff] text-[#4b56de]">
            <Layers3 className="size-5" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1d1d1b]">Database Persistence</p>
            <p className="text-[11px] text-black/40">Syncing with Neon PostgreSQL</p>
          </div>
        </div>
      </section>
    </aside>
  );
};

