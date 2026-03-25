Build this repo into the final interview submission exactly from the requirements below. Do not invent features beyond this prompt. Do not simplify the scope. Keep all implementation decisions anchored to the screenshot spec.

Project name:
NextFlow

Goal:
Build a pixel-accurate Krea-inspired workflow builder for LLM-first workflows using Next.js, TypeScript, Tailwind CSS, React Flow, Clerk, Prisma, Neon PostgreSQL, Zustand, Zod, Trigger.dev, Google Gemini API, Transloadit, and FFmpeg through Trigger.dev.

Non-negotiable rules:
1. Use the current repo only.
2. Keep the UI visually aligned to Krea's workflow builder patterns.
3. Left sidebar must contain exactly 6 node buttons:
   - Text Node
   - Upload Image Node
   - Upload Video Node
   - Run Any LLM Node
   - Crop Image Node
   - Extract Frame from Video Node
4. Right sidebar must be a workflow history panel with expandable node-level execution details.
5. All workflow routes must be protected with Clerk.
6. All executable node types must run through Trigger.dev tasks.
7. LLM execution must use Google Gemini through Trigger.dev.
8. Crop and extract-frame nodes must use FFmpeg through Trigger.dev.
9. Upload image and upload video nodes must use Transloadit and show previews.
10. Workflow data and execution history must persist in PostgreSQL via Prisma.
11. Results for LLM execution must render inline on the LLM node itself, not in a separate output node.
12. Canvas must use React Flow with dot-grid background, smooth pan and zoom, minimap, drag/drop node creation, animated edges, DAG validation, selective execution, undo/redo, and parallel branch execution.
13. Invalid type connections must be visibly blocked.
14. When an input handle is connected, the matching manual input control must be disabled.
15. Running nodes must show a pulsating glow state.
16. Include the required sample workflow:
    Product Marketing Kit Generator

Required sample workflow behavior:
- Branch A:
  - Upload Image
  - Crop Image
  - Text Node #1 as system prompt
  - Text Node #2 as product details
  - LLM Node #1 consumes system_prompt, user_message, and cropped image
- Branch B:
  - Upload Video
  - Extract Frame from Video using timestamp "50%"
- Convergence:
  - LLM Node #2 waits for both branches
  - Inputs:
    - system_prompt from Text Node #3
    - user_message from LLM Node #1 output
    - images from cropped product image plus extracted video frame
  - Output displays inline on the node

Implementation requirements:
1. Create a proper app shell with a collapsible left sidebar, center React Flow canvas, and right history panel.
2. Add authenticated routes and user scoping.
3. Add Prisma models and database access helpers.
4. Add Zustand workflow state and Zod validation.
5. Add Trigger.dev tasks for:
   - Gemini LLM execution
   - FFmpeg crop execution
   - FFmpeg frame extraction
6. Add Next.js API routes or server actions only where needed, but execution must still happen through Trigger.dev.
7. Add import/export as JSON.
8. Add save/load workflow persistence.
9. Add execution history persistence.
10. Keep TypeScript strict and avoid placeholder TODO logic in final code.

Deliverable expectation:
- Produce a working local app suitable for interview review.
- Prefer complete vertical slices over mock-only structure.
- Preserve and build on the initialization work already present in this repo.
