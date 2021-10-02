import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRoleEnum } from 'src/enums/user-role.enum';
import { UserEntity } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { AddCvDto } from './dto/Add-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { CvEntity } from './entities/cv.entity';

@Injectable()
export class CvService {
    constructor(
        @InjectRepository(CvEntity)
        private cvRespository: Repository<CvEntity>,
        private userService : UserService
    ){
    }

    async findCvById(id: number, user) {
        const cv = await this.cvRespository.findOne(id);
        if(! cv) {
          throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }
        // Si on est admin ou si on est admin et on a pas de user
        if(this.userService.isOwnerOrAdmin(cv, user))
            return cv;
        else 
            throw new UnauthorizedException;     
    }

    async getCvs(user): Promise<CvEntity[]>{
        if(user.role === UserRoleEnum.ADMIN)
        return await this.cvRespository.find();
        return await this.cvRespository.find({user});
    }

    async addCv(cv: AddCvDto, user): Promise<CvEntity>{
        const newCv = this.cvRespository.create(cv);
        newCv.user = user;
        return await this.cvRespository.save(newCv);
    }

    async updateCv(id:number, cv: UpdateCvDto, user): Promise<CvEntity>{
         //On récupére le cv d'id id et ensuite on remplace les anciennes valeurs de ce cv
         // par ceux du cv passé en paramètre
        const newCv = await this.cvRespository.preload({
            id,
            ...cv
        })
          // tester le cas ou le cv d'id id n'existe pas et sauvegarde de la nouvelle entité new cv
        if(! newCv) {
            throw new NotFoundException(`Le cv d'id ${id} n'existe pas`);
        }
        // Si on est admin ou si on est admin et on a pas de user
        if(this.userService.isOwnerOrAdmin(newCv, user))
            return await this.cvRespository.save(newCv);
        else
        new UnauthorizedException('');
    }

    updateCv2(updateCriteria, cv: UpdateCvDto ) {
        return this.cvRespository.update(updateCriteria, cv);
    }

/*
    async removeCv(id: number) {
        const cvToRemove = await this.findCvById(id);
        return await this.cvRespository.remove(cvToRemove);
    }*/

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
    async softDeleteCv(id: number, user){
        const cv = await this.cvRespository.findOne({id});
        if(!cv){
            throw new NotFoundException('');
        } 
        if(this.userService.isOwnerOrAdmin(cv, user))
            return this.cvRespository.softDelete(id);
        else
            throw new UnauthorizedException('');
    }

    async restoreCv(id: number, user){
        const cv = await this.cvRespository.query("select * from cv where id = ?", [id]);
        if(!cv){
            throw new NotFoundException('');
        } 
        if(this.userService.isOwnerOrAdmin(cv, user))
            return this.cvRespository.restore(id);
        else
            throw new UnauthorizedException('');
    }

    async statCvNumberByAge(maxAge, minAge = 0) {
        // Créer un queryBuilder
        const qb = this.cvRespository.createQueryBuilder("cv");
        // Chercher le nombre de cv par age
          qb.select("cv.age, count(cv.id) as nombreDeCv")
          .where("cv.age > :minAge and cv.Age< :maxAge")
          .setParameters({minAge, maxAge})
          .groupBy("cv.age");
          console.log(qb.getSql());
          return await qb.getRawMany();
      }
    
}
