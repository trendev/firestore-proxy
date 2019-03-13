import express from 'express';
//@ts-ignore
import creds from './creds/serviceAccountKey.json';
const app: express.Application = express();

// const creds = require();
app.get('/',(req,res) => res.json(creds));

const port = process.env.PORT || 9000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));