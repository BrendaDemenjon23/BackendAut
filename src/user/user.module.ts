import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Importando a entidade User corretamente
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // 🔹 Exportando o serviço para ser usado em outros módulos
})
export class UserModule {}

