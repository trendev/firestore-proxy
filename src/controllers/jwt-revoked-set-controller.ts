import { Firestore } from "@google-cloud/firestore";
import { JWTAbstractController } from "./jwt-abstract-controller";

import { NextFunction, Request, Response } from "express";

export class JWTRevokedSetController extends JWTAbstractController {

    public constructor(db: Firestore) {
        super(db);
        this.init();
    }

    private init() {
        this.Router()
            .use("/", this.debugInputBody)
            .get("/", this.getAll)
            .put("/bulk-removes", this.bulkRemoves)
            .post("/", this.create)
            .post("/bulk-creation", this.bulkCreation)
            .delete("/:token", this.delete);
    }

    private getAll = (req: Request, res: Response, next: NextFunction) => {
        res.json([]);
    }

    private bulkRemoves = (req: Request, res: Response, next: NextFunction) => {
        res.json(req.body);
    }

    private create = (req: Request, res: Response, next: NextFunction) => {
        res.status(201).json(req.body);
    }

    private bulkCreation = (req: Request, res: Response, next: NextFunction) => {
        res.status(201).json(req.body);
    }

    private delete = (req: Request, res: Response, next: NextFunction) => {
        res.sendStatus(200);
    }
}
