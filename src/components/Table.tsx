import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  TableContainer,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import Card from "./Card";

interface IDefaultTable {
  children: ReactNode;
  props: {
    tableName: string;
    header: string[];
  };
}
const DefaultTable = ({ children, props }: IDefaultTable) => {
  return (
    <Card props={{ title: props.tableName }}>
      <TableContainer>
        <Table variant="striped" colorScheme="blackAlpha">
          <Thead>
            <Tr>
              {props.header.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
              <Th w={10}>Ações</Th>
            </Tr>
          </Thead>
          <Tbody>{children}</Tbody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default DefaultTable;
