// routes/upload.routes.js
import express from "express";
import multer from "multer";
import cloudinary, { storage } from "../config/cloudinary.js";

const router = express.Router();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /image\/(jpeg|jpg|png|webp|gif)/i.test(file.mimetype);
    ok ? cb(null, true) : cb(new Error("Only image files are allowed"));
  },
});
// 
function normalizeFile(f) {
  //
  // 
  const secure_url = f?.path || f?.secure_url || f?.url || "";
  const public_id = f?.filename || f?.public_id || f?.publicId || "";
  const format = f?.format || f?.mimetype?.split("/")?.[1] || "";
  const width = f?.width ?? null;
  const height = f?.height ?? null;
  return { secure_url, public_id, format, width, height };
}

// POST /upload (field name: "file")
router.post("/", upload.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const data = normalizeFile(req.file);
    if (!data.secure_url || !data.public_id) {
      // 
      return res.status(500).json({
        message: "Upload succeeded but response missing expected fields",
        raw: req.file,
      });
    }
    return res.status(201).json(data);
  } catch (err) {
    // 
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "File too large (max 10MB)" });
      }
      return res.status(400).json({ message: `Upload error: ${err.code}` });
    }
    return next(err);
  }
});

// 
router.delete("/:publicId", async (req, res, next) => {
  try {
    let { publicId } = req.params;
    if (!publicId) {
      return res.status(400).json({ message: "Missing publicId" });
    }

    // 
    publicId = decodeURIComponent(publicId);

    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true, // xoá cache CDN
    });

    // 
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

// 
router.use((err, req, res, next) => {
  console.error("Upload route error:", err);
  res.status(500).json({ message: err.message || "Server error" });
});

export default router;
