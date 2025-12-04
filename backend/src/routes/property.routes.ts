import { FastifyInstance } from 'fastify';
import { PropertyService } from '../services/property.service';
import { createPropertySchema, updatePropertySchema, idParamSchema } from '../schemas/property.schema';

export async function propertyRoutes(fastify: FastifyInstance) {
  const propertyService = new PropertyService();

  // GET /properties
  fastify.get('/properties', async (request, reply) => {
    const properties = await propertyService.getAll();
    return reply.send(properties);
  });

  // GET /properties/:id
  fastify.get<{ Params: { id: string } }>(
    '/properties/:id',
    async (request, reply) => {
      const property = await propertyService.getById(request.params.id);
      if (!property) {
        return reply.status(404).send({ error: 'Bien non trouvé' });
      }
      return reply.send(property);
    }
  );

  // POST /properties
  fastify.post('/properties', async (request, reply) => {
    try {
      const validatedData = createPropertySchema.parse(request.body);
      const newProperty = await propertyService.create(validatedData);
      return reply.status(201).send(newProperty);
    } catch (error: any) {
      return reply.status(400).send({ error: error.errors || error.message });
    }
  });

  // PUT /properties/:id
  fastify.put<{ Params: { id: string } }>(
    '/properties/:id',
    async (request, reply) => {
      try {
        const validatedData = updatePropertySchema.parse(request.body);
        const updated = await propertyService.update(
          request.params.id,
          validatedData
        );
        if (!updated) {
          return reply.status(404).send({ error: 'Bien non trouvé' });
        }
        return reply.send(updated);
      } catch (error: any) {
        return reply.status(400).send({ error: error.errors || error.message });
      }
    }
  );

  // DELETE /properties/:id
  fastify.delete<{ Params: { id: string } }>(
    '/properties/:id',
    async (request, reply) => {
      const deleted = await propertyService.delete(request.params.id);
      if (!deleted) {
        return reply.status(404).send({ error: 'Bien non trouvé' });
      }
      return reply.status(204).send();
    }
  );
}