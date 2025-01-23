import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { join } from 'path';
import { mkdir, readFile, rm, writeFile } from 'fs/promises';
import { asyncHandler } from './utils/AsyncHandler';
import { ApiResponse } from './utils/ApiResponse';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const basePath = process.env.PROJECT_MODE === 'production' ? '/tmp' : __dirname;

app.get('/', (_req: Request, res: Response) => {
  res.send('Welcome to the storage service');
});

app.post('/put', asyncHandler(async (req: Request, res: Response) => {
  const { key , content } = req.body;
  try {
    if (!key || !content) res.status(400).json(new ApiResponse(400, null, 'Key and content are required'));
    const filePath = join(basePath, 'store', key);
    const keyToStore = String(key).split('/').slice(0, -1).join('/');
    const storePath = join(basePath, 'store', keyToStore);
    await mkdir(storePath, { recursive: true });
    await writeFile(filePath, content);
    res.status(200).json(new ApiResponse(200, null, 'Data stored successfully'));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    res.status(500).json(new ApiResponse(500, null, errorMessage));
  }
}));

app.post('/get', async (req: Request, res: Response) => {
  const { key } = req.body;
  const filePath = join(basePath, 'store', key);
  try {
    const content = await readFile(filePath, 'utf-8');
    res.status(200).json(new ApiResponse(200, { content }, 'Data retrieved successfully'));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = (error instanceof Error && 'code' in error && error.code === 'ENOENT') ? 404 : 500;
    res.status(statusCode).json(new ApiResponse(statusCode, null, errorMessage));
  }
});

app.post('/delete', async (req: Request, res: Response) => {
  const { key } = req.body;
  const filePath = join(basePath, 'store', key);
  try {
    await rm(filePath, { recursive: true });
    res.status(200).json(new ApiResponse(200, null, 'Data deleted successfully'));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const statusCode = (error instanceof Error && 'code' in error && error.code === 'ENOENT') ? 404 : 500;
    res.status(statusCode).json(new ApiResponse(statusCode, null, errorMessage));
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
