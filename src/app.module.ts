import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
// module decorator is used to define a module in NestJS. It takes an object as an argument that can have properties like imports, controllers, and providers. In this case, we are defining the AppModule which 
// imports modules, has one controller (AppController), and one provider (AppService).
@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
