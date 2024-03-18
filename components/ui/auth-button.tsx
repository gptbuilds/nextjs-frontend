"use client";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { User } from "@supabase/supabase-js";
import { FiLogOut } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "./button";

export default function AuthButton({ user }: { user: User | undefined }) {
  const router = useRouter();
  const handleLogout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.refresh();
  };
  const handleOauthLogin = (provider: "github" | "google") => {
    const supabase = supabaseBrowser();
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=/app",
      },
    });
  };

  return (
    <div>
      {user ? (
        <Button variant={"outline"} onClick={handleLogout}>
          <FiLogOut size={23} />
        </Button>
      ) : (
        <div className="flex flex-col gap-2">
          <h2 className="text-center font-bold text-lg">Sign In Using</h2>
          <div className="flex gap-2">
            <Button
              className="flex gap-2 font-semibold"
              variant={"outline"}
              onClick={() => handleOauthLogin("github")}
            >
              <FaGithub size={26} /> GitHub
            </Button>
            <Button
              variant={"outline"}
              className="flex gap-2 font-semibold"
              onClick={() => handleOauthLogin("google")}
            >
              <FaGoogle size={26} />
              Google
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
