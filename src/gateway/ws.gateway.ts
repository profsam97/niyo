import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { TaskService } from '../task/task.service';
import { AuthGuard } from 'src/guard/auth-guard';
import { ITask } from 'src/interfaces/task.interface';
import { CustomSocket } from 'src/interfaces/custom-socket.interface';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({
  namespace: '/tasks',
  cors: {
    origin: '*',
  },
})
@UseGuards(AuthGuard)
export class WsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  constructor(private readonly taskService: TaskService) {}

  afterInit(server: Server) {
    console.log(`WebSocket server initialized, ${server}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log(`Client connected: ${client.id}`, args);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('createTask')
  async handleCreateTask(
    client: CustomSocket,
    @MessageBody() createTaskDto: ITask,
  ): Promise<void> {
    const userId = client.user;
    const newTask = await this.taskService.createTask(userId, createTaskDto);
    this.server.emit('taskCreated', newTask);
  }

  @SubscribeMessage('updateTask')
  async handleUpdateTask(
    client: CustomSocket,
    @MessageBody() task: ITask,
  ): Promise<void> {
    const userId = client.user;
    const { id: taskId, name, description } = task;
    const updateTask = {
      name,
      description,
      update: '',
    };
    const updatedTask = await this.taskService.updateTask(
      userId,
      taskId.toString(),
      updateTask,
    );
    this.server.emit('taskUpdated', updatedTask);
  }

  @SubscribeMessage('deleteTask')
  async handleDeleteTask(
    client: CustomSocket,
    @MessageBody() id: number,
  ): Promise<void> {
    const userId = client.user;
    await this.taskService.deleteTask(userId, id.toString());
    this.server.emit('taskDeleted', id);
  }

  @SubscribeMessage('getTasks')
  async handleGetTasks(client: CustomSocket): Promise<void> {
    const userId = client.user;
    const tasks = await this.taskService.getTasksByUser(userId);
    this.server.emit('tasks', tasks);
  }
}
