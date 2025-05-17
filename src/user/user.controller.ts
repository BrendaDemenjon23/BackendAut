import { Controller, Post, Body, Put, Param, Delete, Get, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './auth/dto/create-user.dto';
import { User } from './user.entity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Put(':id')
    async updateUser(@Body() updateUserDto: Partial<CreateUserDto>, @Param('id', ParseIntPipe) id: number) {
        return this.userService.update(id, updateUserDto);
    }

    @Delete(':id') // Parâmetro de rota
    async removeUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.userService.remove(id);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}
