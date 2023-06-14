import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:3001',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', (req, res) => {
  res.send({ express: `Servidor Express Iniciado na porta ${port}!` });
});

console.log('Servidor inicializado !')

app.listen(port,() => {
  console.log(`Servidor rodando na porta ${port}`);
});