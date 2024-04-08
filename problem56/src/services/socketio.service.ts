import { Server } from "socket.io";

class SocketIoService {
  private io: any;
  constructor() {
    this.onConnection = this.onConnection.bind(this);
    this.onDisconnect = this.onDisconnect.bind(this);
  }

  getIO() {
    console.log("hello");
    return this.io;
  }

  start(httpServer: any) {
    const io = new Server(httpServer, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
    io.on("connection", (socket: any) => {
      // console.log("a user connected");
    });
    this.io = io;
  }

  onConnection(socket: any) {
    try {
      socket.on("disconnect", this.onDisconnect);
    } catch (err) {
      console.log(err);
    }
  }

  onDisconnect(socket: any) {
    console.log("onDisconnect ", socket.user?.id);
  }

  sendMessage(channel: string, data: any) {
    this.io.emit(channel, data);

    // this.io.on(channel, (socket: any) => {
    //   socket.emit(channel, data);
    // });
  }
}

export default new SocketIoService();
