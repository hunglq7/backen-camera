import Khuvuc
 from "../models/Khuvuc.js";
export const createKhuvuc = async (req, res) => {
  try {
    const { tenkv } = req.body;
    const khuvuc = await Khuvuc.create({ tenkv });
    res.status(201).json({message: "Khu vực tạo thành công", khuvuc });
  } catch (error) {
    console.error("Lỗi khi tạo khu vực:", error);
    res.status(400).json({ message: error.message });
  } 
};

export const getAllKhuvuc = async (req, res) => {
  try {
    const khuvucs = await Khuvuc.find();
    res.status(200).json(khuvucs);
    } catch (error) {
    console.error("Lỗi khi lấy danh sách khu vực:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
    }
}
export const getKhuvucById = async (req, res) => {
  try {
    const { id } = req.params;
    const khuvuc = await Khuvuc.findById(id);
    if (!khuvuc) {
      return res.status(404).json({ message: "Không tìm thấy khu vực" });
    }
    res.status(200).json(khuvuc);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin khu vực:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  } 
};
export const updateKhuvuc = async (req, res) => {
  try {
    const { id } = req.params;
    const { tenkv } = req.body;
    const khuvuc = await Khuvuc.findByIdAndUpdate(id, { tenkv }, { new: true });
    if (!khuvuc) {
      return res.status(404).json({ message: "Không tìm thấy khu vực" });
    }   
    res.status(200).json({message: "Khu vực cập nhật thành công", khuvuc});
    } catch (error) {       

    console.error("Lỗi khi cập nhật khu vực:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const deleteKhuvuc = async (req, res) => {
  try {
    const { id } = req.params;
    const khuvuc = await Khuvuc.findByIdAndDelete(id);
    if (!khuvuc) {
      return res.status(404).json({ message: "Không tìm thấy khu vực" });
    }
    res.status(200).json({message: "Khu vực xóa thành công", khuvuc});
  } catch (error) {
    console.error("Lỗi khi xóa khu vực:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  } 
};

export const deleteManyKhuvuc = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Danh sách ID không hợp lệ" });
    }
    const result = await Khuvuc.deleteMany({ _id: { $in: ids } });
    res.status(200).json({
      message: `${result.deletedCount} khu vực đã được xóa thành công`
    });
  } catch (error) {
    console.error("Lỗi khi xóa các khu vực đã chọn:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const countKhuvuc = async (req, res) => {
  try {
    const count = await Khuvuc.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Lỗi khi đếm khu vực:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
