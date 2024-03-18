import BackButton from "@/components/back-button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <BackButton />
      <h2 className="font-bold text-3xl mb-10">Not Found</h2>
      <p className="mb-5">Could not find requested resource</p>
      <Link href="/app">Return to Dashboard</Link>
    </div>
  );
}
