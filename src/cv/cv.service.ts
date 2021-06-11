import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRespository: Repository<CvEntity>
    ){
    }

    async getCvs(): Promise<CvEntity[]>{
        return await this.cvRespository.find();
    }

    async addCv(cv: AddCvDto): Promise<CvEntity>{

        return await this.cvRespository.save(cv);
    }
}
