import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      url: 'postgresql://postgres:oIRAKrrbpnnhIlTeFOiTzCZJUfrFVLgA@metro.proxy.rlwy.net:32286/railway',
      type: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule, // 🔹 Certifique-se de que ele está aqui
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
