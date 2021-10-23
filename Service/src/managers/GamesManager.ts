/*import { getRepository } from "typeorm";
import { Games } from "../entities/Games";
import { GameFilter } from "../types/Filters";
import RobloxManager from "./RobloxManager";

class GamesManager {

  async get(filter: GameFilter) {
    return await getRepository(Games)
      .createQueryBuilder("games")
      .innerJoinAndSelect("games.details", "details")
      .where("details.name LIKE :name AND details.genre LIKE :genre", {
        name: `%${filter.name}%`,
        genre: `%${filter.genre}%`
      })
      .orderBy("details.playing", "DESC")
      .offset(filter.offset)
      .limit(filter.limit).getManyAndCount();
  }

  async getThumbnails(universeIds: string[]) {
    return await RobloxManager.getThumbnails(universeIds)
  }

}

export default new GamesManager();*/
