// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { IMMOBILE_INITIAL_DATA } from "../../../pages/cadastrar-imoveis";
// Interfaces
import { IImmobileRegister, IImmobileRequest } from "./immobilesInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getImmobiles = async () => {
  let immobile: IImmobileRequest = {
    lenght: 0,
    immobiles: [],
  } as IImmobileRequest;

  await apiLaravel.get("immobiles").then((request) => {
    immobile = request.data.immobiles;
  });
  return immobile;
};

// Salva o imovel
export const handleSaveImmobile = async (
  registerImmobile: IImmobileRegister,
  setImmobileRequest: Dispatch<SetStateAction<IImmobileRequest>>,
  setRegisterImmobile: Dispatch<SetStateAction<IImmobileRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerImmobile.name !== "") {
    await apiLaravel
      .post("immobiles", registerImmobile)
      .then(async () => {
        // Reinicia o formulário
        setRegisterImmobile(IMMOBILE_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setImmobileRequest(await getImmobiles());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Imovel cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar o imovel",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerImmobile");
    toast({
      title: "Erro ao cadastrar o imovel",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita o imovel
const handleEditImmobile = async (
  registerImmobile: IImmobileRegister,
  setImmobileRequest: Dispatch<SetStateAction<IImmobileRequest>>,
  setRegisterImmobile: Dispatch<SetStateAction<IImmobileRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerImmobile.name !== "") {
    await apiLaravel
      .patch("immobiles/" + registerImmobile.id, registerImmobile)
      .then(async () => {
        // Reinicia o formulário
        setRegisterImmobile(IMMOBILE_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setImmobileRequest(await getImmobiles());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Imovel editado.",
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
    setFormError("registerImmobile");
    toast({
      title: "Erro ao cadastrar o imovel",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta o imovel
export const handleDeleteImmobile = async (
  registerImmobile: IImmobileRegister,
  setImmobileRequest: Dispatch<SetStateAction<IImmobileRequest>>,
  setRegisterImmobile: Dispatch<SetStateAction<IImmobileRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  const apiLaravel = getAPIClientLaravel();

  await apiLaravel
    .delete("immobiles/" + registerImmobile.id)
    .then(async () => {
      // Reinicia o formulário
      setRegisterImmobile(IMMOBILE_INITIAL_DATA);
      // Atualiza a listagem de organizações
      setImmobileRequest(await getImmobiles());
      // Mensagem de sucesso
      toast({
        title: "Sucesso!",
        description: "Imovel deletado.",
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

export default handleEditImmobile;
