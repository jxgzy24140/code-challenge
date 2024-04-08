import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { User } from "./User.entity";

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  roleName!: string;

  @OneToMany(() => User, (user) => user.role)
  users?: User[];
}
