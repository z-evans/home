import axios, { AxiosResponse } from "axios"
import { GamesFilter } from "../App";
import { defaultAxiosConfig } from "../data/Defaults";
import URLs from "../data/URLs";
import { GamesResponse } from "../types/Response";

class RobloxManager {

  async getGames(filter: GamesFilter) {
    return (await axios.post<never, AxiosResponse<GamesResponse>>(
      URLs.API.POST.Games,
      filter,
      defaultAxiosConfig
    )).data;
  }

}

export default new RobloxManager();