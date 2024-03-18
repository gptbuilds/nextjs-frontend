"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { FaLeftLong } from "react-icons/fa6";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => {router.back()}}
      variant={"ghost"}
      className="mb-2 flex items-center gap-2"
    >
      <FaLeftLong /> Back
    </Button>
  );
};

export default BackButton;
