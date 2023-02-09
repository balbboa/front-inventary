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
import { IServiceRegister } from "../../functions/services/data/servicesInterfaces";
// Funções
import handleEditService, {
  getServices,
  handleSaveService,
  handleDeleteService,
} from "../../functions/services/data/servicesFunctions";
import { getManufacturers } from "../../functions/manufacturers/data/manufacturersFunctions";
import { IManufacturerRegister } from "../../functions/manufacturers/data/manufacturersInterfaces";
import { getGroups } from "../../functions/groups/data/groupsFunctions";
import { IGroupRegister } from "../../functions/groups/data/groupsInterfaces";
import getStatus from "../../functions/status/data/statusFunctions";
import { getImmobiles } from "../../functions/immobiles/data/immobilesFunctions";
import { IImmobileRegister } from "../../functions/immobiles/data/immobilesInterfaces";
import { IStatusRegister } from "../../functions/status/data/statusInterfaces";
import { getSuppliers } from "../../functions/suppliers/data/suppliersFunctions";
import { ISupplierRegister } from "../../functions/suppliers/data/suppliersInterfaces";

export const SERVICE_INITIAL_DATA: IServiceRegister = {
  lineNumber: "",
  contractNumber: "",
  obs: "",
  statusId: "",
  immobileId: "",
  supplierId: "",
};

// Componente principal
const CadastrarServicos = () => {
  // hooks

  // Organização
  const [registerService, setRegisterService] =
    useState<IServiceRegister>(SERVICE_INITIAL_DATA);
  // Requisisões das organizações
  const [serviceRequest, setServiceRequest] = useState<any>();
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
    const service = await getServices();
    setServiceRequest(service);
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
    <Layout props={{ title: "Cadastrar serviço" }}>
      <Card
        props={{
          title: isEdit ? "Editar serviço" : "Cadastrar serviço",
          maxW: 2000,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Serviço</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              placeholder="Número da linha"
              type="text"
              value={registerService.lineNumber}
              isInvalid={formError === "registerService"}
              onChange={(event) => {
                setRegisterService({
                  ...registerService,
                  lineNumber: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Número do contrato"
              type="text"
              value={registerService.contractNumber}
              isInvalid={formError === "registerService"}
              onChange={(event) => {
                setRegisterService({
                  ...registerService,
                  contractNumber: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Observação"
              type="text"
              value={registerService.obs}
              isInvalid={formError === "registerService"}
              onChange={(event) => {
                setRegisterService({
                  ...registerService,
                  obs: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Select
              ml={5}
              placeholder="Situação"
              value={registerService.statusId}
              isInvalid={formError === "registerService"}
              onChange={(event) => {
                setRegisterService({
                  ...registerService,
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
            <Select
              ml={5}
              placeholder="Fornecedor"
              value={registerService.supplierId}
              isInvalid={formError === "registerService"}
              onChange={(event) => {
                setRegisterService({
                  ...registerService,
                  supplierId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsSuppliers?.map((option: ISupplierRegister) => (
                <option key={option.id} value={option.id}>
                  {option.name} - {option.id}
                </option>
              ))}
            </Select>
            <Select
              ml={5}
              placeholder="Imóvel"
              value={registerService.immobileId}
              isInvalid={formError === "registerService"}
              onChange={(event) => {
                setRegisterService({
                  ...registerService,
                  immobileId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsImmobiles?.map((option: IImmobileRegister) => (
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
                  ? handleEditService(
                      registerService,
                      setServiceRequest,
                      setRegisterService,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveService(
                      registerService,
                      setServiceRequest,
                      setRegisterService,
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
                  handleDeleteService(
                    registerService,
                    setServiceRequest,
                    setRegisterService,
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
          tableName: "Serviços",
          header: [
            "N° linha",
            "N° contrato",
            "Obs",
            "Fornecedor",
            "Situação",
            "Imóvel",
          ],
        }}
      >
        {serviceRequest?.length > 0 ? (
          serviceRequest.map((service: IServiceRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td>{service.lineNumber}</Td>
                  <Td>{service.contractNumber}</Td>
                  <Td>{service.obs}</Td>
                  <Td>{service.supplierId}</Td>
                  <Td>{service.statusId}</Td>
                  <Td>{service.immobileId}</Td>
                  <Td>
                    <Button
                      leftIcon={<FiEdit />}
                      colorScheme={"gray"}
                      variant="solid"
                      bg={colorButtonEdit}
                      onClick={() => {
                        toast({
                          title:
                            "Servico " + service.lineNumber + " selecionada",
                          status: "info",
                          position: "top",
                          isClosable: true,
                        });
                        setRegisterService(service), setIsEdit(true);
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
            <Td>Nenhum serviço</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarServicos;

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
