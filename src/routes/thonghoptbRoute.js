import express from "express";
import {
  createTonghoptb,
  getAllTonghoptb,
  getTonghoptbById,
  updateTonghoptb,
  deleteTonghoptb,
  deleteManyTonghoptb,
  uploadExcel,
 uploadCameraIpExcel
} from "../controllers/tonghoptbController.js";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();
router.post("/", createTonghoptb);
router.get("/", getAllTonghoptb);
router.get("/:id", getTonghoptbById);
router.put("/:id", updateTonghoptb);
router.delete("/:id", deleteTonghoptb);
router.delete("/", deleteManyTonghoptb);
router.post("/upload-excel", upload.single('excelFile'), uploadExcel);
router.post(
  '/upload-camera-ip',
  upload.single('excelFile'),
  uploadCameraIpExcel
);

export default router;