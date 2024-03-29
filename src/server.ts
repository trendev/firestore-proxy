import express from "express";
import morgan from "morgan";

import admin, { ServiceAccount } from "firebase-admin";

import { JWTRevokedSetController } from "./controllers/jwt-revoked-set-controller.js";
import { JWTWhiteMapController } from "./controllers/jwt-white-map-controller.js";
import creds from "./creds/service-account-key.json";

if (!process.env.NODE_ENV) {
    console.error("Starting NodeJS server : NODE_ENV must be provided !!!");
    process.exit(1);
}

// display the environment at startup
console.log(`## Running on ${process.env.NODE_ENV} environmemnt ##`);
console.log(`## An extension "-${process.env.NODE_ENV}" will be added to the collection path ## `);

const credentials = creds as ServiceAccount;
admin.initializeApp({
    credential: admin.credential.cert(credentials),
});

const db = admin.firestore();

const app: express.Application = express();

app.get("/health-check", (req, res) => {
    res.send({
        message: "Health check passed",
        status: "ok"
    });
});

app.use(morgan("dev"));
app.use(express.json());

const jwtwmctrl = new JWTWhiteMapController(db);
const jwtrsctrl = new JWTRevokedSetController(db);

app.use("/jwtwhitemap", jwtwmctrl.Router());
app.use("/jwtrevokedset", jwtrsctrl.Router());

const port = process.env.PORT || 9000;
app.listen(port, () => console.log(`${Date()} : NodeJS server ${process.version} is started and listening on port [ ${port} ]`));
