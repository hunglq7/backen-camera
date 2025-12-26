import express from "express";
import {
  createThietbi,
  getAllThietbi,
  getThietbiiById,
    updateThietbi,
    deleteThietbi,
    deleteManyThietbi
} from "../controllers/thietbiController.js";
const router = express.Router();

router.post("/", createThietbi);
router.get("/", getAllThietbi);
router.get("/:id", getThietbiiById);
router.put("/:id", updateThietbi);
router.delete("/:id", deleteThietbi);
router.delete("/", deleteManyThietbi);

export default router;