import { Body, Controller, Get, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/Add-cv.dto';
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

    @Post()
    async addCv(
        @Body() addCvDto: AddCvDto
    ): Promise<CvEntity>{
        return await this.cvService.addCv(addCvDto);
    }
}
