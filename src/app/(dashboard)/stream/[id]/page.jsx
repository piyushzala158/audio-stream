import { getStreamDetailsAction } from "@/app/actions/audio";
import StremDetails from "@/views/stream/StremDetails";
import React from "react";

const page = async ({ params }) => {
  const id = await params.id;

  const res = await getStreamDetailsAction(id);

  return <StremDetails data={res.stream} />;
};

export default page;
