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
import { ISupplierRegister } from "../../functions/suppliers/data/suppliersInterfaces";
// Funções
import handleEditSupplier, {
  getSuppliers,
  handleSaveSupplier,
  handleDeleteSupplier,
} from "../../functions/suppliers/data/suppliersFunctions";
import { IServiceTypeRegister } from "../../functions/serviceTypes/data/serviceTypesInterfaces";
import { getServiceTypes } from "../../functions/serviceTypes/data/serviceTypesFunctions";

export const SUPPLIER_INITIAL_DATA: any = {
  name: "",
  serviceTypeId: "",
};

// Componente principal
const CadastrarFornecedores = () => {
  // hooks

  // Organização
  const [registerSupplier, setRegisterSupplier] = useState(
    SUPPLIER_INITIAL_DATA
  );
  // Requisisões das organizações
  const [supplierRequest, setSupplierRequest] = useState<any>();
  const [optionsServiceTypes, setOptionsServiceTypes] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem os fornecedores
    const supplier = await getSuppliers();
    setSupplierRequest(supplier);
  };

  const handleSelectServiceType = async () => {
    // Obtem os fabricantes para o select
    const serviceType = await getServiceTypes();
    setOptionsServiceTypes(serviceType);
  };

  useEffect(() => {
    handleGetData();
    handleSelectServiceType();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar fornecedor" }}>
      <Card
        props={{
          title: isEdit ? "Editar fornecedor" : "Cadastrar fornecedor",
          maxW: 700,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Fornecedor</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              type="text"
              value={registerSupplier.name}
              isInvalid={formError === "registerSupplier"}
              onChange={(event) => {
                setRegisterSupplier({
                  ...registerSupplier,
                  name: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Select
              ml={5}
              placeholder="Tipo de serviço"
              value={registerSupplier.serviceTypeId}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterSupplier({
                  ...registerSupplier,
                  serviceTypeId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsServiceTypes?.map((option: IServiceTypeRegister) => (
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
                  ? handleEditSupplier(
                      registerSupplier,
                      setSupplierRequest,
                      setRegisterSupplier,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveSupplier(
                      registerSupplier,
                      setSupplierRequest,
                      setRegisterSupplier,
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
                  handleDeleteSupplier(
                    registerSupplier,
                    setSupplierRequest,
                    setRegisterSupplier,
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
          tableName: "Fornecedores",
          header: ["Nome", "Tipo de serviço"],
        }}
      >
        {supplierRequest?.length > 0 ? (
          supplierRequest.map((supplier: ISupplierRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td>{supplier.name}</Td>
                  <Td>{supplier.serviceTypeId}</Td>
                  <Td>
                    <Button
                      leftIcon={<FiEdit />}
                      colorScheme={"gray"}
                      variant="solid"
                      bg={colorButtonEdit}
                      onClick={() => {
                        toast({
                          title: "Fornecedor " + supplier.name + " selecionado",
                          status: "info",
                          position: "top",
                          isClosable: true,
                        });
                        setRegisterSupplier(supplier), setIsEdit(true);
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
            <Td>Nenhum fornecedor</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarFornecedores;

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
