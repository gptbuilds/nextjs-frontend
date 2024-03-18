import BackButton from "@/components/back-button";
import { connectToDatabase } from "@/lib/mongodb";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";
import React from "react";

const Page = async ({ params }: { params: { id: string } }) => {
  const pipeline = [
    { $sort: { date: 1 } },
    { $group: { _id: "$session", messages: { $push: "$$ROOT" } } },
    { $sort: { _id: 1 } },
  ];
  const { db } = await connectToDatabase();
  //   const conversations = await db.collection("message-store").find({}).toArray();

  const conversations = await db
    .collection("message-store")
    .aggregate(pipeline)
    .toArray();
  //   console.log(conversations);

  const found = conversations.find(
    (item: { _id: string }) => item._id === params.id
  );
  // console.log(found);
  if (!found) notFound();

  return (
    <div className="h-full overflow-y-auto -mr-4 pr-3">
      <BackButton />
      <h1 className="font-black text-2xl uppercase">{params.id}</h1>
      <div className="h-full w-full mt-3 flex flex-col gap-3">
        {found.messages.map((message: any) => (
          <div
            key={message._id}
            className={cn("w-1/2 relative", message.type === "ai" && "self-end")}
          >
            <div className="text-xs bg-gray-50 w-fit p-1 absolute top-1 right-1 rounded shadow">{message.type}</div>
            <div
              className={cn(
                "p-4 rounded shadow",
                message.type === "ai" && "bg-blue-300",
                message.type === "human" && "bg-green-300"
              )}
              key={message._id.toString()}
            >
              {message.message}
            </div>
            <div className="flex flex-col">
              <p
                className={cn(
                  "w-fit text-xs",
                  message.type === "ai" && "self-end"
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
        ))}
      </div>
    </div>
  );
};

export default Page;
