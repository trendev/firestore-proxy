import { JWTAbstractController } from "./jwt-abstract-controller";

export class JWTRevokedSetController extends JWTAbstractController {

    public constructor(creds: any) {
        super(creds);
        this.init();
    }

    private init() {
        this.Router().get("/", (req, res) => {
            res.json({
                creds: this.creds,
                date: new Date().getTime(),
                type: "jwtrevokedset",
            });
        });
    }
}
