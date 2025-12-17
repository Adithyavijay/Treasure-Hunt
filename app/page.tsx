import Image from "next/image";
import { validatePassword } from "./actions";

/**
 * Main treasure hunt page - Server Component
 * Handles both locked and unlocked states via Server Actions
 */
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ unlocked?: string; error?: string }>;
}) {
  // Await searchParams as per Next.js 15 requirements
  const params = await searchParams;
  const isUnlocked = params.unlocked === "true";
  const errorMessage = params.error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 flex items-center justify-center p-4">
      {/* Subtle Christmas background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-8xl">✨</div>
        <div className="absolute top-20 right-20 text-7xl">🎄</div>
        <div className="absolute bottom-20 left-20 text-6xl">⭐</div>
        <div className="absolute bottom-10 right-10 text-7xl">❄️</div>
      </div>

      <main className="relative z-10 w-full max-w-2xl">
        {!isUnlocked ? (
          // Locked State - Show Password Form
          <div className="bg-slate-800/50 backdrop-blur-sm border border-red-900/30 rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🗝️</div>
              <h1 className="text-4xl md:text-5xl font-bold text-red-100 mb-3 tracking-tight">
                The Christmas Treasure
              </h1>
              <p className="text-red-200/80 text-lg">
                Enter the secret key to unlock your clue
              </p>
            </div>

            {/* Password Form using Server Action */}
            <form
              action={async (formData: FormData) => {
                "use server";
                const password = formData.get("password") as string;
                const result = await validatePassword(password);

                if (result.success) {
                  // Redirect with success state
                  const { redirect } = await import("next/navigation");
                  redirect("/?unlocked=true");
                } else {
                  // Redirect with error message
                  const { redirect } = await import("next/navigation");
                  redirect(`/?error=${encodeURIComponent(result.message || "Invalid password")}`);
                }
              }}
              className="space-y-6"
            >
              <div>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter the secret key..."
                  required
                  autoFocus
                  className="w-full px-6 py-4 bg-slate-900/50 border border-red-800/40 rounded-xl text-red-100 placeholder-red-300/40 focus:outline-none focus:ring-2 focus:ring-red-600/50 focus:border-red-600/50 transition-all text-lg"
                />
              </div>

              {errorMessage && (
                <div className="bg-red-950/50 border border-red-800/50 rounded-lg p-4 text-red-200 text-center animate-pulse">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-800 to-red-900 hover:from-red-700 hover:to-red-800 text-red-50 font-semibold rounded-xl shadow-lg hover:shadow-red-900/50 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Unlock Treasure ✨
              </button>
            </form>

            <p className="text-center text-red-300/50 text-sm mt-6">
              Only those with the key shall pass...
            </p>
          </div>
        ) : (
          // Unlocked State - Show Clue Image
          <div className="bg-slate-800/50 backdrop-blur-sm border border-green-900/30 rounded-2xl p-8 md:p-12 shadow-2xl animate-[fadeIn_0.5s_ease-in]">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">🎁</div>
              <h1 className="text-4xl md:text-5xl font-bold text-green-100 mb-3 tracking-tight">
                Treasure Unlocked!
              </h1>
              <p className="text-green-200/80 text-lg">
                Here is your Christmas clue
              </p>
            </div>

            {/* Server-rendered image from API route */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl border border-green-800/30">
              <Image
                src="/api/clue"
                alt="Your Christmas treasure clue"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="mt-8 text-center">
              <p className="text-green-200/70 text-lg mb-4">
                Follow this clue to discover your next adventure! 🎄
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-slate-700/50 hover:bg-slate-700/70 text-green-100 rounded-lg transition-all"
              >
                Lock Again 🔒
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
