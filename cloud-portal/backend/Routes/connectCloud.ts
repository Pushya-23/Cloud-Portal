import express, { Request, Response } from 'express';
import { z } from 'zod';
import { authenticate } from '../middlewares/auth';

const router = express.Router();

// Zod schemas
const awsSchema = z.object({
  provider: z.literal('aws'),
  credentials: z.object({
    accessKey: z.string().min(1),
    secretKey: z.string().min(1),
  }),
});

const gcpSchema = z.object({
  provider: z.literal('gcp'),
  credentials: z.object({
    type: z.literal('service_account'),
    project_id: z.string().min(1),
    private_key_id: z.string().min(1),
    private_key: z.string().min(1),
    client_email: z.string().email(),
    client_id: z.string().min(1),
    auth_uri: z.string().url(),
    token_uri: z.string().url(),
    auth_provider_x509_cert_url: z.string().url(),
    client_x509_cert_url: z.string().url(),
  }),
});

const azureSchema = z.object({
  provider: z.literal('azure'),
  credentials: z.object({
    tenantId: z.string().min(1),
    clientId: z.string().min(1),
    clientSecret: z.string().min(1),
  }),
});

// Unified schema
const cloudSchema = z.union([awsSchema, gcpSchema, azureSchema]);

// ✅ FIXED: use Request and Response explicitly
const connectCloudHandler = (req: Request, res: Response): void => {
  try {
    const parsed = cloudSchema.parse(req.body);
    console.log('✅ Parsed cloud credentials:', parsed);
    res.status(200).json({ message: `Successfully connected to ${parsed.provider}` });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: 'Invalid format', details: err.errors });
    } else {
      console.error('❌ Unexpected error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
};

// Route
router.post('/connect-cloud', authenticate, connectCloudHandler);

export default router;
