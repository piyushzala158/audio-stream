"use server";
import { SAVE_STREAM } from "@/constants/urls/audio";
import { auth } from "@/auth";

export const saveAudioAction = async (data = {}) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/${SAVE_STREAM.endpoint}`,
    {
      method: SAVE_STREAM.method,
      body: JSON.stringify(data),
    }
  );

  return res?.json();
};

export const getAllStreamsAction = async () => {
  const session = await auth();

  return await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-all-streams?userId=${session?.user.id}`,
    {
      method: "GET",
    }
  );
};

export const getStreamDetailsAction = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-stream-details/${id}`,
    {
      method: "GET",
    }
  );
  return res.json();
};
