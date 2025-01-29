import { Loader2 } from "lucide-react";
import React from "react";

const CommonLoader = () => {
  return (
    <div className="flex items-center">
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      Analyzing audio...
    </div>
  );
};

export default CommonLoader;
