import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

const StremCard = ({ data }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{data?.title}</CardTitle>
        <CardDescription>{data?.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <p>{new Date(data?.created_at).toLocaleDateString()}</p>
      </CardFooter>
    </Card>
  );
};

export default StremCard;
