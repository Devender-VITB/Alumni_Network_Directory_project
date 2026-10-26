import express from 'express';
import { getDBStatus } from '../config/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const dbStatus = getDBStatus();
  return res.status(200).json({
    status: 'UP',
    database: dbStatus.mode,
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'AlumniConnect API Server',
  });
});

export default router;
