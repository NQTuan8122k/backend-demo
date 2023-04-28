import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './exceptions/http-exception.filter';
import { UserModule } from './modules/user/user.module';
import { LoginModule } from './modules/login/login.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs',
      entities: [__dirname + '/../**/*.entity.js'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    TaskModule,
    UserModule,
    LoginModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
