import { JWTRecord } from "./jwt-record";

export class JWTWhiteMapEntry {
    constructor(public email: string, public records: JWTRecord[]) { }
}
