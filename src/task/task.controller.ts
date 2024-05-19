import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { errorHandler } from 'src/utils/errorHandler';
import { CurrentUser } from 'src/decorators';
import { CreateTaskDto } from 'src/dtos/task/create-task.dto';
import { TaskService } from './task.service';
import {
  GetTaskI,
  ITask,
  IUpdateTaskParams,
} from 'src/interfaces/task.interface';
import { PaginationQueryDto } from 'src/dtos/task/pagination-params.dto';
import { UpdateTaskDto } from 'src/dtos/task/update-task.dto';

@Controller('api/v1/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  public async CreateTask(
    @CurrentUser() userId: number,
    @Body() createTask: CreateTaskDto,
  ): Promise<ITask> {
    try {
      return await this.taskService.createTask(userId, createTask);
    } catch (error) {
      errorHandler(error);
    }
  }

  @Get('')
  public async GetTasks(
    @CurrentUser() id: number,
    @Query() pageParams: PaginationQueryDto,
  ): Promise<ITask[]> {
    const { page, perPage } = pageParams;
    try {
      return await this.taskService.getTasksByUser(
        id,
        parseInt(page),
        parseInt(perPage),
      );
    } catch (err) {
      console.log(err);
      errorHandler(err);
    }
  }
  @Get(':/id')
  public async GetTask(
    @CurrentUser() id: number,
    @Param() params: GetTaskI,
  ): Promise<ITask> {
    const { taskId } = params;
    try {
      return await this.taskService.getTaskById(id, taskId);
    } catch (err) {
      console.log(err);
      errorHandler(err);
    }
  }

  @Patch('/update-task/:id')
  public async UpdateUser(
    @CurrentUser() userId: number,
    @Param() params: IUpdateTaskParams,
    @Body() UpdateTask: UpdateTaskDto,
  ): Promise<ITask> {
    const { id } = params;
    return await this.taskService.updateTask(userId, id, UpdateTask);
  }

  @Delete('/delete-task/:id')
  public async DeleteTask(
    @CurrentUser() userId: number,
    @Param() params: IUpdateTaskParams,
  ): Promise<string> {
    const { id } = params;
    return await this.taskService.deleteTask(userId, id);
  }

  @Delete('/delete-tasks')
  public async DeleteAllTasks(@CurrentUser() id: number): Promise<string> {
    return await this.taskService.deleteAllTaskByUser(id);
  }
}
