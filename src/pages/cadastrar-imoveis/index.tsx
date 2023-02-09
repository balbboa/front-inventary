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
import { IImmobileRegister } from "../../functions/immobiles/data/immobilesInterfaces";
// Funções
import handleEditImmobile, {
  getImmobiles,
  handleSaveImmobile,
  handleDeleteImmobile,
} from "../../functions/immobiles/data/immobilesFunctions";
import { IOpmRegister } from "../../functions/opms/data/opmsInterfaces";
import { getOpms } from "../../functions/opms/data/opmsFunctions";

export const IMMOBILE_INITIAL_DATA: IImmobileRegister = {
  name: "",
  place: "",
  district: "",
  city: "",
  latitude: "",
  longitude: "",
  opmsId: "",
};

// Componente principal
const CadastrarImoveis = () => {
  // hooks

  // Organização
  const [registerImmobile, setRegisterImmobile] = useState<IImmobileRegister>(
    IMMOBILE_INITIAL_DATA
  );
  // Requisisões das organizações
  const [immobileRequest, setImmobileRequest] = useState<any>();
  const [optionsOpms, setOptionsOpms] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem as organizações
    const immobile = await getImmobiles();
    setImmobileRequest(immobile);
  };

  const handleSelectOpms = async () => {
    // Obtem os fabricantes para o select
    const opms = await getOpms();
    setOptionsOpms(opms);
  };

  useEffect(() => {
    handleGetData();
    handleSelectOpms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar imóvel" }}>
      <Card
        props={{
          title: isEdit ? "Editar imóvel" : "Cadastrar imóvel",
          maxW: 2000,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Imóvel</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              placeholder="Nome"
              type="text"
              value={registerImmobile.name}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterImmobile({
                  ...registerImmobile,
                  name: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Logradouro"
              type="text"
              value={registerImmobile.place}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterImmobile({
                  ...registerImmobile,
                  place: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Bairro"
              type="text"
              value={registerImmobile.district}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterImmobile({
                  ...registerImmobile,
                  district: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Cidade"
              type="text"
              value={registerImmobile.city}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterImmobile({
                  ...registerImmobile,
                  city: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Latitude"
              type="text"
              value={registerImmobile.latitude}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterImmobile({
                  ...registerImmobile,
                  latitude: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Input
              ml={5}
              placeholder="Longitude"
              type="text"
              value={registerImmobile.longitude}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterImmobile({
                  ...registerImmobile,
                  longitude: event.currentTarget.value.toUpperCase(),
                });
                setFormError("");
              }}
            />
            <Select
              ml={5}
              placeholder="OPM"
              value={registerImmobile.opmsId}
              isInvalid={formError === "registerImmobile"}
              onChange={(event) => {
                setRegisterImmobile({
                  ...registerImmobile,
                  opmsId: event.currentTarget.value,
                });
                setFormError("");
              }}
            >
              {optionsOpms?.map((option: IOpmRegister) => (
                <option key={option.id} value={option.id}>
                  {option.name} - {option.acronym}
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
                  ? handleEditImmobile(
                      registerImmobile,
                      setImmobileRequest,
                      setRegisterImmobile,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveImmobile(
                      registerImmobile,
                      setImmobileRequest,
                      setRegisterImmobile,
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
                  handleDeleteImmobile(
                    registerImmobile,
                    setImmobileRequest,
                    setRegisterImmobile,
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
          tableName: "Imóveis",
          header: [
            "Nome",
            "Logradouro",
            "Bairro",
            "Cidade",
            "Latitude",
            "Longitude",
            "OPM",
          ],
        }}
      >
        {immobileRequest?.length > 0 ? (
          immobileRequest.map((immobile: IImmobileRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td>{immobile.name}</Td>
                  <Td>{immobile.place}</Td>
                  <Td>{immobile.district}</Td>
                  <Td>{immobile.city}</Td>
                  <Td>{immobile.latitude}</Td>
                  <Td>{immobile.longitude}</Td>
                  <Td>{immobile.opmsId}</Td>
                  <Td>
                    <Button
                      leftIcon={<FiEdit />}
                      colorScheme={"gray"}
                      variant="solid"
                      bg={colorButtonEdit}
                      onClick={() => {
                        toast({
                          title: "Imóvel " + immobile.name + " selecionado",
                          status: "info",
                          position: "top",
                          isClosable: true,
                        });
                        setRegisterImmobile(immobile), setIsEdit(true);
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
            <Td>Nenhum imóvel</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarImoveis;

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
