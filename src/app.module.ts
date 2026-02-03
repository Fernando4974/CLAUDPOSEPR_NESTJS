import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from './common/common.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ProductsModule } from './products/products.module';
import { MessagesWsModule } from './messages-ws/messages-ws.module';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: process.env.EMAIL_HOST,
          port: +process.env.EMAIL_PORT!,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
      }),
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      type: 'postgres',
      database: process.env.DB_NAME,
      host: process.env.DB_HOST!,
      port: +process.env.DB_PORT! || 6432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    CommonModule,
    ProductsModule,
    MessagesWsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
