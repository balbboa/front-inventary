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

export const MODEL_INITIAL_DATA: any = {
  name: "",
};

// Componente principal
const CadastrarModelos = () => {
  // hooks

  // Organização
  const [registerModel, setRegisterModel] = useState(MODEL_INITIAL_DATA);
  // Requisisões das organizações
  const [modelRequest, setModelRequest] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const model = await getModels();
    console.log(model);
    setModelRequest(model);
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar modelo" }}>
      <Card
        props={{
          title: isEdit ? "Editar modelo" : "Cadastrar modelo",
          maxW: 500,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Modelo</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
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
            <Button
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
                ml={5} p={2}
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
          header: ["name"],
          count: modelRequest?.lenght,
        }}
      >
        {modelRequest?.length > 0 ? (
          modelRequest.map((model: IModelRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td width={5}>{model.id}</Td>
                  <Td>{model.name}</Td>
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
