import BotPowerSwitch from "@/app/_components/bot-power-switch";
import { Switch } from "@/components/ui/switch";
import { connectToDatabase } from "@/lib/mongodb";
import React from "react";

const Settings = async () => {
  const { db } = await connectToDatabase();
  const data = await db.collection("switch").findOne({ _id: "switch" });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Settings Page</h1>
      <div className="flex items-center gap-3">
        <span className="font-medium">Bot Master Switch</span>
        <BotPowerSwitch initial={data.chatbot_on} />
      </div>
    </div>
  );
};

export default Settings;
