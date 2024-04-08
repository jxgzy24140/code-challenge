import { AutoMap } from "@automapper/classes";

export class UserRakingDto {
  @AutoMap()
  id!: number;
  @AutoMap()
  fullName!: string;
  @AutoMap()
  scores!: number;
  @AutoMap()
  email!: string;
}
