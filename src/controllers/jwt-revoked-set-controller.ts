import { Firestore } from "@google-cloud/firestore";
import JWTRecord from "./../entities/jwt-record";
import { JWTAbstractController } from "./jwt-abstract-controller";

import { NextFunction, Request, Response } from "express";

export class JWTRevokedSetController extends JWTAbstractController {

    public constructor(db: Firestore, public collection = "jwtrevokedset") {
        super(db);
        this.init();
    }

    private init() {
        this.Router()
            .get("/", (req, resp, next) => this.getAll(req, resp, next))
            .post("/", (req, resp, next) => this._create(req, resp, next))
            .delete("/:token", (req, resp, next) => this._delete(req, resp, next));
    }

    private _create(req: Request, res: Response, next: NextFunction) {
        const entry: JWTRecord = req.body;

        console.log(`Creating ${this.collection} document`);

        this.save(
            req,
            res,
            next,
            entry,
            entry.token,
            `${this.collection} document created`);
    }

    private _delete(req: Request, res: Response, next: NextFunction) {
        console.log(`Deleting ${this.collection} document [${req.params.token}]`);

        this.delete(
            req,
            res,
            next,
            req.params.token);
    }
}
