// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { GROUP_INITIAL_DATA } from "../../../pages/cadastrar-grupos";
// Interfaces
import { IGroupRegister, IGroupRequest } from "./groupsInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getGroups = async () => {
  let group: IGroupRequest = {
    lenght: 0,
    groups: [],
  } as IGroupRequest;

  await apiLaravel.get("groups").then((request) => {
    group = request.data.groups;
  });
  return group;
};

// Salva o groupo
export const handleSaveGroup = async (
  registerGroup: IGroupRegister,
  setGroupRequest: Dispatch<SetStateAction<IGroupRequest>>,
  setRegisterGroup: Dispatch<SetStateAction<IGroupRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerGroup.name !== "") {
    await apiLaravel
      .post("groups", registerGroup)
      .then(async () => {
        // Reinicia o formulário
        setRegisterGroup(GROUP_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setGroupRequest(await getGroups());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Grupo cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar o grupo",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerGroup");
    toast({
      title: "Erro ao cadastrar o grupo",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita o groupo
const handleEditGroup = async (
  registerGroup: IGroupRegister,
  setGroupRequest: Dispatch<SetStateAction<IGroupRequest>>,
  setRegisterGroup: Dispatch<SetStateAction<IGroupRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerGroup.name !== "") {
    await apiLaravel
      .patch("groups/" + registerGroup.id, registerGroup)
      .then(async () => {
        // Reinicia o formulário
        setRegisterGroup(GROUP_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setGroupRequest(await getGroups());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Grupo editado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
        setIsEdit(false);
      })
      .catch(() => {
        // Informa o erro vindo da API
        toast({
          title: "Ocorreu um erro na API",
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerGroup");
    toast({
      title: "Erro ao cadastrar o grupo",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta o groupo
export const handleDeleteGroup = async (
  registerGroup: IGroupRegister,
  setGroupRequest: Dispatch<SetStateAction<IGroupRequest>>,
  setRegisterGroup: Dispatch<SetStateAction<IGroupRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("groups/" + registerGroup.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterGroup(GROUP_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setGroupRequest(await getGroups());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Grupo deletado.",
        status: "success",
        position: "top",
        isClosable: true,
      });
      setIsEdit(false);
    })
    .catch(() => {
      // Informa o erro vindo da API
      toast({
        title: "Ocorreu um erro na API",
        status: "error",
        position: "top",
        isClosable: true,
      });
    });
};

export default handleEditGroup;
