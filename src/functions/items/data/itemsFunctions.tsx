// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { ITEM_INITIAL_DATA } from "../../../pages/cadastrar-items";
// Interfaces
import { IItemRegister, IItemRequest } from "./itemsInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getItems = async () => {
  let item: IItemRequest = {
    lenght: 0,
    items: [],
  } as IItemRequest;

  await apiLaravel.get("items").then((request) => {
    item = request.data.items;
  });
  return item;
};

// Salva a item
export const handleSaveItem = async (
  registerItem: IItemRegister,
  setItemRequest: Dispatch<SetStateAction<IItemRequest>>,
  setRegisterItem: Dispatch<SetStateAction<IItemRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerItem.name !== "") {
    await apiLaravel
      .post("items", registerItem)
      .then(async () => {
        // Reinicia o formulário
        setRegisterItem(ITEM_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setItemRequest(await getItems());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Item cadastrada.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar a item",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerItem");
    toast({
      title: "Erro ao cadastrar a item",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita a item
const handleEditItem = async (
  registerItem: IItemRegister,
  setItemRequest: Dispatch<SetStateAction<IItemRequest>>,
  setRegisterItem: Dispatch<SetStateAction<IItemRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerItem.name !== "") {
    await apiLaravel
      .patch("items/" + registerItem.id, registerItem)
      .then(async () => {
        // Reinicia o formulário
        setRegisterItem(ITEM_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setItemRequest(await getItems());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Item editada.",
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
    setFormError("registerItem");
    toast({
      title: "Erro ao cadastrar a item",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta a item
export const handleDeleteItem = async (
  registerItem: IItemRegister,
  setItemRequest: Dispatch<SetStateAction<IItemRequest>>,
  setRegisterItem: Dispatch<SetStateAction<IItemRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("items/" + registerItem.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterItem(ITEM_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setItemRequest(await getItems());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Item deletada.",
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

export default handleEditItem;
