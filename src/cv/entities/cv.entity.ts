import { TimestampEntites } from "src/Generics/timestamp.entities";
import { UserEntity } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cv')
export class CvEntity extends TimestampEntites{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50
  })
  name: string;

  @Column({
    length: 50
  })
  firstname: string;

  @Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;

  @ManyToOne(
    type => UserEntity,
    (user) => user.cvs,
    {
      cascade: ['insert', 'update'],
      nullable: true,
      eager: true
    }
  )
  user: UserEntity;
}
