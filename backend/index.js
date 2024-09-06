const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express();
const port = 3000;

//Available routes
// ****use app.use instead of app.get****

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});