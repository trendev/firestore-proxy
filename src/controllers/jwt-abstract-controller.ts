import { Firestore } from "@google-cloud/firestore";
import express from "express";
import { DEFAULT_EVENT, slackNotifier } from "./slack/slack-notifier";

import { NextFunction, Request, Response } from "express";

import { from, timer } from 'rxjs';
import { tap, retryWhen, delayWhen, take } from 'rxjs/operators';

export abstract class JWTAbstractController {

    protected readonly abstract collection: string;
    private readonly _pathSuffix: string;
    private _router: express.Router;

    public constructor(protected db: Firestore) {
        this._router = express.Router();

        if (!process.env.NODE_ENV) {
            throw Error("Building a controller : NODE_ENV must be provided !!!");
        } else {
            this._pathSuffix = `-${process.env.NODE_ENV}`;
        }

    }

    public Router() {
        return this._router;
    }

    private get path() {
        return this.collection + this._pathSuffix;
    }

    protected getAll(req: Request, res: Response, next: NextFunction) {
        console.log(`Getting all ${this.collection} documents`);

        this.execute(
            this.db.collection(this.path).get(),
            (snapshot) => {
                if (snapshot.empty) {
                    console.warn(`Getting all ${this.collection} documents : no document found`);
                    res.json([]);
                } else {
                    console.log(`${snapshot.size} documents found in collection ${this.collection}...`);
                    const docs = snapshot.docs;
                    res.json(docs.map((d) => d.data()));
                }
            },
            (err) => this.errorHandler(err, res, `Error getting all ${this.collection} documents`)
        );
    }

    protected save<T>(
        req: Request,
        res: Response,
        next: NextFunction,
        entry: T,
        document: string,
        successmsg: string) {

        console.log(`Saving ${this.collection} document in Firestore`);

        if (!entry) {
            throw new Error("Document to save cannot be null or undefined");
        }

        if (!document) {
            throw new Error("Document id is not set");
        }

        this.execute(
            this.db.collection(this.path).doc(document).set(entry),
            (w) => {
                console.log(`${successmsg} at ${w.writeTime.toDate()}`);
                res.status(201).json(req.body);
            },
            (err) => this.errorHandler(err, res, `Error saving ${this.collection} document in Firestore`)
        );

    }

    protected delete(
        req: Request,
        res: Response,
        next: NextFunction,
        document: string) {

        if (!document) {
            throw new Error("Document id is not set");
        }

        this.execute<FirebaseFirestore.WriteResult>(
            this.db.collection(this.path).doc(document).delete(),
            (w) => {
                console.log(`${this.collection} document deleted at ${w.writeTime.toDate()}`);
                res.status(200).json(w);
            },
            (err) => this.errorHandler(err, res, `Error deleting ${this.collection} document ${document}`));
    }

    private errorHandler(err: Error, res: Response, msg: string) {
        console.error(msg, err);
        const error = { error: err.stack };
        slackNotifier.emit(DEFAULT_EVENT,
            msg,
            JSON.stringify(error));
        res.status(500).send(error);
    }

    private execute<T>(
        p: Promise<T>,
        success: (result: T) => void,
        error: (err: any) => void) {
        console.log('Executing a request...');

        from(p)
            .pipe(
                retryWhen(errors =>
                    errors.pipe(
                        tap(err => console.error(`At ${new Date()}, an error occurs requesting Firestore : ${err}`)),
                        delayWhen(err => timer(200)),
                        take(5)
                    )),
                take(1))
            .subscribe(
                (r) => success(r),
                (err) => error(err)
            );
    }

}
