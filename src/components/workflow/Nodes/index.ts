import { TextNode } from "./TextNode";
import { ImageUploadNode } from "./ImageUploadNode";
import { VideoUploadNode } from "./VideoUploadNode";
import { LLMNode } from "./LLMNode";
import { CropImageNode } from "./CropImageNode";
import { ExtractFrameNode } from "./ExtractFrameNode";

export const nodeTypes = {
  text: TextNode,
  imageUpload: ImageUploadNode,
  videoUpload: VideoUploadNode,
  llm: LLMNode,
  crop: CropImageNode,
  extractFrame: ExtractFrameNode,
};
