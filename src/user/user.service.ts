import {  NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/dtos/user/update-user.dto';
import { IProtectedUser } from 'src/interfaces/user.interface';

const prisma = new PrismaClient();
export class UserService {
  constructor(private readonly prisma: PrismaClient) {}

  async getCurrentUser(userId: number): Promise<IProtectedUser> {
    const user: any = await prisma.user.findUnique({
      where: { id: userId },
    });
    const { email, username, createdAt, updatedAt } = user;
    const userDetails = {
      email,
      username,
      createdAt,
      updatedAt
    };
    return userDetails;
  }
  async findAllUsers(page?: number, perPage?: number) {
    const skip = page && perPage ? (page - 1) * perPage : undefined;
    const take = perPage ? perPage : undefined;
    return prisma.user.findMany({
      skip,
      take,
    });
  }
  async findUserById(userId: string) {
    const id = parseInt(userId);
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    const { email, username, id: uid } = user;
    const userDetails = {
      email,
      username,
      id: uid,
    };
    return userDetails;
  }

  async updatePassword(email: string, newPassword: string): Promise<void> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const {id} = user;
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where : {id : id},
      data: {password: hashedPassword}
    });
  }

  async updateUser(userId: number, updateUserDto: UpdateUserDto): Promise<IProtectedUser> {
    const { username } = updateUserDto;

    // Check if the user exists
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Only allow the user to update their username
    if (username) {
      await prisma.user.update({
        where: { id: userId },
        data: { username },
      });
    }
    const {email, createdAt, updatedAt} = user;
    // Return updated user
    const userDetails  =  {
      email,
      username,
      createdAt,
      updatedAt
    }
    return userDetails;
  }
  async deleteUser(userId: number, password: string): Promise<string> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password.');
    }

    await prisma.user.delete({ where: { id: userId } });

    return 'User deleted successfully';
  }
}
