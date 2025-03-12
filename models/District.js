const mongoose = require("mongoose");

const DistrictSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  population: { type: Number, required: true },
  state_id: { type: mongoose.Schema.Types.ObjectId, ref: "State", required: true },
});

module.exports = mongoose.model("District", DistrictSchema);
