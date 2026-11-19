import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const waitlistPath = path.join(__dirname, '../data/waitlist.json');

const waitlistSchema = z.object({
  email: z.string().email({ message: 'Please provide a valid email address' }),
  role: z.enum(['founder', 'college', 'employer'], {
    errorMap: () => ({ message: 'Role must be founder, college, or employer' }),
  }),
});

router.post('/', (req, res) => {
  const result = waitlistSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: result.error.errors[0]?.message || 'Invalid input',
    });
  }

  const { email, role } = result.data;

  try {
    let items = [];
    if (fs.existsSync(waitlistPath)) {
      const raw = fs.readFileSync(waitlistPath, 'utf8');
      items = JSON.parse(raw || '[]');
    }

    const existing = items.find((item) => item.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      return res.status(200).json({
        success: true,
        alreadyRegistered: true,
        message: "You're already on the priority access list. We'll be in touch soon!",
      });
    }

    const entry = {
      id: `wl_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      email,
      role,
      createdAt: new Date().toISOString(),
    };

    items.push(entry);
    fs.writeFileSync(waitlistPath, JSON.stringify(items, null, 2), 'utf8');

    return res.status(201).json({
      success: true,
      message: "You're on the early access list! We'll reach out as we open slots.",
      data: { id: entry.id, email: entry.email, role: entry.role },
    });
  } catch (error) {
    console.error('Waitlist storage error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to record waitlist entry. Please try again.',
    });
  }
});

export default router;
