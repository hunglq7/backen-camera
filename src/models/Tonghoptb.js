import mongoose from "mongoose";
const TonghoptbSchema = new mongoose.Schema(
  {
    maql: {
      type: String,      
      trim: true
    },
     thietbi_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Thietbi" ,
      required: true,
      index: true   
    },     
     donvi_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donvi" ,
      required: true,
      index: true      
    },     
     khuvuc_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Khuvuc" ,
      required: true,
      index: true      
    },
    camera_ip: {
      type: String    
      
    },
     trangthai: {
      type: Boolean   
      
    },
     ngaysd: {
      type: Date   
      
    },
     vitri_lapdat: {
      type: String    
      
    },   
    ghichu: {
      type: String,      
    }
  },
  {
    timestamps: true
  }
);
const Tonghoptb = mongoose.model("Tonghoptb", TonghoptbSchema);
export default Tonghoptb;