import { TypeOfOffer } from "@prisma/client";
import Link from "next/link";
import { IconTrash, IconEdit } from "@tabler/icons";
import { Switch } from "@mantine/core";

type ListRowProps = {
  id: string;
  name: string;
  price: number;
  isActive: boolean;
  typeOfOffer: TypeOfOffer;
  makeActive: () => void;
  deleteOffer: () => void;
};
const MyOffersListRow = ({
  name,
  price,
  isActive,
  makeActive,
  deleteOffer,
  id,
  typeOfOffer,
}: ListRowProps) => (
  <tr className="hover:bg-slate-100">
    <td className="px-5 py-5 border-b border-gray-200 text-sm">
      <div className="flex items-center">
        <div className="ml-3">
          <p className="text-gray-900 whitespace-no-wrap">{name}</p>
        </div>
      </div>
    </td>
    <td className="px-5 py-5 border-b border-gray-200  text-sm">
      <p className="text-gray-900 whitespace-no-wrap">{price}</p>
    </td>
    <td className="px-5 py-5 border-b border-gray-200  text-sm">
      <Switch checked={isActive} color="lime" onChange={() => makeActive() } />
    </td>
    <td className="px-5 py-5 border-b border-gray-200  text-sm">
      {typeOfOffer}
    </td>
    <td className="px-5 py-5 border-b border-gray-200  text-sm">
      {typeOfOffer}
    </td>
    <td className="px-5 py-5 border-b border-gray-200 text-sm text-purple-600  ">
      <Link href={`/restaurant/update-offer/${id}`}>
        <IconEdit className="hover:cursor-pointer" />
      </Link>
    </td>
    <td className="px-5 py-5 border-b border-gray-200  text-sm">
      <button onClick={() => deleteOffer()}>
        <IconTrash color="red" className="hover:cursor-pointer" />
      </button>
    </td>
  </tr>
);

export default MyOffersListRow;
