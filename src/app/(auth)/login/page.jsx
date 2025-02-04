import { signIn } from "@/auth";
import { RetroGrid } from "@/components/ui/retro-grid";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function SignIn() {
  return (
    <div>
      <div className="relative dark flex h-dvh w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
        <form
          action={async () => {
            "use server";
            await signIn("google");
          }}
        >
          <ShimmerButton type="submit" className="shadow-2xl">
            <span className="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white dark:from-white dark:to-slate-900/10 lg:text-lg">
              Signin with Google
            </span>
          </ShimmerButton>
          {/* <button className="text-white"></button> */}
        </form>
        <RetroGrid />
      </div>
    </div>
  );
}
