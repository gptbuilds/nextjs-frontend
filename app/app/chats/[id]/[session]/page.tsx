import BackButton from "@/components/back-button";
import { getSessionFromPhoneNumber } from "@/lib/actions";
import { cn, isValidUrl } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Page = async ({
  params,
}: {
  params: { id: string; session: string };
}) => {
  // console.log(params);
  const { data, error } = await getSessionFromPhoneNumber(
    params.id,
    params.session
  );

  // console.log(data.conversations.length);

  return (
    <div className="h-full overflow-x-hidden w-full flex flex-col">
      <div className="w-fit flex flex-col gap-0">
        <BackButton />
      </div>
      <div className="mb-4">
        <h1 className="font-bold">
          {decodeURIComponent(params?.id).split(":")[1]}\
          <span className="text-xs">{params?.session}</span>
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        {data?.conversations.map((message: any) => {
          // console.log(message);
          return (
            <div
              key={message?._id.toString()}
              className={cn(
                "w-1/2 relative",
                message.type === "ai" && "self-end",
                message.type === "agent" && "self-center"
              )}
            >
              <div className="text-xs bg-gray-50 w-fit p-1 absolute top-1 right-1 rounded shadow">
                {message.type}
              </div>
              <div
                className={cn(
                  "p-4 rounded shadow pr-10 break-all",
                  message.type === "ai" && "bg-green-400",
                  message.type === "client" && "bg-blue-500",
                  message.type === "human" && "bg-blue-200",
                  message.type === "agent" && "bg-red-200"
                )}
                key={message._id.toString()}
              >
                {isValidUrl(message.message) ? (
                  <div className="flex">
                    <div className="flex-1">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={message.message}
                        className="w-fit hover:underline"
                      >
                        URL LINK
                      </a>
                      <p className="text-gray-700 text-[10px]">
                        {message.message}
                      </p>
                    </div>
                    {/* <div className="flex-1">
                      <Image alt="Media" fill src={message.message} />
                    </div> */}
                  </div>
                ) : (
                  message.message
                )}
              </div>
              <div className="flex flex-col">
                <p
                  className={cn(
                    "w-fit text-xs",
                    message.type === "ai" && "self-end",
                    message.type === "agent" && "self-end"
                  )}
                >
                  {new Date(message.date).toLocaleDateString("en-us", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })}{" "}
                  @ {new Date(message.date).toLocaleTimeString("en-us")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
