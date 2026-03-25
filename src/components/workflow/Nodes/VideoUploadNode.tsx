import React from "react";
import { NodeProps } from "@xyflow/react";
import { FileVideo, Upload } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";

import { WorkflowNodeData, useWorkflowStore } from "@/store/useWorkflowStore";

export const VideoUploadNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);

  return (
    <NodeWrapper
      id={id}
      selected={selected}
      title="Upload Video"
      icon={FileVideo}
      accentColor="from-[#f79ab7] to-[#ea628b]"
      outputs={[{ id: "video_url", label: "Video URL", type: "video" }]}
    >
      <div className="flex flex-col gap-3">
        {data.videoUrl ? (
          <div className="relative aspect-video rounded-xl overflow-hidden border border-black/5 bg-black/5">
            <video
              src={data.videoUrl as string}
              className="w-full h-full object-cover"
              controls
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-40 rounded-[20px] border-2 border-dashed border-[#d8d0c3] bg-[#fffdf9] transition-colors hover:border-[#5260f4]/40 group cursor-pointer">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#f5f1e8] text-black/45 group-hover:bg-[#5260f4]/10 group-hover:text-[#5260f4] transition-colors">
              <Upload className="size-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-black/45 group-hover:text-[#5260f4] transition-colors">
              Select video
            </p>
            <p className="mt-1 text-[10px] text-black/30">
              MP4, MOV, WEBM, M4V
            </p>
          </div>
        )}
      </div>
    </NodeWrapper>
  );
};
