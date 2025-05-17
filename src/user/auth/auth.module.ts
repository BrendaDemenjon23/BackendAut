import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user.module'; // Certifique-se de importar o módulo de usuário
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secretKey', // Chave secreta para assinar o JWT, altere isso em produção
      signOptions: { expiresIn: '1h' }, // Defina o tempo de expiração do token
    }),
    UserModule,
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
