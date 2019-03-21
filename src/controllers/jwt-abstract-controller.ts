import { Firestore } from "@google-cloud/firestore";
import express = require("express");

import { NextFunction, Request, Response } from "express";

export abstract class JWTAbstractController {

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

}
