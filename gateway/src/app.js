const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

const app = express();

// Definición de los puertos de los servicios
const userServicePort = process.env.USER_SERVICE_PORT || 4000;
const taskServicePort = process.env.TASK_SERVICE_PORT || 4001;
const recipeServicePort = process.env.RECIPE_SERVICE_PORT || 4002;

// Definición de las URLs de los servicios
const userServiceHost = process.env.USER_SERVICE_HOST || 'http://localhost';
const taskServiceHost = process.env.TASK_SERVICE_HOST || 'http://localhost';
const recipeServiceHost = process.env.RECIPE_SERVICE_HOST || 'http://localhost';

// Construcción de las URLs completas para los servicios
const userServiceUrl = `${userServiceHost}:${userServicePort}`;
const taskServiceUrl = `${taskServiceHost}:${taskServicePort}`;
const recipeServiceUrl = `${recipeServiceHost}:${recipeServicePort}`;

// Configuración del middleware de proxy con logging
app.use('/api/users', createProxyMiddleware({
  target: userServiceUrl,
  changeOrigin: true,
  logLevel: 'debug', // Agregar logging detallado
  onError: (err, req, res) => {
    console.error('Error occurred while trying to proxy to /api/users:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}));

app.use('/api/tasks', createProxyMiddleware({
  target: taskServiceUrl,
  changeOrigin: true,
  logLevel: 'debug', // Agregar logging detallado
  onError: (err, req, res) => {
    console.error('Error occurred while trying to proxy to /api/tasks:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}));

app.use('/api/recipes', createProxyMiddleware({
  target: recipeServiceUrl,
  changeOrigin: true,
  logLevel: 'debug', // Agregar logging detallado
  onError: (err, req, res) => {
    console.error('Error occurred while trying to proxy to /api/tasks:', err);
    res.status(500).json({ error: 'Proxy error' });
  }
}));

// Redirigir a las documentaciones Swagger individuales
app.get('/api-docs', (req, res) => {
    res.redirect(`${userServiceUrl}/api-docs`);
});

app.get('/api-docs', (req, res) => {
    res.redirect(`${taskServiceUrl}/api-docs`);
});

app.get('/api-docs', (req, res) => {
  res.redirect(`${recipeServiceUrl}/api-docs`);
});

if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.API_GATEWAY_PORT || 3000;
    app.listen(PORT, () => {
        console.log(`API Gateway running on port ${PORT}`);
    });
}

module.exports = app;
