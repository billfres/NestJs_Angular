import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
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

    @Patch(':id')
    async updateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id : number
    ): Promise<CvEntity>{
        return await this.cvService.updateCv(id,updateCvDto);
    }

    @Patch()
    //@UseGuards(JwtAuthGuard)
    async updateCv2(
        @Body() updateObject
        //@User() user
    ) {
        const {updateCriteria, updateCvDto} = updateObject
        return await this.cvService.updateCv2(updateCriteria, updateCvDto);
    }

    @Delete(':id')
    //@UseGuards(JwtAuthGuard)
    async removeCv(
        @Param('id', ParseIntPipe) id: number,
        //@User() user
    ) {
        return this.cvService.removeCv(id);
        //return this.cvService.softDeleteCv(id, user);
    }
}

