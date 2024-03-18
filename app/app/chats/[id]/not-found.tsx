import BackButton from "@/components/back-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <BackButton />
      <h2 className="font-bold text-3xl mb-8">Conversation Not Found</h2>
      <p className="mb-5">Unable to load conversation.</p>
      <Link href="/app">Return to Dashboard</Link>
    </div>
  );
}
