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
            .post("/", this._create)
            .put("/", this._update)
            .delete("/:email", this._delete);
    }

    private _create = (req: Request, res: Response, next: NextFunction) => {

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

    private _update = (req: Request, res: Response, next: NextFunction) => {
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

    private _delete = (req: Request, res: Response, next: NextFunction) => {

        console.log(`Deleting ${this.collection} document for user [${req.params.email}]`);

        this.delete(
            req,
            res,
            next,
            req.params.email);
    }
}
