import fs from "fs";
import path from "path";

export const uploadImage = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    const { type, tripId, meetingId } = req.body;
    const userId = 1; // Replace with authenticated user's ID
    let imagePath;

    if (type === "meeting") {
      imagePath = `/mtg/${meetingId}-${userId}/${req.file.filename}`;
    } else if (type === "trip") {
      imagePath = `/trp/${tripId}-${userId}/${req.file.filename}`;
    } else {
      return res.status(400).json({ message: "Invalid type provided." });
    }

    res.status(200).json({
      message: "Image uploaded successfully!",
      imagePath,
    });
  } catch (error) {
    console.error("Error uploading image:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
};

const __dirname = path.resolve();
const IMAGES_DIR = path.join(__dirname, "public/images");

// Get all images
export const getImages = (req, res) => {
  fs.readdir(IMAGES_DIR, (err, files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error reading images directory." });
    }
    const imagePaths = files.map((file) => `/images/${file}`);
    res.status(200).json({ images: imagePaths });
  });
};

// Delete an image
export const deleteImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(IMAGES_DIR, filename);

  fs.unlink(filePath, (err) => {
    if (err) {
      return res
        .status(404)
        .json({ message: "Image not found or already deleted." });
    }
    res.status(200).json({ message: "Image deleted successfully!" });
  });
};

// Update/Replace an image
export const updateImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(IMAGES_DIR, filename);

  // Check if the image exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ message: "Image not found." });
    }

    // Replace the image
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded!" });
    }

    fs.unlink(filePath, (err) => {
      if (err) {
        return res.status(500).json({ message: "Error replacing the image." });
      }
      const newImagePath = `/images/${req.file.filename}`;
      res.status(200).json({
        message: "Image updated successfully!",
        newImagePath,
      });
    });
  });
};
