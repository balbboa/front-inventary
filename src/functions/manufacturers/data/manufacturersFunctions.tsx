// Chakra UI
import { ToastId, UseToastOptions } from "@chakra-ui/react";
// React
import { Dispatch, SetStateAction } from "react";
// Dado estático
import { MANUFACTURER_INITIAL_DATA } from "../../../pages/cadastrar-fabricantes";
// Interfaces
import {
  IManufacturerRegister,
  IManufacturerRequest
} from "./manufacturersInterfaces";
import apiLaravel from "../../../services/apiLaravel";
import { getAPIClientLaravel } from "../../../services/axiosLaravel";

export const getManufacturers = async (
) => {

  let manufacturer: IManufacturerRequest = {
    lenght: 0,
    manufacturers: [],
  } as IManufacturerRequest;

  await apiLaravel.get("manufacturers").then((request) => {
    manufacturer = request.data.manufacturers;
  });
  return manufacturer;
};

// Salva o manufacturero
export const handleSaveManufacturer = async (
  registerManufacturer: IManufacturerRegister,
  setManufacturerRequest: Dispatch<SetStateAction<IManufacturerRequest>>,
  setRegisterManufacturer: Dispatch<SetStateAction<IManufacturerRegister>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerManufacturer.name !== "") {
    await apiLaravel
      .post("manufacturers", registerManufacturer)
      .then(async () => {
        // Reinicia o formulário
        setRegisterManufacturer(MANUFACTURER_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setManufacturerRequest(await getManufacturers());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Fabricante cadastrado.",
          status: "success",
          position: "top",
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "Erro ao cadastrar o fabricante",
          description: error.status,
          status: "error",
          position: "top",
          isClosable: true,
        });
      });
  } else {
    // Informa o erro do formulário
    setFormError("registerManufacturer");
    toast({
      title: "Erro ao cadastrar o fabricante",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Edita o manufacturero
const handleEditManufacturer = async (
  registerManufacturer: IManufacturerRegister,
  setManufacturerRequest: Dispatch<SetStateAction<IManufacturerRequest>>,
  setRegisterManufacturer: Dispatch<SetStateAction<IManufacturerRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  setFormError: Dispatch<SetStateAction<string>>
) => {
  const apiLaravel = getAPIClientLaravel();
  if (registerManufacturer.name !== "") {
    await apiLaravel
      .patch("manufacturers/" + registerManufacturer.id, registerManufacturer)
      .then(async () => {
        // Reinicia o formulário
        setRegisterManufacturer(MANUFACTURER_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setManufacturerRequest(await getManufacturers());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Fabricante editado.",
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
    setFormError("registerManufacturer");
    toast({
      title: "Erro ao cadastrar o fabricante",
      description: "Campo NOME inválido",
      status: "error",
      position: "top",
      isClosable: true,
    });
  }
};

// Deleta o manufacturero
export const handleDeleteManufacturer = async (
  registerManufacturer: IManufacturerRegister,
  setManufacturerRequest: Dispatch<SetStateAction<IManufacturerRequest>>,
  setRegisterManufacturer: Dispatch<SetStateAction<IManufacturerRegister>>,
  setIsEdit: Dispatch<SetStateAction<boolean>>,
  toast: (options?: UseToastOptions | undefined) => ToastId,
) => {
  const apiLaravel = getAPIClientLaravel();

    await apiLaravel
      .delete("manufacturers/" + registerManufacturer.id)
      .then(async () => {
        // Reinicia o formulário
        setRegisterManufacturer(MANUFACTURER_INITIAL_DATA);
        // Atualiza a listagem de organizações
        setManufacturerRequest(await getManufacturers());
        // Mensagem de sucesso
        toast({
          title: "Sucesso!",
          description: "Fabricante deletado.",
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

export default handleEditManufacturer;
