// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { ITEM_DEMAND_INITIAL_DATA } from "../../../pages/cadastrar-demanda/cadastrar-demanda-itens";
// Interfaces
import {
  IItemDemandRegister,
  IItemDemandRequest,
} from "./itemDemandsInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getItemDemands = async () => {
  let itemDemand: IItemDemandRequest = {
    lenght: 0,
    itemDemands: [],
  } as IItemDemandRequest;

  await apiLaravel.get("itemDemands").then((request) => {
    itemDemand = request.data.itemDemands;
  });
  return itemDemand;
};

// Salva a itemDemanda
export const handleSaveItemDemand = async (
  registerItemDemand: IItemDemandRegister,
  setItemDemandRequest: Dispatch<SetStateAction<IItemDemandRequest>>,
  setRegisterItemDemand: Dispatch<SetStateAction<IItemDemandRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerItemDemand.groupId !== "") {
    await apiLaravel
      .post("itemDemands", registerItemDemand)
      .then(async () => {
        // Reinicia o formulário
        setRegisterItemDemand(ITEM_DEMAND_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setItemDemandRequest(await getItemDemands());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "ItemDemanda cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar a itemDemanda",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerItemDemand");
    toast({
      title: "Erro ao cadastrar a itemDemanda",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita a itemDemanda
const handleEditItemDemand = async (
  registerItemDemand: IItemDemandRegister,
  setItemDemandRequest: Dispatch<SetStateAction<IItemDemandRequest>>,
  setRegisterItemDemand: Dispatch<SetStateAction<IItemDemandRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerItemDemand.groupId !== "") {
    await apiLaravel
      .patch("itemDemands/" + registerItemDemand.id, registerItemDemand)
      .then(async () => {
        // Reinicia o formulário
        setRegisterItemDemand(ITEM_DEMAND_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setItemDemandRequest(await getItemDemands());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "ItemDemanda editado.",
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
    setFormError("registerItemDemand");
    toast({
      title: "Erro ao cadastrar a itemDemanda",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta a itemDemanda
export const handleDeleteItemDemand = async (
  registerItemDemand: IItemDemandRegister,
  setItemDemandRequest: Dispatch<SetStateAction<IItemDemandRequest>>,
  setRegisterItemDemand: Dispatch<SetStateAction<IItemDemandRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("itemDemands/" + registerItemDemand.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterItemDemand(ITEM_DEMAND_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setItemDemandRequest(await getItemDemands());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "ItemDemanda deletado.",
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

export default handleEditItemDemand;
