import { Firestore } from "@google-cloud/firestore";
import express = require("express");

import { NextFunction, Request, Response } from "express";

export abstract class JWTAbstractController {

    public readonly abstract collection: string;

    private _router = express.Router();

    public constructor(protected db: Firestore) {
    }

    public Router() {
        return this._router;
    }

    protected debugInputBody = (req: Request, res: Response, next: NextFunction) => {
        console.log("Body : " + JSON.stringify(req.body, null, 2));
        next();
    }

    protected getAll = (req: Request, res: Response, next: NextFunction) => {
        this.db.collection(this.collection).get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    console.warn(`Getting ${this.collection} : no document found`);
                    res.json([]);
                } else {
                    console.log(`Found ${snapshot.size} ${this.collection} documents`);
                    const docs = snapshot.docs;
                    res.json(docs.map((d) => d.data()));
                }
            })
            .catch((err) => {
                console.error(`Error getting ${this.collection}`, err);
                res.status(500).send(err);
            });
    }
}
