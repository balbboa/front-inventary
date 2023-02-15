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
import { IServiceDemandRegister } from "../../../functions/serviceDemands/data/serviceDemandsInterfaces";
// Funções
import handleEditServiceDemand, {
  getServiceDemands,
  handleSaveServiceDemand,
  handleDeleteServiceDemand,
} from "../../../functions/serviceDemands/data/serviceDemandsFunctions";
import { getGroups } from "../../../functions/groups/data/groupsFunctions";
import { IGroupRegister } from "../../../functions/groups/data/groupsInterfaces";

export const SERVICE_DEMAND_INITIAL_DATA: IServiceDemandRegister = {
  serviceType: "",
  amount: "",
  justify: "",
};

// Componente principal
const CadastrarServiceDemandas = () => {
  // hooks

  // Organização
  const [registerServiceDemand, setRegisterServiceDemand] =
    useState<IServiceDemandRegister>(SERVICE_DEMAND_INITIAL_DATA);
  // Requisisões das organizações
  const [serviceDemandRequest, setServiceDemandRequest] = useState<any>();
  const [optionsGroups, setOptionsGroups] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const serviceDemand = await getServiceDemands();
    setServiceDemandRequest(serviceDemand);
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
    <Layout props={{ title: "Cadastrar demanda de serviço" }}>
      <Card
        props={{
          title: isEdit
            ? "Editar demanda de serviço"
            : "Cadastrar demanda de serviço",
          maxW: 1000,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Demanda de serviço</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Select
              placeholder="Tipo de serviço"
              value={registerServiceDemand.serviceType}
              isInvalid={formError === "registerServiceDemand"}
              onChange={(event) => {
                setRegisterServiceDemand({
                  ...registerServiceDemand,
                  serviceType: event.currentTarget.value,
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
              value={registerServiceDemand.amount}
              isInvalid={formError === "registerServiceDemand"}
              onChange={(event) => {
                setRegisterServiceDemand({
                  ...registerServiceDemand,
                  amount: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Justificativa"
              type="text"
              value={registerServiceDemand.justify}
              isInvalid={formError === "registerServiceDemand"}
              onChange={(event) => {
                setRegisterServiceDemand({
                  ...registerServiceDemand,
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
                  ? handleEditServiceDemand(
                      registerServiceDemand,
                      setServiceDemandRequest,
                      setRegisterServiceDemand,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveServiceDemand(
                      registerServiceDemand,
                      setServiceDemandRequest,
                      setRegisterServiceDemand,
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
                  handleDeleteServiceDemand(
                    registerServiceDemand,
                    setServiceDemandRequest,
                    setRegisterServiceDemand,
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
          tableName: "Demandas de serviço",
          header: ["Tipo de serviço", "Quantidade", "Justificativa"],
        }}
      >
        {serviceDemandRequest?.length > 0 ? (
          serviceDemandRequest.map(
            (serviceDemand: IServiceDemandRegister, index: number) => {
              return (
                <Fragment key={index}>
                  <Tr>
                    <Td>{serviceDemand.serviceType}</Td>
                    <Td>{serviceDemand.amount}</Td>
                    <Td>{serviceDemand.justify}</Td>
                    <Td>
                      <Button
                        leftIcon={<FiEdit />}
                        colorScheme={"gray"}
                        variant="solid"
                        bg={colorButtonEdit}
                        onClick={() => {
                          toast({
                            title:
                              "Demanda de serviço " +
                              serviceDemand.serviceType +
                              " selecionada",
                            status: "info",
                            position: "top",
                            isClosable: true,
                          });
                          setRegisterServiceDemand(serviceDemand),
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
            <Td>Nenhum demanda de serviço</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarServiceDemandas;

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
