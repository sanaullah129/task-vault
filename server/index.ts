import express from 'express';
import cors from 'cors';
import router from './routes/task';
import route from './routes/user';

const app = express();
const PORT = 2000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', router);
app.use('/users', route);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
