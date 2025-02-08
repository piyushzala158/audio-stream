import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React from "react";

const StremCard = ({ data }) => {
  return (
    <Card>
      <Link href={`/stream/${data.id}`}>
        <CardHeader>
          <CardTitle>{data?.title}</CardTitle>
          {data?.description && (
            <CardDescription>
              {data?.description?.slice(0, 200) + "..."}
            </CardDescription>
          )}
        </CardHeader>
        <CardFooter>
          <p>{new Date(data?.created_at).toLocaleDateString()}</p>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default StremCard;
