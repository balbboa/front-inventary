// Interfaces
import { IStatusRequest } from "./statusInterfaces";
import apiLaravel from "../../../services/apiLaravel";

export const getStatus = async () => {
  let status: IStatusRequest = {
    lenght: 0,
    status: [],
  } as IStatusRequest;

  await apiLaravel.get("status").then((request) => {
    status = request.data.status;
  });
  return status;
};

export default getStatus;
