
import Donvi
 from "../models/Donvi.js";
export const createDonvi = async (req, res) => {
  try {
    const { tendv } = req.body;
    const donvi = await Donvi.create({ tendv });
    res.status(201).json({message: "Đơn vị tạo thành công", donvi });
  } catch (error) {
    console.error("Lỗi khi tạo đơn vị:", error);
    res.status(400).json({ message: error.message });
  }
};

export const getAllDonvi = async (req, res) => {
  try {
    const donvis = await Donvi.find();
    res.status(200).json(donvis);
    } catch (error) {
    console.error("Lỗi khi lấy danh sách đơn vị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
    }
}

export const getDonviById = async (req, res) => {
  try {
    const { id } = req.params;
    const donvi = await Donvi.findById(id);
    if (!donvi) {
      return res.status(404).json({ message: "Không tìm thấy đơn vị" });
    }
    res.status(200).json(donvi);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin đơn vị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const updateDonvi = async (req, res) => {
  try {
    const { id } = req.params;
    const { tendv } = req.body;
    const donvi = await Donvi.findByIdAndUpdate(id, { tendv }, { new: true });
    if (!donvi) {
      return res.status(404).json({ message: "Không tìm thấy đơn vị" });
    }
    res.status(200).json({message: "Đơn vị cập nhật thành công", donvi});
  } catch (error) {
    console.error("Lỗi khi cập nhật đơn vị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const deleteDonvi = async (req, res) => {
  try {
    const { id } = req.params;
    const donvi = await Donvi.findByIdAndDelete(id);
    if (!donvi) {
      return res.status(404).json({ message: "Không tìm thấy đơn vị" });
    }
    res.status(200).json({message: "Đơn vị xóa thành công", donvi});
  } catch (error) {
    console.error("Lỗi khi xóa đơn vị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const deleteAllDonvi = async (req, res) => {
  try {
    await Donvi.deleteMany({});
    res.status(200).json({message: "Tất cả đơn vị đã được xóa thành công"});
  } catch (error) {
    console.error("Lỗi khi xóa tất cả đơn vị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const countDonvi = async (req, res) => {
  try {
    const count = await Donvi.countDocuments();
    res.status(200).json({ count });
  } catch (error) {
    console.error("Lỗi khi đếm đơn vị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
export const deleteselectDonvi = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "Danh sách ID không hợp lệ" });
    }

    const result = await Donvi.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      message: `${result.deletedCount} đơn vị đã được xóa thành công`
    });
  } catch (error) {
    console.error("Lỗi khi xóa các đơn vị đã chọn:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};