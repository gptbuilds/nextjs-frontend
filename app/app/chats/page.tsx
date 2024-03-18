import { connectToDatabase } from "@/lib/mongodb";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const pipeline = [
    { $sort: { date: 1 } },
    { $group: { _id: "$session", messages: { $push: "$$ROOT" } } },
    { $sort: { _id: 1 } },
  ];
  const { db } = await connectToDatabase();
  // const conversations = await db.collection("message-store").find({}).toArray();

  const conversations = await db
    .collection("message-store")
    .aggregate(pipeline)
    .toArray();
//   console.log(conversations);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Bot Chats</h2>
      <div className="grid grid-cols-4 gap-5">
        {conversations.map((c: any) => {
          return (
            <Link href={`/app/chats/${c._id}`} key={c._id.toString()}>
              <div className="bg-gray-50 rounded-lg border border-black p-3">
                <h3 className="w-full font-bold truncate uppercase">
                  {c._id.toString()}
                </h3>
                <p className="text-xs">
                  <span className="font-bold">Last Date:</span>{" "}
                  {new Date().toLocaleDateString("en-us", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                  })}
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
