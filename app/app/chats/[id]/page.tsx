import BackButton from "@/components/back-button";
import { getConversationsByPhoneNumber } from "@/lib/actions";
import { notFound } from "next/navigation";
import { AiOutlineWhatsApp } from "react-icons/ai";
import React from "react";
import Link from "next/link";

const Page = async ({ params }: { params: { id: string } }) => {
  const { data, error } = await getConversationsByPhoneNumber(params.id);
  if (!data) return notFound();

  return (
    <div className="h-full overflow-y-auto -mr-4 pr-3">
      <BackButton />
      <h1 className="font-black text-2xl uppercase">
        {decodeURIComponent(params.id).split(":")[0].toLowerCase() ===
        "whatsapp" ? (
          <div className="flex items-center gap-3">
            <AiOutlineWhatsApp size={35} color="#25D366" />
            {decodeURIComponent(params.id).split(":")[1]}
          </div>
        ) : (
          params.id
        )}
      </h1>
      <div className="w-full mt-3 grid grid-cols-1 md:grid-cols-4">
        {data.sessions.map((session: any) => {
          // console.log(session.conversations.length);
          return (
            <Link
              href={`/app/chats/${params.id}/${session.session}`}
              key={session}
            >
              <div className="bg-gray-50 rounded-lg border border-black p-3 relative">
                <p className="truncate text-xs">
                  <span className="font-bold">ID:</span> {session.session}
                </p>
                <p className="text-xs">
                  <span>Message Count:</span> {session.conversations.length}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
