import { task } from "@trigger.dev/sdk/v3";

interface ExtractFrameTaskPayload {
  video_url: string;
  timestamp: string;
}

export const extractFrameTask = task({
  id: "extract-frame",
  run: async (payload: ExtractFrameTaskPayload) => {
    // In a real environment, you'd execute FFmpeg here:
    // execSync(`ffmpeg -i ${payload.video_url} -ss ${payload.timestamp} -vframes 1 frame.jpg`)
    
    // For local development without FFmpeg, we mock the result
    return `https://dummyimage.com/600x400/000/fff&text=Frame+at+${payload.timestamp}`;
  },
});
