import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const plansPath = path.join(__dirname, '../data/plans.json');

router.get('/', (req, res) => {
  try {
    const raw = fs.readFileSync(plansPath, 'utf8');
    const plansData = JSON.parse(raw);
    res.json({ success: true, data: plansData });
  } catch (error) {
    console.error('Error reading plans.json:', error);
    res.status(500).json({ success: false, error: 'Could not load pricing plans' });
  }
});

export default router;
