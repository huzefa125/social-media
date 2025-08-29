import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './configs/db.js';
import {inngest,functions} from './inngest/index.js'

dotenv.config();

const app = express();
await connectDB()
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Server is running!');
});

app.use('/api/inngest',serve({client:inngest,functions}))

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
