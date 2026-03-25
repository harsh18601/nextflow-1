import { task } from "@trigger.dev/sdk/v3";

interface CropTaskPayload {
  image_url: string;
  x_percent: number;
  y_percent: number;
  width_percent: number;
  height_percent: number;
}

export const cropTask = task({
  id: "crop-image",
  run: async (payload: CropTaskPayload) => {
    // In a real environment, you'd execute FFmpeg here:
    // execSync(`ffmpeg -i ${payload.image_url} -vf "crop=iw*${payload.width_percent/100}:ih*${payload.height_percent/100}:iw*${payload.x_percent/100}:ih*${payload.y_percent/100}" out.jpg`)
    
    // For local development without FFmpeg, we mock the result
    return `https://dummyimage.com/600x400/000/fff&text=Cropped+at+${payload.x_percent},${payload.y_percent}`;
  },
});
