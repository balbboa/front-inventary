// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { SERVICE_INITIAL_DATA } from "../../../pages/cadastrar-servicos";
// Interfaces
import { IServiceRegister, IServiceRequest } from "./servicesInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getServices = async () => {
  let service: IServiceRequest = {
    lenght: 0,
    services: [],
  } as IServiceRequest;

  await apiLaravel.get("services").then((request) => {
    service = request.data.services;
  });
  return service;
};

// Salva o servico
export const handleSaveService = async (
  registerService: IServiceRegister,
  setServiceRequest: Dispatch<SetStateAction<IServiceRequest>>,
  setRegisterService: Dispatch<SetStateAction<IServiceRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerService.lineNumber !== "") {
    await apiLaravel
      .post("services", registerService)
      .then(async () => {
        // Reinicia o formulário
        setRegisterService(SERVICE_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setServiceRequest(await getServices());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Servico cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar o servico",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerService");
    toast({
      title: "Erro ao cadastrar o servico",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita o servico
const handleEditService = async (
  registerService: IServiceRegister,
  setServiceRequest: Dispatch<SetStateAction<IServiceRequest>>,
  setRegisterService: Dispatch<SetStateAction<IServiceRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerService.lineNumber !== "") {
    await apiLaravel
      .patch("services/" + registerService.id, registerService)
      .then(async () => {
        // Reinicia o formulário
        setRegisterService(SERVICE_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setServiceRequest(await getServices());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Servico editado.",
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
    setFormError("registerService");
    toast({
      title: "Erro ao cadastrar o servico",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta o servico
export const handleDeleteService = async (
  registerService: IServiceRegister,
  setServiceRequest: Dispatch<SetStateAction<IServiceRequest>>,
  setRegisterService: Dispatch<SetStateAction<IServiceRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("services/" + registerService.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterService(SERVICE_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setServiceRequest(await getServices());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Servico deletado.",
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

export default handleEditService;
