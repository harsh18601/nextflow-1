import React from "react";
import { NodeProps } from "@xyflow/react";
import { ImageUp, Upload } from "lucide-react";
import { NodeWrapper } from "./NodeWrapper";
import { WorkflowNodeData, useWorkflowStore } from "@/store/useWorkflowStore";

export const ImageUploadNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;
  const updateNodeData = useWorkflowStore((state) => state.updateNodeData);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
            className="relative aspect-video rounded-xl overflow-hidden border border-black/5 bg-black/5 cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <img
              src={data.imageUrl}
              alt="Uploaded"
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Upload className="size-6 text-white" />
            </div>
          </div>
        ) : (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center h-40 rounded-[20px] border-2 border-dashed border-[#d8d0c3] bg-[#fffdf9] transition-colors hover:border-[#5260f4]/40 group cursor-pointer"
          >
            <div className="flex size-10 items-center justify-center rounded-2xl bg-[#f5f1e8] text-black/45 group-hover:bg-[#5260f4]/10 group-hover:text-[#5260f4] transition-colors">
              <Upload className="size-5" />
            </div>
            <p className="mt-3 text-xs font-semibold text-black/45 group-hover:text-[#5260f4] transition-colors">
              Select image
            </p>
            <p className="mt-1 text-[10px] text-black/30">
              JPG, PNG, WEBP, GIF
            </p>
          </div>
        )}
      </div>
    </NodeWrapper>
  );
};
