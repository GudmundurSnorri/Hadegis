import { trpc } from "../utils/trpc";

const AllOffers = () => {
  const { data, isLoading, isSuccess, isError } = trpc.useQuery([
    "example.getAll",
  ]);

  if (isLoading || !isSuccess || isError) {
    return "Hleður...";
  }
  return (
    <div>
      {data.map((item) => (
        <>
          <h1>{item.title}</h1>
          <h3>{item.description}</h3>
        </>
      ))}
    </div>
  );
};
export default AllOffers;
