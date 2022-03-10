import { genSalt, hash, compareSync } from "bcrypt";
import bcryptConfig from "../config/bcrypt";
import Errors from "../data/errors";
import { User } from "../entities/User";
import { UserProps } from "../types/Filters";

class UserManager {
  hash(p: string): Promise<string> {
    return new Promise((resolve) => {
      genSalt(bcryptConfig.salts, (err, s) => {
        hash(p, s, (err, hash) => {
          resolve(hash);
        });
      });
    });
  }

  async create(data: UserProps) {
    if (!data.email || !data.password || !data.username)
      throw Errors.User.Missing;

    const user = await this.findByEmail(data.email);
    if (!user) {
      return await User.create({
        username: data.username,
        email: data.email,
        password: await this.hash(data.password),
      }).save();
    } else {
      throw Errors.User.Email.Taken;
    }
  }

  async get(data: UserProps) {
    if (!data.email || !data.password) throw Errors.User.Missing;

    const user = await this.findByEmail(data.email);
    if (user) {
      if (compareSync(data.password, await this.hash(data.password))) {
        return user;
      } else {
        throw Errors.User.Login;
      }
    } else {
      throw Errors.User.Login;
    }
  }

  async findByEmail(email: string) {
    return User.findOne({
      where: {
        email: email,
      },
    });
  }
}

export default new UserManager();
