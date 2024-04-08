declare class SocketIoService {
    private io;
    constructor();
    getIO(): any;
    start(httpServer: any): void;
    onConnection(socket: any): void;
    onDisconnect(socket: any): void;
    sendMessage(channel: string, data: any): void;
}
declare const _default: SocketIoService;
export default _default;
