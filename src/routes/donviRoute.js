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
router.post("/", createDonvi);
router.get("/", getAllDonvi);
router.delete("/select", deleteselectDonvi);
router.get("/count", countDonvi);
router.delete("/", deleteAllDonvi);
router.get("/:id", getDonviById);
router.put("/:id", updateDonvi);
router.delete("/:id", deleteDonvi);
export default router;