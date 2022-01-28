import axios from "axios";
import { defaultAxiosConfig } from "../data/Defaults";
import URLs from "../data/URLs";
import { UserDetails } from "../types/Common";

class AuthenticationManager {
  async isAuth(): Promise<boolean> {
    return (
      typeof (await axios.get(URLs.API.GET.User.Auth, defaultAxiosConfig))
        .data === "object"
    );
  }
  async login(data: UserDetails): Promise<void> {
    return await axios.post(URLs.API.GET.User.Login, data, defaultAxiosConfig);
  }
}

export default new AuthenticationManager();
