# NextFlow

Initialized interview project for a Krea-inspired LLM workflow builder.

## What is already done

- Next.js 16 + TypeScript + Tailwind scaffold
- Core packages added for React Flow, Clerk, Prisma, Neon, Trigger.dev, Gemini, Transloadit, Zustand, Zod, and Lucide
- Custom landing screen aligned to the provided screenshots
- `.env.example` added for the required service keys
- `prisma/schema.prisma` added as the starting database model
- `PROMPT_CURSOR.md` added as a strict build prompt for Cursor or Antigravity

## Folder

The app was created in:

`c:\Users\Harsh Gupta\Downloads\Demo\nextflow`

`create-next-app` could not initialize directly in `Demo` because npm package names cannot contain capital letters.

## Run

```bash
cd c:\Users\Harsh Gupta\Downloads\Demo\nextflow
npm run dev
```

## Before building the full app

Fill these values in `.env.local` using `.env.example`:

- Clerk keys
- Neon PostgreSQL connection string
- Gemini API key
- Trigger.dev secret
- Transloadit auth key and template ids

## Notes

- All executable nodes in the final version must run through Trigger.dev, per the screenshots.
- The current page is an initialization shell, not the full workflow engine yet.
- Use `PROMPT_CURSOR.md` to hand the repo off to Cursor or Antigravity without drifting from the spec.
