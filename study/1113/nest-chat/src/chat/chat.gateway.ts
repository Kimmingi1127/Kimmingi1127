import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// @WebSocketGateway()
@WebSocketGateway({ namespace: 'chat' })
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(
    socket: Socket,
    data: { message: string; nickname: string },
  ): void {
    const { message, nickname } = data;
    // this.server.emit(
    //   'message',
    //   `client-${socket.id.substring(0, 4)} : ${data}`,
    // );
    socket.broadcast.emit('message', `${nickname} : ${message}`);
  }
}

@WebSocketGateway({ namespace: 'room' })
export class RoomGateway {
  rooms: string[] = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createRoom')
  handleMessage(@MessageBody() data: { room: string; nickname: string }) {
    const { room, nickname } = data;
    console.log(nickname);
    this.rooms.push(room);
    this.server.emit('rooms', this.rooms);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    socket: Socket,
    data: { nickname: string; room: string; toLeaveRoom: string },
  ) {
    const { nickname, room, toLeaveRoom } = data;
    socket.leave(toLeaveRoom);
    this.server.emit('notice', {
      message: `${nickname}님이 ${room}방에 입장했습니다.`,
    });
    socket.join(room);
  }

  @SubscribeMessage('message')
  handleMessageToRoom(
    socket: Socket,
    data: { nickname: string; room: string; message: string },
  ) {
    const { nickname, room, message } = data;
    console.log(data);
    socket.broadcast.to(room).emit('message', {
      message: `${nickname}: ${message}`,
    });
  }
}