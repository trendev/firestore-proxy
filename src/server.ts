import express from 'express';
import creds from './creds/serviceAccountKey.json';

const app: express.Application = express();

app.get('/', (req, res) => res.json(creds));

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Listening on port ${port}`));