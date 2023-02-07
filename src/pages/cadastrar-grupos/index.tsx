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
import { IGroupRegister } from "../../functions/groups/data/groupsInterfaces";
// Funções
import handleEditGroup, {
  getGroups,
  handleSaveGroup,
  handleDeleteGroup,
} from "../../functions/groups/data/groupsFunctions";

export const GROUP_INITIAL_DATA: any = {
  name: "",
};

// Componente principal
const CadastrarGrupos = () => {
  // hooks

  // Organização
  const [registerGroup, setRegisterGroup] = useState(GROUP_INITIAL_DATA);
  // Requisisões das organizações
  const [groupRequest, setGroupRequest] = useState<any>();
  // Erros do formulário
  const [formError, setFormError] = useState("");
  // Avisos
  const toast = useToast();
  // Verifica se é para editar
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const handleGetData = async () => {
    // Obtem os grupos
    const group = await getGroups();
    setGroupRequest(group);
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const colorButtonEdit = useColorModeValue("gray.300", colors.graySky);

  return (
    <Layout props={{ title: "Cadastrar grupo" }}>
      <Card
        props={{
          title: isEdit ? "Editar grupo" : "Cadastrar grupo",
          maxW: 500,
        }}
      >
        <FormControl padding={5}>
          <FormLabel>Grupo</FormLabel>
          <Box display={"flex"} flexDirection={"row"} alignItems={"center"}>
            <Input
              type="text"
              value={registerGroup.name}
              isInvalid={formError === "registerGroup"}
              onChange={(event) => {
                setRegisterGroup({
                  ...registerGroup,
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
                  ? handleEditGroup(
                      registerGroup,
                      setGroupRequest,
                      setRegisterGroup,
                      setIsEdit,
                      toast,
                      setFormError
                    )
                  : handleSaveGroup(
                      registerGroup,
                      setGroupRequest,
                      setRegisterGroup,
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
                  handleDeleteGroup(
                    registerGroup,
                    setGroupRequest,
                    setRegisterGroup,
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
          tableName: "Grupos",
          header: ["name"],
        }}
      >
        {groupRequest?.length > 0 ? (
          groupRequest.map((group: IGroupRegister, index: number) => {
            return (
              <Fragment key={index}>
                <Tr>
                  <Td>{group.name}</Td>
                  <Td>
                    <Button
                      leftIcon={<FiEdit />}
                      colorScheme={"gray"}
                      variant="solid"
                      bg={colorButtonEdit}
                      onClick={() => {
                        toast({
                          title: "Grupo " + group.name + " selecionado",
                          status: "info",
                          position: "top",
                          isClosable: true,
                        });
                        setRegisterGroup(group), setIsEdit(true);
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
            <Td>Nenhum grupo</Td>
          </Tr>
        )}
      </DefaultTable>
    </Layout>
  );
};

export default CadastrarGrupos;

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
