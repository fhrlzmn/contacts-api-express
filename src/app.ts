import express, { Express } from 'express';
import cors from 'cors';
import contactsRouter from './routes/contactsRoutes';

const app: Express = express();
const host: string = process.env.HOST || '127.0.0.1';
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());
app.use(cors());

app.use('/api/contacts/', contactsRouter);

app.all('*', (req, res) => {
  res.status(404);
  res.send({ message: 'Page not found' });
});

app.listen(PORT, host, () => {
  console.log(`Server is running on http://${host}:${PORT}`);
});
