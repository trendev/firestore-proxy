import { Firestore } from "@google-cloud/firestore";
import { JWTAbstractController } from "./jwt-abstract-controller";

import { NextFunction, Request, Response } from "express";

import { JWTWhiteMapEntry } from "./../entities/jwt-white-map-entry";

export class JWTWhiteMapController extends JWTAbstractController {

    public constructor(db: Firestore, public collection = "jwtwhitemap") {
        super(db);
        this.init();
    }

    private init() {
        this.Router()
            // .use("/", this.debugInputBody)
            .get("/", this.getAll)
            .post("/", this.create)
            .put("/", this.update)
            .delete("/:email", this.delete);
    }

    private create = (req: Request, res: Response, next: NextFunction) => {

        const entry: JWTWhiteMapEntry = req.body;

        console.log(`Creating ${this.collection} document for user [${entry.email}]`);

        this.save(
            req,
            res,
            next,
            entry,
            entry.email,
            `${this.collection} document created`);
    }

    private update = (req: Request, res: Response, next: NextFunction) => {
        const entry: JWTWhiteMapEntry = req.body;

        console.log(`Updating ${this.collection} document for user [${entry.email}]`);

        this.save(
            req,
            res,
            next,
            entry,
            entry.email,
            `${this.collection} document updated`);
    }

    private delete = (req: Request, res: Response, next: NextFunction) => {

        console.log(`Deleting ${this.collection} document for user [${req.params.email}]`);

        this.db.collection(this.collection)
            .doc(req.params.email)
            .delete()
            .then((w) => {
                console.log(`${this.collection} document deleted at ${w.writeTime.toDate()}`);
                res.sendStatus(200);
            })
            .catch((err) => {
                console.error(`Error deleting ${this.collection} document for user ${req.params.email}`, err);
                res.status(500).send(err);
            });
    }
}
