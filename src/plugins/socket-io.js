import { io } from "socket.io-client";
const socket = io("http://localhost:8021", {
  // Additional options can be added here
});

export default {
  install: (app) => {
    app.config.globalProperties.$socket = socket;
  },
};
