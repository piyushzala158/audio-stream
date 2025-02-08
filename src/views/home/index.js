import React from "react";
import StremCard from "./StremCard";
import { auth } from "@/auth";

const Home = async ({ data }) => {
  const { user } = await auth();

  return (
    <div className="">
      <p className="pb-4 text-lg font-bold ">{`${user.name}'s strems`}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data?.streams?.length > 0 &&
          data?.streams?.map((strem) => (
            <StremCard key={strem?.id} data={strem} />
          ))}
      </div>
    </div>
  );
};

export default Home;
