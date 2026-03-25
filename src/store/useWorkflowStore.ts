import { create } from "zustand";
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
} from "@xyflow/react";

export type NodeType =
  | "text"
  | "imageUpload"
  | "videoUpload"
  | "llm"
  | "crop"
  | "extractFrame";

export interface WorkflowNodeData {
  label?: string;
  text?: string;
  imageUrl?: string;
  videoUrl?: string;
  model?: string;
  output?: string;
  status?: "idle" | "running" | "success" | "failed";
  x_percent?: number;
  y_percent?: number;
  width_percent?: number;
  height_percent?: number;
  timestamp?: string;
  inputs?: Record<string, any>;
}

export interface WorkflowState {
  nodes: Node[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  addNode: (type: NodeType) => void;
  loadSampleWorkflow: () => void;
  executeNode: (nodeId: string) => Promise<void>;
  executeWorkflow: () => Promise<void>;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),
  addNode: (type: NodeType) => {
    const id = crypto.randomUUID();
    const newNode: Node = {
      id,
      type,
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label: `${type} node` },
    };
    set({ nodes: [...get().nodes, newNode] });
  },
  loadSampleWorkflow: () => {
    const nodes: Node[] = [
      { id: "text-sys", type: "text", position: { x: 50, y: 50 }, data: { text: "You are a professional marketing copywriter. Generate a compelling one-paragraph product description." } },
      { id: "text-details", type: "text", position: { x: 50, y: 180 }, data: { text: "Product: Wireless Bluetooth Headphones. Features: Noise cancellation, 30-hour battery, foldable design." } },
      { id: "upload-img", type: "imageUpload", position: { x: 50, y: 310 }, data: { imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" } },
      { id: "crop-img", type: "crop", position: { x: 400, y: 50 }, data: { x_percent: 10, y_percent: 10, width_percent: 80, height_percent: 80 } },
      { id: "llm-1", type: "llm", position: { x: 750, y: 50 }, data: { model: "gemini-1.5-pro", status: "idle" } },
      { id: "upload-vid", type: "videoUpload", position: { x: 50, y: 500 }, data: { videoUrl: "https://vjs.zencdn.net/v/oceans.mp4" } },
      { id: "extract-vid", type: "extractFrame", position: { x: 400, y: 500 }, data: { timestamp: "50%" } },
      { id: "llm-2", type: "llm", position: { x: 1100, y: 250 }, data: { model: "gemini-1.5-pro", status: "idle" } },
    ];

    const edges: Edge[] = [
      { id: "e1-1", source: "text-sys", sourceHandle: "text", target: "llm-1", targetHandle: "system_prompt", animated: true },
      { id: "e1-2", source: "text-details", sourceHandle: "text", target: "llm-1", targetHandle: "user_message", animated: true },
      { id: "e1-3", source: "upload-img", sourceHandle: "image_url", target: "crop-img", targetHandle: "image_url", animated: true },
      { id: "e1-4", source: "crop-img", sourceHandle: "output", target: "llm-1", targetHandle: "images", animated: true },
      { id: "e2-1", source: "upload-vid", sourceHandle: "video_url", target: "extract-vid", targetHandle: "video_url", animated: true },
      { id: "e2-2", source: "extract-vid", sourceHandle: "output", target: "llm-2", targetHandle: "images", animated: true },
      { id: "e3-1", source: "llm-1", sourceHandle: "output", target: "llm-2", targetHandle: "user_message", animated: true },
    ];

    set({ nodes, edges });
  },
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node
      ),
    });
  },
  executeNode: async (nodeId: string) => {
    const node = get().nodes.find((n) => n.id === nodeId);
    if (!node) return;

    // Set to running
    get().updateNodeData(nodeId, { status: "running" });

    // Gather inputs from edges
    const inputEdges = get().edges.filter((e) => e.target === nodeId);
    const inputs: Record<string, any> = {};
    
    inputEdges.forEach((edge) => {
      const sourceNode = get().nodes.find((n) => n.id === edge.source);
      if (sourceNode && sourceNode.data.output) {
        inputs[edge.targetHandle!] = sourceNode.data.output;
      }
    });

    // Merge manual data with connected inputs
    const payload = { ...node.data, ...inputs };

    try {
      let result;
      // Mock execution if Trigger.dev is not fully set up
      // In production, we'd use triggerLLM, triggerCrop, etc.
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate delay

      switch (node.type) {
        case "text":
          result = node.data.text;
          break;
        case "llm":
          result = `[Gemini Response] based on "${payload.user_message}" and inputs: ${JSON.stringify(inputs)}`;
          break;
        case "crop":
          result = `https://dummyimage.com/600x400/000/fff&text=Cropped+Image+from+${payload.image_url}`;
          break;
        case "extractFrame":
          result = `https://dummyimage.com/600x400/000/fff&text=Frame+at+${payload.timestamp}`;
          break;
        case "imageUpload":
          result = node.data.imageUrl;
          break;
        case "videoUpload":
          result = node.data.videoUrl;
          break;
        default:
          result = "Success";
      }

      get().updateNodeData(nodeId, { status: "success", output: result as string });
    } catch (error) {
      get().updateNodeData(nodeId, { status: "failed" });
    }
  },
  executeWorkflow: async () => {
    // Basic DAG execution (could be more robust with topological sort)
    const executedNodes = new Set<string>();
    const nodesToExecute = [...get().nodes];

    while (executedNodes.size < nodesToExecute.length) {
      const runnableNodes = nodesToExecute.filter(
        (node) =>
          !executedNodes.has(node.id) &&
          get().edges
            .filter((e) => e.target === node.id)
            .every((e) => executedNodes.has(e.source))
      );

      if (runnableNodes.length === 0) break; // Circular or stuck

      // Trigger all runnable nodes in parallel
      await Promise.all(runnableNodes.map((node) => get().executeNode(node.id)));
      runnableNodes.forEach((n) => executedNodes.add(n.id));
    }
  },
}));
