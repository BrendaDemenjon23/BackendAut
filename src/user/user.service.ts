import { Injectable, NotFoundException, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './auth/dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = this.usersRepository.create(createUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao criar o usuário.');
    }
  }

  async findOne(email: string): Promise<User | null> {
    try {
      return await this.usersRepository.findOne({ where: { email } });
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar o usuário.');
    }
  }

  async findOneById(id: number): Promise<User | null> {
    if (isNaN(id)) {
      throw new BadRequestException('O ID fornecido não é um número válido.');
    }
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }
      return user;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar o usuário pelo ID.');
    }
  }

  async remove(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new BadRequestException('O ID fornecido não é um número válido.');
    }
    try {
      const user = await this.findOneById(id);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }
      await this.usersRepository.remove(user);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao remover o usuário.');
    }
  }

  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    if (isNaN(id)) {
      throw new BadRequestException('O ID fornecido não é um número válido.');
    }
    try {
      const user = await this.findOneById(id);
      if (!user) {
        throw new NotFoundException('Usuário não encontrado.');
      }
      Object.assign(user, updateUserDto);
      return await this.usersRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao atualizar o usuário.');
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar todos os usuários.');
    }
  }
}