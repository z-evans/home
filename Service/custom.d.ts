import { User } from "./src/entities/User";
import { UserProps } from "./src/types/Filters";

declare namespace Express {
  export interface Request {
    user: User;
  }
  export interface Response {
    user: User;
  }
}

declare module "express-session" {
  interface Session {
    user: User;
  }
}
