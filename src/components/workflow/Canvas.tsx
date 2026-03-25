"use client";

import React, { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  BackgroundVariant,
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./Nodes";
import { useWorkflowStore } from "@/store/useWorkflowStore";

export const Canvas: React.FC = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useWorkflowStore();

  const defaultEdgeOptions = useMemo(() => ({
    animated: true,
    style: { stroke: "#5260f4", strokeWidth: 2 },
  }), []);

  return (
    <div className="relative flex-1 h-full w-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView
        snapToGrid={true}
        snapGrid={[20, 20]}
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="#d8d0c3" 
          className="opacity-40"
        />
        <MiniMap 
          className="!bg-[#f7f3eb]/80 !rounded-2xl !border !border-black/5 shadow-lg !bottom-4 !right-4 overflow-hidden" 
          ariaLabel="Workflow minimap"
          style={{ width: 160, height: 100 }}
        />
        <Controls 
          className="!bg-white !rounded-xl !border !border-black/5 !shadow-sm !left-4 !bottom-4" 
        />
        
        <Panel position="top-right" className="flex gap-3">
          <div className="rounded-full bg-white/90 backdrop-blur px-4 py-2 text-sm font-medium text-black/65 shadow-sm border border-black/5">
            React Flow Canvas
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
};
