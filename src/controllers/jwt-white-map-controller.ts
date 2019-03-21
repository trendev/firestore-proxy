import { Firestore } from "@google-cloud/firestore";
import { JWTAbstractController } from "./jwt-abstract-controller";

export class JWTWhiteMapController extends JWTAbstractController {

    public constructor(db: Firestore) {
        super(db);
        this.init();
    }

    private init() {
        this.Router().get("/", (req, res, next) => {
            const docRef = this.db.collection("users").doc("jsie");
            docRef.set({
                born: 1982,
                date: new Date().getTime(),
                first: "Julien",
                last: "Sié",
            })
                .then((result) => {
                    res.json({
                        data: result,
                        type: "jwtwhitemap",
                    });
                })
                .catch(next);
        });
    }
}
