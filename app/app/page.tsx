import AuthButton from "@/components/ui/auth-button";
import { connectToDatabase } from "@/lib/mongodb";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const supabase = supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { db } = await connectToDatabase();
  const data = await db.collection("analtics").find({}).toArray();

  // console.log(db)

  return (
    <div className="flex-1 h-full">
      <h2 className="text-2xl font-bold mb-5">
        Welcome, {user?.user_metadata.full_name.split(" ")[0] || "User"}!
      </h2>
      <div className="grid grid-cols-4 gap-5">
        {data.map((a: any, i: number) => (
          <div
            key={i}
            className="bg-gray-100 rounded-lg p-3 shadow border border-black"
          >
            {Object.keys(a).map((key) => {
              if (key === "_id") {
                return;
                // (
                // <p className="font-bold w-full truncate" key={key}>
                //   {data[i][key].toString() as string}
                // </p>
                // );
              } else {
                return (
                  <p key={key}>
                    <span className="font-bold capitalize">
                      {key.replaceAll("_", " ")}:
                    </span>{" "}
                    {data[i][key] as string}
                  </p>
                );
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
