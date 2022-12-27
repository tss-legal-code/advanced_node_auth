import $api from "../http";
import { AxiosResponse } from "axios";
import type { IUser } from "../models/IUser";

export default class UserService {
  static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
