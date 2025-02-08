import { ANALYZEAUDIO } from "@/constants/urls/audio";

export const analyzeAudioAction = async (data = {}) => {
    return await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/${ANALYZEAUDIO.endpoint}`,
      {
        method: ANALYZEAUDIO.method,
        body: data,
      }
    );
  };