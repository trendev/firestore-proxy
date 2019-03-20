import express = require("express");

export abstract class JWTAbstractController {

    private _router = express.Router();

    public constructor(public creds: any) {
    }

    public Router() {
        return this._router;
    }

}
