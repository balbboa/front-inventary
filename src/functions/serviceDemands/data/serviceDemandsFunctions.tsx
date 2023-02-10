// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { SERVICE_DEMAND_INITIAL_DATA } from "../../../pages/cadastrar-demanda/cadastrar-demanda-servicos";
// Interfaces
import {
  IServiceDemandRegister,
  IServiceDemandRequest,
} from "./serviceDemandsInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getServiceDemands = async () => {
  let serviceDemand: IServiceDemandRequest = {
    lenght: 0,
    serviceDemands: [],
  } as IServiceDemandRequest;

  await apiLaravel.get("serviceDemands").then((request) => {
    serviceDemand = request.data.serviceDemands;
  });
  return serviceDemand;
};

// Salva a Demanda de serviço
export const handleSaveServiceDemand = async (
  registerServiceDemand: IServiceDemandRegister,
  setServiceDemandRequest: Dispatch<SetStateAction<IServiceDemandRequest>>,
  setRegisterServiceDemand: Dispatch<SetStateAction<IServiceDemandRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerServiceDemand.serviceType !== "") {
    await apiLaravel
      .post("serviceDemands", registerServiceDemand)
      .then(async () => {
        // Reinicia o formulário
        setRegisterServiceDemand(SERVICE_DEMAND_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setServiceDemandRequest(await getServiceDemands());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Demanda de serviço cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar a Demanda de serviço",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerServiceDemand");
    toast({
      title: "Erro ao cadastrar a Demanda de serviço",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita a Demanda de serviço
const handleEditServiceDemand = async (
  registerServiceDemand: IServiceDemandRegister,
  setServiceDemandRequest: Dispatch<SetStateAction<IServiceDemandRequest>>,
  setRegisterServiceDemand: Dispatch<SetStateAction<IServiceDemandRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerServiceDemand.serviceType !== "") {
    await apiLaravel
      .patch(
        "serviceDemands/" + registerServiceDemand.id,
        registerServiceDemand
      )
      .then(async () => {
        // Reinicia o formulário
        setRegisterServiceDemand(SERVICE_DEMAND_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setServiceDemandRequest(await getServiceDemands());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Demanda de serviço editado.",
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
    setFormError("registerServiceDemand");
    toast({
      title: "Erro ao cadastrar a Demanda de serviço",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta a Demanda de serviço
export const handleDeleteServiceDemand = async (
  registerServiceDemand: IServiceDemandRegister,
  setServiceDemandRequest: Dispatch<SetStateAction<IServiceDemandRequest>>,
  setRegisterServiceDemand: Dispatch<SetStateAction<IServiceDemandRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("serviceDemands/" + registerServiceDemand.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterServiceDemand(SERVICE_DEMAND_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setServiceDemandRequest(await getServiceDemands());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Demanda de serviço deletado.",
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

export default handleEditServiceDemand;
