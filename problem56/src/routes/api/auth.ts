import express = require("express");
import authService from "../../services/auth.service";
import { identityMiddleware } from "../../middlewares/identityMiddleware";

const router = express.Router();

router.post("/login", async (req, res) => {
  const input = req.body;

  const result = await authService.login(input);
  if (!result)
    return res.status(200).json({ succes: false, message: "login failed" });
  return res
    .status(200)
    .json({ success: true, message: "success", data: result });
});

router.get(
  "/get-current-login-infomation",
  identityMiddleware,
  async (req: any, res) => {
    const id = req?.user?.id;
    if (!id) return null;
    const user = await authService.getCurrentLoginInfomation(id);
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid token" });
    return res.status(200).json({
      success: true,
      message: "success",
      data: user,
    });
  }
);

export default router;
