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
    count: 0,
    models: [],
  } as IModelRequest;

  await apiLaravel.get("fabricante").then((request) => {
    model = request.data;
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
  if (registerModel.nome !== "") {
    await apiLaravel
      .post("fabricante", registerModel)
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

// Edita a organização
const handleEditModel = async (
  registerModel: IModelRegister,
  setModelRequest: Dispatch<SetStateAction<IModelRequest>>,
  setRegisterModel: Dispatch<SetStateAction<IModelRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerModel.nome !== "") {
    await apiLaravel
      .patch("fabricante/" + registerModel.id, registerModel)
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

export default handleEditModel;
