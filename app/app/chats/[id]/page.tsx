import BackButton from "@/components/back-button";
import { connectToDatabase } from "@/lib/mongodb";
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

  if (!found) notFound();

  return (
    <div>
      <BackButton />
      <h1 className="font-black text-2xl uppercase">{params.id}</h1>
    </div>
  );
};

export default Page;
