// Chakra UI
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Td,
  Tr,
  useColorModeValue,
  useToast,
  Select,
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
import Layout from "../../../components/Layout";
// Componentes
import Card from "../../../components/Card";
import DefaultTable from "../../../components/Table";
// Cores
import { colors } from "../../../utils/colors";
// Interfaces
import { IItemDemandRegister } from "../../../functions/itemDemands/data/itemDemandsInterfaces";
// Funções
import handleEditItemDemand, {
  getItemDemands,
  handleSaveItemDemand,
  handleDeleteItemDemand,
} from "../../../functions/itemDemands/data/itemDemandsFunctions";
import { getGroups } from "../../../functions/groups/data/groupsFunctions";
import { IGroupRegister } from "../../../functions/groups/data/groupsInterfaces";

export const ITEM_DEMAND_INITIAL_DATA: IItemDemandRegister = {
  groupId: "",
  amount: "",
  justify: "",
};

// Componente principal
const CadastrarItemDemandas = () => {
  // hooks

  // Organização
  const [registerItemDemand, setRegisterItemDemand] =
    useState<IItemDemandRegister>(ITEM_DEMAND_INITIAL_DATA);
  // Requisisões das organizações
  const [itemDemandRequest, setItemDemandRequest] = useState<any>();
  const [optionsGroups, setOptionsGroups] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const itemDemand = await getItemDemands();
    setItemDemandRequest(itemDemand);
  };

  const handleSelectGroups = async () => {
    // Obtem os grupos para o select
    const groups = await getGroups();
    setOptionsGroups(groups);
  };

  useEffect(() => {
    handleGetData();
    handleSelectGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar demanda de item" }}>
      <Card
        props={{
          title: isEdit
            ? "Editar demanda de item"
            : "Cadastrar demanda de item",
          maxW: 1000,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Demanda de Item</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Select
              placeholder="Grupo"
              value={registerItemDemand.groupId}
              isInvalid={formError === "registerItemDemand"}
              onChange={(event) => {
                setRegisterItemDemand({
                  ...registerItemDemand,
                  groupId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsGroups?.map((option: IGroupRegister) => (
                <option key={option.id} value={option.id}>
                  {option.name} - {option.id}
                </option>
              ))}
            </Select>
            <Input
              ml={5}
              placeholder="Quantidade"
              type="text"
              value={registerItemDemand.amount}
              isInvalid={formError === "registerItemDemand"}
              onChange={(event) => {
                setRegisterItemDemand({
                  ...registerItemDemand,
                  amount: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Justificativa"
              type="text"
              value={registerItemDemand.justify}
              isInvalid={formError === "registerItemDemand"}
              onChange={(event) => {
                setRegisterItemDemand({
                  ...registerItemDemand,
                  justify: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Button
              minW={100}
              leftIcon={isEdit ? <FiEdit /> : <BsPlusSquare />}
              colorScheme="green"
              variant="solid"
              onClick={() => {
                isEdit
                  ? handleEditItemDemand(
                      registerItemDemand,
                      setItemDemandRequest,
                      setRegisterItemDemand,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveItemDemand(
                      registerItemDemand,
                      setItemDemandRequest,
                      setRegisterItemDemand,
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
                  handleDeleteItemDemand(
                    registerItemDemand,
                    setItemDemandRequest,
                    setRegisterItemDemand,
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
          tableName: "ItemDemandas",
          header: ["Grupo", "Quantidade", "Justificativa"],
        }}
      >
        {itemDemandRequest?.length > 0 ? (
          itemDemandRequest.map(
            (itemDemand: IItemDemandRegister, index: number) => {
              return (
                <Fragment key={index}>
                  <Tr>
                    <Td>{itemDemand.groupId}</Td>
                    <Td>{itemDemand.amount}</Td>
                    <Td>{itemDemand.justify}</Td>
                    <Td>
                      <Button
                        leftIcon={<FiEdit />}
                        colorScheme={"gray"}
                        variant="solid"
                        bg={colorButtonEdit}
                        onClick={() => {
                          toast({
                            title:
                              "Demanda de " +
                              itemDemand.groupId +
                              " selecionada",
                            status: "info",
                            position: "top",
                            isClosable: true,
                          });
                          setRegisterItemDemand(itemDemand), setIsEdit(true);
                        }}
                      >
                        Editar
                      </Button>
                    </Td>
                  </Tr>
                </Fragment>
              );
            }
          )
        ) : (
          <Tr>
            <Td>Nenhuma demanda de item</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarItemDemandas;

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
