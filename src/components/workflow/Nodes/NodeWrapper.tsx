import React from "react";
import { Handle, Position } from "@xyflow/react";
import { LucideIcon, Play } from "lucide-react";
import { clsx } from "clsx";
import { useWorkflowStore } from "@/store/useWorkflowStore";

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
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className={clsx(
              "flex size-11 items-center justify-center rounded-[18px] bg-gradient-to-br text-white",
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
            onClick={(event) => {
              event.stopPropagation();
              useWorkflowStore.getState().executeNode(id);
            }}
            disabled={status === "running"}
            className="flex size-8 items-center justify-center rounded-full bg-[#5260f4] text-white shadow-lg transition hover:scale-110 active:scale-95 disabled:opacity-50"
          >
            <Play className="size-3.5 fill-current" />
          </button>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-4">
        {inputs.map((input) => (
          <div key={input.id} className="group relative flex h-8 items-center justify-start px-2">
            <Handle
              type="target"
              position={Position.Left}
              id={input.id}
              className="!-left-6 !h-3 !w-3 !border-2 !border-white !bg-[#5260f4] shadow-sm"
              style={{ top: "50%" }}
            />
            <span className="text-xs font-medium text-black/50 transition-colors group-hover:text-black/80">
              {input.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3">{children}</div>

      <div className="mt-4 flex flex-col gap-4">
        {outputs.map((output) => (
          <div key={output.id} className="group relative flex h-8 items-center justify-end px-2">
            <span className="text-xs font-medium text-black/50 transition-colors group-hover:text-black/80">
              {output.label}
            </span>
            <Handle
              type="source"
              position={Position.Right}
              id={output.id}
              className="!-right-6 !h-3 !w-3 !border-2 !border-white !bg-[#5260f4] shadow-sm"
              style={{ top: "50%" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
