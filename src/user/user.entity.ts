
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column({ nullable: true })
  verificationCode: string;

  @Column({ nullable: true })
  codeExpiresAt: Date;
}
