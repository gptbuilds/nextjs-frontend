"use client";

import { Switch } from "@/components/ui/switch";
import { setBotPower } from "@/lib/actions";
import { connectToDatabase } from "@/lib/mongodb";
import { revalidatePath } from "next/cache";
import React, { useState } from "react";

const BotPowerSwitch = ({ initial }: { initial: boolean }) => {
  const [power, setPower] = useState<boolean>(initial);

  async function handleToggle() {
    const { data, error } = await setBotPower(!power);

    if (error !== null) {
      alert(error);
    }
    if (data) {
      setPower((prev) => !prev);
    //   alert("TOGGLED!!!");
    }
  }

  return <Switch checked={power} onCheckedChange={handleToggle} />;
};

export default BotPowerSwitch;
