import { Offer } from "@prisma/client";
import { GetServerSideProps } from "next";
import Inputs from "../create-offer";

const UpdateOffer = ({data}: {data: Offer}) => {
  console.log(data);
  if (!data) return <div>hleður</div>;
  return (
    <div>
      <Inputs offer={data} />
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  console.log("query ", query.id);
  const offer = await prisma?.offer.findFirst({
    where: {
      id: query.id as string,
    },
  });
  console.log(offer);
  return {
    props: {
      data: {
        ...offer,
      },
    },
  };
};

export default UpdateOffer;
