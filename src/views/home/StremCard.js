import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getDateTime } from "@/utils/getDateTime";
import Link from "next/link";
import React from "react";

const StremCard = ({ data }) => {
  return (
    <Link href={`/stream/${data.id}`} className="flex">
      <Card className="flex-1 flex flex-col  ">
        <CardHeader>
          <CardTitle>{data?.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 text-sm opacity-90">
          {data?.description?.slice(0, 200)}
          {data?.description?.length > 200 ? "..." : ""}
        </CardContent>
        <CardFooter className='text-sm opacity-70'>{getDateTime(data?.created_at)}</CardFooter>
      </Card>
    </Link>
  );
};

export default StremCard;
