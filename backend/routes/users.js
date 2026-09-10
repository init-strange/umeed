import express from "express";
import saveUserToDB from "../functions/saveuser.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const result = await saveUserToDB(req.body);

  if (!result.success) {
    return res.status(500).json(result);
  }

  res.status(201).json(result);
});

export default router;

