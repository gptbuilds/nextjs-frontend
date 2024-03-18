"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { FaChartBar } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { IoIosSettings } from "react-icons/io";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col gap-10">
        <div className="relative w-16 h-16 mx-auto">
          <Image src="/images/vyperlogo.png" alt="Logo" fill />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            variant={"ghost"}
            disabled={pathname === "/app"}
            className={cn("w-full flex gap-4")}
            onClick={() => router.push("/app")}
          >
            <FaChartBar size={24} />{" "}
            <span className="flex-1 text-left">Summary</span>
          </Button>
          <Button
            variant={"ghost"}
            disabled={pathname === "/app/chats"}
            className={cn("w-full flex gap-4")}
            onClick={() => router.push("/app/chats")}
          >
            <LuMessagesSquare size={24} />
            <span className="flex-1 text-left">Chats</span>
          </Button>
        </div>
      </div>
      <div>
        <Button
          variant={"ghost"}
          className={cn("w-full flex gap-4")}
          disabled={pathname === "/app/settings"}
          onClick={() => router.push("/app/settings")}
        >
          <IoIosSettings size={24} />{" "}
          <span className="flex-1 text-left">Settings</span>
        </Button>
        <p className="text-red-600 text-xs absolute bottom-1 left-1">
          Beta Software
        </p>
      </div>
    </>
  );
};

export default Sidebar;
