import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Nome é obrigatório' })
  nome: string;

  @IsEmail({}, { message: 'Email inválido' })
  @IsNotEmpty({ message: 'Email é obrigatório' })
  email: string;

  @IsNotEmpty({ message: 'Telefone é obrigatório' })
  telefone: string;

  @IsNotEmpty({ message: 'Senha é obrigatória' })
  senha: string;

  @IsNotEmpty({ message: 'Foto é obrigatória' })
  foto: string;
}
