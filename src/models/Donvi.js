import mongoose from "mongoose";
const donviSchema = new mongoose.Schema(
  {
    tendv: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
const Donvi = mongoose.model("Donvi", donviSchema);
export default Donvi;