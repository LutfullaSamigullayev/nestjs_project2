import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './module/product/product.module';
import { AuthModule } from './module/auth/auth.module';

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
      // entities: [User, Product],
      autoLoadEntities: true,
      logging: ['error', "info", "warn"]
    }),
    
    AuthModule,
    ProductModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
