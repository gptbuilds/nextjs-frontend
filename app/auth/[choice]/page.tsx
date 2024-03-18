import { Button } from "@/components/ui/button";
import { supabaseServer } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import React from "react";
import SignInButton from "./_components/signin-button";

const Page = async ({ params }: { params: { choice: string } }) => {
  //   console.log(params.choice);
  if (params.choice !== "signup" && params.choice !== "signin") notFound();

  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  // console.log(user);
  if (user) redirect("/app");

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <SignInButton />
    </div>
  );
};

export default Page;
