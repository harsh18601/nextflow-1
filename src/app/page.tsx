import { Bot, ExternalLink } from "lucide-react";
import { AuthenticatedHome } from "@/components/home/AuthenticatedHome";
import { hasClerkEnv } from "@/lib/clerk";

function ClerkSetupNotice() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#f8f8f3_0%,#f4f1ea_35%,#ece7de_100%)] px-6 py-12">
      <section className="w-full max-w-3xl rounded-[32px] border border-black/8 bg-white/88 p-8 shadow-[0_24px_90px_rgba(38,30,18,0.08)] backdrop-blur">
        <div className="flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-[20px] bg-[#1d1d1b] text-white">
            <Bot className="size-7" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-black/45">
              NextFlow
            </p>
            <h1 className="text-2xl font-semibold tracking-[-0.03em] text-[#1d1d1b]">
              Clerk keys are still placeholders
            </h1>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-[15px] leading-7 text-black/70">
          <p>
            Your current <code>.env</code> contains placeholder values like
            <code> pk_test_...</code> and <code>sk_test_...</code>. Clerk rejects those at
            startup, which is why the app crashes with <code>Publishable key not valid</code>.
          </p>
          <p>Replace them with real keys from the Clerk dashboard, then restart <code>npm run dev</code>.</p>
        </div>

        <div className="mt-6 rounded-[24px] bg-[#f7f3eb] p-5 font-mono text-sm text-black/75">
          <p>NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_real_key</p>
          <p>CLERK_SECRET_KEY=sk_test_your_real_key</p>
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          <a
            href="https://dashboard.clerk.com/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#5260f4] px-5 py-3 font-semibold text-white"
          >
            Open Clerk Dashboard
            <ExternalLink className="size-4" />
          </a>
          <a
            href="https://clerk.com/docs/quickstarts/nextjs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white px-5 py-3 font-semibold text-black/70"
          >
            Setup Guide
            <ExternalLink className="size-4" />
          </a>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  if (!hasClerkEnv) {
    return <ClerkSetupNotice />;
  }

  return <AuthenticatedHome />;
}
