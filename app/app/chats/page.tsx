import { connectToDatabase } from "@/lib/mongodb";
import Link from "next/link";
import React from "react";
import { AiOutlineWhatsApp } from "react-icons/ai";

const Page = async () => {
  // const pipeline = [
  //   { $sort: { date: 1 } },
  //   { $group: { _id: "$session", messages: { $push: "$$ROOT" } } },
  //   { $sort: { _id: 1 } },
  // ];
  const { db } = await connectToDatabase();
  // const conversations = await db.collection("message-store").find({}).toArray();

  // const conversations2 = await db
  //   .collection("message-store-permanent")
  //   .aggregate(pipeline)
  //   .toArray();

  const conversations = await db
    .collection("message-store-permanent")
    .find({})
    .sort({ session: 1, phone_number: 1 }) // 1 for ascending order
    .toArray();

  // console.log(conversations);
  let groupedByPhoneNumber: any = [];

  conversations.forEach((conversation: any) => {
    const { phone_number, session } = conversation;
    let phoneEntry = groupedByPhoneNumber.find(
      (entry: any) => entry.phone_number === phone_number
    );

    if (!phoneEntry) {
      phoneEntry = { phone_number, sessions: [] };
      groupedByPhoneNumber.push(phoneEntry);
    }

    let sessionEntry = phoneEntry.sessions.find(
      (s: any) => s.session === session
    );
    if (!sessionEntry) {
      sessionEntry = { session, conversations: [] };
      phoneEntry.sessions.push(sessionEntry);
    }

    sessionEntry.conversations.push(conversation);
  });

  // console.log(groupedByPhoneNumber);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">Bot Chats</h2>
      <div className="grid grid-cols-4 gap-5">
        {groupedByPhoneNumber.map((c: any) => {
          // console.log(c.sessions[c.sessions.length - 1]);

          return (
            <Link
              href={`/app/chats/${encodeURIComponent(c.phone_number)}`}
              key={c.phone_number}
            >
              <div className="bg-gray-50 rounded-lg border border-black p-3 relative">
                {c.phone_number.split(":")[0].toLowerCase() === "whatsapp" ? (
                  <div className="absolute top-2 right-2 rounded-full">
                    <AiOutlineWhatsApp color="#25D366" size={25} />
                  </div>
                ) : null}
                <h3 className="w-[90%] font-bold truncate uppercase">
                  {c.phone_number.split(":")[1]}
                </h3>
                <p className="text-xs">
                  <span className="font-bold">Number of Sessions:</span>{" "}
                  {c.sessions.length}
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
