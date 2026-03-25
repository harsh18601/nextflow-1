import { defineConfig } from "@trigger.dev/sdk/v3";

export default defineConfig({
  project: "nextflow", // Replace with your actual project ID from Trigger.dev dashboard
  runtime: "node",
  onFailure: async (payload, error, { job, run }) => {
    console.error(`Run ${run.id} of job ${job.id} failed:`, error);
  },
});
