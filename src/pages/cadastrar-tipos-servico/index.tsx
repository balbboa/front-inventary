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
import { IServiceTypeRegister } from "../../functions/serviceTypes/data/serviceTypesInterfaces";
// Funções
import handleEditServiceType, {
  getServiceTypes,
  handleSaveServiceType,
  handleDeleteServiceType,
} from "../../functions/serviceTypes/data/serviceTypesFunctions";
import getStatus from "../../functions/status/data/statusFunctions";
import { getImmobiles } from "../../functions/immobiles/data/immobilesFunctions";
import { IImmobileRegister } from "../../functions/immobiles/data/immobilesInterfaces";
import { IStatusRegister } from "../../functions/status/data/statusInterfaces";
import { getSuppliers } from "../../functions/suppliers/data/suppliersFunctions";
import { ISupplierRegister } from "../../functions/suppliers/data/suppliersInterfaces";

export const SERVICE_INITIAL_DATA: IServiceTypeRegister = {
  name: "",
};

// Componente principal
const CadastrarTiposServico = () => {
  // hooks

  // Organização
  const [registerServiceType, setRegisterServiceType] =
    useState<IServiceTypeRegister>(SERVICE_INITIAL_DATA);
  // Requisisões das organizações
  const [serviceTypeRequest, setServiceTypeRequest] = useState<any>();
  const [optionsStatus, setOptionsStatus] = useState<any>();
  const [optionsImmobiles, setOptionsImmobiles] = useState<any>();
  const [optionsSuppliers, setOptionsSuppliers] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const serviceType = await getServiceTypes();
    setServiceTypeRequest(serviceType);
  };

  const handleSelectStatus = async () => {
    // Obtem os status para o select
    const status = await getStatus();
    setOptionsStatus(status);
  };

  const handleSelectImmobiles = async () => {
    // Obtem os grupos para o select
    const immobiles = await getImmobiles();
    setOptionsImmobiles(immobiles);
  };

  const handleSelectSuppliers = async () => {
    // Obtem os grupos para o select
    const suppliers = await getSuppliers();
    setOptionsSuppliers(suppliers);
  };

  useEffect(() => {
    handleGetData();
    handleSelectStatus();
    handleSelectImmobiles();
    handleSelectSuppliers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar tipo de serviço" }}>
      <Card
        props={{
          title: isEdit
            ? "Editar tipo de serviço"
            : "Cadastrar tipo de serviço",
          maxW: 500,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Tipo de Serviço</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              placeholder="Nome"
              type="text"
              value={registerServiceType.name}
              isInvalid={formError === "registerServiceType"}
              onChange={(event) => {
                setRegisterServiceType({
                  ...registerServiceType,
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
                  ? handleEditServiceType(
                      registerServiceType,
                      setServiceTypeRequest,
                      setRegisterServiceType,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveServiceType(
                      registerServiceType,
                      setServiceTypeRequest,
                      setRegisterServiceType,
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
                  handleDeleteServiceType(
                    registerServiceType,
                    setServiceTypeRequest,
                    setRegisterServiceType,
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
          tableName: "Tipos de Serviço",
          header: ["Nome"],
        }}
      >
        {serviceTypeRequest?.length > 0 ? (
          serviceTypeRequest.map(
            (serviceType: IServiceTypeRegister, index: number) => {
              return (
                <Fragment key={index}>
                  <Tr>
                    <Td>{serviceType.name}</Td>
                    <Td>
                      <Button
                        leftIcon={<FiEdit />}
                        colorScheme={"gray"}
                        variant="solid"
                        bg={colorButtonEdit}
                        onClick={() => {
                          toast({
                            title:
                              "Servico " + serviceType.name + " selecionada",
                            status: "info",
                            position: "top",
                            isClosable: true,
                          });
                          setRegisterServiceType(serviceType), setIsEdit(true);
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
            <Td>Nenhum tipo de serviço</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarTiposServico;

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
