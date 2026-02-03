import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { MessagesWsService } from './messages-ws.service';
import { Server, Socket } from 'socket.io';
import { NewMessageDto } from './dtos/new-message.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interfaces';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  wss: Server;
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    let payload: JwtPayload;
    const token = client.handshake.headers.authentication as string;
    console.log({ token });
    try {
      payload = await this.jwtService.verify(token);
      await this.messagesWsService.registerClient(client, payload.id);
      this.messagesWsService.getConnectedClients();
    } catch (error) {
      console.log(error);
      client.disconnect();
      return;
    }
    this.messagesWsService.getClientsConnectedCount();
    console.log(
      'Clientes conectados',
      this.messagesWsService.getClientsConnectedCount(),
      // this.messagesWsService.getAllMessages(),
    );
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
      this.messagesWsService.getClientsConnectedCount(),
    );
    // this.wss.emit('messages-updated', this.messagesWsService.getAllMessages());
    // return this.messagesWsService.registerClient(client);
  }
  handleDisconnect(client: Socket) {
    this.messagesWsService.removeClient(client.id);
    this.wss.emit(
      'clients-updated',
      this.messagesWsService.getConnectedClients(),
    );
    //  this.wss.emit('messages-updated', this.messagesWsService.getAllMessages());
  }
  @SubscribeMessage('message-from-client')
  handleMessageFromClient(client: Socket, payload: NewMessageDto) {
    console.log(client.id, payload);
    const userName = this.messagesWsService.getUserFllName(client.id);

    //emite solo al cliente que envia el mensaje
    // client.emit('message-from-server', {
    //   fullname: 'Server',
    //   message: payload.message,
    // });
    //emite a todos los clientes conectados
    // client.broadcast.emit('message-from-server', {
    //   fullname: 'Server',
    //   message: payload.message,
    // });
    //emite a todos los clientes incluyendo el que envia el mensaje
    this.wss.emit('message-from-server', {
      id: userName || 'Anonymous',
      message: payload.message,
    });
  }
}
