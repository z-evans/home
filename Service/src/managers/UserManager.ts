import objectHash = require("object-hash");
import Errors from "../data/errors";
import { User } from "../entities/User";
import { UserProps } from "../types/Filters";

class UserManager {
  async create(data: UserProps) {
    if (!(await this.findByEmail(data.email))) {
      return await User.create({
        username: data.username,
        email: data.email,
        password: objectHash(data.password),
      }).save();
    } else {
      throw Errors.User.Email.Taken;
    }
  }

  async get(data: UserProps) {
    const user = await this.findByEmail(data.email);
    if (user) {
      if (user.password == objectHash(data.password)) {
        return user;
      } else {
        throw "";
      }
    } else {
      throw "";
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
