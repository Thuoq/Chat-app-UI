import axios from "axios";
import { createPinia } from "pinia";
import { useAuthStore } from "@/store/auth";
import { REQUEST_HEADER } from "@/constant/request-headers";
import { HTTP_STATUS } from "@/constant/http-code";

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
    apis.chatApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === HTTP_STATUS.AUTHORIZATION.status &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          // Make a request to get a refresh token
          const response = await axios.get("auth/refresh-token", {
            baseURL: options.baseUrl,
            headers: {
              [REQUEST_HEADER.CLIENT_ID]: authStore.currentUser?.id || null,
            },
            withCredentials: true,
          });

          if (response.status === HTTP_STATUS.OK.status) {
            // Retry the original request
            return axiosInstance(originalRequest);
          }
        }

        // Return any error to be handled by the application
        return Promise.reject(error);
      }
    );

    app.config.globalProperties.$axios = axiosInstance;
  },
};

export { axiosPlugin, apis };
