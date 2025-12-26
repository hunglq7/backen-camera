import Thietbi from "../models/Thietbi.js";
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
    const Thietbi = await Thietbi.findById(id);
    if (!Thietbi) {
      return res.status(404).json({ message: "Không tìm thấy thiết bị" });
    }
    res.status(200).json(Thietbi);
  } catch (error) {
    console.error("Lỗi khi lấy thông tin thiết bị:", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};