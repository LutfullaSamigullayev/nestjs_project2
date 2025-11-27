import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true}),
  TypeOrmModule.forRoot({
      type: "postgres",
      username: "postgres",
      port: 5432,
      password: String(process.env.DB_PASSWORD as string),
      database: String(process.env.DB_DATABASE as string),
      synchronize: true,
      entities: [],
      logging: false
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
