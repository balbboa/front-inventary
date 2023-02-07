// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { OPM_INITIAL_DATA } from "../../../pages/cadastrar-unidades";
// Interfaces
import {
  IOpmRegister,
  IOpmRequest
} from "./opmsInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getOpms = async (
) => {

  let opm: IOpmRequest = {
    lenght: 0,
    opms: [],
  } as IOpmRequest;

  await apiLaravel.get("opms").then((request) => {
    opm = request.data.opms;
  });
  return opm;
};

// Salva a opm
export const handleSaveOpm = async (
  registerOpm: IOpmRegister,
  setOpmRequest: Dispatch<SetStateAction<IOpmRequest>>,
  setRegisterOpm: Dispatch<SetStateAction<IOpmRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerOpm.name !== "") {
    await apiLaravel
      .post("opms", registerOpm)
      .then(async () => {
        // Reinicia o formulário
        setRegisterOpm(OPM_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setOpmRequest(await getOpms());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Opm cadastrada.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar a opm",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerOpm");
    toast({
      title: "Erro ao cadastrar a opm",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita a opm
const handleEditOpm = async (
  registerOpm: IOpmRegister,
  setOpmRequest: Dispatch<SetStateAction<IOpmRequest>>,
  setRegisterOpm: Dispatch<SetStateAction<IOpmRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerOpm.name !== "") {
    await apiLaravel
      .patch("opms/" + registerOpm.id, registerOpm)
      .then(async () => {
        // Reinicia o formulário
        setRegisterOpm(OPM_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setOpmRequest(await getOpms());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Opm editada.",
          status: "success",
          position: "top",
          isClosable: true,
        });
        setIsEdit(false)
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
    setFormError("registerOpm");
    toast({
      title: "Erro ao cadastrar a opm",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta a opm
export const handleDeleteOpm = async (
  registerOpm: IOpmRegister,
  setOpmRequest: Dispatch<SetStateAction<IOpmRequest>>,
  setRegisterOpm: Dispatch<SetStateAction<IOpmRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
) => {
  const apiLaravel = getAPIClientLaravel();

    await apiLaravel
      .delete("opms/" + registerOpm.id)
      .then(async () => {
        // Reinicia o formulário
        setRegisterOpm(OPM_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setOpmRequest(await getOpms());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Opm deletada.",
          status: "success",
          position: "top",
          isClosable: true,
        });
        setIsEdit(false)
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

export default handleEditOpm;
