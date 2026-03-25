import React from "react";
import { Handle, Position } from "@xyflow/react";
import { useWorkflowStore } from "@/store/useWorkflowStore";
import { LucideIcon, Play } from "lucide-react";
import { clsx } from "clsx";

interface NodeWrapperProps {
  id: string;
  selected?: boolean;
  title: string;
  icon: LucideIcon;
  accentColor: string;
  status?: "idle" | "running" | "success" | "failed";
  children: React.ReactNode;
  inputs?: { id: string; label: string; type: string }[];
  outputs?: { id: string; label: string; type: string }[];
}

export const NodeWrapper: React.FC<NodeWrapperProps> = ({
  id,
  selected,
  title,
  icon: Icon,
  accentColor,
  status = "idle",
  children,
  inputs = [],
  outputs = [],
}) => {
  return (
    <div
      className={clsx(
        "min-w-[280px] rounded-[24px] border border-black/8 bg-white/95 p-4 shadow-[0_18px_40px_rgba(49,40,25,0.08)] backdrop-blur transition-all duration-300",
        selected && "ring-2 ring-[#5260f4] ring-offset-2",
        status === "running" && "animate-pulsate shadow-[0_0_20px_rgba(82,96,244,0.4)]"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "flex size-11 items-center justify-center rounded-[18px] text-white bg-gradient-to-br",
              accentColor
            )}
          >
            <Icon className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-[#1d1d1b]">{title}</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {status !== "idle" && (
            <span
              className={clsx(
                "rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider",
                status === "running" && "bg-[#5260f4]/10 text-[#5260f4]",
                status === "success" && "bg-[#2eaa81]/10 text-[#2eaa81]",
                status === "failed" && "bg-[#ea628b]/10 text-[#ea628b]"
              )}
            >
              {status}
            </span>
          )}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              useWorkflowStore.getState().executeNode(id);
            }}
            disabled={status === "running"}
            className="flex size-8 items-center justify-center rounded-full bg-[#5260f4] text-white shadow-lg transition hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <Play className="size-3.5 fill-current" />
          </button>
        </div>
      </div>

      {/* Inputs (Handles) */}
      <div className="flex flex-col gap-4 mb-4">
        {inputs.map((input, index) => (
          <div key={input.id} className="relative flex items-center justify-start h-8 px-2 group">
            <Handle
              type="target"
              position={Position.Left}
              id={input.id}
              className="!w-3 !h-3 !-left-6 !bg-[#5260f4] !border-2 !border-white shadow-sm"
              style={{ top: "50%" }}
            />
            <span className="text-xs font-medium text-black/50 group-hover:text-black/80 transition-colors">
              {input.label}
            </span>
          </div>
        ))}
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3">{children}</div>

      {/* Outputs (Handles) */}
      <div className="flex flex-col gap-4 mt-4">
        {outputs.map((output, index) => (
          <div key={output.id} className="relative flex items-center justify-end h-8 px-2 group">
            <span className="text-xs font-medium text-black/50 group-hover:text-black/80 transition-colors">
              {output.label}
            </span>
            <Handle
              type="source"
              position={Position.Right}
              id={output.id}
              className="!w-3 !h-3 !-right-6 !bg-[#5260f4] !border-2 !border-white shadow-sm"
              style={{ top: "50%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
