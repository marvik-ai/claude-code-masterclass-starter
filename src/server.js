const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`\nWorkshop API running at http://localhost:${PORT}\n`);
  console.log('Available endpoints:');
  console.log('  GET    /health');
  console.log('  POST   /api/auth/login');
  console.log('  POST   /api/auth/register');
  console.log('  GET    /api/users');
  console.log('  GET    /api/users/:id');
  console.log('  POST   /api/users');
  console.log('  PUT    /api/users/:id');
  console.log('  DELETE /api/users/:id');
  console.log('  GET    /api/products');
  console.log('  GET    /api/products/:id');
  console.log('  POST   /api/products');
  console.log('\n[Demo 1 will add: GET|POST /api/orders]');
});
