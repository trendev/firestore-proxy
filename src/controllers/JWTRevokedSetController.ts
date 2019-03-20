import express = require('express');

export class JWTRevokedSetController {
    
    private _router = express.Router();

    public constructor(public creds: any) {
        this.init();
    }

    public Router() {
        return this._router;
    }

    private init() {
        this._router.get('/', (req, res) => {
            res.json({
                creds: this.creds,
                date: new Date().getTime(),
                type: 'jwtrevokedset'
            });
        });
    }
}