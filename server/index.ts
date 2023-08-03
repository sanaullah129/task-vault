import express from 'express';
import cors from 'cors';
import router from './routes/task';

const app = express();
const PORT = 2000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', router);

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
