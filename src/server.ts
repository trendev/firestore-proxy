import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";

import admin, { ServiceAccount } from "firebase-admin";

import { JWTRevokedSetController } from "./controllers/jwt-revoked-set-controller.js";
import { JWTWhiteMapController } from "./controllers/jwt-white-map-controller.js";
import creds from "./creds/service-account-key.json";

// display the environment at startup
if (process.env.NODE_ENV === "preprod" || process.env.NODE_ENV === "dev") {
    console.log(`## Running on ${process.env.NODE_ENV} environmemnt ##`);
    console.log(`## An extension "-${process.env.NODE_ENV}" will be added to the collection path ## `);
}

const credentials = creds as ServiceAccount;
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const app: express.Application = express();

app.use(morgan("dev"));
app.use(bodyParser.json());

const jwtwmctrl = new JWTWhiteMapController(db);
const jwtrsctrl = new JWTRevokedSetController(db);

app.use("/jwtwhitemap", jwtwmctrl.Router());
app.use("/jwtrevokedset", jwtrsctrl.Router());

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`${Date()} : Server started and listening on port [ ${port} ]`));
