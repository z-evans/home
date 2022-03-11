import config from "./config";

export default {
  DIR: {
    User: (id: number) => `${config.files}/${id}`,
    Temp: `${config.files}/temp`,
  },
};
