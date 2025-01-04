import React from "react";
import AudioRecorder from "./AudioRecoder";

const Audio = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="!text-2xl text-center !font-bold my-4">
        Your Meeting buddy
      </h1>
      <AudioRecorder />
    </div>
  );
};

export default Audio;
