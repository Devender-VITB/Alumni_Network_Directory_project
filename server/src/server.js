import app from './app.js';
import config from './config/env.js';
import { connectDB, disconnectDB } from './config/db.js';

const startServer = async () => {
  // Connect to DB if configured
  await connectDB();

  const server = app.listen(config.port, () => {
    console.log(`=======================================================`);
    console.log(`🎓 AlumniConnect API Server running on port ${config.port}`);
    console.log(`📡 Environment: ${config.nodeEnv}`);
    console.log(`🔗 Client URL: ${config.clientUrl}`);
    console.log(`📦 Mode: ${config.isDemoMode ? 'Demonstration (In-Memory)' : 'MongoDB Atlas Connected'}`);
    console.log(`=======================================================`);
  });

  // Graceful shutdown handling
  const shutdown = async (signal) => {
    console.log(`\nReceived ${signal}. Shutting down gracefully...`);
    server.close(async () => {
      console.log('HTTP server closed.');
      await disconnectDB();
      process.exit(0);
    });

    // Force exit after 10s if hanging
    setTimeout(() => {
      console.error('Forcing shutdown after timeout.');
      process.exit(1);
    }, 10000);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
};

startServer().catch((err) => {
  console.error('Fatal error during server startup:', err);
  process.exit(1);
});
