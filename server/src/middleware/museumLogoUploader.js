// src/middleware/uploadMuseumLogo.js

import fs from "fs"
import multer from "multer"
import path, { dirname } from "path"
import sharp from "sharp"
import { fileURLToPath } from "url"

// Derive __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirnameLocal = dirname(__filename)

// Configure storage using memory storage for processing with Sharp
const storage = multer.memoryStorage()

// Define the fileFilter function
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase(),
  )
  const mimetype = allowedTypes.test(file.mimetype)
  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb(
      new multer.MulterError(
        "LIMIT_UNEXPECTED_FILE",
        "Only images are allowed",
      ),
    )
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
})

// Middleware to process images and convert to WebP
const processImages = async (req, res, next) => {
  if (!req.file) return next()
  try {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const filename = uniqueSuffix + ".webp"
    const outputPath = path.join(
      __dirnameLocal,
      "../../uploads/museumLogoImages",
      filename,
    )

    // Ensure the directory exists
    fs.mkdirSync(path.dirname(outputPath), { recursive: true })

    await sharp(req.file.buffer)
      .resize(400, 400, {
        // Adjust dimensions as needed
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy,
      })
      .webp({ quality: 80 })
      .toFile(outputPath)

    // Replace file information with the new processed file
    req.file.filename = filename
    req.file.path = `/uploads/museumLogos/${filename}` // Assuming static serving
    next()
  } catch (error) {
    console.error("Error processing museum logo:", error)
    next(error)
  }
}

export default {
  upload: upload.single("museumLogo"), // Field name should be 'museumLogo'
  processImages,
}
