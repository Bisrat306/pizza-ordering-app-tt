import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('Client connected:', client.id);
    // You can add logic here to handle connections
  }

  handleDisconnect(client: any) {
    console.log('Client disconnected:', client.id);
    // You can add logic here to handle disconnections
  }

  // Example method to broadcast messages to connected clients
  broadcastMessage(message: string) {
    this.server.emit('message', message);
  }
}
