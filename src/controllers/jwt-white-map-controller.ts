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

        this.db.collection(this.collection)
            .doc(entry.email)
            .set(entry)
            .then((w) => {
                console.log(`${this.collection} document created at ${w.writeTime.toDate()}`);
                res.status(201).json(req.body);
            })
            .catch((err) => {
                console.error(`Error creating ${this.collection}`, err);
                res.status(500).send(err);
            });
    }

    private update = (req: Request, res: Response, next: NextFunction) => {
        const entry: JWTWhiteMapEntry = req.body;

        this.db.collection(this.collection)
            .doc(entry.email)
            .set(entry)
            .then((w) => {
                console.log(`${this.collection} document updated at ${w.writeTime.toDate()}`);
                res.json(req.body);
            })
            .catch((err) => {
                console.error(`Error updating ${this.collection}`, err);
                res.status(500).send(err);
            });
    }

    private delete = (req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(200);
    }
}
