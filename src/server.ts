import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//TODO : firestore setup
//TODO : move this import into a class dedicated to firestore setup
import creds from './creds/serviceAccountKey.json';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

//TODO : use controller instead
const jwtwhitemapRouter = express.Router();
jwtwhitemapRouter.get('/', (req, res) => {
    res.json({
        creds: creds,
        type: 'jwtwhitemap'
    });
});

const jwtrevokedsetRouter = express.Router();
jwtrevokedsetRouter.get('/', (req, res) => {
    res.json({
        creds: creds,
        type: 'jwtrevokedset'
    });
});

app.use('/jwtwhitemap', jwtwhitemapRouter);
app.use('/jwtrevokedset', jwtrevokedsetRouter);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`${Date()} : Server started and listening on port [ ${port} ]`));