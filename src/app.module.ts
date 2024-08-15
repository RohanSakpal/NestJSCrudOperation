import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CitiesModule } from './cities/cities.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory : (configServices: ConfigService) => ({
        type: 'postgres',
        host: configServices.get('DB_HOST'),
        port: +configServices.get('DB_PORT'),
        username: configServices.get('DB_USERNAME'),
        password: configServices.get('DB_PASSWORD'),
        database: configServices.get('DB_NAME'),
        entities: [join(process.cwd(), 'dist/**/*.entity.js')],
        synchronize: true,
      })
    }),
    CitiesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
