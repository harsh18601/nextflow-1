import { NodeProps } from "@xyflow/react";
import { Crop } from "lucide-react";
import { WorkflowNodeData } from "@/store/useWorkflowStore";
import { NodeWrapper } from "./NodeWrapper";

export const CropImageNode: React.FC<NodeProps> = (props) => {
  const data = props.data as WorkflowNodeData;
  const { id, selected } = props;

  const renderInput = (label: string, value: number | undefined, key: string) => (
    <div className="flex items-center justify-between gap-2 px-1">
      <span className="text-[10px] font-bold uppercase tracking-wider text-black/30">
        {label}
      </span>
      <input
        type="number"
        className="h-8 w-16 rounded-[10px] border border-black/8 bg-[#f5f1ea] px-2 text-xs text-black/80 focus:outline-none focus:ring-1 focus:ring-[#5260f4]/50"
        value={value ?? 0}
        disabled={Boolean(data.inputs?.[key])}
        onChange={() => {}}
      />
    </div>
  );

  return (
    <NodeWrapper
      id={id}
      selected={selected}
      title="Crop Image"
      icon={Crop}
      accentColor="from-[#69d0ad] to-[#2eaa81]"
      inputs={[
        { id: "image_url", label: "Image URL", type: "image" },
        { id: "x_percent", label: "X %", type: "number" },
        { id: "y_percent", label: "Y %", type: "number" },
        { id: "width_percent", label: "Width %", type: "number" },
        { id: "height_percent", label: "Height %", type: "number" },
      ]}
      outputs={[{ id: "output", label: "Cropped Image", type: "image" }]}
    >
      <div className="flex flex-col gap-2 rounded-[20px] border border-black/5 bg-[#f5f1ea]/50 p-3">
        {renderInput("X %", data.x_percent, "x_percent")}
        {renderInput("Y %", data.y_percent, "y_percent")}
        {renderInput("Width %", data.width_percent, "width_percent")}
        {renderInput("Height %", data.height_percent, "height_percent")}
      </div>
    </NodeWrapper>
  );
};
