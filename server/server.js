const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./server/db.json');
const middlewares = jsonServer.defaults();

// Configurar middlewares
server.use(middlewares);
server.use(jsonServer.bodyParser);

// Configurar rutas personalizadas
const routes = require('./routes.json');
server.use(jsonServer.rewriter(routes));

// Middleware para manejar productos con handlers personalizados
server.use('/api/products', (req, res, next) => {
  const { productHandlers } = require('./handlers.js');
  
  if (req.method === 'GET' && req.url === '/') {
    // GET /api/products - Obtener todos los productos
    try {
      const products = productHandlers.getAllProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET' && req.url.startsWith('/filter')) {
    // GET /api/products/filter - Filtrar productos
    try {
      const filters = req.query;
      const products = productHandlers.getProductsByFilter(filters);
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === 'GET' && req.url.match(/\/\d+$/)) {
    // GET /api/products/:id - Obtener producto por ID
    try {
      const id = req.url.split('/')[1];
      const product = productHandlers.getProductById(id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else if (req.method === 'POST') {
    // POST /api/products - Crear producto
    try {
      const newProduct = productHandlers.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === 'PUT' && req.url.match(/\/\d+$/)) {
    // PUT /api/products/:id - Actualizar producto
    try {
      const id = req.url.split('/')[1];
      const updatedProduct = productHandlers.updateProduct(id, req.body);
      res.json(updatedProduct);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else if (req.method === 'DELETE' && req.url.match(/\/\d+$/)) {
    // DELETE /api/products/:id - Eliminar producto
    try {
      const id = req.url.split('/')[1];
      const result = productHandlers.deleteProduct(id);
      res.json(result);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  } else {
    next();
  }
});

// Middleware para manejar autenticación
server.use('/auth', (req, res, next) => {
  const { authHandlers } = require('./handlers.js');
  
  if (req.method === 'POST' && req.url === '/login') {
    try {
      const result = authHandlers.login(req.body);
      res.json(result);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  } else if (req.method === 'POST' && req.url === '/register') {
    try {
      const result = authHandlers.register(req.body);
      res.status(201).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    next();
  }
});

// Usar el router de json-server para otras rutas
server.use(router);

// Configurar puerto
const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`🚀 MockAPI Server corriendo en http://localhost:${port}`);
  console.log(`📊 API de Productos: http://localhost:${port}/api/products`);
  console.log(`🔐 API de Autenticación: http://localhost:${port}/auth`);
  console.log(`📋 JSON Server: http://localhost:${port}/`);
}); 