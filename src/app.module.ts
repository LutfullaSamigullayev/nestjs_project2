import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: "postgres",
      username: "postgres",
      port: 5432,
      password: String(process.env.DB_PASSWORD as string),
      database: String(process.env.DB_DATABASE as string),
      synchronize: true,
      models: []
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
