import { Table } from "@mantine/core";

const Headers = [
  "Nafn",
  "Verð",
  "Status",
  "Tegund",
  "Gilt",
  "Breyta",
];

const MyOffersList = ({ children }: { children: React.ReactNode }) => (
  <Table highlightOnHover>
    <thead>
      <tr>
        {Headers.map((name) => (
          <th key={name}>{name}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
);

export default MyOffersList;
