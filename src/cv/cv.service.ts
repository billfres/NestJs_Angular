import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRespository: Repository<CvEntity>
    ){
    }

    async findCvById(id: number) {
        const cv = await this.cvRespository.findOne(id);
        if(! cv) {
          throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }
          return cv;
      }

    async getCvs(): Promise<CvEntity[]>{
        return await this.cvRespository.find();
    }

    async addCv(cv: AddCvDto): Promise<CvEntity>{
        return await this.cvRespository.save(cv);
    }

    async updateCv(id:number, cv: UpdateCvDto): Promise<CvEntity>{
         //On récupére le cv d'id id et ensuite on remplace les anciennes valeurs de ce cv
         // par ceux du cv passé en paramètre
        const newCv = await this.cvRespository.preload({
            id,
            ...cv
        })
          // tester le cas ou le cv d'id id n'existe pas
        if(! newCv) {
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }
        return await this.cvRespository.save(newCv);
    }

    updateCv2(updateCriteria, cv: UpdateCvDto ) {
        return this.cvRespository.update(updateCriteria, cv);
    }

    async removeCv(id: number) {
        const cvToRemove = await this.findCvById(id);
        return await this.cvRespository.remove(cvToRemove);
    }

    async deleteCv(id: number) {
       /* const cvToRemove = await this.cvRespository.findOne(id);
        if(! cvToRemove) {
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }*/
        return await this.cvRespository.delete(id);
    }

    /*async softRemoveCv(id: number){
        const cvToRemove = await this.findCvById(id);
        return this.cvRespository.softRemove(cvToRemove);
    }*/
    async softDeleteCv(id: number){
        return this.cvRespository.softDelete(id);
    }

    async restoreCv(id: number){
        this.cvRespository.restore(id);
    }
    
}
