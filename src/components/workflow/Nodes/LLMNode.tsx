import { NodeProps } from "@xyflow/react";
import { Bot, Sparkles } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { clsx } from "clsx";
import { WorkflowNodeData } from "@/store/useWorkflowStore";

export const LLMNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;
  const status = data.status || "idle";

  return (
    <NodeWrapper
      id={id}
      selected={selected}
      title="Run Any LLM"
      icon={Bot}
      accentColor="from-[#7b87ff] to-[#5362f6]"
      status={status}
      inputs={[
        { id: "system_prompt", label: "System Prompt", type: "text" },
        { id: "user_message", label: "User Message", type: "text" },
        { id: "images", label: "Images", type: "image" },
      ]}
      outputs={[{ id: "output", label: "Output Text", type: "text" }]}
    >
      <div className="flex flex-col gap-3">
        {/* Model Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-wider text-black/30 px-1">
            Model
          </label>
          <select
            className="w-full h-10 rounded-[14px] border border-black/8 bg-[#f5f1ea] px-3 text-sm text-black/80 focus:outline-none focus:ring-1 focus:ring-[#5260f4]/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%208L10%2013L15%208%22%20stroke%3D%22%231D1D1B%22%20stroke-opacity%3D%220.35%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:18px_18px] bg-[right_12px_center] bg-no-repeat"
            value={data.model as string || "gemini-1.5-pro"}
            disabled={!!data.inputs?.model}
            onChange={(e) => {
              // Update node data
            }}
          >
            <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
            <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
          </select>
        </div>

        {/* Inline Execution View / Results */}
        <div className="mt-2 flex flex-col gap-2">
          {status === "idle" && !data.output && (
            <div className="flex flex-col items-center justify-center py-6 border border-dashed border-[#d8d0c3] rounded-[20px] bg-[#fffdf9]">
              <Sparkles className="size-5 text-black/20 mb-2" />
              <p className="text-[11px] font-medium text-black/30">
                Awaiting execution
              </p>
            </div>
          )}

          {status === "running" && (
            <div className="flex flex-col gap-2 p-3 rounded-[20px] bg-[#5260f4]/5 border border-[#5260f4]/10 animate-pulse">
              <div className="h-2 w-3/4 bg-[#5260f4]/10 rounded-full" />
              <div className="h-2 w-1/2 bg-[#5260f4]/10 rounded-full" />
            </div>
          )}

          {data.output && (
            <div className="flex flex-col gap-2 p-4 rounded-[20px] bg-[#f5f1ea] border border-black/5">
              <p className="text-xs font-bold uppercase tracking-widest text-black/30 mb-1">
                Output
              </p>
              <div className="text-sm text-black/80 leading-relaxed whitespace-pre-wrap">
                {data.output as string}
              </div>
            </div>
          )}
        </div>
      </div>
    </NodeWrapper>
  );
};
