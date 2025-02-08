import { Separator } from "@/components/ui/separator";
import React from "react";
import Markdown from "react-markdown";

const StremDetails = ({ data = null }) => {
  return (
    <div className=" shadow-lg rounded-2xl p-6 max-w-3xl mx-auto custom-scrollbar text-white">
      <h2 className="text-2xl font-bold text-gray-200 mb-4">Meeting Details</h2>
      <Separator className="mb-4 border-gray-700" />

      <h3 className="text-xl font-semibold text-gray-300">{data?.title}</h3>
      <Separator className="my-4 border-gray-700" />

      <p className="text-lg text-gray-400 leading-relaxed">
        <span className="font-semibold text-gray-300">Description: </span>
        {data?.description}
      </p>
      <Separator className="my-4 border-gray-700" />

      <div className=" p-4 rounded-lg">
        <Markdown className="text-md text-gray-300 leading-relaxed">
          {data?.summary}
        </Markdown>
      </div>
    </div>
  );
};

export default StremDetails;
