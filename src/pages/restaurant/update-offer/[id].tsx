import { Offer } from "@prisma/client";
import { GetServerSideProps } from "next";
import AppLayout from "../../../components/app-layout/AppLayout";
import Inputs from "../create-offer";

const UpdateOffer = ({data}: {data: Offer}) => {
  console.log(data);
  if (!data) return <div>hleður</div>;
  return (
      <Inputs offer={data} />
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
