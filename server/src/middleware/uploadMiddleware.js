import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { type, tripId, meetingId } = req.body; // Get type and ID from the request body
    const userId = 1; // Replace with authenticated user's ID (e.g., `req.user.userId`)

    let folderPath;

    if (type === "meeting") {
      folderPath = path.join(__dirname, `public/mtg/${meetingId}-${userId}`);
    } else if (type === "trip") {
      folderPath = path.join(__dirname, `public/trp/${tripId}-${userId}`);
    } else {
      return cb(new Error("Invalid type! Must be 'meeting' or 'trip'."), null);
    }

    // Create the directory if it doesn't exist
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, folderPath);
    });
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValidType = allowedTypes.test(file.mimetype);
    if (isValidType) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

export default upload;
