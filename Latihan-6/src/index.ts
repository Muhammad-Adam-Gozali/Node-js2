import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 5000;

app.use(bodyParser.json());

interface Category {
  id: number;
  name: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
}

let categories: Category[] = [
  { id: 1, name: 'Elektronik' },
  { id: 2, name: 'Perabotan' },
];

let products: Product[] = [
  { id: 1, name: 'Laptop', category: 'Elektronik' },
  { id: 2, name: 'Meja', category: 'Perabotan' },
];

// GET /categories - Mengembalikan daftar semua kategori
app.get('/categories', (req: Request, res: Response) => {
  res.json(categories);
});

// GET /categories/:id - Mengembalikan detail kategori berdasarkan ID
app.get('/categories/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const category = categories.find(c => c.id === id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).send('Category not found');
  }
});

// POST /categories - Menambahkan kategori baru
app.post('/categories', (req: Request, res: Response) => {
  const newCategory: Omit<Category, 'id'> = req.body;
  const newId = categories.length ? categories[categories.length - 1].id + 1 : 1;
  const category: Category = { id: newId, ...newCategory };
  categories.push(category);
  res.status(201).json(category);
  console.log(categories);
});

// PUT /categories/:id - Memperbarui kategori berdasarkan ID
app.put('/categories/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const updatedCategory: Omit<Category, 'id'> = req.body;
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories[index] = { id, ...updatedCategory };
    res.json(categories[index]);
  } else {
    res.status(404).send('Category not found');
  }
});

// DELETE /categories/:id - Menghapus kategori berdasarkan ID
app.delete('/categories/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = categories.findIndex(c => c.id === id);
  if (index !== -1) {
    categories.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Category not found');
  }
});

// GET /products - Mencari produk berdasarkan nama
app.get('/products', (req: Request, res: Response) => {
  const name = req.query.name?.toString().toLowerCase();
  if (name) {
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(name));
    res.json(filteredProducts);
  } else {
    res.json(products);
  }
});

// GET /categories/:category/products - Mendapatkan produk dalam kategori tertentu dan mencari berdasarkan nama
app.get('/categories/:category/products', (req: Request, res: Response) => {
  const category = req.params.category;
  const name = req.query.name?.toString().toLowerCase();
  let filteredProducts = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (name) {
    filteredProducts = filteredProducts.filter(p => p.name.toLowerCase().includes(name));
  }
  res.json(filteredProducts);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
