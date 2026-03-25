import { NodeProps } from "@xyflow/react";
import { Wand2 } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { WorkflowNodeData } from "@/store/useWorkflowStore";

export const ExtractFrameNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;

  return (
    <NodeWrapper
      id={id}
      selected={selected}
      title="Extract Frame"
      icon={Wand2}
      accentColor="from-[#9fd174] to-[#77ae3d]"
      inputs={[
        { id: "video_url", label: "Video URL", type: "video" },
        { id: "timestamp", label: "Timestamp", type: "text" },
      ]}
      outputs={[{ id: "output", label: "Frame Image", type: "image" }]}
    >
      <div className="flex flex-col gap-1.5 px-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-black/30">
          Timestamp (s or %)
        </label>
        <input
          type="text"
          className="w-full h-10 rounded-[14px] border border-black/8 bg-[#f5f1ea] px-3 text-sm text-black/80 focus:outline-none focus:ring-1 focus:ring-[#5260f4]/50"
          placeholder='e.g., 5.5 or "50%"'
          value={data.timestamp as string || ""}
          disabled={!!data.inputs?.timestamp}
          onChange={(e) => {
            // Update node data
          }}
        />
      </div>
    </NodeWrapper>
  );
};
