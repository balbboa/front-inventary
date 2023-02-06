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
import { IOpmRegister } from "../../functions/opms/data/opmsInterfaces";
// Funções
import handleEditOpm, {
  getOpms,
  handleSaveOpm,
  handleDeleteOpm,
} from "../../functions/opms/data/opmsFunctions";

export const OPM_INITIAL_DATA: any = {
  name: "",
};

// Componente principal
const CadastrarOpms = () => {
  // hooks

  // Organização
  const [registerOpm, setRegisterOpm] = useState(OPM_INITIAL_DATA);
  // Requisisões das organizações
  const [opmRequest, setOpmRequest] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const opm = await getOpms();
    console.log(opm);
    setOpmRequest(opm);
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar opm" }}>
      <Card
        props={{
          title: isEdit ? "Editar opm" : "Cadastrar opm",
          maxW: 500,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Opm</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              type="text"
              value={registerOpm.name}
              isInvalid={formError === "registerOpm"}
              onChange={(event) => {
                setRegisterOpm({
                  ...registerOpm,
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
                  ? handleEditOpm(
                      registerOpm,
                      setOpmRequest,
                      setRegisterOpm,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveOpm(
                      registerOpm,
                      setOpmRequest,
                      setRegisterOpm,
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
                  handleDeleteOpm(
                    registerOpm,
                    setOpmRequest,
                    setRegisterOpm,
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
          tableName: "Opms",
          header: ["name"],
          count: opmRequest?.lenght,
        }}
      >
        {opmRequest?.length > 0 ? (
          opmRequest.map((opm: IOpmRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td width={5}>{opm.id}</Td>
                  <Td>{opm.name}</Td>
                  <Td>
                    <Button
                      leftIcon={<FiEdit />}
                      colorScheme={"gray"}
                      variant="solid"
                      bg={colorButtonEdit}
                      onClick={() => {
                        toast({
                          title: "Opm " + opm.name + " selecionada",
                          status: "info",
                          position: "top",
                          isClosable: true,
                        });
                        setRegisterOpm(opm), setIsEdit(true);
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
            <Td>Nenhuma opm</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarOpms;

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
