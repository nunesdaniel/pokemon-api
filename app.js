import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { pokemonRouter } from './routes/pokemonRouter.js';

import { db } from './models/index.js';

(async () => {
  try {
    await db.mongoose.connect(db.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conectado no Mongo com sucesso');
  } catch (error) {
    console.log('Erro ao conectar no MongoDB');
    process.exit();
  }
})();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: 'http://poke-list-app.herokuapp.com',
  })
);

app.use(pokemonRouter);

app.get('/', (req, res) => {
  res.send('API em execucao');
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Servidor em execucao na porta ${PORT}`);
});
