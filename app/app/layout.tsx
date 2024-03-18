import AvatarDropdownMenu from "@/components/avatar-dropdown-menu";
import AuthButton from "@/components/ui/auth-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabaseServer } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaChartBar, FaRegBell } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Sidebar from "../_components/sidebar";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/signin");

  return (
    <div className="h-screen w-screen flex">
      <div className="w-[15vw] bg-[#17171B] text-white p-5 flex flex-col justify-between">
        <Sidebar />
      </div>
      <div className="w-[85vw] p-5">{children}</div>
      <div className="p-1 absolute top-5 right-5 flex gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="w-8 h-8 flex items-center cursor-pointer justify-center bg-[#F6F6F6] px-2 rounded-sm shadow">
              <FaRegBell className="h-6 w-6" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <p className="mx-4 text-xs pb-2">Coming soon...</p>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                Coming soon...
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
          </DropdownMenuContent>
        </DropdownMenu>

        <AvatarDropdownMenu imageUrl={user.user_metadata.avatar_url} />
      </div>
    </div>
  );
}
