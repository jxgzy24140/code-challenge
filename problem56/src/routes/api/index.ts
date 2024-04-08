import express = require("express");
import user from "./user";
import role from "./role";
import auth from "./auth";
const router = express.Router();

router.use("/users", user);
router.use("/roles", role);
router.use("/auth", auth);

export default router;
