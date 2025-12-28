import express from "express";
import {
    createKhuvuc,
    getAllKhuvuc,
    getKhuvucById,
    updateKhuvuc,
    deleteKhuvuc,
    deleteManyKhuvuc
} from "../controllers/khuvucController.js";
const router = express.Router();
router.post("/", createKhuvuc);
router.get("/", getAllKhuvuc);
// bulk delete for selected ids
router.delete("/select", deleteManyKhuvuc);
router.get("/:id", getKhuvucById);
router.put("/:id", updateKhuvuc);
router.delete("/:id", deleteKhuvuc);
export default router;