import axios from "axios";
import { parseCookies } from "nookies";

type TSignInRequestData = {
  cpf: string;
  password: string;
};

export async function signInRequest(data: TSignInRequestData) {
  return await axios
    .get(process.env.NEXT_PUBLIC_API_LOGIN + "")
    .then(() => {
      return axios.post(process.env.NEXT_PUBLIC_API_URL + "login", data);
    });
}

export async function recoverUserInformation() {
  const { user: user } = parseCookies();
  return user;
}
