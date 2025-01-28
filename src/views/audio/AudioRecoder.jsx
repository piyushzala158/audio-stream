"use client";

import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Markdown from "react-markdown";
import { AUDIOERRORMESSAGES, COMMONERRORMESSAGE } from "@/constants/message";

function AudioRecorder() {
  //states
  const [isRecording, setIsRecording] = useState(false);
  const [isPreparing, setIsPreparing] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [summary, setSummary] = useState(null);

  //refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioURLRef = useRef(audioURL);

  audioURLRef.current = audioURL;

  const startRecording = useCallback(async () => {
    setIsPreparing(true);
    setError(null);
    setSummary(null);
    try {
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: "browser" },
        audio: true,
      });

      if (!displayStream.getAudioTracks().length) {
        throw new Error(AUDIOERRORMESSAGES.noSystemMessage);
      }

      const micStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      const audioContext = new AudioContext();
      const systemSource = audioContext.createMediaStreamSource(displayStream);
      const micSource = audioContext.createMediaStreamSource(micStream);
      const destination = audioContext.createMediaStreamDestination();

      systemSource.connect(destination);
      micSource.connect(destination);

      const combinedStream = destination.stream;
      const recorder = new MediaRecorder(combinedStream, {
        mimeType: "audio/webm",
      });

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const url = URL.createObjectURL(audioBlob);

        setAudioURL(url);
        audioURLRef.current = url;
        audioChunksRef.current = [];
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : COMMONERRORMESSAGE.unknownerroroccurred
      );
    } finally {
      setIsPreparing(false);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // Wait for the onstop event to fire and create the audioBlob
      await new Promise((resolve) => setTimeout(resolve, 100));

      // Now that we have the audioBlob, we can analyze it
      await analyzeAudio();
    }
  }, [isRecording]);

  const analyzeAudio = async () => {
    if (!audioURLRef?.current) return;

    setIsAnalyzing(true);
    setError(null);
    setSummary(null);

    try {
      const response = await fetch(audioURLRef?.current);
      const audioBlob = await response.blob();

      const formData = new FormData();
      formData.append("audio", audioBlob, "recorded_audio.webm");

      const analysisResponse = await analyzeAudio(formData);
      if (!analysisResponse.ok) {
        throw new Error(AUDIOERRORMESSAGES.failedToAnalze);
      }

      const data = await analysisResponse.json();
      setSummary(data.summary);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : AUDIOERRORMESSAGES.errorWhileAnalysis
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      <div className="space-x-4">
        <Button onClick={startRecording} disabled={isRecording || isPreparing}>
          {isPreparing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Preparing...
            </>
          ) : (
            "Start Recording"
          )}
        </Button>
        <Button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </Button>
      </div>
      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {audioURL && <audio src={audioURL} controls className="mt-4" />}
      {isAnalyzing && (
        <div className="flex items-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing audio...
        </div>
      )}
      {summary && (
        <div className="w-full max-w-2xl mt-4">
          <h2 className="text-xl font-semibold mb-2">Analysis Summary:</h2>
          <Markdown>{summary}</Markdown>
        </div>
      )}
    </div>
  );
}

export default AudioRecorder;
