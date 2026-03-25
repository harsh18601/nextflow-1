import Image from "next/image";
import React from "react";
import { NodeProps } from "@xyflow/react";
import { ImageUp, Upload } from "lucide-react";
import { WorkflowNodeData, useWorkflowStore } from "@/store/useWorkflowStore";
import { NodeWrapper } from "./NodeWrapper";

export const ImageUploadNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateNodeData(id, { imageUrl: url });
    }
  };

  return (
    <NodeWrapper
      id={id}
      selected={selected}
      title="Upload Image"
      icon={ImageUp}
      accentColor="from-[#f8ba6b] to-[#ef8f35]"
      outputs={[{ id: "image_url", label: "Image URL", type: "image" }]}
      status={data.status}
    >
      <div className="flex flex-col gap-3">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        {data.imageUrl ? (
          <div
            className="group relative aspect-video cursor-pointer overflow-hidden rounded-xl border border-black/5 bg-black/5"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={data.imageUrl}
              alt="Uploaded"
              fill
              unoptimized
              className="object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
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
              Select image
            </p>
            <p className="mt-1 text-[10px] text-black/30">JPG, PNG, WEBP, GIF</p>
          </div>
        )}
      </div>
    </NodeWrapper>
  );
};
