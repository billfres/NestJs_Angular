import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { CvController } from './cv.controller';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CvEntity]),
  UserModule
],
  controllers: [CvController],
  providers: [CvService]
})
export class CvModule {}
