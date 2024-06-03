const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('../swaggerOptions')
const recipesRoutes = require('./routes/recipesRouter');

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Listening port
const PORT = process.env.PORT || 4002;
const HOST = process.env.HOST || `http://localhost:${PORT}`
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
      console.log(`Documentación disponible en ${HOST}/api-docs`);
  });
}

app.use('/', recipesRoutes);

module.exports = app;