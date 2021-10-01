import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request, request } from 'express';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';
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
    @UseGuards(JwtAuthGuard)
    async addCv(
        @Body() addCvDto: AddCvDto,
        @Req() request: Request
    ): Promise<CvEntity>{
        //console.log('User extracted from request',request.user)
        const user = request.user;
        return await this.cvService.addCv(addCvDto, user);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async updateCv2(
        @Body() updateObject
        //@User() user
    ) {
        const {updateCriteria, updateCvDto} = updateObject
        return await this.cvService.updateCv2(updateCriteria, updateCvDto);
    }

        // Chercher le nombre de cv par age
    @Get('stats')
    //@UseGuards(JwtAuthGuard)
    async statsCvNumberByAge() {
        return await this.cvService.statCvNumberByAge(50,18);
    }

    //Les routes les plus génériques(avec paramètres) sont toujours placées à la fin

    @Get('recover/:id')
    async restoreCv(
        @Param('id', ParseIntPipe) id:  number){
        return await this.cvService.restoreCv(id);
    }

    @Get(":id")
    async getCv(
        @Param('id', ParseIntPipe) id
    ): Promise<CvEntity>{
        return await this.cvService.findCvById(id);
    }

    /*@Delete(':id')
    //@UseGuards(JwtAuthGuard)
    async removeCv(
        @Param('id', ParseIntPipe) id: number,
        //@User() user
    ) {
        //return this.cvService.removeCv(id);
        // soit en utilisant la methode return this.cvService.deleteCv(id); 
        //return this.cvService.softDeleteCv(id, user);
        //La méthode delete utilise des critères

        //soft RemoveCv
        return this.cvService.softRemoveCv(id);
    }*/
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteCv(
        @Param('id', ParseIntPipe) id: number
    ) {
        return this.cvService.softDeleteCv(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id : number
    ): Promise<CvEntity>{
        return await this.cvService.updateCv(id,updateCvDto);
    }
}

