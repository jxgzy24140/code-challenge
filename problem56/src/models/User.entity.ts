import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Role } from "./Role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @AutoMap()
  id!: number;

  @Column()
  @AutoMap()
  roleId: number = 1;

  @Column({ length: 15, nullable: false })
  @AutoMap()
  firstName!: string;

  @Column({ length: 15, nullable: false })
  @AutoMap()
  lastName!: string;

  @Column({ nullable: false })
  @AutoMap()
  email!: string;

  @Column({ nullable: false })
  @AutoMap()
  password!: string;

  @Column()
  @AutoMap()
  scores: number = 0;

  @Column()
  @AutoMap()
  createdDate: Date = new Date();

  @Column({ nullable: true })
  @AutoMap()
  updatedDate?: Date;

  @ManyToOne(() => Role)
  role!: Role;
}
