import api from "../http";

export default class Service {
  static async login(email, password) {
    return api.post("/login", { email, password });
  }

  static async registration(username, email, password) {
    return api.post("/register", { username, email, password });
  }
}
