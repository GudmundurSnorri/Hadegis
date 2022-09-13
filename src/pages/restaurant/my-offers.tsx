import { Offer } from "@prisma/client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { trpc } from "../../utils/trpc";

const MyOffers = () => {
  const { data: session, status } = useSession();
  const [offers, setOffers] = useState<Offer[]>();
  const deleteOffer = trpc.useMutation(["example.deleteOffer"]);
  const activeStatusOffer = trpc.useMutation(["example.setActiveStatus"]);

  const { isLoading, isSuccess, isError } = trpc.useQuery(
    ["example.getOfferByRestaurant", { userId: session?.user?.id || "" }],
    {
      onSuccess(data) {
        setOffers(data);
      },
    }
  );
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

  if (!offers || isLoading || !isSuccess || isError) {
    return "Hleður...";
  }

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

  return (
    <div>
      {status === "authenticated"
        ? offers.map((item) => (
            <li key={item.id} className="flex-col">
              <h1>{item.title}</h1>
              <h1>{item.price}</h1>
              <h1>{item.active ? "active" : "Not active"}</h1>
              <Link href={`/restaurant/update-offer/${item.id}`}>
                Uppfæra tilboð
              </Link>
              <div>
                <button
                  onClick={() => handleActiveStatus(item.id, item.active)}
                >
                  Gera aktíft
                </button>
              </div>
              <div>
                <button onClick={() => handleDelete(item.id)}>
                  Eyða tilboði.
                </button>
              </div>
            </li>
          ))
        : "Þú mátt ekki skoða þetta!"}
    </div>
  );
};

export default MyOffers;
