const express = require('express');
const app = express();
app.use(express.json());
app.use(express.static("dist"));

const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});