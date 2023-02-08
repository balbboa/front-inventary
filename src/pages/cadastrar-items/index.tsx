// Chakra UI
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Td,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
//NextJS
import { GetServerSideProps } from "next";
// Cookies
import { parseCookies } from "nookies";
// React
import { Fragment, useEffect, useState } from "react";
// Icones
import { BsPlusSquare } from "react-icons/bs";
import { FiEdit, FiTrash } from "react-icons/fi";
// Layout
import Layout from "../../components/Layout";
// Componentes
import Card from "../../components/Card";
import DefaultTable from "../../components/Table";
// Cores
import { colors } from "../../utils/colors";
// Interfaces
import { IItemRegister } from "../../functions/items/data/itemsInterfaces";
// Funções
import handleEditItem, {
  getItems,
  handleSaveItem,
  handleDeleteItem,
} from "../../functions/items/data/itemsFunctions";
import { getModels } from "../../functions/models/data/modelsFunctions";
import { IModelRegister } from "../../functions/models/data/modelsInterfaces";
import { getStatus } from "../../functions/status/data/statusFunctions";
import { IStatusRegister } from "../../functions/status/data/statusInterfaces";

export const ITEM_INITIAL_DATA: any = {
  serialNumber: "",
  tombNumber: "",
  imei: "",
  obs: "",
  modelsId: "",
  statusId: "",
};

// Componente principal
const CadastrarItems = () => {
  // hooks

  // Organização
  const [registerItem, setRegisterItem] = useState(ITEM_INITIAL_DATA);
  // Requisisões das organizações
  const [itemRequest, setItemRequest] = useState<any>();
  const [optionsModels, setOptionsModels] = useState<any>();
  const [optionsStatus, setOptionsStatus] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const item = await getItems();
    setItemRequest(item);
  };

  const handleSelectModels = async () => {
    // Obtem os grupos para o select
    const models = await getModels();
    setOptionsModels(models);
  };

  const handleSelectStatus = async () => {
    // Obtem os grupos para o select
    const status = await getStatus();
    setOptionsStatus(status);
  };

  useEffect(() => {
    handleGetData();
    handleSelectModels();
    handleSelectStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar item" }}>
      <Card
        props={{
          title: isEdit ? "Editar item" : "Cadastrar item",
          maxW: 1000,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Item</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              placeholder="N° de série"
              type="text"
              value={registerItem.serialNumber}
              isInvalid={formError === "registerItem"}
              onChange={(event) => {
                setRegisterItem({
                  ...registerItem,
                  serialNumber: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              placeholder="N° tombamento"
              marginLeft={5}
              type="text"
              value={registerItem.tombNumber}
              isInvalid={formError === "registerItem"}
              onChange={(event) => {
                setRegisterItem({
                  ...registerItem,
                  tombNumber: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              placeholder="Imei"
              marginLeft={5}
              type="text"
              value={registerItem.imei}
              isInvalid={formError === "registerItem"}
              onChange={(event) => {
                setRegisterItem({
                  ...registerItem,
                  imei: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              placeholder="Obs"
              marginLeft={5}
              type="text"
              value={registerItem.obs}
              isInvalid={formError === "registerItem"}
              onChange={(event) => {
                setRegisterItem({
                  ...registerItem,
                  obs: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Select
              ml={5}
              placeholder="Modelo"
              value={registerItem.modelsId}
              isInvalid={formError === "registerItem"}
              onChange={(event) => {
                setRegisterItem({
                  ...registerItem,
                  modelsId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsModels?.map((option: IModelRegister) => (
                <option key={option.id} value={option.id}>
                  {option.name} - {option.id}
                </option>
              ))}
            </Select>
            <Select
              ml={5}
              placeholder="Status"
              value={registerItem.statusId}
              isInvalid={formError === "registerItem"}
              onChange={(event) => {
                setRegisterItem({
                  ...registerItem,
                  statusId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsStatus?.map((option: IStatusRegister) => (
                <option key={option.id} value={option.id}>
                  {option.name} - {option.id}
                </option>
              ))}
            </Select>
            <Button
              minW={100}
              leftIcon={isEdit ? <FiEdit /> : <BsPlusSquare />}
              colorScheme="green"
              variant="solid"
              onClick={() => {
                isEdit
                  ? handleEditItem(
                      registerItem,
                      setItemRequest,
                      setRegisterItem,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveItem(
                      registerItem,
                      setItemRequest,
                      setRegisterItem,
                      toast,
                      setFormError
                    );
              }}
              ml={5}
            >
              Salvar
            </Button>
            {isEdit ? (
              <Button
                minW={100}
                leftIcon={<FiTrash />}
                colorScheme="red"
                variant="solid"
                onClick={() => {
                  handleDeleteItem(
                    registerItem,
                    setItemRequest,
                    setRegisterItem,
                    setIsEdit,
                    toast
                  );
                }}
                ml={5}
                p={2}
              >
                Deletar
              </Button>
            ) : null}
          </Box>
        </FormControl>
      </Card>
      <DefaultTable
        props={{
          tableName: "Itens",
          header: [
            "Número de série",
            "Número tombamento",
            "Imei",
            "Obs",
            "Modelo",
            "Status",
          ],
        }}
      >
        {itemRequest?.length > 0 ? (
          itemRequest.map((item: IItemRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td>{item.serialNumber}</Td>
                  <Td>{item.tombNumber}</Td>
                  <Td>{item.imei}</Td>
                  <Td>{item.obs}</Td>
                  <Td>{item.modelsId}</Td>
                  <Td>{item.statusId}</Td>
                  <Td>
                    <Button
                      leftIcon={<FiEdit />}
                      colorScheme={"gray"}
                      variant="solid"
                      bg={colorButtonEdit}
                      onClick={() => {
                        toast({
                          title: "Item " + item.serialNumber + " selecionada",
                          status: "info",
                          position: "top",
                          isClosable: true,
                        });
                        setRegisterItem(item), setIsEdit(true);
                      }}
                    >
                      Editar
                    </Button>
                  </Td>
                </Tr>
              </Fragment>
            );
          })
        ) : (
          <Tr>
            <Td>Nenhum item</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarItems;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ["nextauth.token"]: token } = parseCookies(context);

  // Verifica se o usuário está logado
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
