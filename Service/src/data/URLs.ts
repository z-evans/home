import config from "./config";

const robloxAPI = "https://games.roblox.com/v1";

export default {
  API: {
    POST: {
      Thumbnails: `https://thumbnails.roblox.com/v1/batch`
    }
  },
  DIR: {
    User: (id: number) => `${config.files}/${id}`
  }
}