"use server";
import {
  ANALYZEAUDIO,
  GET_ALL_STREAMS,
  SAVE_STREAM,
} from "@/constants/urls/audio";
import { auth } from "@/auth";

export const analyzeAudioAction = async (data = {}) => {
  return await fetch(ANALYZEAUDIO.endpoint, {
    method: ANALYZEAUDIO.method,
    body: data,
  });
};

export const saveAudioAction = async (data = {}) => {
  return await fetch(SAVE_STREAM.endpoint, {
    method: SAVE_STREAM.method,
    body: JSON.stringify(data),
  });
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
