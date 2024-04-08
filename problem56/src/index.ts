import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import http from "http";

import { AppDataSource } from "./helpers/data-source";
import api from "./routes";
import socketIoService from "./services/socketio.service";

dotenv.config();
const app = express();
const server = http.createServer(app);

AppDataSource.initialize().then(() => {
  console.log("Connect database success");
});
app.use(cors());
app.use(express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("", api);

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});
socketIoService.start(server);
// socketIoService.getIO().emit("update-ranking", "hello");
