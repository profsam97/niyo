import {  BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateTaskDto } from 'src/dtos/task/create-task.dto';
import {  UpdateTaskDto } from 'src/dtos/task/update-task.dto';
import { ITask } from 'src/interfaces/task.interface';

const prisma = new PrismaClient();
export class TaskService {
  constructor(private readonly prisma: PrismaClient) {}

  async createTask (owner : number, createTask: CreateTaskDto)  : Promise<ITask> {
    const { name, description } = createTask;
     try {

     return await prisma.task.create({
        data: {
          owner,
          name,
          description,
        },
      });
    }
    catch(err) {
        throw new InternalServerErrorException(err.message)
    }
  }

  async getTasksByUser (userId : number, page?: number, perPage?: number) : Promise<ITask[]> {
    const skip = page && perPage ? (page -1 ) * perPage : undefined;
    const take = perPage ? perPage : undefined;
    

    const tasks : ITask[] = await prisma.task.findMany({
        where: {owner : userId},
        skip,
        take
    })
    return tasks;
  }
 
  async updateTask (userId: number, taskId : string, updateUser: UpdateTaskDto) : Promise<ITask> {
    //check if the task exist
    const {name, description} = updateUser;
    let id : number = parseInt(taskId)
    const task : ITask  = await prisma.task.findUnique({where : {id}});

    if(!task) {
        throw new NotFoundException('Task not found');
    }

    //here we make a check to confirm if the user is the owner of the task

    if(task.owner !== userId) {
        throw new UnauthorizedException('Sorry you are not authorized to update this task')
    }
    if (name === '' && description === ''){
        throw new BadRequestException('You need to provide a name or description in order to update the task')
    }

    if(name && description) {
        await prisma.task.update({
            where : {id},
            data: {name, description}
        })
        return await prisma.task.findUnique({where : {id }})
    }
    if(name !== '' && !description) {
        await prisma.task.update({
            where : {id},
            data: {name}
        })

        return await prisma.task.findUnique({where : {id }})
    }

    await prisma.task.update({
        where : {id},
        data: {description}
    })

    return await prisma.task.findUnique({where : {id }})    // then we update the task
  }


  async deleteTask(userId: number, taskId: string): Promise<string> {
    let id : number = parseInt(taskId)
    const task : ITask = await prisma.task.findUnique({ where: { id} });
    if (!task) {
      throw new NotFoundException('Task not found.');
    }

    if(task.owner !== userId) {
        throw new UnauthorizedException('Oops, you are not authorized to delete this task')
    }
    await prisma.task.delete({ where: { id } });

    return 'Task deleted successfully';
  }

  async deleteAllTaskByUser (userId: number) : Promise<string> {
        try {
         const result = await prisma.task.deleteMany({where: {owner: userId}})
          return  result.count === 0 ? 'You have no tasks yet' : 'Tasks deleted successfully'
        } catch (error) {
          throw new InternalServerErrorException(`error message: `, error.message)
        }
  }
}
