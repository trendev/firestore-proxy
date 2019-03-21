import { Firestore } from "@google-cloud/firestore";
import { JWTAbstractController } from "./jwt-abstract-controller";

import { NextFunction, Request, Response } from "express";

export class JWTWhiteMapController extends JWTAbstractController {

    public constructor(db: Firestore) {
        super(db);
        this.init();
    }

    private init() {
        this.Router()
            .get("/", this.getAll)
            .put("/bulk-updates", this.bulkUpdates)
            .delete("/bulk-removes", this.bulkRemoves)
            .post("/", this.create)
            .put("/", this.update)
            .delete("/:email", this.delete);
    }

    private getAll = (req: Request, res: Response, next: NextFunction) => {
        res.json([]);
    }

    private bulkUpdates = (req: Request, res: Response, next: NextFunction) => {
        res.json(req.body);
    }

    private bulkRemoves = (req: Request, res: Response, next: NextFunction) => {
        res.json(req.body);
    }

    private create = (req: Request, res: Response, next: NextFunction) => {
        res.status(201).json(req.body);
    }

    private update = (req: Request, res: Response, next: NextFunction) => {
        res.json(req.body);
    }

    private delete = (req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(200);
    }
}
