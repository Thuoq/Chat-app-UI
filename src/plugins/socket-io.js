import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_APP_BASE_API, {
  // Additional options can be added here
});

export default {
  install: (app) => {
    app.config.globalProperties.$socket = socket;
  },
};
