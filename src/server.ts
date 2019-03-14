import express from 'express';
import morgan from 'morgan';
import creds from './creds/serviceAccountKey.json';
import bodyParser from 'body-parser';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => res.json(creds));

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`Server started and listening on port [ ${port} ]`));