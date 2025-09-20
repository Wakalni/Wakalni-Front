import { ILogin, IUser, IRegister } from "@/types/user";
import { Http } from "./http";

export default class UserApi {
  static async register(user: IUser) {
    const response = await Http.post<{ user: IUser; token: string }, IRegister>(
      "/user/register",
      user
    );

    return response?.data;
  }

  static async login({ email, password }: ILogin) {
    const response = await Http.post<{ user: IUser; token: string }, ILogin>(
      "/user/login",
      {
        email,
        password,
      }
    );

    return response.data;
  }

  static async verify(token?: string) {
    const response = await Http.post<IUser, null>("/user/verify", null, {
      headers: {
        Cookie: `token=${token}`,
      },
      withCredentials: true,
    });
    return response?.data;
  }
  static async logout() {
    const response = await Http.post<IUser, null>("/user/logout", null);

    return response?.data;
  }

  static async sendOTP(email: string) {
    const response = await Http.post<null, { email: string }>(
      "/user/send-otp",
      { email }
    );

    return response?.data;
  }
}
