import express from "express";
import {
  createTonghoptb,
  getAllTonghoptb,
  getTonghoptbById,
  updateTonghoptb,
  deleteTonghoptb,
  deleteManyTonghoptb,
} from "../controllers/tonghoptbController.js";
const router = express.Router();
router.post("/", createTonghoptb);
router.get("/", getAllTonghoptb);
router.get("/:id", getTonghoptbById);
router.put("/:id", updateTonghoptb);
router.delete("/:id", deleteTonghoptb);
router.delete("/", deleteManyTonghoptb);
export default router;