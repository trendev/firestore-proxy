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
            .use("/", this.debugInputBody)
            .get("/", this.getAll)
            .post("/", this.create)
            .put("/", this.update)
            .delete("/:email", this.delete);
    }

    private getAll = (req: Request, res: Response, next: NextFunction) => {
        this.db.collection("jwtwhitemap").get()
            .then((snapshot) => {
                if (snapshot.empty) {
                    console.warn("Error getting jwtwhitemap : no document found");
                    res.json([]);
                } else {
                    console.log(`Found ${snapshot.size} jwtwhitemap documents`);
                    const docs = snapshot.docs;
                    res.json(docs.map((d) => d.data));
                }
            })
            .catch((err) => {
                console.error("Error getting jwtwhitemap", err);
                res.status(500).send(err);
            });
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
