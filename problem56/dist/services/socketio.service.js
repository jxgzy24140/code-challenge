"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
class SocketIoService {
    constructor() {
        this.onConnection = this.onConnection.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
    }
    getIO() {
        console.log("hello");
        return this.io;
    }
    start(httpServer) {
        const io = new socket_io_1.Server(httpServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });
        io.on("connection", (socket) => {
            // console.log("a user connected");
        });
        this.io = io;
    }
    onConnection(socket) {
        try {
            socket.on("disconnect", this.onDisconnect);
        }
        catch (err) {
            console.log(err);
        }
    }
    onDisconnect(socket) {
        var _a;
        console.log("onDisconnect ", (_a = socket.user) === null || _a === void 0 ? void 0 : _a.id);
    }
    sendMessage(channel, data) {
        this.io.emit(channel, data);
        // this.io.on(channel, (socket: any) => {
        //   socket.emit(channel, data);
        // });
    }
}
exports.default = new SocketIoService();
