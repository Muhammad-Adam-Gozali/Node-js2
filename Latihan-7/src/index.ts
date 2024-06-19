import express, { Request, Response } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

dotenv.config();

const app = express();
const port = 5000;

// Konfigurasi Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });


// Membuat direktori 'temp' jika belum ada
const tempDir = 'temp';
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Route untuk upload file satu per satu (single)
app.post('/single', upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }
    
    // Simpan buffer ke file sementara
    const filePath = `${tempDir}/${Date.now()}-${req.file.originalname}`;
    fs.writeFileSync(filePath, req.file.buffer);

    // Upload file ke Cloudinary dengan path file
    const result = await cloudinary.v2.uploader.upload(filePath);

    // Hapus file sementara setelah diunggah
    fs.unlinkSync(filePath);

    res.json({ url: result.secure_url });
  } catch (error: any) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Upload failed', message: error.message });
  }
});
  
  
  // Route untuk upload file lebih dari satu (multiple)
  app.post('/multiple', upload.array('images', 10), async (req: Request, res: Response) => {
    try {
      if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
        return res.status(400).send('No files uploaded');
      }
  
      // Simpan buffer ke file sementara dan unggah ke Cloudinary
      const uploadPromises = req.files.map(async (file: Express.Multer.File) => {
        const filePath = path.join(tempDir, `${Date.now()}-${file.originalname}`);
        fs.writeFileSync(filePath, file.buffer);
  
        try {
          const result = await cloudinary.v2.uploader.upload(filePath);
          return result.secure_url;
        } finally {
          // Hapus file sementara setelah diunggah
          fs.unlinkSync(filePath);
        }
      });
  
      const urls = await Promise.all(uploadPromises);
      res.json({ urls });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed', message: error.message });
    }
  });
  
  

// Handle route tidak ditemukan
app.use((req, res) => {
  res.status(404).send('Route not found');
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
