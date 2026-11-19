import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { z } from 'zod';

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contactPath = path.join(__dirname, '../data/contact.json');

let inMemoryContact = [];

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please provide a valid email address' }),
  message: z.string().min(5, { message: 'Message must be at least 5 characters' }),
  topic: z.string().optional(),
});

router.post('/', (req, res) => {
  const result = contactSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.flatten().fieldErrors,
      message: result.error.errors[0]?.message || 'Invalid input',
    });
  }

  const { name, email, message, topic } = result.data;

  try {
    let items = inMemoryContact;
    try {
      if (fs.existsSync(contactPath)) {
        const raw = fs.readFileSync(contactPath, 'utf8');
        items = JSON.parse(raw || '[]');
      }
    } catch {
      items = inMemoryContact;
    }

    const entry = {
      id: `ct_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      message,
      topic: topic || 'General Inquiry',
      createdAt: new Date().toISOString(),
    };

    items.push(entry);
    inMemoryContact = items;

    try {
      fs.writeFileSync(contactPath, JSON.stringify(items, null, 2), 'utf8');
    } catch {
      // Handled gracefully in read-only environment
    }

    return res.status(201).json({
      success: true,
      message: "Thank you! We've received your message and will respond within 24 hours.",
      data: { id: entry.id },
    });
  } catch (error) {
    console.error('Contact submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to record your message. Please try again.',
    });
  }
});

export default router;
