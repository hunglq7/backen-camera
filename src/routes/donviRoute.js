import express from "express";
import {
  createDonvi,
  deleteDonvi,
  getAllDonvi,
  getDonviById,
  updateDonvi,
  deleteAllDonvi,
  countDonvi,
  deleteselectDonvi
} from "../controllers/donviController.js";
const router = express.Router();

router.post("/", createDonvi);
router.get("/", getAllDonvi);
router.get("/:id", getDonviById);
router.put("/:id", updateDonvi);
router.delete("/:id", deleteDonvi);
router.delete("/", deleteAllDonvi);
router.get("/count", countDonvi);
router.delete("/select", deleteselectDonvi);
export default router;