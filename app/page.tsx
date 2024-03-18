import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex h-screen w-screen items-center justify-center">
      <Link
        href="/app"
        className={buttonVariants({ variant: "default" })}
      >
        Dashboard
      </Link>
    </main>
  );
}
