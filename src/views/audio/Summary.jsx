"use client";

import { saveAudioAction } from "@/app/actions/audio";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import Markdown from "react-markdown";

const Summary = ({ summary = "test data" }) => {
  console.log("summary: ", summary);
  const { data: currentUser } = useSession();
  const saveAudio = async () => {
    const res = await saveAudioAction({
      userId: currentUser.user?.id,
      title: summary?.title,
      description: summary?.description,
      summary: summary?.summary,
    });
    console.log("res: ", res);
  };
  return (
    <div className="w-full max-w-2xl mt-4">
      <h2 className="text-xl font-semibold mb-2">Analysis Summary:</h2>
      <Markdown>{summary?.summary}</Markdown>
      <Button onClick={saveAudio}>Save</Button>
    </div>
  );
};

export default Summary;
