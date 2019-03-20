import { JWTAbstractController } from './JWTAbstractController';

export class JWTWhiteMapController extends JWTAbstractController {

    public constructor(creds: any) {
        super(creds);
        this.init();
    }

    private init() {
        this.Router().get('/', (req, res) => {
            res.json({
                creds: this.creds,
                date: new Date().getTime(),
                type: 'jwtwhitemap'
            });
        });
    }
}