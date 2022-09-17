import { Offer } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import AppLayout from "../../components/app-layout/AppLayout";
import MyOffersList from "../../components/auth-my-offers-list/MyOffersList";
import MyOffersListRow from "../../components/auth-my-offers-list/MyOffersListRow";
import { trpc } from "../../utils/trpc";

const MyOffers = () => {
  const { data: session, status } = useSession();
  const [offers, setOffers] = useState<Offer[]>();
  const deleteOffer = trpc.useMutation(["example.deleteOffer"]);
  const activeStatusOffer = trpc.useMutation(["example.setActiveStatus"]);
  const isAuthenticated = status === "authenticated";
  
  const { isLoading, isSuccess, isError } = trpc.useQuery(
    ["example.getOfferByRestaurant", { userId: session?.user?.id || "" }],
    {
      onSuccess(data) {
        setOffers(data);
      },
    }
  );

  if (!offers || isLoading || !isSuccess || isError) {
    return "Hleður...";
  }
  
  
  const handleDelete = async (offerId: string) => {
    deleteOffer.mutate(
      { offerId },
      {
        onSuccess() {
          const newOffers = offers?.filter((item) => item.id !== offerId);
          setOffers(newOffers);
        },
      }
    );
  };

  const handleActiveStatus = (id: string, active: boolean) => {
    activeStatusOffer.mutate(
      { id, activeStatus: !active },
      {
        onSuccess() {
          offers.map((item) => {
            if (item.id !== id) return item;
            else {
              item.active = !active;
              return item;
            }
          });
        },
      }
    );
  };
  console.log(offers);
  return (
    <AppLayout>
      <MyOffersList>
        {isAuthenticated
          ? offers.map((item) => (
              <MyOffersListRow
                key={item.id}
                typeOfOffer={item.typeOfOffer}
                id={item.id}
                name={item.title}
                price={item.price}
                isActive={item.active}
                makeActive={() => handleActiveStatus(item.id, item.active)}
                deleteOffer={() => handleDelete(item.id)}
              />
            ))
          : "Þú mátt ekki skoða þetta!"}
      </MyOffersList>
    </AppLayout>
  );
};

export default MyOffers;
