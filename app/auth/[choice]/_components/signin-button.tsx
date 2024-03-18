"use client";

import { Button } from "@/components/ui/button";
import { FaGoogle } from "react-icons/fa";
import { supabaseBrowser } from "@/lib/supabase/browser";
import React from "react";

const SignInButton = () => {
  const supabase = supabaseBrowser();
  async function signIn() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: location.origin + "/auth/callback?next=/app",
      },
    });
  }

  return (
    <Button
      onClick={() => {
        signIn();
      }}
      className="flex gap-1 items-center"
    >
      Sign in with <FaGoogle size={18} />
    </Button>
  );
};

export default SignInButton;
