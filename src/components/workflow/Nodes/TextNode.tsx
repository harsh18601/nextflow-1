import React from "react";
import { NodeProps } from "@xyflow/react";
import { TextCursorInput } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { WorkflowNodeData, useWorkflowStore } from "@/store/useWorkflowStore";

export const TextNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  return (
    <NodeWrapper
      id={id}
      selected={selected}
      title="Text Node"
      icon={TextCursorInput}
      accentColor="from-[#8ec5ff] to-[#5b8def]"
      outputs={[{ id: "text", label: "Text Data", type: "text" }]}
      status={data.status}
    >
      <div className="flex flex-col gap-2">
        <textarea
          className="w-full min-h-[100px] rounded-[14px] border border-black/8 bg-[#f5f1ea] p-3 text-sm text-black/80 focus:outline-none focus:ring-1 focus:ring-[#5260f4]/50 resize-none"
          placeholder="Enter text here..."
          value={data.text || ""}
          onChange={(e) => {
            updateNodeData(id, { text: e.target.value });
          }}
        />
      </div>
    </NodeWrapper>
  );
};
