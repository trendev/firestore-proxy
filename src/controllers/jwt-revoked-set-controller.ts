import { Firestore } from "@google-cloud/firestore";
import { JWTAbstractController } from "./jwt-abstract-controller";

export class JWTRevokedSetController extends JWTAbstractController {

    public constructor(db: Firestore) {
        super(db);
        this.init();
    }

    private init() {
        this.Router().get("/", (req, res, next) => {
            res.json({
                date: new Date().getTime(),
                type: "jwtrevokedset",
            });
        });
    }
}
