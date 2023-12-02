import { api } from "../http";

export default class Service {
  static async recognition(file) {
    return api.post("/recognition", { file });
  }

  static async login(email, password) {
    return api.post("/login", { email, password });
  }

  static async registration(username, email, password) {
    return api.post("/register", { username, email, password });
  }

  static async refresh() {
    return api.post("/refresh");
  }
}
