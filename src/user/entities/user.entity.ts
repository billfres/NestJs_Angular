import { OneToMany, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CvEntity } from '../../cv/entities/cv.entity';
//import { UserRoleEnum } from '../../enums/user-role.enum';
import { Exclude } from 'class-transformer';
import { TimestampEntites } from 'src/Generics/timestamp.entities';

@Entity('user')
export class UserEntity extends TimestampEntites{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

/*
  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  })
  role: string;
*/
  @OneToMany(
    type => CvEntity,
    (cv) => cv.user,
    {
      nullable: true,
      cascade: true
    }
  )
  cvs: CvEntity[];
}
