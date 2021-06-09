import { Controller, Get } from '@nestjs/common';
import { CvService } from './cv.service';
import { CvEntity } from './entities/cv.entity';

@Controller('cv')
export class CvController {

    constructor(
        private cvService: CvService){
    }

    @Get()
    async getAllCvs(): Promise<CvEntity[]>{
        return await this.cvService.getCvs();
    }
}
