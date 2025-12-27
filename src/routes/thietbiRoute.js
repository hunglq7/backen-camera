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
// bulk delete selected
router.delete("/select", deleteManyThietbi);
router.get("/:id", getThietbiiById);
router.put("/:id", updateThietbi);
router.delete("/:id", deleteThietbi);
// legacy delete all (if used) kept at root
router.delete("/", deleteManyThietbi);

export default router;