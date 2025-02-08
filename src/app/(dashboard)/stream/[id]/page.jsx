import { getStreamDetailsAction } from "@/app/actions/audio";
import StremDetails from "@/views/stream/StremDetails";

const page = async ({ params }) => {
  const id = await params.id;
  const res = await getStreamDetailsAction(id);

  return <StremDetails data={res.stream} />;
};

export default page;

export async function generateMetadata({ params }) {
  // read route params
  const id = (await params).id;

  // fetch data
  const data = await getStreamDetailsAction(id);

  return {
    title: data?.stream?.title,
    description: data?.stream?.description,
  };
}
