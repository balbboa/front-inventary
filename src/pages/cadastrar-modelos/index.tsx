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
import Layout from "../../components/Layout";
// Componentes
import Card from "../../components/Card";
import DefaultTable from "../../components/Table";
// Cores
import { colors } from "../../utils/colors";
// Interfaces
import { IModelRegister } from "../../functions/models/data/modelsInterfaces";
// Funções
import handleEditModel, {
  getModels,
  handleSaveModel,
  handleDeleteModel,
} from "../../functions/models/data/modelsFunctions";
import { getManufacturers } from "../../functions/manufacturers/data/manufacturersFunctions";
import { IManufacturerRegister } from "../../functions/manufacturers/data/manufacturersInterfaces";
import { getGroups } from "../../functions/groups/data/groupsFunctions";
import { IGroupRegister } from "../../functions/groups/data/groupsInterfaces";

export const MODEL_INITIAL_DATA: IModelRegister = {
  name: "",
  sku: "",
  description: "",
  manufacturersId: "",
  groupId: "",
};

// Componente principal
const CadastrarModelos = () => {
  // hooks

  // Organização
  const [registerModel, setRegisterModel] =
    useState<IModelRegister>(MODEL_INITIAL_DATA);
  // Requisisões das organizações
  const [modelRequest, setModelRequest] = useState<any>();
  const [optionsManufacturers, setOptionsManufacturers] = useState<any>();
  const [optionsGroups, setOptionsGroups] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const model = await getModels();
    setModelRequest(model);
  };

  const handleSelectManufacturers = async () => {
    // Obtem os fabricantes para o select
    const manufacturer = await getManufacturers();
    setOptionsManufacturers(manufacturer);
  };

  const handleSelectGroups = async () => {
    // Obtem os grupos para o select
    const groups = await getGroups();
    setOptionsGroups(groups);
  };

  useEffect(() => {
    handleGetData();
    handleSelectManufacturers();
    handleSelectGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar modelo" }}>
      <Card
        props={{
          title: isEdit ? "Editar modelo" : "Cadastrar modelo",
          maxW: 1000,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Modelo</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              placeholder="Nome"
              type="text"
              value={registerModel.name}
              isInvalid={formError === "registerModel"}
              onChange={(event) => {
                setRegisterModel({
                  ...registerModel,
                  name: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="SKU"
              type="text"
              value={registerModel.sku}
              isInvalid={formError === "registerModel"}
              onChange={(event) => {
                setRegisterModel({
                  ...registerModel,
                  sku: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Descrição"
              type="text"
              value={registerModel.description}
              isInvalid={formError === "registerModel"}
              onChange={(event) => {
                setRegisterModel({
                  ...registerModel,
                  description: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Select
              ml={5}
              placeholder="Fabricante"
              value={registerModel.manufacturersId}
              isInvalid={formError === "registerModel"}
              onChange={(event) => {
                setRegisterModel({
                  ...registerModel,
                  manufacturersId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsManufacturers?.map((option: IManufacturerRegister) => (
                <option key={option.id} value={option.id}>
                  {option.name} - {option.id}
                </option>
              ))}
            </Select>
            <Select
              ml={5}
              placeholder="Grupo"
              value={registerModel.groupId}
              isInvalid={formError === "registerModel"}
              onChange={(event) => {
                setRegisterModel({
                  ...registerModel,
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
            <Button
              minW={100}
              leftIcon={isEdit ? <FiEdit /> : <BsPlusSquare />}
              colorScheme="green"
              variant="solid"
              onClick={() => {
                isEdit
                  ? handleEditModel(
                      registerModel,
                      setModelRequest,
                      setRegisterModel,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveModel(
                      registerModel,
                      setModelRequest,
                      setRegisterModel,
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
                  handleDeleteModel(
                    registerModel,
                    setModelRequest,
                    setRegisterModel,
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
          tableName: "Modelos",
          header: ["Nome", "SKU", "Descrição", "Fabricante", "Grupo"],
        }}
      >
        {modelRequest?.length > 0 ? (
          modelRequest.map((model: IModelRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td>{model.name}</Td>
                  <Td>{model.sku}</Td>
                  <Td>{model.description}</Td>
                  <Td>{model.manufacturersId}</Td>
                  <Td>{model.groupId}</Td>
                  <Td>
                    <Button
                      leftIcon={<FiEdit />}
                      colorScheme={"gray"}
                      variant="solid"
                      bg={colorButtonEdit}
                      onClick={() => {
                        toast({
                          title: "Modelo " + model.name + " selecionada",
                          status: "info",
                          position: "top",
                          isClosable: true,
                        });
                        setRegisterModel(model), setIsEdit(true);
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
            <Td>Nenhum modelo</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarModelos;

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
