import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import { JWTRevokedSetController } from "./controllers/JWTRevokedSetController";
import { JWTWhiteMapController } from "./controllers/JWTWhiteMapController";

// TODO : inits firestore here and provide the db to the controllers
import creds from "./creds/serviceAccountKey.json";

const app: express.Application = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

const jwtwmctrl = new JWTWhiteMapController(creds);
const jwtrsctrl = new JWTRevokedSetController(creds);

app.use("/jwtwhitemap", jwtwmctrl.Router());
app.use("/jwtrevokedset", jwtrsctrl.Router());

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`${Date()} : Server started and listening on port [ ${port} ]`));
