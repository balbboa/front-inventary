// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { MODEL_INITIAL_DATA } from "../../../pages/cadastrar-modelos";
// Interfaces
import {
  IModelRegister,
  IModelRequest
} from "./modelsInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getModels = async (
) => {

  let model: IModelRequest = {
    lenght: 0,
    models: [],
  } as IModelRequest;

  await apiLaravel.get("models").then((request) => {
    model = request.data.models;
  });
  return model;
};

// Salva o modelo
export const handleSaveModel = async (
  registerModel: IModelRegister,
  setModelRequest: Dispatch<SetStateAction<IModelRequest>>,
  setRegisterModel: Dispatch<SetStateAction<IModelRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerModel.name !== "") {
    await apiLaravel
      .post("models", registerModel)
      .then(async () => {
        // Reinicia o formulário
        setRegisterModel(MODEL_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setModelRequest(await getModels());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Modelo cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar o modelo",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerModel");
    toast({
      title: "Erro ao cadastrar o modelo",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita o modelo
const handleEditModel = async (
  registerModel: IModelRegister,
  setModelRequest: Dispatch<SetStateAction<IModelRequest>>,
  setRegisterModel: Dispatch<SetStateAction<IModelRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerModel.name !== "") {
    await apiLaravel
      .patch("models/" + registerModel.id, registerModel)
      .then(async () => {
        // Reinicia o formulário
        setRegisterModel(MODEL_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setModelRequest(await getModels());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Modelo editado.",
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
    setFormError("registerModel");
    toast({
      title: "Erro ao cadastrar o modelo",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta o modelo
export const handleDeleteModel = async (
  registerModel: IModelRegister,
  setModelRequest: Dispatch<SetStateAction<IModelRequest>>,
  setRegisterModel: Dispatch<SetStateAction<IModelRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
) => {
  const apiLaravel = getAPIClientLaravel();

    await apiLaravel
      .delete("models/" + registerModel.id)
      .then(async () => {
        // Reinicia o formulário
        setRegisterModel(MODEL_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setModelRequest(await getModels());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Modelo deletado.",
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

export default handleEditModel;
