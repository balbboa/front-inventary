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
import { IManufacturerRegister } from "../../functions/manufacturers/data/manufacturersInterfaces";
// Funções
import handleEditManufacturer, {
  getManufacturers,
  handleSaveManufacturer,
  handleDeleteManufacturer,
} from "../../functions/manufacturers/data/manufacturersFunctions";

export const MANUFACTURER_INITIAL_DATA: any = {
  name: "",
};

// Componente principal
const CadastrarFabricantes = () => {
  // hooks

  // Organização
  const [registerManufacturer, setRegisterManufacturer] = useState(
    MANUFACTURER_INITIAL_DATA
  );
  // Requisisões das organizações
  const [manufacturerRequest, setManufacturerRequest] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem os fabricantes
    const manufacturer = await getManufacturers();
    setManufacturerRequest(manufacturer);
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar fabricante" }}>
      <Card
        props={{
          title: isEdit ? "Editar fabricante" : "Cadastrar fabricante",
          maxW: 500,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Fabricante</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              type="text"
              value={registerManufacturer.name}
              isInvalid={formError === "registerManufacturer"}
              onChange={(event) => {
                setRegisterManufacturer({
                  ...registerManufacturer,
                  name: event.currentTarget.value.toUpperCase(),
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
                  ? handleEditManufacturer(
                      registerManufacturer,
                      setManufacturerRequest,
                      setRegisterManufacturer,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveManufacturer(
                      registerManufacturer,
                      setManufacturerRequest,
                      setRegisterManufacturer,
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
                  handleDeleteManufacturer(
                    registerManufacturer,
                    setManufacturerRequest,
                    setRegisterManufacturer,
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
          tableName: "Fabricantes",
          header: ["Nome"],
        }}
      >
        {manufacturerRequest?.length > 0 ? (
          manufacturerRequest.map(
            (manufacturer: IManufacturerRegister, index: number) => {
              return (
                <Fragment key={index}>
                  <Tr>
                    <Td>{manufacturer.name}</Td>
                    <Td>
                      <Button
                        leftIcon={<FiEdit />}
                        colorScheme={"gray"}
                        variant="solid"
                        bg={colorButtonEdit}
                        onClick={() => {
                          toast({
                            title:
                              "Fabricante " +
                              manufacturer.name +
                              " selecionado",
                            status: "info",
                            position: "top",
                            isClosable: true,
                          });
                          setRegisterManufacturer(manufacturer),
                            setIsEdit(true);
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
            <Td>Nenhum fabricante</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarFabricantes;

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
