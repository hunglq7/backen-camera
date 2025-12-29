import Thietbi from "../models/Thietbi.js";
import xlsx from 'xlsx';
import fs from 'fs';
export const createThietbi = async (req, res) => {
  try {
    const { tentb,hangsx,namsx,nuocsx,thongsokt,ghichu } = req.body;
    const thietbi = await Thietbi.create({ tentb,hangsx,namsx,nuocsx,thongsokt,ghichu });
    res.status(201).json({message: "Thiết bị tạo thành công", thietbi });
  } catch (error) {
    console.error("Lỗi khi tạo thiết bị:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllThietbi = async (req, res) => {
  try {
    const thietbis = await Thietbi.find();
    res.status(200).json(thietbis);
    } catch (error) {
    console.error("Lỗi khi lấy danh sách thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const updateThietbi = async (req, res) => {
  try {
    const { id } = req.params;
    const { tentb,hangsx,namsx,nuocsx,thongsokt,ghichu } = req.body;
    const thietbi = await Thietbi.findByIdAndUpdate(id, { tentb,hangsx,namsx,nuocsx,thongsokt,ghichu }, { new: true });
    if (!thietbi) {
      return res.status(404).json({ message: "Không tìm thấy thiết bị" });
    }
    res.status(200).json({message: "Thiết bị cập nhật thành công", thietbi});
  } catch (error) {
    console.error("Lỗi khi cập nhật thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteThietbi = async (req, res) => {
  try {
    const { id } = req.params;
    const thietbi = await Thietbi.findByIdAndDelete(id);
    if (!thietbi) {
      return res.status(404).json({ message: "Không tìm thấy thiết bị" });
    }
    res.status(200).json({message: "Thiết bị xóa thành công", thietbi});
  } catch (error) {
    console.error("Lỗi khi xóa thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const deleteManyThietbi = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Danh sách ID không hợp lệ" });
    }

    const result = await Thietbi.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} thiết bị đã được xóa thành công`
    });
  } catch (error) {
    console.error("Lỗi khi xóa các thiết bị đã chọn:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getThietbiiById = async (req, res) => {
  try {
    const { id } = req.params;
    const thietbi = await Thietbi.findById(id);
    if (!thietbi) {
      return res.status(404).json({ message: "Không tìm thấy thiết bị" });
    }
    res.status(200).json(Thietbi);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

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
        // Giả sử Excel có cột: tentb, hangsx, namsx, nuocsx, thongsokt, ghichu
        // Cần validate và convert
        const thietbiData = {
          tentb: row.tentb,
          hangsx: row.hangsx, // Giả sử ID là string
          namsx: row.namsx,
          nuocsx: row.nuocsx,
          thongsokt: row.thongsokt ,       
          ghichu: row.ghichu
        };

        // Validate required fields
        if (!row.tentb ) {
          errors.push({ row: i + 1, message: "Thiếu thông tin thiết bị" });
          continue;
        }

        // Kiểm tra tồn tại
        const existing = await Thietbi.findOne({ tentb: thietbiData.tentb });
        if (existing) {
          await Thietbi.findByIdAndUpdate(existing._id, thietbiData, { new: true });
        } else {
          await Thietbi.create(thietbiData);
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