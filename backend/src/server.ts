import Fastify from 'fastify';
import cors from '@fastify/cors';
import { propertyRoutes } from './routes/property.routes';

const fastify = Fastify({ logger: true });

// Configuration CORS complète
fastify.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
});

// Enregistrer les routes
fastify.register(propertyRoutes, { prefix: '/api' });

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log('🚀 Serveur démarré sur http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();