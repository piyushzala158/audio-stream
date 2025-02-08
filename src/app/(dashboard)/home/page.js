import { getAllStreamsAction } from "@/app/actions/audio";
import Home from "@/views/home";

export default async function HomePage() {
  const res = await getAllStreamsAction();
  const data = await res.json()
  return <Home data={data} />;
}
