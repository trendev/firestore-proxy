import express = require('express');

export class JWTWhiteMapController {
    
    private _router = express.Router();

    public constructor(public creds: any) {
        this.init();
    }

    public getRouter() {
        return this._router;
    }

    private init() {
        this._router.get('/', (req, res) => {
            res.json({
                creds: this.creds,
                type: 'jwtwhitemap'
            });
        });
    }
}