import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
import { ReqModule } from './http/req.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CatsModule,
    ReqModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
