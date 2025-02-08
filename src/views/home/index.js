import React from "react";
import StremCard from "./StremCard";

const Home = ({ data }) => {
  console.log("data: ", data?.streams);
  return (
    <div>
      <p>Your strems</p>
      {data?.streams?.length > 0 &&
        data?.streams?.map((strem) => <StremCard key={strem?.id} data={strem} />)}
    </div>
  );
};

export default Home;
