import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express()

app.use(express.json());
app.use(cors());

app.get('/',(res,req)=> res.send('Server is running'))


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server is Running on port ${PORT}`));
