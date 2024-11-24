const express = require("express");
const multer = require("multer");
const Property = require("../models/Property");
const router = express.Router();
const fs = require("fs");

// Configure Multer (store files in memory, not on disk)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route: Display Dashboard (List of Properties)
router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.render("dashboard", { properties });
});

// Route: Add New Property (Form Page)
router.get("/add", (req, res) => {
  res.render("add-property");
});

// Route: Add New Property (Handle Form Submission)
router.post("/add", upload.fields([{ name: "images" }, { name: "videos" }]), async (req, res) => {
  const { title, location, price, size, contact, mapLocation } = req.body;

  // Convert uploaded files to Base64 strings
  const images = req.files["images"]?.map((file) => file.buffer.toString("base64")) || [];
  const videos = req.files["videos"]?.map((file) => file.buffer.toString("base64")) || [];

  const newProperty = new Property({
    title,
    location,
    price,
    size,
    contact,
    mapLocation,
    images,
    videos,
  });

  await newProperty.save();
  res.redirect("/properties");
});

// Route: Delete Property
router.post("/delete/:id", async (req, res) => {
  await Property.findByIdAndDelete(req.params.id);
  res.redirect("/properties");
});

module.exports = router;
