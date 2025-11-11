/**
 * File Upload Middleware
 * Handles file uploads using multer
 */

import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directory exists
const uploadDir = path.join(process.cwd(), 'uploads', 'initiatives');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { id } = req.params; // Initiative ID from route
    const initiativeDir = path.join(uploadDir, id.toString());

    // Create initiative-specific directory if it doesn't exist
    if (!fs.existsSync(initiativeDir)) {
      fs.mkdirSync(initiativeDir, { recursive: true });
    }

    cb(null, initiativeDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename: timestamp-originalname
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);
    const sanitizedBaseName = baseName.replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${sanitizedBaseName}-${uniqueSuffix}${ext}`);
  }
});

// File filter - validate file types
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedMimes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    // Videos
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo',
    'video/webm',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain'
  ];

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error(`File type ${file.mimetype} is not supported. Allowed types: images, videos, PDF, Office documents, and text files.`), false);
  }
};

// Create multer upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  }
});

/**
 * Middleware to handle single file upload
 */
export const uploadSingle = upload.single('file');

/**
 * Error handling middleware for multer errors
 */
export const handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'Bad Request',
        message: 'File size exceeds limit of 50MB'
      });
    }
    return res.status(400).json({
      error: 'Bad Request',
      message: `Upload error: ${err.message}`
    });
  } else if (err) {
    return res.status(400).json({
      error: 'Bad Request',
      message: err.message
    });
  }
  next();
};

export default {
  uploadSingle,
  handleUploadError
};
