import { ANALYZEAUDIO } from "@/constants/urls/audio";

export const analyzeAudio = async (data = {}) => {
  return await fetch(ANALYZEAUDIO.endpoint, {
    method: ANALYZEAUDIO.method,
    body: data,
  });
};
