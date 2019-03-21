import { Firestore } from "@google-cloud/firestore";
import express = require("express");

export abstract class JWTAbstractController {

    private _router = express.Router();

    public constructor(protected db: Firestore) {
    }

    public Router() {
        return this._router;
    }

}
