import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConnectedClient } from './interfaces/connected-client.interface';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ConnectedClientArray } from './interfaces/connected-client-array.interface';

@Injectable()
export class MessagesWsService {
  private connnectedClients: ConnectedClient = {};
  private clientsConnectedCount: number = 0;
  private messages: { id: string; message: string }[] = [];
  private connectedClientsArray: ConnectedClientArray[] = [];

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerClient(client: Socket, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User is not exist or is Unautorized');
    }
    this.connnectedClients[client.id] = {
      socket: client,
      user: user,
    };
    this.clientsConnectedCount++;
  }
  removeClient(id: string) {
    delete this.connnectedClients[id];
    this.clientsConnectedCount--;
  }
  getConnectedClients() {
    console.log(this.connnectedClients);
    return Object.values(this.connnectedClients).map(
      (client) => client.user.name,
    );
  }
  registerMessageFromClient(message: { id: string; message: string }) {
    this.messages.push(message);
  }
  getAllMessages() {
    return this.messages;
  }
  getClientsConnectedCount(): number {
    return this.clientsConnectedCount;
  }
  getUserFllName(socketId: string) {
    return this.connnectedClients[socketId].user.name;
  }
}
