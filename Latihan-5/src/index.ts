import express, { Request, Response, NextFunction } from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

// Middleware untuk mencatat setiap permintaan
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Serve static files dari direktori public
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk root path
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route untuk /hello
app.get('/hello', (req: Request, res: Response) => {
  res.json({
    message: "Success fetch message",
    data: "Hello World!"
  });
});

// Route untuk /user
app.get('/user', (req: Request, res: Response) => {
  res.json({
    message: "Success fetch user",
    data: {
      id: 1,
      name: "Budi",
      username: "budidu",
      email: "budidu@mail.com"
    }
  });
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
