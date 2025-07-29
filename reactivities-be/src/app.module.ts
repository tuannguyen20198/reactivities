import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { ActivitiesModule } from './features/activities/activities.module';
import { ProfilesModule } from './features/profiles/profiles.module';
import { UsersModule } from './features/users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { CommentsModule } from './features/comments/comments.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    CommonModule,
    ActivitiesModule,
    UsersModule,
    ProfilesModule,
    CommentsModule,
    LoggerModule.forRoot({
      pinoHttp: {
        // level: 'warn',
        transport: {
          target: 'pino-pretty',
          options: {
            translateTime: 'HH:MM:ss',
            ignore: 'pid,hostname',
            singleLine: true,
            colorize: true,
          },
        },
      },
    })
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    },
  ],
})
export class AppModule { }
