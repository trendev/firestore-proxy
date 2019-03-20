import { JWTWhiteMapController } from './controllers/JWTWhiteMapController';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';

//TODO : inits firestore here and provide the db to the controllers
import creds from './creds/serviceAccountKey.json';

const app: express.Application = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

const jwtwmctrl = new JWTWhiteMapController(creds);

const jwtrevokedsetRouter = express.Router();
jwtrevokedsetRouter.get('/', (req, res) => {
    res.json({
        creds: creds,
        type: 'jwtrevokedset'
    });
});

app.use('/jwtwhitemap', jwtwmctrl.getRouter());
app.use('/jwtrevokedset', jwtrevokedsetRouter);

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`${Date()} : Server started and listening on port [ ${port} ]`));