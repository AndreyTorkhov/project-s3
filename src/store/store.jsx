import { makeAutoObservable } from "mobx";
import Service from "../services/Service";

export default class Store {
  user = {};
  text = "";
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    this.isAuth = bool;
  }

  setUser(user) {
    this.user = user;
  }

  async login(email, password) {
    try {
      const response = await Service.login(email, password);
      console.log(response);
      localStorage.setItem("token_access", response.data.access_token);
      localStorage.setItem("token_refresh", response.data["refresh token"]);
      this.setAuth(true);
      this.setUser(response.data);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async registration(username, email, password) {
    try {
      const response = await Service.registration(username, email, password);
      console.log(response);
      localStorage.setItem("token_access", response.data.access_token);
      localStorage.setItem("token_refresh", response.data["refresh token"]);
      this.setAuth(true);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async recognition(file) {
    try {
      const response = await Service.recognition(file);
      this.text = response.data;
    } catch (e) {
      console.log(e);
    }
  }

  async history() {
    try {
      const response = await Service.history();
      const historyData = response.data;
      this.historyArray = historyData;
      historyData.forEach((item) => {
        console.log(
          "ID:",
          item.id,
          "Image Path:",
          item.image_path,
          "Text:",
          item.response
        );
      });
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }

  async checkAuth() {
    try {
      const response = await Service.refresh();
      localStorage.setItem("token_access", response.data.access_token);
      localStorage.setItem("token_refresh", response.data.refresh_token);
      this.setAuth(true);
    } catch (e) {
      console.log(e.response?.data?.message);
    }
  }
}
