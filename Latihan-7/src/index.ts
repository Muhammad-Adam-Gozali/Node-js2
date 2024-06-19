import express, { Request, Response } from 'express';
import multer from 'multer';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';

dotenv.config();

const app = express();
const port = 5000;

// Konfigurasi Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Konfigurasi Multer untuk upload file
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route untuk upload file satu per satu (single)
app.post('/single', upload.single('image'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).send('No file uploaded');
      }
      
      const result = await cloudinary.v2.uploader.upload(req.file.buffer.toString('base64'));
      res.json({ url: result.secure_url });
    } catch (error: any) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Upload failed', message: error.message });
    }
  });
  
  
  
  // Route untuk upload file lebih dari satu (multiple)
  app.post('/multiple', upload.array('images', 5), async (req: Request, res: Response) => {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded');
      }
  
      const promises = (req.files as Express.Multer.File[]).map(file =>
        cloudinary.v2.uploader.upload(file.buffer.toString('base64'))
      );
      const results = await Promise.all(promises);
      const urls = results.map(result => result.secure_url);
      res.json({ urls });
    } catch (error: any) {
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
