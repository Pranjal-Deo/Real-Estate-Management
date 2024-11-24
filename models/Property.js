const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: String, required: true },
  size: { type: String, required: true },
  contact: { type: String, required: true },
  mapLocation: { type: String, required: true }, // Google Maps embed URL
  images: [{ type: String }], // Base64 strings of images
  videos: [{ type: String }], // Base64 strings of videos
}, { timestamps: true });

module.exports = mongoose.model("Property", PropertySchema);
