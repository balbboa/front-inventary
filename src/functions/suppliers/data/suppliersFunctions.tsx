// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { SUPPLIER_INITIAL_DATA } from "../../../pages/cadastrar-fornecedores";
// Interfaces
import { ISupplierRegister, ISupplierRequest } from "./suppliersInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getSuppliers = async () => {
  let supplier: ISupplierRequest = {
    lenght: 0,
    suppliers: [],
  } as ISupplierRequest;

  await apiLaravel.get("suppliers").then((request) => {
    supplier = request.data.suppliers;
  });
  return supplier;
};

// Salva o fornecedor
export const handleSaveSupplier = async (
  registerSupplier: ISupplierRegister,
  setSupplierRequest: Dispatch<SetStateAction<ISupplierRequest>>,
  setRegisterSupplier: Dispatch<SetStateAction<ISupplierRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerSupplier.name !== "") {
    await apiLaravel
      .post("suppliers", registerSupplier)
      .then(async () => {
        // Reinicia o formulário
        setRegisterSupplier(SUPPLIER_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setSupplierRequest(await getSuppliers());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Fornecedor cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar o fornecedor",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerSupplier");
    toast({
      title: "Erro ao cadastrar o fornecedor",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita o fornecedor
const handleEditSupplier = async (
  registerSupplier: ISupplierRegister,
  setSupplierRequest: Dispatch<SetStateAction<ISupplierRequest>>,
  setRegisterSupplier: Dispatch<SetStateAction<ISupplierRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerSupplier.name !== "") {
    await apiLaravel
      .patch("suppliers/" + registerSupplier.id, registerSupplier)
      .then(async () => {
        // Reinicia o formulário
        setRegisterSupplier(SUPPLIER_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setSupplierRequest(await getSuppliers());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Fornecedor editado.",
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
    setFormError("registerSupplier");
    toast({
      title: "Erro ao cadastrar o fornecedor",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta o fornecedor
export const handleDeleteSupplier = async (
  registerSupplier: ISupplierRegister,
  setSupplierRequest: Dispatch<SetStateAction<ISupplierRequest>>,
  setRegisterSupplier: Dispatch<SetStateAction<ISupplierRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("suppliers/" + registerSupplier.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterSupplier(SUPPLIER_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setSupplierRequest(await getSuppliers());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Fornecedor deletado.",
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

export default handleEditSupplier;
