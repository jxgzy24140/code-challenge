import express = require("express");
import userService from "../../services/user.service";
import { UpdateUserScoresInputDto } from "../../dtos/user";
import { identityMiddleware } from "../../middlewares/identityMiddleware";
const router = express.Router();

router.get("/ranking", async (req, res) => {
  const result = await userService.getTenUsersHighestScores();
  return res.status(200).json({
    success: true,
    message: "success",
    data: result,
  });
});

router.get("/:id", async (req, res) => {
  const { id }: any = req.params;
  console.log(id);
  try {
    const user = await userService.get(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    return res.status(200).json({
      success: true,
      message: "success",
      data: user,
    });
  } catch {}
});

router.get("/", async (req, res) => {
  const { pageSize, pageNumber }: any = req.query;
  const result = await userService.getAll(pageNumber, pageSize);
  return res.status(200).json(result);
});

router.post("/", async (req, res) => {
  const input = req.body;
  const result = await userService.createUser(input);
  if (!result)
    return res.status(400).json({ success: false, message: "Created failed!" });
  return res
    .status(200)
    .json({ success: true, message: "Created successfully" });
});

router.delete("/:id", async (req, res) => {
  const { id }: any = req.params;
  const result = await userService.delete(id);
  if (!result)
    return res.status(404).json({ success: false, message: "Deleted failed!" });
  return res.status(200).json({ success: false, message: "Success" });
});

router.patch("/:id", async (req, res) => {
  const { id }: any = req.params;
  const input = req.body;
  if (id != input.id)
    return res.status(400).json({ success: false, message: "Invalid input" });
  const result = await userService.updateUser(id, input);
  if (!result)
    return res.status(404).json({ success: false, message: "Updated failed!" });
  return res.status(200).json({ success: false, message: "Success" });
});

router.patch(
  "/update-scores/:id",
  identityMiddleware,
  async (req: any, res) => {
    const { id }: any = req.params;
    if (req.user?.id != id)
      return res.status(403).json({ success: false, message: "Invalid input" });
    const input: UpdateUserScoresInputDto = req.body;
    if (id != input.id)
      return res.status(400).json({ success: false, message: "Invalid input" });
    const result = await userService.updateUserScore(id, input);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Updated failed!" });
    return res
      .status(200)
      .json({ success: true, message: "Success", data: result });
  }
);

export default router;
