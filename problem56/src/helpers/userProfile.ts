import {
  MappingProfile,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from "@automapper/core";
import { User } from "../models/User.entity";
import { UserDto, UserRakingDto } from "../dtos/user";

const userProfile: MappingProfile = (mapper: any) => {
  createMap(
    mapper,
    User,
    UserDto,
    forMember(
      (dest: any) => dest.roleName,
      mapFrom((x: any) => x.role.roleName)
    ),
    forMember((dest: any) => dest.password, ignore())
  );
  createMap(
    mapper,
    User,
    UserRakingDto,
    forMember(
      (dest: any) => dest.fullName,
      mapFrom((x: any) => x.firstName + x.lastName)
    )
  );
};

export default userProfile;
