import React from "react";
import { NodeProps } from "@xyflow/react";
import { FileVideo, Upload } from "lucide-react";
import { WorkflowNodeData, useWorkflowStore } from "@/store/useWorkflowStore";
import { NodeWrapper } from "./NodeWrapper";

export const VideoUploadNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateNodeData(id, { videoUrl: url });
    }
  };

  return (
    <NodeWrapper
      id={id}
      selected={selected}
      title="Upload Video"
      icon={FileVideo}
      accentColor="from-[#f79ab7] to-[#ea628b]"
      outputs={[{ id: "video_url", label: "Video URL", type: "video" }]}
      status={data.status}
    >
      <div className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="video/mp4,video/quicktime,video/webm,video/x-m4v,.mp4,.mov,.webm,.m4v"
          onChange={handleFileChange}
        />
        {data.videoUrl ? (
          <div
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-black/5 bg-black/5"
            onClick={() => fileInputRef.current?.click()}
          >
            <video
              src={data.videoUrl as string}
              className="h-full w-full object-cover"
              controls
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
              <Upload className="size-6 text-white" />
            </div>
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="group flex h-40 cursor-pointer flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#d8d0c3] bg-[#fffdf9] transition-colors hover:border-[#5260f4]/40"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#f5f1e8] text-black/45 transition-colors group-hover:bg-[#5260f4]/10 group-hover:text-[#5260f4]">
              <Upload className="size-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-black/45 transition-colors group-hover:text-[#5260f4]">
              Select video
            </p>
            <p className="mt-1 text-[10px] text-black/30">MP4, MOV, WEBM, M4V</p>
          </div>
        )}
      </div>
    </NodeWrapper>
  );
};
