import { addProfile, createMapper, ignore } from "@automapper/core";
import { classes } from "@automapper/classes";
import { userProfile } from "./index";
const mapper = createMapper({
  strategyInitializer: classes(),
});
addProfile(mapper, userProfile);
export default mapper;
