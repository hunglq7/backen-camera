import mongoose from "mongoose";
const khuvucSchema = new mongoose.Schema(
  {
    tenkv: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);
const Khuvuc = mongoose.model("Khuvuc", khuvucSchema);
export default Khuvuc;