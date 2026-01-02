import Tonghoptb from "../models/Tonghoptb.js";
import xlsx from 'xlsx';
import fs from 'fs';
import path from 'path';

// Hàm parse ngày tháng từ string DD/MM/YYYY
const parseDate = (value) => {
  if (!value) return null;

  // Nếu đã là Date
  if (value instanceof Date && !isNaN(value)) {
    return value;
  }

  // ✅ Excel serial date (NUMBER)
  if (typeof value === 'number') {
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    return new Date(excelEpoch.getTime() + value * 86400000);
  }

  // ✅ String yyyy-mm-dd
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return new Date(value + 'T00:00:00Z');
  }

  // ✅ String dd/mm/yyyy
  const match = value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return new Date(Date.UTC(year, month - 1, day));
  }

  // Fallback
  const parsed = new Date(value);
  return isNaN(parsed) ? null : parsed;
};

export const createTonghoptb = async (req, res) => {
  try {
    const { maql, thietbi_id, donvi_id, khuvuc_id,loaitb, camera_ip, trangthai, ngaysd, vitri_lapdat, ghichu } = req.body;
    const tonghoptb = await Tonghoptb.create({ maql, thietbi_id, donvi_id, khuvuc_id,loaitb, camera_ip, trangthai, ngaysd: parseDate(ngaysd), vitri_lapdat, ghichu });
    res.status(201).json({message: "Tổng hợp thiết bị tạo thành công", tonghoptb });
  } catch (error) {
    console.error("Lỗi khi tạo tổng hợp thiết bị:", error);
    res.status(400).json({ message: error.message });
  }
};
export const getAllTonghoptb = async (req, res) => {
  try {
    const tonghoptbs = await Tonghoptb.find().populate('thietbi_id').populate('donvi_id').populate('khuvuc_id');
    res.status(200).json(tonghoptbs);
    } catch (error) {
    console.error("Lỗi khi lấy danh sách tổng hợp thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
    }   
}
export const getTonghoptbById = async (req, res) => {
  try {
    const { id } = req.params;
    const tonghoptb = await Tonghoptb.findById(id).populate('thietbi_id').populate('donvi_id').populate('khuvuc_id');   
    if (!tonghoptb) {
      return res.status(404).json({ message: "Không tìm thấy tổng hợp thiết bị" });
    }
    res.status(200).json(tonghoptb);
  } catch (error) {
    console.error("Lỗi khi lấy tổng hợp thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const updateTonghoptb = async (req, res) => {
  try {
    const { id } = req.params;
    const { maql, thietbi_id, donvi_id, khuvuc_id,loaitb, camera_ip, trangthai, ngaysd, vitri_lapdat, ghichu } = req.body;
    const tonghoptb = await Tonghoptb.findByIdAndUpdate(id, { maql, thietbi_id, donvi_id, khuvuc_id,loaitb, camera_ip, trangthai, ngaysd: parseDate(ngaysd), vitri_lapdat, ghichu }, { new: true });
    if (!tonghoptb) {
      return res.status(404).json({ message: "Không tìm thấy tổng hợp thiết bị" });
    }
    res.status(200).json({message: "Tổng hợp thiết bị cập nhật thành công", tonghoptb});
  } catch (error) { 
    console.error("Lỗi khi cập nhật tổng hợp thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const deleteTonghoptb = async (req, res) => {
  try {
    const { id } = req.params;
    const tonghoptb = await Tonghoptb.findByIdAndDelete(id);
    if (!tonghoptb) {
      return res.status(404).json({ message: "Không tìm thấy tổng hợp thiết bị" });
    }
    res.status(200).json({message: "Tổng hợp thiết bị xóa thành công", tonghoptb});
  } catch (error) {
    console.error("Lỗi khi xóa tổng hợp thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const deleteManyTonghoptb = async (req, res) => {
  try {
    const { ids } = req.body;   
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Danh sách ID không hợp lệ" });
    }
    const result = await Tonghoptb.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ message: `${result.deletedCount} tổng hợp thiết bị đã được xóa.` });
  } catch (error) {
    console.error("Lỗi khi xóa các tổng hợp thiết bị đã chọn:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  } 
};
export const countTonghoptb = async (req, res) => {
  try {
    const count = await Tonghoptb.countDocuments();
    res.status(200).json({ count });
    } catch (error) {
    console.error("Lỗi khi đếm tổng hợp thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
    }
};


//Upload file excel
export const uploadExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Không có file được upload" });
    }

    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const errors = [];
    let successCount = 0;

    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      try {
        // Giả sử Excel có cột: maql, thietbi_id, donvi_id, khuvuc_id, loaitb, camera_ip, trangthai, ngaysd, vitri_lapdat, ghichu
        // Cần validate và convert
        const tonghoptbData = {
          maql: row.maql,
          thietbi_id: row.thietbi_id, // Giả sử ID là string
          donvi_id: row.donvi_id,
          khuvuc_id: row.khuvuc_id,
          loaitb: row.loaitb || 'camera_thuong'||'camera_ai',
          camera_ip: row.camera_ip,
          trangthai: row.trangthai === 'true' || row.trangthai === true || row.trangthai === 1,
          ngaysd: parseDate(row.ngaysd),
          vitri_lapdat: row.vitri_lapdat,
          ghichu: row.ghichu
        };

        // Validate required fields
        if (!tonghoptbData.thietbi_id || !tonghoptbData.donvi_id || !tonghoptbData.khuvuc_id) {
          errors.push({ row: i + 1, message: "Thiếu thông tin thiết bị, đơn vị hoặc khu vực" });
          continue;
        }

        // Kiểm tra tồn tại
        const existing = await Tonghoptb.findOne({ maql: tonghoptbData.maql });
        if (existing) {
          await Tonghoptb.findByIdAndUpdate(existing._id, tonghoptbData, { new: true });
        } else {
          await Tonghoptb.create(tonghoptbData);
        }
        successCount++;
      } catch (err) {
        errors.push({ row: i + 1, message: err.message });
      }
    }

    // Xóa file tạm
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: `Upload thành công ${successCount} bản ghi`,
      errors: errors.length > 0 ? errors : null
    });
  } catch (error) {
    console.error("Lỗi khi upload Excel:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

//upload file excel và kiểm tra ip cập nhật trạng thái true hoặc false
export const uploadCameraIpExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Không có file upload' });
    }

    /* 1️⃣ Đọc file Excel */
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const excelData = xlsx.utils.sheet_to_json(sheet);

    if (!excelData.length) {
      return res.status(400).json({ message: 'File Excel không có dữ liệu' });
    }

    /* 2️⃣ Lấy danh sách camera_ip từ Excel */
    const excelCameraIpSet = new Set(
      excelData
        .map(row => String(row.camera_ip || '').trim())
        .filter(Boolean)
    );

    /* 3️⃣ Lấy toàn bộ bảng tonghoptb */
    const tonghopList = await Tonghoptb.find({}, { _id: 1, camera_ip: 1 });

    /* 4️⃣ Chuẩn bị bulk update */
    const bulkOps = tonghopList.map(item => {
      const isOnline = excelCameraIpSet.has(String(item.camera_ip).trim());
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $set: { trangthai: isOnline } }
        }
      };
    });

    /* 5️⃣ Thực hiện update */
    if (bulkOps.length) {
      await Tonghoptb.bulkWrite(bulkOps);
    }

    /* 6️⃣ Xóa file tạm */
    fs.unlinkSync(req.file.path);

    res.status(200).json({
      message: 'Đối chiếu camera_ip thành công',
      tongSo: tonghopList.length,
      batTrangThaiTrue: bulkOps.filter(
        op => op.updateOne.update.$set.trangthai === true
      ).length
    });

  } catch (error) {
    console.error('UPLOAD CAMERA IP ERROR:', error);
    res.status(500).json({ message: 'Lỗi xử lý file Excel' });
  }
};