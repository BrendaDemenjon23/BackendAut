
import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(loginDTO: LoginDto): Promise<{ message: string }> {
    const { email, senha } = loginDTO;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(senha, user.senha))) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60000);

    user.verificationCode = code;
    user.codeExpiresAt = expiresAt;
    await this.userRepository.save(user);

    console.log(`Código de verificação para ${email}: ${code}`);

    return { message: 'Código de verificação enviado para o e-mail' };
  }

  async verifyCode(email: string, code: string): Promise<{ accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user || user.verificationCode !== code) {
      throw new BadRequestException('Código inválido');
    }

    if (user.codeExpiresAt < new Date()) {
      throw new BadRequestException('Código expirado');
    }

    user.verificationCode = null;
    user.codeExpiresAt = null;
    await this.userRepository.save(user);

    const accessToken = this.jwtService.sign({ id: user.id, email: user.email });
    return { accessToken };
  }
}
