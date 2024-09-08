const connectToMongo = require('./db');
const express = require('express');

connectToMongo();

const app = express();
const port = 5000;

//without this we get output as undefined 
app.use(express.json())

//Available routes
// ****use app.use instead of app.get****

app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'))


app.listen(port, () => {
  console.log(`iNotebook backend listening on port http://localhost:${port}`);
});