// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { SUPPLIER_INITIAL_DATA } from "../../../pages/cadastrar-fornecedores";
// Interfaces
import {
  IServiceTypeRegister,
  IServiceTypeRequest,
} from "./serviceTypesInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getServiceTypes = async () => {
  let serviceType: IServiceTypeRequest = {
    lenght: 0,
    serviceTypes: [],
  } as IServiceTypeRequest;

  await apiLaravel.get("serviceTypes").then((request) => {
    serviceType = request.data.serviceTypes;
  });
  return serviceType;
};

// Salva o fornecedor
export const handleSaveServiceType = async (
  registerServiceType: IServiceTypeRegister,
  setServiceTypeRequest: Dispatch<SetStateAction<IServiceTypeRequest>>,
  setRegisterServiceType: Dispatch<SetStateAction<IServiceTypeRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerServiceType.name !== "") {
    await apiLaravel
      .post("servicetypes", registerServiceType)
      .then(async () => {
        // Reinicia o formulário
        setRegisterServiceType(SUPPLIER_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setServiceTypeRequest(await getServiceTypes());
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
    setFormError("registerServiceType");
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
const handleEditServiceType = async (
  registerServiceType: IServiceTypeRegister,
  setServiceTypeRequest: Dispatch<SetStateAction<IServiceTypeRequest>>,
  setRegisterServiceType: Dispatch<SetStateAction<IServiceTypeRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerServiceType.name !== "") {
    await apiLaravel
      .patch("servicetypes/" + registerServiceType.id, registerServiceType)
      .then(async () => {
        // Reinicia o formulário
        setRegisterServiceType(SUPPLIER_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setServiceTypeRequest(await getServiceTypes());
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
    setFormError("registerServiceType");
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
export const handleDeleteServiceType = async (
  registerServiceType: IServiceTypeRegister,
  setServiceTypeRequest: Dispatch<SetStateAction<IServiceTypeRequest>>,
  setRegisterServiceType: Dispatch<SetStateAction<IServiceTypeRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("servicetypes/" + registerServiceType.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterServiceType(SUPPLIER_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setServiceTypeRequest(await getServiceTypes());
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

export default handleEditServiceType;
