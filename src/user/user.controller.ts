
import {Body, Controller, Delete, Get, Patch} from '@nestjs/common';
import { UserService } from './user.service';
import { IAuthResponseUser, IResponseUser } from 'src/interfaces/user.interface';
import { errorHandler } from 'src/utils/errorHandler';
import { CurrentUser } from 'src/decorators';
import { UpdateUserDto } from 'src/dtos/user/update-user.dto';
import { DeleteUserDto } from 'src/dtos/user/delete-user.dto';

@Controller('api/v1/user')
export class UserController {
  constructor(
    private readonly userService: UserService,

  ) {}
    
  @Get('/me')
  public async GetMe(@CurrentUser() id : number): Promise<IAuthResponseUser> {
    
    try {
        return await this.userService.getCurrentUser(id);
    } catch (error) {
      errorHandler(error)
    }
  }

  @Patch('/update-user')
  public async UpdateUser(@CurrentUser() id: number,  @Body() updateUser : UpdateUserDto) : Promise<IResponseUser> {
    try{
        return await this.userService.updateUser(id, updateUser)
    }
    catch(err) {
        errorHandler(err)
    }
  }

  @Delete('/delete-user') 
  public async DeleteUser(@CurrentUser() id : number, @Body() deleteUser : DeleteUserDto): Promise<string> {
            
            const {password} = deleteUser
            return await this.userService.deleteUser(id, password)
       
  }

}
