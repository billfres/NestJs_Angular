import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { Request, request } from 'express';
//import { UserEntity } from 'src/user/entities/user.entity';
import { JwtAuthGuard } from 'src/user/Guards/jwt-auth.guard';
import { CvService } from './cv.service';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';
import { User } from '../decorators/user.decorator';

@Controller('cv')
export class CvController {

    constructor(
        private cvService: CvService){
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async getAllCvs(
        @User() user
    ): Promise<CvEntity[]>{
        return await this.cvService.getCvs(user);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async addCv(
        @Body() addCvDto: AddCvDto,
        @User() user
    ): Promise<CvEntity>{
        //console.log('User extracted from request',request.user)
        return await this.cvService.addCv(addCvDto, user);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    async updateCv2(
        @Body() updateObject,
        @User() user
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
    @UseGuards(JwtAuthGuard)
    async restoreCv(
        @Param('id', ParseIntPipe) id:  number,
        @User() user
    ){
        return await this.cvService.restoreCv(id, user);
    }

    @Get(":id")
    async getCv(
        @Param('id', ParseIntPipe) id,
        @User() user
    ): Promise<CvEntity>{
        return await this.cvService.findCvById(id, user);
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
        @Param('id', ParseIntPipe) id: number,
        @User() user
    ) {
        return this.cvService.softDeleteCv(id, user);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    async updateCv(
        @Body() updateCvDto: UpdateCvDto,
        @Param('id', ParseIntPipe) id : number,
        @User() user
    ): Promise<CvEntity>{
        return await this.cvService.updateCv(id,updateCvDto, user);
    }
}

