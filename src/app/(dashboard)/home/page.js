import { getAllStreamsAction } from "@/app/actions/audio";
import Image from "next/image";

export default async function Home() {
  const res = await getAllStreamsAction();
  console.log("res: ", res);
  return <div></div>;
}
