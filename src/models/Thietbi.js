import mongoose from "mongoose";
const thietbiSchema = new mongoose.Schema(
  {
    tentb: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
     hangsx: {
      type: String     
    },     
     namsx: {
      type: String     
    },
     
     nuocsx: {
      type: String      
    },
    thongsokt: {
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
const Thietbi = mongoose.model("Thietbi", thietbiSchema);
export default Thietbi;