import axios from "axios";
import { createPinia } from "pinia";
import { useAuthStore } from "@/store/auth";
import { REQUEST_HEADER } from "@/constant/request-headers";
import Cookies from "js-cookie";

const pinia = createPinia();
const apis = {};
const axiosPlugin = {
  install: (app, options) => {
    const authStore = useAuthStore();
    const axiosInstance = axios.create({
      baseURL: options.baseUrl,
      withCredentials: true,
    });

    apis.chatApi = axiosInstance;
    apis.chatApi.interceptors.request.use((config) => {
      config.headers[REQUEST_HEADER.CLIENT_ID] =
        authStore.currentUser?.id || null;
      return config;
    });

    app.config.globalProperties.$axios = axiosInstance;
  },
};

export { axiosPlugin, apis };
