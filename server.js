const app = require('./src/app');

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`CAB System API listening on http://localhost:${PORT}`);
});
