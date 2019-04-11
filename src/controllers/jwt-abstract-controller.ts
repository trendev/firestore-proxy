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
        console.log("Request Body : " + JSON.stringify(req.body, null, 2));
        next();
    }

    protected getAll = (req: Request, res: Response, next: NextFunction) => {
        console.log(`Getting all ${this.collection} documents`);

        this.db.collection(this.collection).get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    console.warn(`Getting all ${this.collection} documents : no document found`);
                    res.json([]);
                } else {
                    console.log(`${snapshot.size} documents found in collection ${this.collection}...`);
                    const docs = snapshot.docs;
                    res.json(docs.map((d) => d.data()));
                }
            })
            .catch((err) => {
                console.error(`Error getting ${this.collection}`, err);
                res.status(500).send(err);
            });
    }

    protected save = <T>(
        req: Request,
        res: Response,
        next: NextFunction,
        entry: T,
        document: string,
        successmsg: string) => {

        console.log(`Saving ${this.collection} document in Firestore`);

        this.db.collection(this.collection)
            .doc(document)
            .set(entry)
            .then((w) => {
                console.log(`${successmsg} at ${w.writeTime.toDate()}`);
                res.status(201).json(req.body);
            })
            .catch((err) => {
                console.error(`Error saving ${this.collection}`, err);
                res.status(500).send(err);
            });
    }
}
