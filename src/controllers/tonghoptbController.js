import Tonghoptb from "../models/Tonghoptb.js";
export const createTonghoptb = async (req, res) => {
  try {
    const { maql, thietbi_id, donvi_id, khuvuc_id, camera_ip, trangthai, ngaysd, vitri_lapdat, ghichu } = req.body;
    const tonghoptb = await Tonghoptb.create({ maql, thietbi_id, donvi_id, khuvuc_id, camera_ip, trangthai, ngaysd, vitri_lapdat, ghichu });
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
    const { maql, thietbi_id, donvi_id, khuvuc_id, camera_ip, trangthai, ngaysd, vitri_lapdat, ghichu } = req.body;
    const tonghoptb = await Tonghoptb.findByIdAndUpdate(id, { maql, thietbi_id, donvi_id, khuvuc_id, camera_ip, trangthai, ngaysd, vitri_lapdat, ghichu }, { new: true });
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