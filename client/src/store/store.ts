import type { IUser } from "../models/IUser";
import { makeAutoObservable } from 'mobx';
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponse } from "../models/response/AuthResponse";
import { API_URL } from "../http";

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  isActivated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  setActivated(bool: boolean) {
    this.isActivated = bool;
  }

  async login(email: string, password: string) {
    try {
      const response = await AuthService.login(email, password);
      console.log('login', response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setActivated(response.data.user.isActivated);
    } catch (error) {
      console.log((error as any)?.response?.data?.message);
    }
  }

  async registration(email: string, password: string) {
    try {
      const response = await AuthService.registration(email, password);
      console.log('register', response);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setActivated(response.data.user.isActivated);
    } catch (error) {
      console.log((error as any)?.response?.data?.message);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
      this.setActivated(false);
    } catch (error) {
      console.log((error as any)?.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, { withCredentials: true });
      console.log('check auth', response);

      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      this.setActivated(response.data.user.isActivated);
    } catch (error) {
      console.log((error as any)?.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

} 