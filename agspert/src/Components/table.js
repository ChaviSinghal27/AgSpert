import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
export default function SaleTable({
  editHandler,
  completeSaleTable,
  viewHandler,
  Orders,
}) {
  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Customer Name</Th>
              <Th>Price</Th>
              <Th>Last Modified</Th>
              <Th>Edit/View</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Orders.map((order, index) => (
              <Tr key={order.id}>
                <Td>{index + 1} </Td>
                <Td>{order.customerName} </Td>
                <Td>{order.sellingPrice} </Td>
                <Td>{order.date}</Td>

                <Td>
                  {completeSaleTable ? (
                    <HamburgerIcon onClick={() => viewHandler(order.id)} />
                  ) : (
                    <HamburgerIcon onClick={() => editHandler(order.id)} />
                  )}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
}
